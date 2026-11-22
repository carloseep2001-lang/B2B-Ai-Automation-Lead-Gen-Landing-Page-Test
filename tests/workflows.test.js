import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readWorkflow = async name => JSON.parse(await readFile(new URL(`../workflows/${name}.json`, import.meta.url), 'utf8'));
const audit = await readWorkflow('website-audit-intake');
const prospects = await readWorkflow('normalize-prospects');
const hunter = await readWorkflow('prepare-hunter-rows');
const run = (workflow, name, inputs, context = {}) => {
  const node = workflow.nodes.find(n => n.name === name);
  const $input = { all: () => inputs, first: () => inputs[0] };
  return new Function('$input', '$', node.parameters.jsCode)($input, name => ({ first: () => ({ json: context[name] }) }));
};
const lead = { requestId: '34b0a7c4-5187-43cc-95ca-e281cf019daf', name: ' Test Person ', email: ' PERSON@example.com ',
  bottlenecks: ['Manual data entry'], tools: ['Google Workspace'], hoursLost: '1 – 5 hrs / person' };
const input = body => [{ json: { body, spreadsheet_id: 'fixture_spreadsheet_123456', sheet_name: 'Website enquiries' } }];

test('all imports are inactive, credential-free, unpinned and structurally connected', () => {
  for (const workflow of [audit, prospects, hunter]) {
    assert.equal(workflow.active, false);
    assert.deepEqual(workflow.pinData, {});
    assert.equal(new Set(workflow.nodes.map(n => n.id)).size, workflow.nodes.length);
    const names = new Set(workflow.nodes.map(n => n.name));
    for (const node of workflow.nodes) assert.equal(node.credentials, undefined);
    for (const [source, outputs] of Object.entries(workflow.connections)) {
      assert.ok(names.has(source));
      for (const branch of outputs.main) for (const edge of branch) assert.ok(names.has(edge.node));
    }
  }
});

test('actual audit Code node normalizes contact details and preserves the request ID', () => {
  const result = run(audit, 'Validate audit', input(lead))[0].json;
  assert.equal(result.valid, true);
  assert.equal(result.lead.email, 'person@example.com');
  assert.equal(result.lead.name, 'Test Person');
  assert.equal(result.lead.requestId, lead.requestId);
  assert.ok(result.lead.receivedAt);
});

test('invalid data and missing destination take a response path without touching Sheets', () => {
  const invalid = run(audit, 'Validate audit', input({ ...lead, email: 'broken' }))[0].json;
  assert.equal(invalid.valid, false);
  assert.equal(invalid.responseCode, 400);
  const data = input(lead);
  data[0].json.spreadsheet_id = 'SET_SPREADSHEET_ID';
  assert.equal(run(audit, 'Validate audit', data)[0].json.responseCode, 503);
  assert.deepEqual(audit.connections['Valid request?'].main[1].map(n => n.node), ['Respond invalid']);
});

test('audit save uses RAW cells and a stable key; error branches cannot acknowledge success', () => {
  const save = audit.nodes.find(n => n.name === 'Save enquiry');
  assert.equal(save.parameters.operation, 'appendOrUpdate');
  assert.deepEqual(save.parameters.columns.matchingColumns, ['requestId']);
  assert.equal(save.parameters.options.cellFormat, 'RAW');
  assert.equal(save.onError, 'continueErrorOutput');
  assert.equal(audit.connections['Save enquiry'].main[1][0].node, 'Respond storage error');
  const error = audit.nodes.find(n => n.name === 'Respond storage error');
  assert.equal(error.parameters.options.responseCode, 502);
  assert.equal(JSON.parse(error.parameters.responseBody).ok, false);
});

test('saved acknowledgement must match the validated lead', () => {
  const context = { 'Validate audit': { lead } };
  assert.deepEqual(run(audit, 'Confirm saved enquiry', [{ json: { requestId: lead.requestId } }], context)[0].json,
    { ok: true, requestId: lead.requestId });
  assert.throws(() => run(audit, 'Confirm saved enquiry', [{ json: { requestId: 'different' } }], context), /mismatch/);
});

test('legacy Places results retain nested geometry and deduplicate repeated places', () => {
  const company = { name: 'Example Electric', place_id: 'fixture-place-1', formatted_address: '1 Example Street', geometry: { location: { lat: -28, lng: 153 } } };
  const result = run(prospects, 'Normalize and deduplicate', [{ json: { results: [company, company] } }]);
  assert.equal(result.length, 1);
  assert.deepEqual(result[0].json.geometry, company.geometry);
  assert.equal(result[0].json.place_id, 'fixture-place-1');
});

test('new Places schema and person-array output map to the existing sheet columns', () => {
  const places = run(prospects, 'Normalize and deduplicate', [{ json: { places: [{ id: 'place-2', displayName: { text: 'Example Plumbing' },
    websiteUri: 'https://example.com', nationalPhoneNumber: '07 0000 0000', location: { latitude: -28, longitude: 153 } }] } }]);
  assert.equal(places[0].json['Company name'], 'Example Plumbing');
  assert.equal(places[0].json['website URL'], 'https://example.com/');
  const contacts = run(prospects, 'Normalize and deduplicate', [{ json: { 'Company Name': 'Example Plumbing', website: 'example.com', 'Person Name': [
    { name: 'Example Owner', email: ' OWNER@EXAMPLE.COM ', LinkedIn: 'https://linkedin.com/in/example' },
    { name: 'Example Owner', email: 'owner@example.com' },
  ] } }]);
  assert.equal(contacts.length, 1);
  assert.equal(contacts[0].json['Owner (person) name'], 'Example Owner');
  assert.equal(contacts[0].json['Email address'], 'owner@example.com');
  assert.equal(contacts[0].json['LinkedIn URL'], 'https://linkedin.com/in/example');
});

test('prose is rejected and missing contact details stay empty instead of being invented', () => {
  assert.throws(() => run(prospects, 'Normalize and deduplicate', [{ json: { output: 'Maybe try contacting the owner' } }]), /No identifiable prospects/);
  const rows = run(prospects, 'Normalize and deduplicate', [{ json: { name: 'Example', place_id: 'fixture', website: 'javascript:alert(1)' } }]);
  assert.equal(rows[0].json['Email address'], '');
  assert.equal(rows[0].json['website URL'], '');
});

test('structured and fenced JSON AI outputs both normalize without flattening people', () => {
  const company = { 'Company Name': 'Example Electric', website: 'https://example.com', 'Person Name': [{ name: 'Example Owner', email: 'owner@example.com' }] };
  for (const output of [company, '```json\n' + JSON.stringify(company) + '\n```']) {
    const rows = run(prospects, 'Normalize and deduplicate', [{ json: { output } }]);
    assert.equal(rows.length, 1);
    assert.equal(rows[0].json['Owner (person) name'], 'Example Owner');
    assert.equal(rows[0].json['Email address'], 'owner@example.com');
  }
});

test('Hunter preparation removes blanks, duplicates, completed rows and missing row IDs', () => {
  const rows = [
    { row_number: '12', 'Email address': ' OWNER@example.com ' },
    { row_number: 13, 'Email address': 'owner@example.com' },
    { row_number: 14, 'Email address': '' },
    { row_number: 15, 'Email address': 'other@example.com', 'hunter search': 'yes' },
    { 'Email address': 'missing-row@example.com' },
  ];
  const eligible = run(hunter, 'Keep eligible rows', rows.map(json => ({ json })));
  assert.equal(eligible.length, 1);
  assert.equal(eligible[0].json['Email address'], 'owner@example.com');
  assert.equal(eligible[0].json.row_number, 12);
  assert.deepEqual(eligible[0].pairedItem, { item: 0 });
});

test('a batch with no eligible email stops before calling Hunter', () => {
  assert.deepEqual(run(hunter, 'Keep eligible rows', [{ json: { row_number: 2, 'Email address': '' } }]), []);
});
