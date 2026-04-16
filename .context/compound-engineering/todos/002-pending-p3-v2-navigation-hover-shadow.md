---
id: 002
priority: p3
status: pending
source: ce-review run 20260416-172313-f1240cb9 (residual)
origin_branch: refactor/de-slop-v2-landing
created: 2026-04-16
---

# Remove hover-shadow pattern from V2Navigation "Get Started" CTA

`src/ui/landing/V2Landing/V2Navigation.tsx:87` still uses `transition-all hover:shadow-md` on its "Get Started" CTA. This is the uniform floating-card hover pattern that the de-slop refactor removed from every section.

V2Navigation was explicitly marked out of scope in the de-slop plan, but this is the one surviving instance of the pattern. Change to `transition-colors` to match the rest of the landing page.

**Reviewer:** maintainability (residual risk).
