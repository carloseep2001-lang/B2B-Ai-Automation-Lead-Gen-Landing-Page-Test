export type AuditRequest = {
  requestId: string;
  name: string;
  email: string;
  bottlenecks: string[];
  tools: string[];
  hoursLost: string;
};

export async function submitAudit(data: AuditRequest, send: typeof fetch = fetch) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await send('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok !== true || result.requestId !== data.requestId) {
      throw new Error('We could not confirm your request. Your answers are still here; please try again shortly.');
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('We could not confirm')) throw error;
    throw new Error('We could not confirm your request. Check your connection and try again.');
  } finally {
    clearTimeout(timeout);
  }
}
