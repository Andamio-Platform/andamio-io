# Landing Page Excellence

Operational index for researching, specifying, and improving the Andamio landing experience.

## Status (2026-07-22)

| Area | Lifecycle status | Notes |
|---|---|---|
| Research (GitHub AI + UI/UX) | shortlisted | 75 repos + 87 sites; shortlists + [adoption-matrix](research/shortlists/adoption-matrix.md) |
| Audits | triaged | Baseline complete; disposition seeds mapped to requirements |
| Decisions | adopted | [keep/reuse/archive](decisions/2026-07-21-keep-reuse-archive.md), [Concept A](decisions/2026-07-21-concept-direction.md) |
| Requirements | in-review | Package ready; not yet approved for code |
| Agent briefs | draft | Orchestrator sequence defined; activate only under a future implementation plan |
| Implementation planning | planned | Strategy, WBS, verification, rollout — backlog only |
| Design / production coding | **frozen** | No further UI/design implementation in this program phase |

**Program phase complete for documentation.** See [recommendations and next steps](implementation/2026-07-22-recommendations-and-next-steps.md).

**Next gate (later):** write a separate **implementation plan** from this package. Do not resume landing design or production UI work until that plan is approved and requirements are `approved`.

## Product priority

Use **issuer-primary / developer-secondary** framing. The landing page should first help credential issuers understand the outcome and next action, then give developers a clear path to implementation details.

**Adopted concept:** Concept A — issuer-led proof narrative with progressive developer depth. Demo scope: keep `/show-me` and `/issuer` HowItWorks + BadgeBuilder; archive V2 walkthrough as authority.

## Canonical implementation

> **Warning:** `src/ui/system` is the canonical UI and landing-page implementation. Legacy stacks such as `src/ui/landing`, including `ModernLanding` and `V2Landing`, and experimental pages under `src/ui/explore` are references only. Do not treat them as authorities or extend them without an explicit decision record. Exception: `src/ui/explore/content.ts` is **canonical copy** imported by production pages.

Canonical code files:

- [`../../src/pages/index.tsx`](../../src/pages/index.tsx) — production route composition.
- [`../../src/ui/system/AndamioLanding.tsx`](../../src/ui/system/AndamioLanding.tsx) — canonical landing page.
- [`../../src/ui/system/kit.tsx`](../../src/ui/system/kit.tsx) — canonical UI primitives.
- [`../../src/ui/system/tokens.ts`](../../src/ui/system/tokens.ts) — canonical design tokens and policies.
- [`../../src/ui/explore/content.ts`](../../src/ui/explore/content.ts) — shared landing copy and links; despite its path, it is imported by the canonical page.
- [`../../src/styles/globals.css`](../../src/styles/globals.css) — global system variables and theme rules.
- [`../../src/components/site/metatags.tsx`](../../src/components/site/metatags.tsx) — canonical page metadata component.
- [`../../src/lib/seo.ts`](../../src/lib/seo.ts) — canonical SEO defaults and helpers.

This list is intentionally scoped to known landing dependencies, not exhaustive. Before changing a canonical file, trace its imports and route composition to discover additional runtime, content, metadata, analytics, and styling dependencies.

## Reading order

1. [Research methodology](../archive/landing-page-excellence/research/methodology.md)
2. [Decisions](decisions/README.md) — cross-cutting approvals.
3. [GitHub and AI resources](../archive/landing-page-excellence/research/github-ai-resources/README.md)
4. [UI/UX resources](../archive/landing-page-excellence/research/ui-ux-resources/README.md)
5. [Research shortlists](research/shortlists/README.md) — including [adoption-matrix](research/shortlists/adoption-matrix.md) and [rejected-and-cautions](research/shortlists/rejected-and-cautions.md)
6. [Audits](audits/README.md)
7. [Design strategy](implementation/2026-07-21-design-strategy.md)
8. [Requirements](requirements/README.md)
9. [Agent briefs](agent-briefs/README.md)
10. [Recommendations and next steps](implementation/2026-07-22-recommendations-and-next-steps.md) ← start here for the later plan
11. [Implementation planning docs](implementation/README.md)

## Artifact lifecycles

Each artifact has exactly one status from its own lifecycle; do not reuse labels merely because another artifact uses them. Focused indexes define transition evidence and terminal states.

- **Research:** `proposed → researching → verified → shortlisted → adopted`; branches to `rejected`, and adopted records may become `superseded`.
- **Audits:** `planned → in-progress → complete → triaged → closed`; an invalidated audit becomes `superseded`.
- **Requirements:** `draft → in-review → approved → implemented → verified`; branches to `rejected`, and approved or later requirements may become `superseded`.
- **Agent briefs:** `draft → ready → in-progress → completed`; active work may become `blocked`, and non-completed work may become `cancelled`.
- **Decisions:** `proposed → adopted` or `rejected`; adopted decisions may become `superseded`.
- **Implementation:** `planned → in-progress → verified → released`; active work may become `blocked`, non-released work may become `cancelled`, and released work may become `rolled-back`.

Every transition records a date, owner, and evidence or reason. No artifact skips a gate state without an explicit decision.

## Phase gates

1. **Research gate:** normalized records pass citation, license, source-availability, pricing, freshness, and link checks.
2. **Shortlist gate:** candidates pass inclusion gates and the scoring rubric; exclusions are explained.
3. **Audit gate:** findings cite current canonical code and reproducible evidence.
4. **Requirements gate:** issuer-primary outcomes, developer-secondary paths, accessibility, performance, SEO, and acceptance criteria are explicit. *(package in-review — approve before coding resumes)*
5. **Brief gate:** each task has scope, dependencies, constraints, verification, and out-of-scope boundaries.
6. **Implementation-plan gate (current):** a separate implementation plan is written from [recommendations](implementation/2026-07-22-recommendations-and-next-steps.md) and approved. Design/coding remain frozen until then.
7. **Implementation gate:** changes target canonical files, pass project checks, and include evidence.

**Decision approval is cross-cutting, not a final phase.** Before an audit, requirement, brief, or implementation step depends on a material choice about scope, architecture, product priority, design policy, dependency, or gate exception, its decision must be `adopted`. A superseded or merely proposed decision cannot authorize downstream work.

Phase artifacts advance only when their preceding gate and all applicable cross-cutting decisions are satisfied.
