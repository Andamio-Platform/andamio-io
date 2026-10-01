# andamio.io

Marketing site and blog for [Andamio](https://www.andamio.io), an open protocol for verifiable, portable credentials on Cardano. This repo is only the public website; the product app, API and docs live in other repositories under [Andamio-Platform](https://github.com/Andamio-Platform).

Next.js 14 (pages router plus a small `app/` directory for blog, customers, sitemap and robots), React 18, TypeScript, Tailwind and `motion/react`.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # lint + typecheck + production build
npm run start          # serve the production build
npx tsc --noEmit       # typecheck only
npm run next:lint      # lint only
```

QA scripts (Playwright, Edge channel by default; set `PW_CHANNEL` to change). Run them against a running server:

```bash
node scripts/qa/interact.mjs http://127.0.0.1:3000     # proof badge behaviour
node scripts/qa/nav-check.mjs http://127.0.0.1:3000    # top-menu routes render
node scripts/qa/perf.mjs http://127.0.0.1:3000         # idle badge main-thread cost
node scripts/qa/shoot-pages.mjs http://127.0.0.1:3000 label   # 1440 + 390 screenshots, overflow and 404s
```

Screenshots go to `screenshots/` (gitignored).

## Folder map

```
src/
  pages/            routes: home, /issuer, /show-me, /developers, /cli, /bot, /pricing,
                    /use-cases/*, /papers/*, /about, /roadmap, legal pages
  app/              app-router routes: /blog, /customers, sitemap.ts, robots.ts
  ui/system/        the live design system and page compositions
    proof-badge/    the Proof Ring credential badge (hero and demos)
    motion/         motion primitives, all gated by useMotionGate
  components/       shared shell pieces (theme provider, metatags, toast, a few primitives)
  lib/              external links, SEO helpers, blog / customer / paper loaders
  content/papers/   Andamio Papers (markdown)
  blog/, customers/ blog posts and customer stories (markdown)
  styles/           globals.css, proof-badge.css, prose.css
public/             images, logos, fonts served as-is
scripts/qa/         Playwright QA scripts
docs/               project docs (see below)
```

## Docs map

- `docs/landing-page-excellence/`: requirements, binding decisions (`decisions/`), agent briefs and the current tool shortlists.
- `docs/design-system/`: brand guide and the credential badge concept images.
- `docs/solutions/`: documented solutions to past problems.
- `docs/backlog.md`: open follow-ups.
- `docs/archive/`: superseded plans, audits, research and scripts, indexed in `docs/archive/README.md`.
- `DESIGN.md`: the long-form design system reference; parts are superseded by `decisions/2026-09-30-proof-instrument-dark.md`.
- `CONCEPTS.md`: domain vocabulary.
- `CLAUDE.md` and `.claude/skills/`: agent instructions and vendored skills.

## Environment variables

None are required for local development. Optional:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_UMAMI_URL` | Umami script host. Analytics load only when both Umami variables are set. |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami website id |
