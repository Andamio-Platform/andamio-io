# 06 — Accessibility and Responsive

- **Status:** in-review
- **Target:** WCAG 2.2 AA

## A11Y-01 — Main landmark and skip link

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Canonical `Page` lacks `<main>` and skip bypass |
| Acceptance test | `/`, `/show-me`, `/issuer`, `/developers` expose one main landmark and a visible-on-focus skip link that moves focus to main |
| Dependencies | UX-01 |
| Source | a11y audit A11Y-F01 |

## A11Y-02 — HowItWorks tabs pattern

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Incomplete tab semantics |
| Acceptance test | WAI-ARIA tabs: `tablist`/`tab`/`tabpanel`, `aria-controls`/`aria-labelledby`, roving tabindex, Arrow/Home/End, focus-visible |
| Dependencies | MOT-03, UX-04 |
| Source | a11y audit A11Y-F02 |

## A11Y-03 — Keyboard-complete funnel

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Keyboard path unverified |
| Acceptance test | Complete L0–L3 issuer and developer actions on `/`, `/show-me`, `/issuer` with keyboard only; no focus trap; logical order; menus operable |
| Dependencies | A11Y-01, A11Y-02 |
| Source | a11y audit A11Y-F03 |

## A11Y-04 — Reduced motion (cross-ref MOT-02)

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Required motion acceptance |
| Acceptance test | Same as MOT-02; evidence retained in QA matrix |
| Dependencies | MOT-02 |
| Source | a11y audit A11Y-F04 |

## A11Y-05 — WCAG 2.2 AA conformance target

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Program quality floor |
| Acceptance test | No outstanding Serious/Critical axe issues on `/`, `/issuer`, `/show-me`; manual checks cover names/roles/values, contrast, errors/status; exceptions only via adopted decision |
| Dependencies | A11Y-01..04, VIS-05 |
| Source | audit index quality targets |

## A11Y-06 — Focus visible and not obscured

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Sticky header can hide focus |
| Acceptance test | Meets WCAG 2.4.7 and 2.4.11; focused controls not entirely hidden by sticky nav |
| Dependencies | A11Y-03 |
| Source | a11y acceptance seeds |

## A11Y-07 — Touch targets and operable controls

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Mobile nav, tabs, BadgeBuilder density |
| Acceptance test | Primary controls meet minimum target size guidance; BadgeBuilder and tabs remain operable on 375 CSS px width |
| Dependencies | A11Y-03 |
| Source | a11y REQ-A11Y-07 seed |

## A11Y-08 — 320 px and 400% zoom reflow

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Narrow and zoom unverified |
| Acceptance test | No horizontal page overflow at 320 CSS px; content reflows at 400% zoom; representative widths 320/375/768/1024/≥1440 checked |
| Dependencies | VIS layout |
| Source | a11y RESP-F01 |
