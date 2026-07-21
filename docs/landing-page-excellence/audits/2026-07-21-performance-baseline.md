# Performance baseline audit

- **Date:** 2026-07-21
- **Status:** complete
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Environment:** local Windows 10; localhost; unthrottled development measurement and production build output
- **Viewport/network:** desktop local; no CPU or network throttling
- **Owner:** Landing Excellence Program

## Quality targets

- Lighthouse performance score: **90+**
- Field p75 LCP: **≤2.5 s**
- Field p75 INP: **≤200 ms**
- Field p75 CLS: **≤0.1**
- No horizontal overflow at **320 px**
- No broken internal or required external links

## Measured facts

| Metric | Result | Evidence class | Interpretation |
|---|---:|---|---|
| Local FCP | 296 ms | local unthrottled development measurement | Diagnostic only |
| Local LCP | 296 ms | local unthrottled development measurement | Diagnostic only |
| Local CLS | 0 | local unthrottled development measurement | Diagnostic only |
| Encoded HTML | 5.7 KB | local development transfer | Diagnostic only |
| Long tasks | one at 50 ms | local development trace | Diagnostic only |
| `/` page size | 1.66 kB | successful production build report | Build artifact metric |
| `/` first-load JS | 160 kB | successful production build report | Baseline budget input |
| Shared first-load JS | 125 kB | successful production build report | Broad shared cost |

**These runtime numbers are non-representative.** Localhost, an unthrottled desktop, development mode, warm machine state, and absence of production network/CDN conditions make them unsuitable for claiming Lighthouse or Core Web Vitals success.

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

## P0 asset evidence discrepancy

The supplied Phase 1 evidence says the tracked `public` directory lacks referenced `public/andamio.png`, `public/andamio-credential-badge.svg`, and logo SVGs. A fresh inspection of canonical commit `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5` contradicts that assertion:

- Git `HEAD` tracks each named asset.
- Direct Git object checks succeeded.
- localhost returned HTTP 200 for each asset.

Disposition: **P0 evidence-integrity discrepancy and release blocker, not a current broken-asset finding.** Recheck the exact deployment artifact and production URLs before release. If any required production asset is absent or returns a non-image fallback, treat that deployment issue as P0. Do not use cache behavior to explain the current 200 responses without response-body/cache-header evidence.

## Unknown or unverified

- No Lighthouse run, mobile throttle, cold-cache run, bundle analyzer, production trace, or field RUM was completed.
- Production image optimization, font cache headers, CDN compression, and third-party latency are unknown.
- The 320 px no-overflow target was not tested.
