# Brief: Motion Agent

- **Status:** draft
- **Requirements:** MOT-*, A11Y-04
- **Depends on:** ui-design motion intents; coordinates with frontend

## Inputs

- shared-context; MOT requirements; Motion docs; reduced-motion MDN
- Current reveal patterns in `kit.tsx` / landing composition (read)

## Allowed files

`src/ui/system/**` motion-related code, `src/styles/globals.css` reduced-motion rules. No new Three.js dependencies.

## Outputs

- Tokenized motion plan (2–5 intentional motions)
- Reduced-motion equivalents documented and implemented
- ≤2 evaluate-kit micro-interactions or explicit rejection

## Acceptance

- MOT-01..03, MOT-05 pass; MOT-04 documented
- Lighthouse Performance not regressed beyond PERF budgets

## Verification commands

```bash
# Manual: OS reduce-motion on; traverse /, /show-me, /issuer
yarn build
```

## Escalation

Desire for WebGL hero; motion that breaks keyboard or CLS budgets.
