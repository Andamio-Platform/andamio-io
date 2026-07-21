# Agent Briefs — Orchestrator Sequence

- **Package status:** `draft` → becomes `ready` after prototype approval + requirements `approved`
- **as_of:** `2026-07-21`
- **Frame:** issuer-primary / developer-secondary · Concept A · Warm Index

## Shared inputs

Read first: [shared-context.md](shared-context.md), [../requirements/README.md](../requirements/README.md), [../decisions/2026-07-21-concept-direction.md](../decisions/2026-07-21-concept-direction.md), [../decisions/2026-07-21-keep-reuse-archive.md](../decisions/2026-07-21-keep-reuse-archive.md).

## Sequence

| Step | Brief | Waits on | Unlocks |
|---:|---|---|---|
| 0 | [shared-context.md](shared-context.md) | adopted decisions | all agents |
| 1 | [research.md](research.md) | shortlists current | gaps/escalations |
| 2 | [ux-strategy.md](ux-strategy.md) | Concept A, AUD/UX reqs | wireframes / section jobs |
| 3 | [conversion-copy.md](conversion-copy.md) | UX strategy draft | copy deck |
| 4 | [ui-design.md](ui-design.md) | UX + copy + VIS | **prototype approval gate** |
| 5 | [frontend-implementation.md](frontend-implementation.md) | prototype approved | code in canonical files |
| 6a | [motion.md](motion.md) | UI design + MOT | motion PR (can parallel 5) |
| 6b | [accessibility.md](accessibility.md) | A11Y P0s | a11y PR (parallel) |
| 6c | [performance.md](performance.md) | PERF baselines | perf PR (parallel) |
| 6d | [seo.md](seo.md) | SEO/TECH reqs | metadata/analytics PR |
| 7 | [qa.md](qa.md) | implementation PRs | release evidence |

Parallelism: after step 5 starts, 6a–6d may run on separate change sets if they do not conflict on the same files. Step 7 is the integration gate.

## Brief index

- [research.md](research.md)
- [ux-strategy.md](ux-strategy.md)
- [conversion-copy.md](conversion-copy.md)
- [ui-design.md](ui-design.md)
- [frontend-implementation.md](frontend-implementation.md)
- [motion.md](motion.md)
- [accessibility.md](accessibility.md)
- [performance.md](performance.md)
- [seo.md](seo.md)
- [qa.md](qa.md)

## Lifecycle

`draft → ready → in-progress → completed`. Do not start implementation briefs until prototype approval is recorded under [../implementation/](../implementation/).
