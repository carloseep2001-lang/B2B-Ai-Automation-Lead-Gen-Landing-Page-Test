// These functions contain no external dependencies: they run in n8n Code nodes.
export function normalizeProspects(items) {
  const text = value => typeof value === 'string' ? value.trim() : '';
  const email = value => {
    const candidate = text(value).toLowerCase();
    return candidate.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : '';
  };
  const web = value => {
    let candidate = text(value);
    if (!candidate) return '';
    if (!/^[a-z][a-z0-9+.-]*:/i.test(candidate)) candidate = `https://${candidate}`;
    // No URL/module dependency: n8n sandboxes may not expose the URL global.
    const match = candidate.match(/^(https?):\/\/([a-z0-9](?:[a-z0-9.-]*[a-z0-9])?)(:\d{1,5})?([/?#][^\s\\]*)?$/i);
    return match ? `${match[1].toLowerCase()}://${match[2].toLowerCase()}${match[3] || ''}${match[4] || '/'}` : '';
  };
  const rows = [];
  const byId = new Map();
  let rejected = 0;
  const add = (company, person = {}) => {
    const companyName = text(company['Company Name'] || company['Company name'] || company.name || company.displayName?.text);
    const personName = text(person.name || person['Owner (person) name'] || company['Owner (person) name']);
    const address = text(company.formatted_address || company.formattedAddress || company.address);
    const site = web(company.website || company.websiteUri || company['website URL']);
    const placeId = text(company.place_id || company.id);
    const contactEmail = email(person.email || person['Email address'] || company['Email address'] || company.email);
    const identity = placeId || (site ? site.split('/')[2].replace(/:\d+$/, '').replace(/^www\./, '') : '') ||
      (companyName && address ? `${companyName.toLowerCase()}|${address.toLowerCase()}` : '');
    if (!companyName || (!identity && !contactEmail)) { rejected++; return; }
    const key = contactEmail ? `email:${contactEmail}` : `company:${identity}|person:${personName.toLowerCase()}`;
    const row = {
      lead_id: key,
      'Company name': companyName,
      'Owner (person) name': personName,
      'Email address': contactEmail,
      'Instagram URL': web(person.Instagram || person.instagram || company['Instagram URL']),
      'Twitter URL': web(person.Twitter || person.twitter || company['Twitter URL']),
      'LinkedIn URL': web(person.LinkedIn || person.linkedin || company['LinkedIn URL']),
      'website URL': site,
      description: text(company.description),
      'phone number': text(company.nationalPhoneNumber || company.formatted_phone_number || company['phone number']),
      place_id: placeId,
      address,
      ...(company.geometry && typeof company.geometry === 'object' ? { geometry: company.geometry } : {}),
      ...(company.location && typeof company.location === 'object' ? { location: company.location } : {}),
    };
    if (byId.has(key)) {
      const existing = byId.get(key);
      for (const [field, value] of Object.entries(row)) if (!existing[field] && value) existing[field] = value;
    } else {
      byId.set(key, row);
      rows.push(row);
    }
  };
  for (const item of items) {
    const root = item?.json ?? item;
    const records = Array.isArray(root) ? root : Array.isArray(root?.results) ? root.results :
      Array.isArray(root?.places) ? root.places : [root];
    for (let record of records) {
      // An AI node may emit a JSON string; reject prose instead of guessing contacts.
      if (typeof record?.output === 'string') {
        try { record = JSON.parse(record.output.replace(/^```(?:json)?\s*|\s*```$/g, '')); }
        catch { rejected++; continue; }
      } else if (record?.output && typeof record.output === 'object') {
        record = record.output;
      }
      const companies = Array.isArray(record) ? record : [record];
      for (const company of companies) {
        if (!company || typeof company !== 'object') { rejected++; continue; }
        const people = Array.isArray(company['Person Name']) ? company['Person Name'] : [];
        if (people.length) for (const person of people) add(company, person && typeof person === 'object' ? person : {});
        else add(company);
      }
    }
  }
  return { rows, rejected };
}

export function prepareHunterRows(items) {
  const eligible = [];
  const skipped = [];
  const seen = new Set();
  for (const [index, item] of items.entries()) {
    const row = item?.json ?? item ?? {};
    const email = typeof row['Email address'] === 'string' ? row['Email address'].trim().toLowerCase() : '';
    const number = Number(row.row_number);
    const processed = ['yes', 'true', '1'].includes(String(row['hunter search'] ?? '').trim().toLowerCase());
    let reason = '';
    if (processed) reason = 'already_checked';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) reason = 'missing_or_invalid_email';
    else if (!Number.isSafeInteger(number) || number < 2) reason = 'missing_sheet_row';
    else if (seen.has(email)) reason = 'duplicate_email';
    if (reason) { skipped.push({ index, reason }); continue; }
    seen.add(email);
    eligible.push({ json: { ...row, 'Email address': email, row_number: number }, pairedItem: { item: index } });
  }
  return { eligible, skipped };
}
