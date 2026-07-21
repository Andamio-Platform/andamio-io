# Implementation

Track approved work against requirements and agent briefs.

For each change, record requirement IDs, brief, owner, status, canonical files touched, dependencies, verification commands and results, before/after evidence, accessibility and performance impact, rollout notes, and follow-ups. Keep implementation notes factual and reproducible.

Changes belong in `src/ui/system` and its documented canonical dependencies unless a decision record explicitly changes that boundary.

Lifecycle: `planned → in-progress → verified → released`. `in-progress` requires a ready brief and adopted applicable decisions; `verified` requires all brief checks to pass; `released` requires deployment evidence. Active work may move to `blocked` and resume to `in-progress`; non-released work may become `cancelled`; released work may become `rolled-back` with cause and recovery evidence.

## Planning package (2026-07-21)

| Document | Status |
|---|---|
| [2026-07-21-design-strategy.md](2026-07-21-design-strategy.md) | planned — Concept A recommended |
| [component-map.md](component-map.md) | planned |
| [work-breakdown.md](work-breakdown.md) | planned — next gate prototype approval |
| [verification-matrix.md](verification-matrix.md) | planned |
| [rollout-and-rollback.md](rollout-and-rollback.md) | planned |

Do not start canonical code changes until prototype approval is recorded and requirements are `approved`.
