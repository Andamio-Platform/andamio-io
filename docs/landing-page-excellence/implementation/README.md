# Implementation

Track approved work against requirements and agent briefs.

For each change, record requirement IDs, brief, owner, status, canonical files touched, dependencies, verification commands and results, before/after evidence, accessibility and performance impact, rollout notes, and follow-ups. Keep implementation notes factual and reproducible.

Changes belong in `src/ui/system` and its documented canonical dependencies unless a decision record explicitly changes that boundary.

Lifecycle: `planned → in-progress → verified → released`. `in-progress` requires a ready brief and adopted applicable decisions; `verified` requires all brief checks to pass; `released` requires deployment evidence. Active work may move to `blocked` and resume to `in-progress`; non-released work may become `cancelled`; released work may become `rolled-back` with cause and recovery evidence.
