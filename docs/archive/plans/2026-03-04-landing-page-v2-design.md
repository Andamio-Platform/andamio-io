# Landing Page V2 — API-First Redesign

> **Date:** 2026-03-04
> **Branch:** `landing-page-v2-api-first`
> **Source:** `Resources/andamio-ai-context/60-ai-coach/2026-03-04-andamio-landing-page-recommendation.md`

## Decision

Replace the current "Build Great Teams" landing page with an API-first, developer-credible redesign using Option A hero messaging.

## Aesthetic

Refined & technical. Stripe/Linear inspired. Dark code blocks, generous whitespace, Cera Pro + Inconsolata.

## Sections (10)

1. Hero — "Decentralized Credentialing Infrastructure" + dual CTA + trust bar
2. Code Snippet — Dark terminal with curl example
3. Three Pillars — Onboard / Track / Reward
4. Architecture — 3-layer diagram + integration paths
5. Partners — Named implementations with quotes
6. Comparison — vs Credly/Ethereum table
7. Pricing — 4 API tiers + transaction sponsorship
8. FAQ — 8-question accordion
9. Status — Honest progress checklist
10. Dual CTA — Developer vs Organization paths

## Architecture

- New directory: `src/ui/landing/V2Landing/`
- Old `ModernLanding/` preserved untouched
- `pages/index.tsx` switches import
- Traditional long-scroll (no snap)
- Updated nav: Platform, API Docs, Pricing, Use Cases, About, [Get Started]

## Navigation Links

| Item | Href |
|------|------|
| Platform | `#platform` (scrolls to Architecture section) |
| API Docs | `https://docs.andamio.io` |
| Pricing | `#pricing` (scrolls to Pricing section) |
| Use Cases | `#partners` (scrolls to Partners section) |
| About | `/about` |
| Get Started | `https://app.andamio.io` |
