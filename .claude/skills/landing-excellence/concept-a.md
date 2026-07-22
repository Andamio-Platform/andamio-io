# Concept A — issuer-led proof

Source: `docs/landing-page-excellence/decisions/2026-07-21-concept-direction.md`  
Strategy: `docs/landing-page-excellence/implementation/2026-07-21-design-strategy.md`

## Story

Brand + one outcome sentence lead. Primary path: **Show me → issuer fork → `/issuer` proof → walkthrough / Start issuing**. Developer depth after self-selection or below the fold — never competing with the hero.

## Section architecture (`/`)

1. **Hero** — brand, one headline, one support line, CTA group (Show me primary; Start issuing secondary), full-bleed specimen plane
2. **Issuer outcome** — permanent / useful / owned / verifiable
3. **How path teaser** — `/issuer#how-it-works`
4. **Developer secondary** — Build / Docs (quieter)
5. **Ecosystem / community** — portable, pattern, Discord (non-primary)
6. **Closing** — issuer walkthrough primary; Discord secondary

## CTA hierarchy

1. `home.hero_show_me` / issuer evaluation
2. Walkthrough mailto or Start issuing
3. Developer Build / Docs
4. Community Discord

Discord must not outrank issuer walkthrough / Start issuing without measurement evidence.

## Hero budget

First viewport: brand, one headline, one short support, one CTA group, one dominant visual. No stats strips, card clutter, or promo chips over hero media.

## Demo scope

| Action | Target |
|---|---|
| KEEP | `/show-me` (StoryFork) |
| KEEP | `/issuer` HowItWorks + BadgeBuilder |
| ARCHIVE as authority | V2 walkthrough |
| Secondary destination | `/developers` (not homepage hero) |

## Rejected concepts (unless superseded)

- **B** Dual-rail equal issuer/developer hero
- **C** Spec-first / API-first hero
