---
title: Consolidate Pricing into Single Dedicated Page
type: refactor
status: completed
date: 2026-03-19
---

# Consolidate Pricing into Single Dedicated Page

Remove the pricing section from the landing page and create a single, unified pricing page at `/pricing` that combines subscription tiers (API & App) with protocol costs.

## Problem Statement

Pricing is currently split across two locations:
1. **Landing page section** (`V2PricingSection`) — shows API tiers (Pioneer/Starter/Growth/Enterprise) and App tiers (Starter/Pro/Business/Enterprise) with a tab switcher
2. **`/pricing` page** — shows on-chain protocol costs (access tokens, instances, managers, tasks) plus commission discounts and sponsorship bundles

This splits the pricing story. A single dedicated page gives visitors one place to understand all costs.

## Proposed Solution

### 1. Remove pricing section from landing page

**File:** `src/ui/landing/V2Landing/index.tsx`
- Remove `<V2PricingSection />` from the section list
- Remove the import

**File:** `src/ui/landing/V2Landing/V2PricingSection.tsx`
- Keep the file — extract its tier card content for reuse on the new pricing page

### 2. Update navigation link

**File:** `src/ui/landing/V2Landing/V2Navigation.tsx`
- Change `Pricing` link from `#pricing` anchor to `/pricing` route
- Remove the anchor-scroll logic for `#pricing` (the `handleNavClick` / smooth scroll behavior)

### 3. Rebuild `/pricing` page as unified pricing page

**File:** `src/pages/pricing/index.tsx`
- Add the subscription tier pricing (API & App tabs) at the top — reuse or adapt content from `V2PricingSection`
- Keep existing protocol costs section below
- Keep existing FAQ section
- Use `V2PageLayout` wrapper (already in use)

### 4. Clean up

- Delete legacy `src/ui/landing/Pricing.tsx` (unused, contains Lorem Ipsum placeholders)
- Verify no other components reference `#pricing` anchor or `V2PricingSection`

## Acceptance Criteria

- [x] Landing page no longer shows a pricing section
- [x] `/pricing` page shows subscription tiers (API + App with tab switcher) AND protocol costs
- [x] Navigation "Pricing" link goes to `/pricing` from all pages (no anchor scroll)
- [x] Pricing sub-pages (`/pricing/access-token`, `/pricing/instance`, etc.) still work
- [x] No broken links or dead references to `#pricing`
- [x] Legacy `Pricing.tsx` removed

## Key Files

| Purpose | Path |
|---------|------|
| Landing page composition | `src/ui/landing/V2Landing/index.tsx` |
| Pricing section (source of tier data) | `src/ui/landing/V2Landing/V2PricingSection.tsx` |
| Navigation | `src/ui/landing/V2Landing/V2Navigation.tsx` |
| Pricing page (target) | `src/pages/pricing/index.tsx` |
| Legacy pricing (delete) | `src/ui/landing/Pricing.tsx` |

## Notes

- Pricing data is hardcoded in components — no CMS or data file to update
- This is a first pass; further refinement expected after initial consolidation
- The pricing sub-pages use hardcoded dark-theme colors rather than semantic tokens — a potential follow-up cleanup
