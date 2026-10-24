// Kept dependency-free so the exact validation can also run in an n8n Code node.
export function normalizeAuditPayload(data) {
  const validList = (value, maxItems) => Array.isArray(value) && value.length > 0 &&
    value.length <= maxItems && value.every(item => typeof item === 'string' && item.trim() && item.length <= 200);
  if (!data || typeof data !== 'object' || Array.isArray(data) ||
      typeof data.requestId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId) ||
      typeof data.name !== 'string' || !data.name.trim() || data.name.length > 120 ||
      typeof data.email !== 'string' || data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) ||
      !validList(data.bottlenecks, 4) || !validList(data.tools, 8) ||
      !['1 – 5 hrs / person', '5 – 15 hrs / person', '15+ hrs / person'].includes(data.hoursLost)) {
    throw new Error('Please complete all questions and enter a valid name and email.');
  }
  return {
    requestId: data.requestId,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    bottlenecks: [...new Set(data.bottlenecks.map(item => item.trim()))],
    tools: [...new Set(data.tools.map(item => item.trim()))],
    hoursLost: data.hoursLost,
    source: 'website-audit',
  };
}
