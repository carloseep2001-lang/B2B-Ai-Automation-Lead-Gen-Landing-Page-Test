# B2B AI Automation Lead-Gen Landing Page

A responsive, single-page B2B lead-generation website built in Bolt with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Run locally

Requirements: Node.js 22.18 or newer and npm (Node.js 24 is recommended).

```bash
git clone https://github.com/carloseep2001-lang/B2B-Ai-Automation-Lead-Gen-Landing-Page-Test.git
cd B2B-Ai-Automation-Lead-Gen-Landing-Page-Test
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Available commands

- `npm run dev` starts the development server.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` previews the production build locally.
- `npm run typecheck` checks TypeScript types.
- `npm run lint` runs ESLint.
- `npm test` checks delivery, validation, failure handling, and client confirmation.

## Customize

The page content is split into components under `src/components/`. The audit form posts all four steps to `/api/audit`; it displays success only after n8n confirms the same request ID. On failure, answers remain available for retry. Unconfigured booking/contact links are hidden.

## Connect lead capture

Deploy to Vercel so `api/audit.js` runs alongside the Vite frontend. Configure environment variables using `.env.example` as a template:

- `N8N_AUDIT_WEBHOOK_URL`: the published workflow's HTTPS **production** `/webhook/` URL, server-only.
- `N8N_AUDIT_WEBHOOK_TOKEN`: optional bearer token matching the webhook's existing Header Auth.
- `VITE_BOOKING_URL` and `VITE_CONTACT_EMAIL`: optional public destinations; set only to your actual booking page and inbox.

Never put webhook credentials in `VITE_` variables. Plain `npm run dev` runs only the frontend; it cannot serve the Vercel function. Use `vercel dev` with Development environment variables to exercise the full local route. Missing or invalid backend configuration returns an error instead of a false success.

### n8n request/response contract

This is a new inbound website integration, separate from the existing outbound prospect-finding workflows. It must be configured and tested before live lead capture is considered ready.

1. Webhook node: POST, production URL, respond **Using Respond to Webhook node**. Use matching Header Auth if a token is configured.
2. The request is under `$json.body`. Fields: `requestId`, `name`, `email`, `bottlenecks` (array), `tools` (array), `hoursLost`, `source`, `receivedAt`, `deliveryId`.
3. Store the lead durably, using `requestId` as the idempotency/match key. Retries reuse it, including after an uncertain network response. Do not append another row for the same ID. Set sheet cells to RAW/plain text when storing external input.
4. Only after the save succeeds, Respond to Webhook with JSON `{ "ok": true, "requestId": "<the incoming requestId>" }`. On an existing ID, confirm the already saved lead instead of duplicating it.
5. On storage failure, return a non-2xx error. Do not use an immediate "Workflow was started" response as confirmation.

The route waits up to 15 seconds for acknowledgement and does not automatically retry. Keep lead storage on this short path. Run slower AI enrichment separately; no automatic emails are required by this integration. Add hosting-level abuse/rate controls before exposing the form to significant public traffic.

## Verification status

The delivery contract is covered with injected test responses; this does not establish a live n8n/Sheets save. Live verification still requires the published inbound workflow, a reconnected Google Sheets credential, matching environment variables and a real submission checked in the destination sheet.

## Project structure

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    Audience.tsx
    AuditOffer.tsx
    FadeIn.tsx
    FinalCTA.tsx
    Hero.tsx
    Process.tsx
    ScrollProgress.tsx
    StaggerGroup.tsx
    StaggerItem.tsx
```

Generated folders such as `node_modules/` and `dist/` are excluded from Git by `.gitignore`.
