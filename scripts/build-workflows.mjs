import { writeFile, mkdir } from 'node:fs/promises';
import { normalizeAuditPayload } from '../server/audit-payload.js';
import { normalizeProspects, prepareHunterRows } from '../workflows/lib/prospects.js';

const root = new URL('../workflows/', import.meta.url);
await mkdir(root, { recursive: true });
let nodeCount = 0;
const node = (name, type, parameters, position, extra = {}) => ({
  id: `b2b-${String(++nodeCount).padStart(3, '0')}`,
  name, type: `n8n-nodes-base.${type}`, typeVersion: 1, parameters, position, ...extra,
});
const code = (name, jsCode, position, extra = {}) => node(name, 'code', { mode: 'runOnceForAllItems', jsCode }, position, { typeVersion: 2, ...extra });
const edge = name => ({ node: name, type: 'main', index: 0 });
const workflow = (name, nodes, connections) => ({
  name, nodes, connections, active: false, pinData: {},
  settings: { executionOrder: 'v1', executionTimeout: 30, saveDataSuccessExecution: 'none', saveDataErrorExecution: 'none' },
});

const validateCode = `const normalizeAuditPayload = ${normalizeAuditPayload.toString()};
const input = $input.first().json;
try {
  const lead = normalizeAuditPayload(input.body);
  if (!/^[a-zA-Z0-9_-]{20,}$/.test(input.spreadsheet_id || '') || input.spreadsheet_id === 'SET_SPREADSHEET_ID') {
    return [{json:{valid:false,responseCode:503,response:{ok:false,error:'Lead storage is not configured.'}}}];
  }
  return [{json:{valid:true,spreadsheet_id:input.spreadsheet_id,sheet_name:input.sheet_name,
    lead:{...lead,receivedAt:new Date().toISOString()}}}];
} catch {
  return [{json:{valid:false,responseCode:400,response:{ok:false,error:'Invalid audit request.'}}}];
}`;
const ackCode = `const saved = $input.first().json;
const requestId = $('Validate audit').first().json.lead.requestId;
if (saved.requestId !== requestId) throw new Error('Saved lead acknowledgement mismatch');
return [{json:{ok:true,requestId}}];`;
const columns = ['requestId', 'name', 'email', 'bottlenecks', 'tools', 'hoursLost', 'source', 'receivedAt'];
const audit = workflow('B2B - Website audit intake (setup required)', [
  node('Audit webhook', 'webhook', { httpMethod: 'POST', path: 'b2b-audit-v1', authentication: 'headerAuth', responseMode: 'responseNode', options: {} }, [0, 0], { typeVersion: 2, webhookId: 'c080de30-3ba1-4cb8-b757-4c8a147c6d37' }),
  node('Configure destination', 'set', { assignments: { assignments: [
    { id: 'sheet-id', name: 'spreadsheet_id', value: 'SET_SPREADSHEET_ID', type: 'string' },
    { id: 'sheet-name', name: 'sheet_name', value: 'Website enquiries', type: 'string' },
  ] }, includeOtherFields: true, options: {} }, [240, 0], { typeVersion: 3.4 }),
  code('Validate audit', validateCode, [480, 0]),
  node('Valid request?', 'if', { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 }, conditions: [
    { id: 'valid', leftValue: '={{ $json.valid }}', rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } },
  ], combinator: 'and' }, options: {} }, [720, 0], { typeVersion: 2.2 }),
  node('Save enquiry', 'googleSheets', {
    resource: 'sheet', operation: 'appendOrUpdate',
    documentId: { __rl: true, value: '={{ $json.spreadsheet_id }}', mode: 'id' },
    sheetName: { __rl: true, value: '={{ $json.sheet_name }}', mode: 'name' },
    columns: { mappingMode: 'defineBelow', matchingColumns: ['requestId'],
      value: Object.fromEntries(columns.map(field => [field, ['bottlenecks', 'tools'].includes(field) ? `={{ JSON.stringify($json.lead.${field}) }}` : `={{ $json.lead.${field} }}`])),
      schema: columns.map(id => ({ id, displayName: id, required: false, defaultMatch: id === 'requestId', display: true, type: 'string', canBeUsedToMatch: true, removed: false })),
      attemptToConvertTypes: false, convertFieldsToString: false,
    }, options: { cellFormat: 'RAW', useAppend: false },
  }, [960, -120], { typeVersion: 4.6, onError: 'continueErrorOutput' }),
  code('Confirm saved enquiry', ackCode, [1200, -120], { onError: 'continueErrorOutput' }),
  node('Respond saved', 'respondToWebhook', { respondWith: 'json', responseBody: '={{ $json }}', options: { responseCode: 200 } }, [1440, -120], { typeVersion: 1.4 }),
  node('Respond invalid', 'respondToWebhook', { respondWith: 'json', responseBody: '={{ $json.response }}', options: { responseCode: '={{ $json.responseCode }}' } }, [960, 160], { typeVersion: 1.4 }),
  node('Respond storage error', 'respondToWebhook', { respondWith: 'json', responseBody: '{"ok":false,"error":"Could not save the enquiry. Please retry."}', options: { responseCode: 502 } }, [1200, 180], { typeVersion: 1.4 }),
], {
  'Audit webhook': { main: [[edge('Configure destination')]] },
  'Configure destination': { main: [[edge('Validate audit')]] },
  'Validate audit': { main: [[edge('Valid request?')]] },
  'Valid request?': { main: [[edge('Save enquiry')], [edge('Respond invalid')]] },
  'Save enquiry': { main: [[edge('Confirm saved enquiry')], [edge('Respond storage error')]] },
  'Confirm saved enquiry': { main: [[edge('Respond saved')], [edge('Respond storage error')]] },
});

const normalizer = workflow('B2B - Normalize prospect batch', [
  node('Input from lead finder', 'executeWorkflowTrigger', { inputSource: 'passthrough' }, [0, 0], { typeVersion: 1.1 }),
  code('Normalize and deduplicate', `const normalizeProspects = ${normalizeProspects.toString()};
const result = normalizeProspects($input.all());
if (!result.rows.length) throw new Error('No identifiable prospects: inspect the source schema before saving.');
return result.rows.map(row => ({json:row}));`, [260, 0]),
], { 'Input from lead finder': { main: [[edge('Normalize and deduplicate')]] } });

const hunter = workflow('B2B - Prepare Hunter verification batch', [
  node('Input sheet rows', 'executeWorkflowTrigger', { inputSource: 'passthrough' }, [0, 0], { typeVersion: 1.1 }),
  code('Keep eligible rows', `const prepareHunterRows = ${prepareHunterRows.toString()};
return prepareHunterRows($input.all()).eligible;`, [260, 0]),
], { 'Input sheet rows': { main: [[edge('Keep eligible rows')]] } });

for (const [name, data] of [['website-audit-intake.json', audit], ['normalize-prospects.json', normalizer], ['prepare-hunter-rows.json', hunter]]) {
  await writeFile(new URL(name, root), JSON.stringify(data, null, 2) + '\n');
  console.log(`Built ${name}`);
}
