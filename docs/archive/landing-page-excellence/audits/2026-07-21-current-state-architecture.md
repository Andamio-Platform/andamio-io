# Current-state architecture and canonical/legacy audit

- **Date:** 2026-07-21
- **Status:** complete
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Environment:** branch `dev`; Windows 10; local repository and localhost:3000
- **Scope:** `/`, `/issuer`, `/show-me`, their direct UI/content dependencies, and competing landing implementations
- **Method:** source inspection, Git tree inspection, production build, and read-only HTTP probes
- **Owner:** Landing Excellence Program

## Evidence classes

- **Supplied measured fact:** a clean `yarn build` completed successfully on 2026-07-21. Its production report listed `/` at 1.66 kB page size, 160 kB first-load JS, and 125 kB shared first-load JS.
- **Verification limitation:** a later rebuild attempt could not open `.next/trace` (`EPERM`) because build and development tooling concurrently shared `.next`. The resulting route 500s were tooling interference, not application failures; no isolated second build result was obtained.
- **Measured fact:** localhost returned HTTP 200 for `/`, `/issuer`, `/show-me`, and `/developers` on 2026-07-21.
- **Source inspection:** `src/pages/index.tsx` composes `src/ui/system/AndamioLanding.tsx`; `/issuer` composes `src/ui/system/AndamioIssuer.tsx`; `/show-me` composes `src/ui/system/StoryFork.tsx`.
- **Source inspection:** canonical pages use `src/ui/system/kit.tsx`, `src/ui/system/tokens.ts`, `src/ui/explore/content.ts`, global CSS, Pages Router metadata, and `_app.tsx`.
- **Source inspection:** both `src/pages` and `src/app` are active. The landing funnel is in the Pages Router and hydrates as a client-side React route; App Router owns routes including sitemap, robots, blog, customers, and brand.

## Canonical boundary

| ID | Disposition | Path/surface | Evidence and constraint |
|---|---|---|---|
| ARCH-00 | KEEP | `/`, `src/pages/index.tsx`, `src/ui/system/AndamioLanding.tsx` | Canonical landing route and composition. |
| ARCH-01 | KEEP | `src/pages/show-me.tsx` and `src/ui/system/StoryFork.tsx` | The canonical hero links to `/show-me`; keep as the guided story fork. |
| ARCH-02 | KEEP | `src/pages/issuer.tsx`, `src/ui/system/AndamioIssuer.tsx`, `src/ui/system/HowItWorks.tsx`, `src/ui/system/BadgeBuilder.tsx` | Canonical issuer conversion route, including HowItWorks and BadgeBuilder. |
| ARCH-03 | KEEP | `src/ui/system/kit.tsx`, `src/ui/system/tokens.ts` | Current canonical component and token authority. |
| ARCH-04 | REUSE-ONLY | `src/ui/landing/V2Landing/badge/*` | The canonical BadgeBuilder imports the V2 badge-generation core. Reuse this shared core only; do not revive V2 page composition. |
| ARCH-05 | ARCHIVE/reference-only | `src/ui/landing/V2Landing/V2WalkthroughSection.tsx`, `src/ui/landing/V2Landing/walkthrough-data.ts`, `src/ui/landing/V2Landing/step-demos.tsx`, `src/ui/landing/V2Landing/DEMOS.md` | Not canonical; no extension without a later adopted decision. |
| ARCH-06 | ARCHIVE/reference-only | `src/ui/landing/V2Landing/V2VerifierDemo.tsx`, `src/ui/landing/V2Landing/verifier-demo-data.ts` | Illustrative legacy shell/data, not the canonical verifier experience. |
| ARCH-07 | ARCHIVE/reference-only | `src/ui/landing/V2Landing/index.tsx` and V2 page sections | Legacy landing stack. |
| ARCH-08 | ARCHIVE/reference-only | `src/ui/landing/ModernLanding/*` | Legacy landing stack. |
| ARCH-09 | ARCHIVE/reference-only | `src/ui/landing/SB7PageLanding.tsx` | Legacy landing implementation. |

The durable scope decision is recorded in [`../decisions/2026-07-21-keep-reuse-archive.md`](../decisions/2026-07-21-keep-reuse-archive.md).
Commands, timestamps, tool versions, viewport, and report-retention limits are recorded in [`2026-07-21-evidence-manifest.md`](2026-07-21-evidence-manifest.md).

## Findings

### ARCH-F01 — Mixed routing and full landing hydration

- **Severity:** P1
- **Audience:** both
- **Observed:** the canonical landing funnel is Pages Router code; `AndamioLanding`, `AndamioIssuer`, and interactive descendants hydrate client-side. App Router is also present.
- **Risk:** route ownership and metadata conventions can drift, while broad hydration raises the JavaScript and interaction budget.
- **Next step:** seed `REQ-PERF-01` to profile bundle ownership and reduce client JavaScript without changing the canonical boundary.

### ARCH-F02 — Canonical copy resides under an experimental-looking path

- **Severity:** P1
- **Audience:** both
- **Observed:** `src/ui/explore/content.ts` is imported by canonical production pages.
- **Risk:** contributors may mistake authoritative copy and links for experimental content.
- **Next step:** seed `REQ-ARCH-01` to move or clearly facade canonical content after dependencies are mapped.

### ARCH-F03 — Duplicated cross-site constants drift

- **Severity:** P1
- **Audience:** developer-secondary
- **Observed:** `src/ui/explore/content.ts` points API Reference to `https://api.andamio.io/reference`; `src/lib/external-links.ts` points it to `https://dev.api.andamio.io/reference`.
- **Risk:** users receive different destinations by route; comments claiming a single source of truth are false.
- **Next step:** seed `REQ-LINK-01` for one canonical link registry plus automated link validation.

### ARCH-F04 — Stale documentation can misdirect implementation

- **Severity:** P1
- **Audience:** maintainers
- **Observed:** older plans discuss removing or preserving legacy stacks while the Landing Excellence index now declares `src/ui/system` canonical.
- **Risk:** historical plans may be mistaken for current authority.
- **Next step:** decision links and archive labels must accompany future implementation briefs (`REQ-DOC-01`).

## Unknown or unverified

- Production deployment parity, CDN behavior, and field traffic were not inspected.
- No bundle analyzer was run; module-level contributors to the 160 kB first-load JS remain unknown.
- A final 2026-07-21 localhost recheck returned HTTP 500 for `/`, `/issuer`, `/show-me`, and `/developers` after concurrent build/dev tooling shared and mutated `.next`; `/sitemap.xml` and named image assets still returned 200. These 500s are attributable to tooling interference, not application failure, and cannot serve as route-health evidence.
- No application source was changed in this phase.
