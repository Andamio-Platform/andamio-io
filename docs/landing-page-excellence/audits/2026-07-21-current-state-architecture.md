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
- **Verification limitation:** a later rebuild attempt could not open `.next/trace` (`EPERM`) while the local development process owned the build directory; no second build result was obtained.
- **Measured fact:** localhost returned HTTP 200 for `/`, `/issuer`, `/show-me`, and `/developers` on 2026-07-21.
- **Source inspection:** `src/pages/index.tsx` composes `src/ui/system/AndamioLanding.tsx`; `/issuer` composes `src/ui/system/AndamioIssuer.tsx`; `/show-me` composes `src/ui/system/StoryFork.tsx`.
- **Source inspection:** canonical pages use `src/ui/system/kit.tsx`, `src/ui/system/tokens.ts`, `src/ui/explore/content.ts`, global CSS, Pages Router metadata, and `_app.tsx`.
- **Source inspection:** both `src/pages` and `src/app` are active. The landing funnel is in the Pages Router and hydrates as a client-side React route; App Router owns routes including sitemap, robots, blog, customers, and brand.

## Canonical boundary

| ID | Disposition | Path/surface | Evidence and constraint |
|---|---|---|---|
| ARCH-01 | KEEP | `src/pages/show-me.tsx` and `src/ui/system/StoryFork.tsx` | The canonical hero links to `/show-me`; keep as the guided story fork. |
| ARCH-02 | KEEP | `src/pages/issuer.tsx`, `src/ui/system/AndamioIssuer.tsx`, `src/ui/system/HowItWorks.tsx`, `src/ui/system/BadgeBuilder.tsx` | Canonical issuer conversion route, including HowItWorks and BadgeBuilder. |
| ARCH-03 | KEEP | `src/ui/system/AndamioLanding.tsx`, `kit.tsx`, `tokens.ts` | Current production composition and design-system authority. |
| ARCH-04 | REUSE-ONLY | `src/ui/landing/V2Landing/badge/*` | The canonical BadgeBuilder imports the V2 badge-generation core. Reuse this shared core only; do not revive V2 page composition. |
| ARCH-05 | ARCHIVE/reference-only | V2 walkthrough and `V2WalkthroughSection.tsx` | Not canonical; no extension without a later adopted decision. |
| ARCH-06 | ARCHIVE/reference-only | V2 verifier shell (`V2VerifierDemo.tsx` and verifier demo data) | Illustrative legacy shell, not the canonical verifier experience. |
| ARCH-07 | ARCHIVE/reference-only | `src/ui/landing/V2Landing/index.tsx` and V2 page sections | Legacy landing stack. |
| ARCH-08 | ARCHIVE/reference-only | `src/ui/landing/ModernLanding/*` | Legacy landing stack. |
| ARCH-09 | ARCHIVE/reference-only | `src/ui/landing/SB7PageLanding.tsx` | Legacy landing implementation. |

The durable scope decision is recorded in [`../decisions/2026-07-21-keep-reuse-archive.md`](../decisions/2026-07-21-keep-reuse-archive.md).

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
- A final 2026-07-21 localhost HEAD recheck returned HTTP 500 for `/`, `/issuer`, `/show-me`, and `/developers`, while `/sitemap.xml` and the named image assets returned 200. The running development environment was therefore not stable enough to reconfirm page-route status; this does not erase the earlier 200 observations or establish a production defect.
- No application source was changed in this phase.
