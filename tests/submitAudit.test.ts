import assert from 'node:assert/strict';
import test from 'node:test';
import { submitAudit } from '../src/lib/submitAudit.ts';

const lead = {
  requestId: '34b0a7c4-5187-43cc-95ca-e281cf019daf',
  name: 'Test Business', email: 'example@example.com',
  bottlenecks: ['Manual data entry'], tools: ['Google Workspace'], hoursLost: '1 – 5 hrs / person',
};

test('client posts all questionnaire answers and waits for matching confirmation', async () => {
  const send: typeof fetch = async (url, init) => {
    assert.equal(url, '/api/audit');
    assert.equal(init?.method, 'POST');
    assert.deepEqual(JSON.parse(init?.body as string), lead);
    return Response.json({ ok: true, requestId: lead.requestId });
  };
  await submitAudit(lead, send);
});

test('client never treats missing backend, HTTP errors or malformed confirmations as success', async () => {
  for (const response of [new Response('<html>Vite fallback</html>'), Response.json({ ok: true }, { status: 503 }),
    Response.json({ ok: false }), Response.json({ ok: true, requestId: 'different-lead' })]) {
    await assert.rejects(submitAudit(lead, async () => response), /could not confirm/);
  }
});

test('network errors are actionable and do not expose implementation details', async () => {
  await assert.rejects(submitAudit(lead, async () => { throw new Error('private detail'); }), /Check your connection/);
});
