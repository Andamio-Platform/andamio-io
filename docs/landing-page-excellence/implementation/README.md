# Implementation

Track approved work against requirements and agent briefs.

> **Freeze (2026-07-22):** Do not implement landing design or production UI in this phase. Planning docs below are a **backlog for a future implementation plan**. Start with [2026-07-22-recommendations-and-next-steps.md](2026-07-22-recommendations-and-next-steps.md).

For each future change (after a new plan is approved), record requirement IDs, brief, owner, status, canonical files touched, dependencies, verification commands and results, before/after evidence, accessibility and performance impact, rollout notes, and follow-ups. Keep implementation notes factual and reproducible.

Changes belong in `src/ui/system` and its documented canonical dependencies unless a decision record explicitly changes that boundary.

Lifecycle: `planned → in-progress → verified → released`. `in-progress` requires a ready brief and adopted applicable decisions; `verified` requires all brief checks to pass; `released` requires deployment evidence. Active work may move to `blocked` and resume to `in-progress`; non-released work may become `cancelled`; released work may become `rolled-back` with cause and recovery evidence.

## Planning package

| Document | Status |
|---|---|
| [2026-07-22-recommendations-and-next-steps.md](2026-07-22-recommendations-and-next-steps.md) | **current** — freeze + prioritized backlog |
| [2026-07-21-design-strategy.md](2026-07-21-design-strategy.md) | planned — Concept A direction |
| [component-map.md](component-map.md) | planned — backlog |
| [work-breakdown.md](work-breakdown.md) | planned — phases frozen as backlog |
| [verification-matrix.md](verification-matrix.md) | planned — backlog |
| [rollout-and-rollback.md](rollout-and-rollback.md) | planned — backlog |

Do not start or continue canonical design/code changes until a separate implementation plan is approved and requirements are `approved`.
