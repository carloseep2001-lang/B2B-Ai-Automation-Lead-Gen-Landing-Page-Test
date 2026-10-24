# B2B n8n workflow pack

These imports were built offline on 24 October 2026. They have **not** been imported into or run in the live n8n instance. All are inactive, have no pinned samples, and contain no credentials or personal spreadsheet IDs.

## 1. Website enquiry capture

Import `website-audit-intake.json`. The flow is Webhook → destination configuration → validation → Google Sheets save → matching acknowledgement. Invalid requests return 400, missing destination configuration returns 503, and handled storage failures return 502. It uses the same validation source as the website's API.

Setup after account access is restored:

1. Create a separate `Website enquiries` tab with these exact headers: `requestId`, `name`, `email`, `bottlenecks`, `tools`, `hoursLost`, `source`, `receivedAt`.
2. Set `spreadsheet_id` in Configure destination and select the reconnected Google Sheets credential in Save enquiry.
3. Assign Header Auth to Audit webhook: header name `Authorization`, value `Bearer <your private token>`. Do not put this value in Git or a `VITE_` variable.
4. Configure the website's server-only `N8N_AUDIT_WEBHOOK_URL` with the workflow's production URL and `N8N_AUDIT_WEBHOOK_TOKEN` with the matching token. Do not point it at a `/webhook-test/` URL.
5. Test valid, invalid and repeated synthetic submissions in a test sheet. Check the actual saved row, then remove only the test data you created.
6. Publish only after a real request is confirmed from the website through to the destination sheet.

The sheet uses RAW cell formatting so text that resembles a formula stays text. Sequential retries reuse `requestId` and update the matching row. Google Sheets does not enforce unique keys atomically: simultaneous duplicate requests can race. For concurrent production intake, use a database with a unique `requestId` or a verified single-consumer queue before promising exactly-once storage.

No emails, ads or messages are sent by this workflow. Slow enrichment belongs in a separate workflow, after the lead has been stored.

## 2. Prospect normalization

Import `normalize-prospects.json` as a sub-workflow. Call it after the business lookup or structured AI node using Execute Sub-workflow, waiting for completion. It accepts legacy Places `results`, new Places `places`, or the existing `Company Name` / `Person Name` array format.

It maps contacts to the existing sheet names, normalizes emails, preserves nested geometry, rejects unidentifiable/prose input and deduplicates within a batch. Blank contact fields remain blank. Use `lead_id` as a persistent match column in a destination sheet to prevent sequential cross-run repeats; deduplicating one batch alone does not remove historical duplicates.

The sub-workflow returns normalized rows; it does not independently query Google, enrich contacts, verify email deliverability or save to a sheet. Existing sheet nodes should map explicit columns. Lead IDs and geometry should not be silently dropped if later steps need them.

## 3. Hunter input preparation

Import `prepare-hunter-rows.json` as a sub-workflow. Insert it between Get row(s) in sheet and Limit in the existing Hunter verification workflow. Wait for completion and pass all incoming items.

It keeps rows with an unprocessed, syntactically valid email and a real `row_number` of 2 or more. It trims/lowercases the email and removes repeated emails within that batch. No eligible rows means no API call. This is input validation, not evidence that an address is deliverable.

After Hunter, keep the saved draft's direct/bypassed route to Update row in sheet. Match on `row_number` with the expression `{{ $('Limit').item.json.row_number }}` and set `hunter search` to `yes` only on the normal success path. A risk/accept-all result is not a guaranteed deliverable address. Do not split the verifier's single object as an array.

## Verification

Run `npm run workflows:build` after changing the generator or shared logic. `npm test` executes the exact JavaScript embedded in the imports, checks malformed inputs and failure branches, and validates the node references. This checks code and graph structure; credential binding, UI import compatibility, provider responses and live persistence still need an n8n run.

No production activation or account reconnection was performed in this offline pass.
