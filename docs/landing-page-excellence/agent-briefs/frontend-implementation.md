# Brief: Frontend Implementation Agent

- **Status:** draft → ready only after prototype approval
- **Requirements:** UX-*, VIS-*, CNT-05, TECH-02/03, PERF-06 as assigned
- **Depends on:** ui-design prototype accepted

## Inputs

- shared-context; approved prototype; [../implementation/component-map.md](../implementation/component-map.md)
- Requirements 01–05, 07 (link registry), work-breakdown phases

## Allowed files

Canonical only: `src/pages/{index,issuer,show-me,developers}.tsx` (as needed), `src/ui/system/**`, `src/ui/explore/content.ts`, `src/styles/globals.css`, `src/lib/{seo,external-links}.ts`, `src/components/site/metatags.tsx`. Badge core under `src/ui/landing/V2Landing/badge/*` only if BadgeBuilder requires it. **Forbidden:** archived walkthrough/ModernLanding/SB7 extensions.

## Outputs

- Reviewable PR(s) implementing Concept A on canonical funnel
- Notes linking requirement IDs → files
- Updated evidence pointers for QA

## Acceptance

- UX-01..07 and VIS-01..03 acceptance tests pass on localhost production build
- No new archived-stack imports
- Lint/build clean

## Verification commands

```bash
yarn next:lint
yarn build
yarn start
# then smoke /, /show-me, /issuer, /developers
```

## Escalation

Need to change canonical boundary; budget exception; content.ts relocation without TECH-03 plan.
