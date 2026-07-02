---
title: Data-declared, registry-resolved component seam
date: 2026-06-18
category: design-patterns
module: V2Landing (landing-page-and-blog)
problem_type: design_pattern
component: frontend_stimulus
severity: medium
applies_when:
  - Mounting repeatable interactive widgets into a shared container (e.g. one per item in a list or step)
  - You want a new variant to be "add a component + one registry line", never an edit to the render site
  - A declarative data file should reference a component by id without importing the component
tags: [react, component-composition, registry-pattern, open-closed, typescript, extensibility, nextjs]
---

# Data-declared, registry-resolved component seam

## Context

The landing-page walkthrough (`V2WalkthroughSection`) tells an archetype-tailored, four-step story. We wanted to mount small interactive demos under the *one* step in each story where a live interaction lands harder than prose — and to do it so the next two demos (partner, cohort) drop in without reopening the render site. A one-off `if (step === certStep2) <Verifier/>` would have shipped the first demo and blocked the rest behind another edit to the section every time. The deliverable was the *seam*, not the first card.

## Guidance

Split the concern into three parts so the render site is closed for modification:

1. **Data declares an id.** The step/item carries an optional `demoId` — a string id, not a component. The data file stays declarative and imports no JSX.
2. **A typed registry resolves id → component.** A small module maps each id to its component. Type the id off the registry so a typo is a *compile* error, not a silently-missing widget.
3. **The render site renders `registry[id]` generically.** It looks up the component by the item's id and renders it; it never names a specific demo.

The load-bearing refinement (surfaced by code review): **type the id as `keyof typeof REGISTRY` via `satisfies`.** An untyped `demoId?: string` compiles fine but lets a typo render nothing — which quietly defeats the whole pattern. Declaring the registry `as const`/`satisfies` and deriving the id union closes that gap. Keep the data file's dependency on the registry **type-only** (`import type`) so no component is pulled into the data layer at runtime.

## Why This Matters

- **Open/closed.** Adding a variant is "new component + one registry line + set the id on the data row". The render site — the part everyone is afraid to touch — never changes. That property is the actual product when the goal is "make the next N cheap".
- **Typos fail loud.** The registry-derived id type turns a fat-fingered id into a red squiggle instead of an empty slot you discover in QA (or don't).
- **Data stays declarative.** The data layer references behavior by id and never imports a component, so it remains serializable-in-spirit and free of render concerns.
- **Defensive at the seam.** An id with no registry entry renders nothing rather than throwing, so a half-added variant degrades gracefully.

## When to Apply

- Repeatable interactive widgets mounted into a shared container (walkthrough steps, list rows, dashboard cards).
- Any place you'd otherwise grow a `switch`/`if` ladder in a shared render path as variants accumulate.
- Not worth it for a single, never-to-be-repeated widget — the seam earns its keep only when variant #2 is expected.

## Examples

**Before — naive: render site grows a conditional, id is an untyped string**

```tsx
// data
interface Step { /* … */ demoId?: string }   // typo-prone, undefined on misspell

// render site — must be edited for every new demo
{step.id === "cert-2" && <V2VerifierDemo />}
{step.id === "partner-2" && <V2PrereqGateDemo />}
```

**After — the seam: typed registry, generic render site**

```tsx
// step-demos.tsx — registry is the single edit point for a new demo
export const STEP_DEMOS = {
  "cert-verifier": V2VerifierDemo,
} satisfies Record<string, React.FC>;
export type DemoId = keyof typeof STEP_DEMOS;   // "cert-verifier" | …

// walkthrough-data.ts — declarative; type-only import, no component pulled in
import type { DemoId } from "./step-demos";
interface Step { /* … */ demoId?: DemoId }      // a typo is now a compile error

// render site — generic; never edited to add a demo
const StepDemo = currentStep?.demoId ? STEP_DEMOS[currentStep.demoId] : undefined;
// …
{StepDemo && <StepDemo />}
```

Adding the partner demo is now: write `V2PrereqGateDemo`, add `"prereq-gate": V2PrereqGateDemo` to `STEP_DEMOS`, set `demoId: "prereq-gate"` on the partner step. No edit to `V2WalkthroughSection`.

## Related

- `src/ui/landing/V2Landing/DEMOS.md` — the in-repo recipe for adding a demo, colocated with the components.
- Built in commit `e6f37d00`; the `satisfies`/`keyof` hardening landed in review commit `bff1cf0b`.
