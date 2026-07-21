# Brief: QA Agent

- **Status:** draft
- **Requirements:** QA-*, integrates A11Y/PERF/SEO evidence
- **Depends on:** implementation PRs ready for verification

## Inputs

- shared-context; [../requirements/09-testing-acceptance.md](../requirements/09-testing-acceptance.md)
- [../implementation/verification-matrix.md](../implementation/verification-matrix.md)
- Playwright, axe, Lighthouse, reg-suit / `yarn shoot`

## Allowed files

Test config/specs when added (e.g. `tests/**` or Playwright config), CI workflow additions for gates, evidence under `docs/landing-page-excellence/audits/` or `implementation/evidence/` if created. Read-only on product UI except bugfix PRs filed with owners.

## Outputs

- Filled verification matrix with pass/fail + artifacts
- Route/funnel/a11y/Lighthouse gate results
- Go/no-go recommendation for release

## Acceptance

- QA-01..05 pass for release candidate
- Sensitive analytics non-collection asserted if analytics present
- Failures mapped to requirement IDs and owners

## Verification commands

```bash
yarn next:lint
yarn build
yarn start
yarn shoot
# Playwright suite when added; lighthouse median script when added
```

## Escalation

Flaky tooling / `.next` corruption; unresolved P0 a11y; missing privacy approval for analytics tests.
