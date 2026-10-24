import { randomUUID } from 'node:crypto';

const maxBodyBytes = 16_384;

function json(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}

function validList(value, maxItems) {
  return Array.isArray(value) && value.length > 0 && value.length <= maxItems &&
    value.every(item => typeof item === 'string' && item.trim().length > 0 && item.length <= 200);
}

export async function handleAuditRequest(request, { env = process.env, send = fetch } = {}) {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405, { Allow: 'POST' });
  }
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) {
    return json({ ok: false, error: 'Request origin not allowed.' }, 403);
  }
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return json({ ok: false, error: 'Send JSON data.' }, 415);
  }

  let data;
  try {
    // Bound the actual stream, including chunked requests without Content-Length.
    let size = 0;
    const chunks = [];
    if (request.body) {
      for await (const chunk of request.body) {
        size += chunk.length;
        if (size > maxBodyBytes) {
          return json({ ok: false, error: 'Request too large.' }, 413);
        }
        chunks.push(Buffer.from(chunk));
      }
    }
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return json({ ok: false, error: 'Invalid request data.' }, 400);
  }

  if (!data || typeof data !== 'object' ||
      typeof data.requestId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId) ||
      typeof data.name !== 'string' || !data.name.trim() || data.name.length > 120 ||
      typeof data.email !== 'string' || data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) ||
      !validList(data.bottlenecks, 4) || !validList(data.tools, 8) ||
      !['1 – 5 hrs / person', '5 – 15 hrs / person', '15+ hrs / person'].includes(data.hoursLost)) {
    return json({ ok: false, error: 'Please complete all questions and enter a valid name and email.' }, 400);
  }

  let webhook;
  try {
    webhook = new URL(env.N8N_AUDIT_WEBHOOK_URL);
    if (webhook.protocol !== 'https:' || webhook.username || webhook.password || !webhook.pathname.startsWith('/webhook/')) {
      throw new Error('Invalid production webhook');
    }
  } catch {
    console.error('audit_delivery_not_configured');
    return json({ ok: false, error: 'We cannot accept requests right now. Please try again later.' }, 503);
  }

  const payload = {
    requestId: data.requestId,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    bottlenecks: [...new Set(data.bottlenecks.map(item => item.trim()))],
    tools: [...new Set(data.tools.map(item => item.trim()))],
    hoursLost: data.hoursLost,
    source: 'website-audit',
    receivedAt: new Date().toISOString(),
    deliveryId: randomUUID(),
  };

  try {
    const upstream = await send(webhook.href, {
      method: 'POST',
      redirect: 'error',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': payload.requestId,
        ...(env.N8N_AUDIT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${env.N8N_AUDIT_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    const ack = upstream.ok ? await upstream.json().catch(() => null) : null;
    // A generic 200/"Workflow was started" is not evidence that the lead was saved.
    if (!upstream.ok || ack?.ok !== true || ack.requestId !== payload.requestId) {
      console.error('audit_delivery_not_confirmed', payload.requestId, upstream.status);
      return json({ ok: false, error: 'We could not confirm your request. Please try again.' }, 502);
    }
    return json({ ok: true, requestId: payload.requestId });
  } catch (error) {
    const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    console.error(timedOut ? 'audit_delivery_timeout' : 'audit_delivery_failed', payload.requestId);
    return json({ ok: false, error: 'We could not confirm your request. Please try again.' }, timedOut ? 504 : 502);
  }
}
