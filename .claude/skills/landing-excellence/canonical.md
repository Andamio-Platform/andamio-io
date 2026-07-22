# Canonical paths — KEEP / REUSE / ARCHIVE

Source decision: `docs/landing-page-excellence/decisions/2026-07-21-keep-reuse-archive.md`

## KEEP (implementation authority)

| Role | Path |
|---|---|
| Home route | `src/pages/index.tsx` |
| Landing composition | `src/ui/system/AndamioLanding.tsx` |
| Issuer route | `src/pages/issuer.tsx` → `AndamioIssuer.tsx`, `HowItWorks.tsx`, `BadgeBuilder.tsx` |
| Show-me route | `src/pages/show-me.tsx` → `StoryFork.tsx` |
| Kit / tokens | `src/ui/system/kit.tsx`, `src/ui/system/tokens.ts` |
| Copy / links | `src/ui/explore/content.ts` (**canonical despite path**) |
| Styles | `src/styles/globals.css` |
| Metadata | `src/components/site/metatags.tsx`, `src/lib/seo.ts` |
| Sitemap | `src/app/sitemap.ts` |

## REUSE (narrow)

- Only `src/ui/landing/V2Landing/badge/*` for badge model/generation/palette already used by canonical BadgeBuilder
- Do **not** reuse V2 page layout, walkthrough, verifier shell, copy, nav, or styling as authority

## ARCHIVE / reference-only (do not extend or wire to canonical routes)

- V2 walkthrough + walkthrough-data / step-demos / DEMOS
- V2 verifier shell + verifier-demo-data
- V2 landing composition rooted at `src/ui/landing/V2Landing/index.tsx` (except badge/*)
- `src/ui/landing/ModernLanding/*`
- `src/ui/landing/SB7PageLanding.tsx`

Archive ≠ delete. Removal needs a separate adopted decision.

## Funnel routes

`/` · `/show-me` · `/issuer` · `/developers` (developer-secondary only)
