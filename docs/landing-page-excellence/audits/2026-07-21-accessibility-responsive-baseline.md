# Accessibility and responsive baseline audit

- **Date:** 2026-07-21
- **Status:** complete
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Target:** WCAG 2.2 AA; keyboard complete; reduced-motion equivalent; 320 px without overflow
- **Method:** canonical source inspection plus partial desktop browser observation
- **Owner:** Landing Excellence Program

## What was observed

- **Desktop browser observation:** `/` loaded and showed clear visual hierarchy.
- **Source inspection:** semantic headings and sections are widely used, controls are generally native links/buttons, and the hero badge has descriptive alt text.
- **Source inspection:** canonical `Page` renders a wrapper, navigation, page children, and footer but no `<main>` landmark or skip link.
- **Source inspection:** HowItWorks step buttons expose `aria-selected`, but the container lacks `role="tablist"`, controls lack `role="tab"` and `aria-controls`, and panels lack `role="tabpanel"`/label relationships.
- **Source inspection:** an animated live indicator uses `animate-pulse`; a complete reduced-motion equivalent has not been verified.

## Findings

### A11Y-F01 — Missing main landmark and skip link

- **Severity:** P1
- **Affected audience:** keyboard and screen-reader users
- **Risk:** repeated navigation cannot be bypassed efficiently and page structure is incomplete.
- **Requirement seed:** `REQ-A11Y-01` — every canonical funnel page has one named/main landmark and a visible-on-focus skip link.

### A11Y-F02 — Incomplete tabs semantics

- **Severity:** P1
- **Affected audience:** keyboard and screen-reader users
- **Risk:** the Define/Issue/Verify interaction announces selected state without exposing the expected tab model or keyboard behavior.
- **Requirement seed:** `REQ-A11Y-02` — implement the WAI-ARIA tabs pattern, including tablist/tab/tabpanel relationships, roving focus, arrow/Home/End behavior, and focus-visible states.

### A11Y-F03 — Keyboard completion unverified

- **Severity:** P1
- **Affected audience:** keyboard and switch users
- **Risk:** menus, story transitions, BadgeBuilder, tabs, and outbound conversion may trap focus or have unreachable states.
- **Requirement seed:** `REQ-A11Y-03` — complete all L0–L3 funnel actions with keyboard only, with logical order and no focus loss.

### A11Y-F04 — Reduced-motion behavior unverified

- **Severity:** P1
- **Affected audience:** motion-sensitive users
- **Risk:** pulse, transitions, and story motion may continue without equivalent static feedback.
- **Requirement seed:** `REQ-A11Y-04` — `prefers-reduced-motion: reduce` removes nonessential animation while preserving state and comprehension.

### RESP-F01 — Mobile and narrow-width behavior unverified

- **Severity:** P1
- **Affected audience:** mobile and zoom users
- **Risk:** dense grids, long credential addresses, tab labels, nav actions, and BadgeBuilder may overflow or become unusable.
- **Requirement seed:** `REQ-RESP-01` — no horizontal page overflow at 320 CSS px and at 400% zoom; controls remain operable.

### A11Y-F05 — Automated and assistive-technology coverage absent

- **Severity:** P1
- **Risk:** regressions have no gate.
- **Requirement seed:** `REQ-TEST-02` — add automated accessibility checks plus manual screen-reader and keyboard acceptance evidence.

## Acceptance seeds

- `REQ-A11Y-05`: WCAG 2.2 AA across `/`, `/show-me`, and `/issuer`, with documented exceptions only through an adopted decision.
- `REQ-RESP-02`: verify representative widths 320, 375, 768, 1024, and ≥1440 CSS px in light/dark themes.
- `REQ-A11Y-06`: focus indicators meet WCAG 2.2 focus appearance requirements and are never obscured by the sticky header.
- `REQ-A11Y-07`: touch targets, contrast, names/roles/values, error states, and status announcements receive manual and automated checks.

## Explicitly unverified

The browser disconnected before mobile, keyboard-only, screen-reader, zoom/reflow, reduced-motion, dark-theme, and full-route testing. These checks are **unverified**, not passing. No axe/Lighthouse accessibility scan was supplied, and source inspection alone cannot establish WCAG conformance.
