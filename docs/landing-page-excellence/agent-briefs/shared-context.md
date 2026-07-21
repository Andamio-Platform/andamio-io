# Shared Context — Landing Excellence Agents

- **as_of:** `2026-07-21`
- **Branch:** `dev`
- **Docs root:** `docs/landing-page-excellence/`

## Product truth

- Andamio helps issuers create **permanent, useful, owned, verifiable** credentials.
- Landing priority: **issuer-primary / developer-secondary**.
- Adopted narrative: **Concept A** — issuer-led proof with progressive developer depth.
- Conversion ladder L0–L3 is live; L4 requires owned confirmation (not mailto clicks).
- HowItWorks Issue/Verify and BadgeBuilder actions are **illustrative**, not backend success.

## Brand constraints (Warm Index)

- Ink on paper; orange `#FF6B35` sparingly; blue `#2F6BFF` wayfinding/data only.
- Type: Inter + JetBrains Mono; square geometry; editorial rail optional.
- Reject neon dark SaaS clones, wholesale kit aesthetics, heavy Three.js heroes by default.
- Authority: `src/ui/system/tokens.ts` and `kit.tsx`.

## Canonical files (implementation authority)

| Role | Path |
|---|---|
| Home route | `src/pages/index.tsx` |
| Landing composition | `src/ui/system/AndamioLanding.tsx` |
| Issuer route | `src/pages/issuer.tsx` → `AndamioIssuer.tsx`, `HowItWorks.tsx`, `BadgeBuilder.tsx` |
| Show-me route | `src/pages/show-me.tsx` → `StoryFork.tsx` |
| Kit / tokens | `src/ui/system/kit.tsx`, `tokens.ts` |
| Copy / links | `src/ui/explore/content.ts` (**canonical despite path**) |
| Styles | `src/styles/globals.css` |
| Metadata | `src/components/site/metatags.tsx`, `src/lib/seo.ts` |
| Sitemap | `src/app/sitemap.ts` |
| Badge core reuse only | `src/ui/landing/V2Landing/badge/*` |

## Archive / do not extend

V2 walkthrough, V2 verifier shell, V2 landing composition (except badge core), ModernLanding, SB7 — see [../decisions/2026-07-21-keep-reuse-archive.md](../decisions/2026-07-21-keep-reuse-archive.md).

## Non-goals (all agents)

- Editing Cursor plan files
- Application source changes before prototype approval (docs phase exception already done)
- Equal issuer/developer hero weight
- Analytics without privacy approval
- Collecting badge/wallet/email/free-text in events
- Deleting legacy stacks in this phase

## Tooling defaults

- Package scripts: `yarn dev`, `yarn build`, `yarn next:lint`, `yarn start`, `yarn shoot`
- Quality adopt-now: Playwright, Lighthouse, axe-core, Motion, WebAIM, SVGOMG
- See [../research/shortlists/adoption-matrix.md](../research/shortlists/adoption-matrix.md)

## Escalation (common)

Escalate to program owner when: requirement conflicts with adopted decision; license unknown; need to touch archived stacks; privacy/analytics scope unclear; budgets must increase; prototype rejected.
