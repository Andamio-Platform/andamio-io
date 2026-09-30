# Decision: canonical landing keep/reuse/archive boundary

- **Date:** 2026-07-21
- **Status:** adopted
- **Owner:** Landing Excellence Program
- **Approval date:** 2026-07-21
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Supersedes:** none

## Context

The repository contains several complete or partial landing experiences. Phase 1 needs one implementation authority so audits and later requirements do not accidentally revive legacy composition or split ownership. Current source and localhost route inspection shows `src/ui/system` powering `/`, `/issuer`, and `/show-me`, while the canonical badge builder already imports a low-level SVG-generation core from V2.

## Options considered

1. Continue all stacks in parallel.
2. Replace the canonical system with a V2, ModernLanding, or SB7 composition.
3. Keep the current canonical funnel, reuse only the proven V2 badge core, and archive other legacy compositions as reference.

## Decision

Adopt option 3.

### KEEP

- Canonical `/`: `src/pages/index.tsx` and `src/ui/system/AndamioLanding.tsx`.
- `/show-me`: `src/pages/show-me.tsx` and the canonical `src/ui/system/StoryFork.tsx` experience.
- Canonical `/issuer`: `src/pages/issuer.tsx`, `src/ui/system/AndamioIssuer.tsx`, `src/ui/system/HowItWorks.tsx`, and `src/ui/system/BadgeBuilder.tsx`.
- Canonical component/token authority: `src/ui/system/kit.tsx` and `src/ui/system/tokens.ts`.
- The HowItWorks + BadgeBuilder pairing remains the authoritative issuer demonstration.

### REUSE

- Reuse **only the shared V2 badge core** under `src/ui/landing/V2Landing/badge/*` where the canonical BadgeBuilder already depends on it.
- Reuse means low-level badge model/generation/palette behavior, not V2 page layout, walkthrough, verifier shell, copy hierarchy, navigation, or styling authority.

### ARCHIVE / REFERENCE-ONLY

The following must not be extended, wired into canonical routes, or used as implementation authority unless a later adopted decision explicitly approves it:

- V2 walkthrough: `src/ui/landing/V2Landing/V2WalkthroughSection.tsx` and `src/ui/landing/V2Landing/walkthrough-data.ts`.
- V2 walkthrough demo registry/reference: `src/ui/landing/V2Landing/step-demos.tsx` and `src/ui/landing/V2Landing/DEMOS.md`.
- V2 verifier shell/data: `src/ui/landing/V2Landing/V2VerifierDemo.tsx` and `src/ui/landing/V2Landing/verifier-demo-data.ts`.
- V2 landing composition and sections rooted at `src/ui/landing/V2Landing/index.tsx`, except only `src/ui/landing/V2Landing/badge/*` as allowed above.
- `src/ui/landing/ModernLanding/*`.
- `src/ui/landing/SB7PageLanding.tsx`.

Archive/reference-only does not authorize deletion in Phase 1. Git history is not a substitute for preserving useful reference until a separately scoped removal decision is adopted.

## Evidence and rationale

- `/`, `/issuer`, and `/show-me` returned HTTP 200 on localhost.
- Source inspection identifies `src/ui/system` as the active funnel implementation.
- The project index already names `src/ui/system` canonical and legacy landing stacks reference-only.
- The canonical BadgeBuilder imports V2 badge primitives, so forbidding all V2 reuse would break the existing dependency boundary and duplicate badge logic.

This choice minimizes parallel architectures while retaining the one shared V2 capability already integrated into the canonical route.

## Consequences

- Audits, requirements, and implementation briefs target `src/ui/system` and its traced dependencies.
- Any proposal to revive an archived surface must present a concrete gap, migration cost, accessibility/performance evidence, and an adopted successor decision.
- Shared badge-core changes require regression checks against the canonical BadgeBuilder.
- This decision does not resolve routing migration, content-path cleanup, accessibility defects, analytics, or performance; those remain requirement work.

## Related evidence

- [`../audits/2026-07-21-current-state-architecture.md`](../../archive/landing-page-excellence/audits/2026-07-21-current-state-architecture.md)
- [`../audits/2026-07-21-audit-index-and-disposition-map.md`](../../archive/landing-page-excellence/audits/2026-07-21-audit-index-and-disposition-map.md)
