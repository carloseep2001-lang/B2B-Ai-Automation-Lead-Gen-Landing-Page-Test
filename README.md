# B2B AI Automation Lead-Gen Landing Page

A responsive, single-page B2B lead-generation website built in Bolt with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Run locally

Requirements: Node.js 18 or newer and npm.

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

## Customize

The page content is split into components under `src/components/`. Replace `[Agency Name]` in `src/components/Hero.tsx` with the real agency name. The lead form is frontend-only and currently shows an inline confirmation; connect it to your preferred form or backend service before using it for live lead capture.

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
