---
id: 003
priority: p3
status: pending
source: ce-review run 20260416-172313-f1240cb9 (MAINT-006)
origin_branch: refactor/de-slop-v2-landing
created: 2026-04-16
---

# Relocate motion-variants.ts out of V2Landing/

`src/ui/landing/V2Landing/motion-variants.ts` is imported by files outside the V2Landing tree:

- `src/pages/about/index.tsx`
- `src/pages/use-cases/index.tsx`

The physical location implies it is private to V2Landing, but it functions as a shared utility. Move to `src/lib/motion-variants.ts` or `src/ui/shared/motion-variants.ts` and update the three import paths.

Low-risk mechanical change. Blocked on nothing.

**Reviewer:** maintainability, confidence 0.65.
