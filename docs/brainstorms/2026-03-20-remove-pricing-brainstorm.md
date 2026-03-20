# Remove Pricing from Landing Page

**Date:** 2026-03-20
**Status:** Ready to implement
**Requested by:** Adrian

## What We're Doing

Removing all pricing content from the Andamio website. No pricing page, no pricing sub-pages, no pricing nav link. The site will have zero pricing presence until the team has:

1. Outlined what Andamio offers and how
2. Resolved coherence holes and misleading statements
3. Developed a concrete plan for delivering on claims

## Why This Approach

Adrian identified several problems with the current pricing:

- **Coherence holes** — statements and claims that don't match up
- **Misleading claims** — features with price tags but no delivery plan
- **Placeholder prices** — "$$$" still showing on subscription tiers
- **Data inconsistencies** — access tokens listed as "~8 ADA" on one page and "5 ADA" on another
- **Premature specificity** — putting price tags on features before outlining what's actually offered

The core issue: **pricing was added before the offering was clearly defined**. Removing it entirely avoids half-measures that could still mislead visitors.

## Key Decisions

1. **Remove /pricing page entirely** — not a "coming soon" placeholder, full removal
2. **Remove all 4 pricing sub-pages** — /pricing/access-token, /pricing/instance, /pricing/instance-manager, /pricing/task
3. **Remove "Pricing" from navigation** — no nav link to a non-existent page
4. **Clean up orphaned component** — V2PricingSection.tsx (already unused but still in codebase)

## Scope of Changes

### Files to delete
- `src/pages/pricing/index.tsx` — main pricing page
- `src/pages/pricing/access-token.tsx` — access token detail page
- `src/pages/pricing/instance.tsx` — instance detail page
- `src/pages/pricing/instance-manager.tsx` — instance manager detail page
- `src/pages/pricing/task.tsx` — task commission detail page
- `src/ui/landing/V2Landing/V2PricingSection.tsx` — orphaned pricing component

### Files to modify
- `src/ui/landing/V2Landing/V2Navigation.tsx` — remove "Pricing" nav link

### Already clean (no changes needed)
- `src/ui/landing/V2Landing/index.tsx` — landing page doesn't render pricing (removed in prior refactor)

## Additional Scope: Site-Wide Sweep

Beyond the dedicated pricing pages, we need to audit the entire site for:
- References to pricing, costs, fees, or specific ADA amounts
- Links pointing to /pricing or /pricing/* sub-pages
- Any "free tier" or "$" mentions in landing page sections
- CTA text that references pricing (e.g., "View pricing", "See plans")

All such references must be removed or reworded.

## Open Questions

None — scope is clear and self-contained.

## Future Considerations (not in scope)

When pricing returns, the team should first:
- Define the product offering clearly
- Ensure all claims are backed by delivery plans
- Use a single source of truth for pricing data (not hardcoded in multiple files)
- Ensure consistency across all pages
