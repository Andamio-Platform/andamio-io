# Component Map — Canonical Kit and Content

- **as_of:** `2026-07-21`
- **Authority:** keep/reuse/archive + Concept A
- **Rule:** implement only through these files unless a new decision expands the map

## Route → composition

| Route | Page entry | Composition | Primary kit/content deps |
|---|---|---|---|
| `/` | `src/pages/index.tsx` | `src/ui/system/AndamioLanding.tsx` | `kit.tsx`, `tokens.ts`, `content.ts` |
| `/issuer` | `src/pages/issuer.tsx` | `AndamioIssuer.tsx` | `HowItWorks.tsx`, `BadgeBuilder.tsx`, `kit.tsx`, `content.ts` |
| `/show-me` | `src/pages/show-me.tsx` | `StoryFork.tsx` | `kit.tsx` / system chrome as used, story copy in StoryFork/content |
| `/developers` | developers page (existing) | keep secondary; do not redesign as hero competitor | nav/content links from `content.ts` |

## Kit primitives (edit with care)

| Primitive | File | Landing job |
|---|---|---|
| `Page`, `TopNav`, `Footer`, `Brand` | `kit.tsx` | Chrome, skip/main targets |
| `Section`, `SectionHead`, `Kicker`, `Display` | `kit.tsx` | Section jobs |
| `Button` / `Stitch` | `kit.tsx` | CTA hierarchy |
| `EditorialRail`, `useActiveSection` | `kit.tsx` | Optional desktop orientation |
| `SpecimenReveal` | `kit.tsx` | Hero/specimen motion plane |
| Tokens / accent policy | `tokens.ts` | Warm Index rules |

## Issuer proof cluster

| Piece | File | Notes |
|---|---|---|
| HowItWorks | `src/ui/system/HowItWorks.tsx` | Tabs a11y ownership |
| BadgeBuilder | `src/ui/system/BadgeBuilder.tsx` | Illustrative builder |
| Badge core (reuse only) | `src/ui/landing/V2Landing/badge/*` | No V2 page revival |

## Content and metadata

| Concern | File |
|---|---|
| Copy + outbound links | `src/ui/explore/content.ts` |
| External link registry (must converge) | `src/lib/external-links.ts` |
| SEO defaults | `src/lib/seo.ts` |
| Metatags | `src/components/site/metatags.tsx` |
| Sitemap | `src/app/sitemap.ts` |
| Global CSS / fonts | `src/styles/globals.css` |

## Explicitly out of map

`ModernLanding/*`, `V2Landing` page/walkthrough/verifier (except badge core), `SB7PageLanding.tsx`, Cursor plan files.

## Change protocol

1. Trace imports from route entry before editing.
2. Prefer kit-level fixes over one-off page forks.
3. Record requirement IDs in PR description.
4. Run verification-matrix checks for touched surfaces.
