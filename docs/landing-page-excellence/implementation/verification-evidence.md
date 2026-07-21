# Verification Evidence — Concept A structural fixes

- **as_of:** `2026-07-21`
- **Decision:** [../decisions/2026-07-21-prototype-approval.md](../decisions/2026-07-21-prototype-approval.md)
- **Scope:** A11Y-01, A11Y-02, UX-03 closing CTA, SEO-01 sitemap, `/explore/concept-a` prototype shell

## What changed

| Area | Files | Change |
|---|---|---|
| A11Y-01 | `src/ui/system/kit.tsx` | Skip link “Skip to content” → `#main-content`; `{children}` in `<main id="main-content">`; footer sibling after main |
| A11Y-02 | `src/ui/system/HowItWorks.tsx` | `role="tablist"` / `tab` / `tabpanel`, roving `tabIndex`, Left/Right/Home/End; inactive panes keep visibility height + `inert` / `aria-hidden` |
| UX-03 | `src/ui/system/AndamioLanding.tsx`, `src/ui/explore/content.ts` | Closing: primary walkthrough mailto, secondary Discord outline |
| SEO-01 | `src/app/sitemap.ts` | `/show-me` in `STATIC_ROUTES` (StoryFork indexable) |
| Prototype | `src/pages/explore/concept-a.tsx` | Banner + `AndamioLanding`; link to `/explore/system`; production index unchanged |

## How to verify

1. **Lint:** `yarn next:lint` (or TypeScript check on touched files).
2. **Whitespace / conflict markers:** `git diff --check`.
3. **Skip + main:** open `/` or `/issuer`, Tab until “Skip to content”, Activate → focus lands in `#main-content`; confirm footer is outside `<main>` in DOM.
4. **HowItWorks tabs:** open `/issuer`, focus a Define/Issue/Verify tab; Left/Right and Home/End move selection; only the active pane’s controls are tabbable.
5. **Closing CTA:** on `/`, closing section shows orange/primary “Book a 20-minute walkthrough” (mailto) before outline “Join us on Discord”.
6. **Prototype:** visit `/explore/concept-a` — sticky “Concept A prototype — not production” banner and link back to `/explore/system`.
7. **Sitemap:** confirm `/show-me` appears in generated sitemap (`/sitemap.xml` when app is running, or inspect `STATIC_ROUTES` in `src/app/sitemap.ts`).

## Matrix cross-ref

See [verification-matrix.md](verification-matrix.md) rows V-A11Y-STRUCT, V-A11Y-TABS, V-CTA, V-SEO-SHOW.
