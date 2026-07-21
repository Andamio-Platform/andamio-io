# Landing Page Excellence

Operational index for researching, specifying, and improving the Andamio landing experience.

## Product priority

Use **issuer-primary / developer-secondary** framing. The landing page should first help credential issuers understand the outcome and next action, then give developers a clear path to implementation details.

## Canonical implementation

> **Warning:** `src/ui/system` is the canonical UI and landing-page implementation. Legacy stacks such as `src/ui/landing`, including `ModernLanding` and `V2Landing`, and experimental pages under `src/ui/explore` are references only. Do not treat them as authorities or extend them without an explicit decision record.

Canonical code files:

- [`../../src/pages/index.tsx`](../../src/pages/index.tsx) — production route composition.
- [`../../src/ui/system/AndamioLanding.tsx`](../../src/ui/system/AndamioLanding.tsx) — canonical landing page.
- [`../../src/ui/system/kit.tsx`](../../src/ui/system/kit.tsx) — canonical UI primitives.
- [`../../src/ui/system/tokens.ts`](../../src/ui/system/tokens.ts) — canonical design tokens and policies.
- [`../../src/ui/explore/content.ts`](../../src/ui/explore/content.ts) — shared landing copy and links; despite its path, it is imported by the canonical page.
- [`../../src/styles/globals.css`](../../src/styles/globals.css) — global system variables and theme rules.

## Reading order

1. [Research methodology](research/methodology.md)
2. [GitHub and AI resources](research/github-ai-resources/README.md)
3. [UI/UX resources](research/ui-ux-resources/README.md)
4. [Research shortlists](research/shortlists/README.md)
5. [Audits](audits/README.md)
6. [Requirements](requirements/README.md)
7. [Agent briefs](agent-briefs/README.md)
8. [Implementation](implementation/README.md)
9. [Decisions](decisions/README.md)

## Status labels

- `proposed` — captured but not yet checked.
- `researching` — verification or evaluation is in progress.
- `verified` — source, claims, access, and date have been checked.
- `shortlisted` — verified and recommended for a defined use.
- `rejected` — evaluated and excluded with a recorded reason.
- `adopted` — approved and reflected in requirements or implementation.
- `superseded` — replaced; link to the successor.

Every record has exactly one status. Status changes preserve the prior rationale in Git history or a decision record.

## Phase gates

1. **Research gate:** normalized records pass source, license/pricing, date, and link checks.
2. **Shortlist gate:** candidates pass inclusion gates and the scoring rubric; exclusions are explained.
3. **Audit gate:** findings cite current canonical code and reproducible evidence.
4. **Requirements gate:** issuer-primary outcomes, developer-secondary paths, accessibility, performance, SEO, and acceptance criteria are explicit.
5. **Brief gate:** each task has scope, dependencies, constraints, verification, and out-of-scope boundaries.
6. **Implementation gate:** changes target canonical files, pass project checks, and include evidence.
7. **Decision gate:** material trade-offs and changes to canonical boundaries are recorded before adoption.

Phase artifacts advance only when the preceding gate is satisfied.
