# Performance baseline audit

- **Date:** 2026-07-21
- **Status:** complete
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Environment:** local Windows 10; localhost; unthrottled development measurement and production build output
- **Viewport/network:** desktop local; no CPU or network throttling
- **Owner:** Landing Excellence Program

## Quality floor

Adopted outcome targets:

- Field p75 LCP: **≤2.5 s**.
- Field p75 INP: **≤200 ms**.
- Field p75 CLS: **≤0.1**.
- No horizontal overflow at **320 px** and no broken required links.

Proposed release-gate profile, pending an isolated baseline run:

- Run Lighthouse against production-mode `/`, `/show-me`, and `/issuer` with a clean build, cold navigation, Lighthouse mobile defaults/simulated throttling, and no extensions. Run each route **3 times** and gate on the median; retain all JSON and HTML reports.
- Require median Lighthouse Performance, Accessibility, Best Practices, and SEO scores **≥90** on every canonical route. This does not replace field CWV.
- Proposed first-load JavaScript ceilings from `next build`: `/` **≤160 kB**, `/issuer` **≤175 kB**, `/show-me` **≤180 kB**, and shared first-load JavaScript **≤125 kB**. Only `/` and shared values are measured today; `/issuer` and `/show-me` ceilings are provisional budgets, not measured baselines.
- After the first isolated route report, ratify or tighten the proposed ceilings. Any increase requires bundle evidence and an adopted exception; a tooling-corrupted `.next` run is invalid evidence.

## Build measurements and unreproducible runtime diagnostics

| Metric | Result | Evidence class | Interpretation |
|---|---:|---|---|
| Local FCP | 296 ms | supplied, unreproducible local diagnostic | Context only; not a baseline |
| Local LCP | 296 ms | supplied, unreproducible local diagnostic | Context only; not a baseline |
| Local CLS | 0 | supplied, unreproducible local diagnostic | Context only; not a baseline |
| Encoded HTML | 5.7 KB | supplied, unreproducible local diagnostic | Context only; not a baseline |
| Long tasks | one at 50 ms | supplied, unreproducible local diagnostic | Context only; not a baseline |
| `/` page size | 1.66 kB | successful production build report | Build artifact metric |
| `/` first-load JS | 160 kB | successful production build report | Baseline budget input |
| Shared first-load JS | 125 kB | successful production build report | Broad shared cost |

**The runtime diagnostics are not Phase 1 baseline measurements.** Browser/version, exact tooling, cache state, run count, and retained reports were not captured. They are preserved only as historical context and cannot be used for comparison, gating, Lighthouse, or Core Web Vitals claims. A new isolated run under the profile above establishes the first reproducible runtime baseline.

## Source-inspection findings

### PERF-F01 — No field Core Web Vitals

- **Severity:** P1
- **Risk:** real p75 LCP, INP, and CLS are unknown; local values cannot establish user experience.
- **Requirement seed:** `REQ-PERF-02` — establish privacy-reviewed field CWV segmented by route and device class.

### PERF-F02 — Full Pages Router hydration and broad shared JavaScript

- **Severity:** P1
- **Observed:** canonical landing components are hydrated React; the build reports 125 kB shared and 160 kB first-load JS for `/`.
- **Risk:** interaction and parse/evaluation cost on mobile hardware is unknown.
- **Requirement seed:** `REQ-PERF-01` — profile and set route budgets before refactoring.

### PERF-F03 — Broad render-blocking Google Fonts import

- **Severity:** P1
- **Observed:** `src/styles/globals.css` imports a large Google Fonts URL containing Archivo, Inter, Space Grotesk, Sora, Bricolage Grotesque, Fraunces, Instrument Serif, and JetBrains Mono with many weights.
- **Risk:** extra font CSS, requests, glyph data, and external dependency can delay text rendering and create privacy/reliability concerns.
- **Requirement seed:** `REQ-PERF-03` — inventory actually used families/weights and adopt a bounded loading strategy.

### PERF-F04 — Duplicate global toaster systems

- **Severity:** P2
- **Observed:** `_app.tsx` mounts both `react-hot-toast` and the Radix-based UI toaster on every Pages Router route.
- **Risk:** unnecessary global JavaScript/CSS and inconsistent notifications.
- **Requirement seed:** `REQ-ARCH-02` — select one global notification system.

## Asset verification

`git ls-files` proves `public/andamio.png`, `public/andamio-credential-badge.svg`, `public/andamio-logo.svg`, and the referenced `public/logo-with-typography*.svg` files are tracked. Local HTTP HEAD probes returned 200 with image MIME types. There is no Phase 1 broken-asset finding and no asset P0. The earlier absence claim came from an ignore-aware `Glob`, which was not filesystem or Git-index evidence.

Production asset responses and social-card rendering remain unverified release checks, not observed defects.

## Unknown or unverified

- No Lighthouse run, mobile throttle, cold-cache run, bundle analyzer, production trace, or field RUM was completed.
- Production image optimization, font cache headers, CDN compression, and third-party latency are unknown.
- The 320 px no-overflow target was not tested.
