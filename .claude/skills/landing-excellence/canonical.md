# Canonical paths

Source decisions: `2026-07-21-keep-reuse-archive.md`, superseded in part by `2026-09-30-proof-instrument-dark.md`.

## Implementation authority

| Role | Path |
|---|---|
| Home route | `src/pages/index.tsx` → `src/ui/system/AndamioLanding.tsx` |
| Hero | `src/ui/system/CredentialTheater.tsx` |
| Live badge | `src/ui/system/proof-badge/*`, `src/styles/proof-badge.css` |
| Issuer route | `src/pages/issuer.tsx` → `AndamioIssuer.tsx`, `HowItWorks.tsx`, `BadgeBuilder.tsx` |
| Show-me route | `src/pages/show-me.tsx` → `StoryFork.tsx` |
| Kit / tokens | `src/ui/system/kit.tsx`, `src/ui/system/tokens.ts`, `src/ui/system/instrument/*` |
| Copy / links | `src/ui/explore/content.ts` (**canonical despite path**) |
| Styles | `src/styles/globals.css` |
| Metadata | `src/components/site/metatags.tsx`, `src/lib/seo.ts` |
| Sitemap | `src/app/sitemap.ts` |

## Removed

`src/ui/landing/*` (V2Landing, ModernLanding, SB7) was deleted under the 2026-09-30 decision. The badge core and field notes now live in `src/ui/system/proof-badge/`. Do not recreate a second landing stack.

## Funnel routes

`/` · `/show-me` · `/issuer` · `/developers` (developer-secondary)
