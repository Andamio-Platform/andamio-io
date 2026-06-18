# Walkthrough step demos

Interactive mini-demos that mount inside `V2WalkthroughSection`, under the bullets
of a single step. A demo makes that step's prose claim *executable* — the visitor
operates the claim instead of reading it.

The cert-body **Public Credential Verifier** (`V2VerifierDemo.tsx`) is the worked
example, mounted on cert step 02 ("The shift").

## The seam

A step references a demo by id; the data layer never imports a component.

```
walkthrough-data.ts   Step.demoId = "cert-verifier"   (declarative; no JSX)
        │
        ▼
step-demos.tsx        STEP_DEMOS: Record<string, React.FC>
        │
        ▼
V2WalkthroughSection  renders STEP_DEMOS[currentStep.demoId] under the bullets
```

The render seam in `V2WalkthroughSection` is generic (keyed on `demoId`) and does
not change when a demo is added.

## Adding a demo — three steps

1. **Component** — `V2<Name>Demo.tsx`, a client component. Read its scenario data,
   render the interaction. (Optional) colocated data file `<name>-demo-data.ts`,
   kept declarative — no JSX in data.
2. **Register** — add one entry to `STEP_DEMOS` in `step-demos.tsx`:
   `"prereq-gate": V2PrerequisiteGateDemo`.
3. **Mount** — set `demoId: "prereq-gate"` on the target step in `walkthrough-data.ts`.

That's it. No edit to the render seam.

## Conventions (from the verifier)

- **Fidelity:** scripted mock — hardcoded, instant-feeling, no backend. Values must
  read as illustrative examples, not falsifiable real records (label "Example data").
- **Design:** post-de-slop idiom — `rounded-lg`, soft borders, no offset shadows.
  Reuse `_ui.tsx` (`Kicker`, `primaryBtnSm`) and the Foundation Blue / primary-orange
  tokens already in the section.
- **Monospace:** `font-mono` only for real on-chain data (credential id, address,
  block, tx hash). Never on labels or prose — that was the slop we removed.
- **Motion:** use the `fadeIn` variant from `motion-variants.ts` for reveals, and
  `useReducedMotion()` to skip timed delays and fades (see `V2VerifierDemo`).
- **Mobile:** card stacks, inputs go full-width.
- **Voice:** landing-page rules — plain verbs, sentence case, no superlatives, no
  internal-sales language.

## Mock-data shape (reference: `verifier-demo-data.ts`)

A typed array of scenarios, each carrying a chip label, the data fields the result
renders, a status badge label + tone, and a one-line plain-language note. Export a
sample id that pre-fills the input, and a resolver that maps unknown input to the
empty/"not found" state.

## Next applications

- **Partner — Prerequisite Gate** on partner step 02: toggle three credentials from
  three issuers, watch the gold tier flip locked → unlocked with the rule shown.
- **Cohort — Issue-on-pass** on cohort step 03: "mark assessment passed" → webhook
  animation → a portable credential mints with a public verification link (which is
  this verifier — the demos compose).
