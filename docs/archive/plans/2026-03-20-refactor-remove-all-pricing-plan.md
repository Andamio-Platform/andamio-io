---
title: "refactor: Remove all pricing content from the website"
type: refactor
status: completed
date: 2026-03-20
origin: docs/brainstorms/2026-03-20-remove-pricing-brainstorm.md
---

# Remove All Pricing Content from the Website

## Overview

Remove every trace of pricing, cost claims, and fee specifics from the Andamio website. Adrian identified coherence holes, misleading statements, and premature price tags on features that don't yet have delivery plans. Rather than patching, we're removing pricing entirely until the team can clearly outline what Andamio offers and how.

## Problem Statement

(see brainstorm: `docs/brainstorms/2026-03-20-remove-pricing-brainstorm.md`)

- Placeholder prices ("$$$") still visible on the /pricing page
- Inconsistent data (access tokens: "~8 ADA" vs "5 ADA" across pages)
- Different product naming ("Issuer" vs "Platform" tiers) across components
- Landing page makes cost claims ("Free tier to start") that link to an incoherent pricing page
- Price tags exist for features without a concrete delivery plan

## Proposed Solution

Delete all pricing pages, remove the nav link, delete orphaned components, and audit the landing page for cost-related claims that should be reworded or removed.

## Acceptance Criteria

- [x] No `/pricing` page or sub-pages exist
- [x] No "Pricing" link in navigation (desktop or mobile)
- [x] No specific dollar amounts, ADA amounts, or percentage fees in landing page sections
- [x] No "free tier" claims on the landing page
- [x] `V2PricingSection.tsx` deleted
- [x] Commented-out `<Pricing />` in `SB7PageLanding.tsx` cleaned up
- [x] V2ComparisonSection "Cost" row reworded (no specific cost claims)
- [x] Build passes with no import errors
- [x] Site renders correctly after changes

## Implementation Steps

### Step 1: Delete pricing pages (6 files)

Delete these files entirely:

- `src/pages/pricing/index.tsx`
- `src/pages/pricing/access-token.tsx`
- `src/pages/pricing/instance.tsx`
- `src/pages/pricing/instance-manager.tsx`
- `src/pages/pricing/task.tsx`
- `src/ui/landing/V2Landing/V2PricingSection.tsx`

### Step 2: Remove navigation link

**File:** `src/ui/landing/V2Landing/V2Navigation.tsx`

Remove line 14: `{ label: "Pricing", href: "/pricing" }` from the `navItems` array.

### Step 3: Update V2ComparisonSection

**File:** `src/ui/landing/V2Landing/V2ComparisonSection.tsx`

This component is **live on the landing page** and contains pricing-adjacent claims:

| Current | Problem |
|---------|---------|
| Row: `"Cost"` / `"Free tier to start. No per-user licensing. On-chain costs scale with usage."` | Claims a free tier exists and describes a cost model we haven't finalized |
| Header: `"What it costs."` | Frames the section around cost when we're removing pricing |
| Footnote: `"*Approximate on-chain costs..."` | References costs that are no longer described anywhere |

**Changes needed:**
- Reword or remove the "Cost" row — replace with something like `"Accessibility"` / `"No per-user licensing. Start building without upfront commitments."`
- Change header from `"What you get. What it costs."` to `"What you get. Why it matters."` (or similar)
- Remove the footnote about approximate on-chain costs

### Step 4: Clean up dead code in SB7PageLanding

**File:** `src/ui/landing/SB7PageLanding.tsx`

Remove the commented-out block (lines 36-43) that references `<Pricing />`.

### Step 5: Verify build

Run `npm run build` (or equivalent) to confirm no broken imports or references.

## Files Summary

### Delete (6 files)
| File | Reason |
|------|--------|
| `src/pages/pricing/index.tsx` | Main pricing page |
| `src/pages/pricing/access-token.tsx` | Pricing sub-page |
| `src/pages/pricing/instance.tsx` | Pricing sub-page |
| `src/pages/pricing/instance-manager.tsx` | Pricing sub-page |
| `src/pages/pricing/task.tsx` | Pricing sub-page |
| `src/ui/landing/V2Landing/V2PricingSection.tsx` | Orphaned component, never rendered |

### Modify (3 files)
| File | Change |
|------|--------|
| `src/ui/landing/V2Landing/V2Navigation.tsx` | Remove "Pricing" nav item |
| `src/ui/landing/V2Landing/V2ComparisonSection.tsx` | Reword cost claims, update header and footnote |
| `src/ui/landing/SB7PageLanding.tsx` | Remove commented-out Pricing block |

### No changes needed
| File | Reason |
|------|--------|
| `src/ui/landing/V2Landing/index.tsx` | Already doesn't render pricing (cleaned in prior refactor) |
| `src/lib/external-links.ts` | No pricing constants found |
| `src/components/shared/NavigationBar.tsx` | Legacy nav, has no pricing link |
| Blog posts (`src/blog/*.md`) | Internal content, blog posts mentioning ADA amounts are editorial — not pricing claims |

## Notes

- **No redirects needed for now.** The site is pre-launch; these URLs aren't heavily indexed. If SEO becomes a concern later, add 301 redirects in `next.config.js`.
- **Internal docs** (`docs/plans/`, `docs/brainstorms/`) are left as-is — they're historical records, not public content.
- **Badge component** (`src/components/ui/badge.tsx`) has a `free` variant style — this is a generic UI primitive, not pricing-specific. Leave it.

## Sources

- **Origin brainstorm:** [docs/brainstorms/2026-03-20-remove-pricing-brainstorm.md](docs/brainstorms/2026-03-20-remove-pricing-brainstorm.md) — Key decisions: remove entirely (not "coming soon"), delete all sub-pages, audit site-wide for stray references
- **Prior refactor:** [docs/plans/2026-03-19-refactor-consolidate-pricing-page-plan.md](docs/plans/2026-03-19-refactor-consolidate-pricing-page-plan.md) — Context on how pricing was consolidated before this removal
