import assert from 'node:assert/strict';
import test from 'node:test';
import { handleAuditRequest } from '../server/audit.js';

const lead = {
  requestId: '34b0a7c4-5187-43cc-95ca-e281cf019daf',
  name: ' Test Business ',
  email: ' Example@EXAMPLE.com ',
  bottlenecks: ['Manual data entry'],
  tools: ['Google Workspace'],
  hoursLost: '1 – 5 hrs / person',
};
const env = { N8N_AUDIT_WEBHOOK_URL: 'https://n8n.example.com/webhook/audit', N8N_AUDIT_WEBHOOK_TOKEN: 'test-only-token' };
function request(data = lead, headers = {}, method = 'POST') {
  return new Request('https://website.example.com/api/audit', {
    method,
    headers: { 'content-type': 'application/json', ...headers },
    ...(method === 'POST' ? { body: JSON.stringify(data) } : {}),
  });
}

test('success waits for a matching saved-lead acknowledgement and forwards answers', async () => {
  let delivery;
  const response = await handleAuditRequest(request(), { env, send: async (url, init) => {
    delivery = { url, init, body: JSON.parse(init.body) };
    return Response.json({ ok: true, requestId: lead.requestId });
  } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, requestId: lead.requestId });
  assert.equal(delivery.url, env.N8N_AUDIT_WEBHOOK_URL);
  assert.equal(delivery.body.name, 'Test Business');
  assert.equal(delivery.body.email, 'example@example.com');
  assert.deepEqual(delivery.body.tools, lead.tools);
  assert.deepEqual(delivery.body.bottlenecks, lead.bottlenecks);
  assert.equal(delivery.init.headers.Authorization, 'Bearer test-only-token');
  assert.equal(delivery.init.headers['Idempotency-Key'], lead.requestId);
  assert.equal(delivery.init.redirect, 'error');
  assert.ok(delivery.body.receivedAt);
});

test('bad data is rejected before making an external request', async () => {
  for (const data of [null, {}, { ...lead, email: 'not-an-email' }, { ...lead, tools: [] }, { ...lead, name: '  ' }]) {
    const response = await handleAuditRequest(request(data), { env, send: () => assert.fail('must not forward invalid data') });
    assert.equal(response.status, 400);
  }
});

test('missing configuration and test/non-HTTPS webhook URLs fail closed', async () => {
  for (const value of ['', 'http://n8n.example.com/webhook/audit', 'https://n8n.example.com/webhook-test/audit']) {
    const response = await handleAuditRequest(request(), { env: { N8N_AUDIT_WEBHOOK_URL: value }, send: () => assert.fail('must not send') });
    assert.equal(response.status, 503);
  }
});

test('workflow errors, HTML responses and generic started responses cannot report success', async () => {
  for (const upstream of [new Response('error', { status: 500 }), new Response('<html>Sign in</html>'),
    Response.json({ message: 'Workflow was started' }), Response.json({ ok: true, requestId: 'wrong-id' })]) {
    const response = await handleAuditRequest(request(), { env, send: async () => upstream });
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
  }
});

test('timeouts and connection failures return a retryable error without leaking details', async () => {
  for (const [error, status] of [[new DOMException('test timeout', 'TimeoutError'), 504], [new Error('private-url-or-key'), 502]]) {
    const response = await handleAuditRequest(request(), { env, send: async () => { throw error; } });
    assert.equal(response.status, status);
    assert.doesNotMatch(await response.text(), /private-url-or-key|test-only-token/);
  }
});

test('rejects unsupported methods, cross-origin submissions, non-JSON and oversized bodies', async () => {
  assert.equal((await handleAuditRequest(request(undefined, {}, 'GET'))).status, 405);
  assert.equal((await handleAuditRequest(request(lead, { origin: 'https://other.example.com' }))).status, 403);
  assert.equal((await handleAuditRequest(request(lead, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await handleAuditRequest(request({ ...lead, name: 'a'.repeat(17_000) }))).status, 413);
});
