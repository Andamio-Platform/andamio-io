# Decision: Concept A — issuer-led proof narrative

- **Date:** 2026-07-21
- **Status:** adopted
- **Owner:** Landing Excellence Program
- **Approval date:** 2026-07-21
- **Canonical commit:** docs synthesis commit on `dev` (this file)
- **Supersedes:** none
- **Strategy source:** [../implementation/2026-07-21-design-strategy.md](../implementation/2026-07-21-design-strategy.md)

## Context

Phase 1 audits established a canonical funnel (`/`, `/show-me`, `/issuer`) under Warm Index, with issuer content already preceding developer content. Research shortlists supply craft and quality tools but do not choose narrative architecture. The program needs one concept direction before requirements and prototypes diverge.

## Options considered

1. **Concept A** — Issuer-led proof narrative with progressive developer depth.
2. **Concept B** — Dual-rail marketplace (equal issuer/developer from hero).
3. **Concept C** — Spec-first / API-first hero.

## Decision

Adopt **Concept A**.

### Rationale

- Matches adopted product priority: issuer-primary / developer-secondary.
- Preserves proven demo assets: `/show-me` story fork and `/issuer` HowItWorks + BadgeBuilder.
- Aligns with keep/reuse/archive: does not revive V2 walkthrough as authority.
- Fits Warm Index brand test: brand and outcome lead; developer tools stay progressive disclosure.
- Concepts B and C optimize for builder volume or parity and would fight the conversion ladder in the funnel audit.

### What this authorizes

- Requirements, agent briefs, and prototypes that assume Concept A section jobs and CTA hierarchy.
- Continued KEEP of `/show-me` and `/issuer` HowItWorks + BadgeBuilder.
- Developer destinations (`/developers`, docs, API) as secondary paths after self-selection or below-fold modules.

### Non-goals

- Equal visual weight for issuer and developer in the first viewport.
- Wholesale replacement of Warm Index with kit/gallery aesthetics.
- Shipping a heavy 3D/WebGL hero.
- Claiming real credential issuance/verification from illustrative demo actions.
- Deleting archived legacy stacks in this phase.
- Selecting an analytics vendor before privacy/event approval.

## Consequences

- Downstream requirements use issuer-first acceptance tests.
- Closing Discord CTAs must not outrank issuer walkthrough / Start issuing without measurement evidence.
- Any move to Concept B/C requires a successor decision that supersedes this record.
- Prototype approval remains a separate gate before implementation ships.

## Related evidence

- [../audits/2026-07-21-funnel-and-cta-inventory.md](../audits/2026-07-21-funnel-and-cta-inventory.md)
- [../decisions/2026-07-21-keep-reuse-archive.md](../decisions/2026-07-21-keep-reuse-archive.md)
- [../research/shortlists/rejected-and-cautions.md](../research/shortlists/rejected-and-cautions.md)
