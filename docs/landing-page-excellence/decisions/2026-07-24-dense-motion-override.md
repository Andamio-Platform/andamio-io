# Decision: Dense cinematic Motion across the marketing funnel

- **Date:** 2026-07-24
- **Status:** adopted
- **Owner:** Landing Excellence Program
- **Approval date:** 2026-07-24
- **Supersedes:** none (overrides MOT-01 budget only; MOT-02 and MOT-05 remain binding)
- **Related:** [../requirements/05-motion-and-interaction.md](../requirements/05-motion-and-interaction.md)

## Context

MOT-01 budgets ≥2 and ≤5 intentional motions for presence and hierarchy. Product direction for this pass requested dense cinematic motion on nearly every funnel surface (`/`, `/show-me`, `/issuer`, `/developers`, `/pricing`, `/cli`, `/bot`), with a continuously alive + scroll-linked credential specimen, while keeping Warm Index branding and a hard `prefers-reduced-motion` gate.

## Options considered

1. Stay within MOT-01 (2–5 signature motions only).
2. Editorial Warm Index grammar (~5 reusable systems) applied widely.
3. Dense cinematic — kit-level motion on headings, lists, CTAs, plus alive/scroll credential.

## Decision

Adopt **option 3** for this implementation phase.

### Rationale

- Explicit product choice (density 1b, scope 2c, credential 3b+3c).
- Density is achieved via shared kit primitives (`Reveal`, `Stagger`, `Pressable`, theater parallax), not one-off chaos.
- Package migration to `motion` (`motion/react`) aligns with the adopt-now shortlist.

### What this authorizes

- Exceeding the MOT-01 numeric budget while shipping a single motion grammar.
- Continuous credential idle when in view (paused when reduced-motion, hidden, or off-screen).
- Scroll-linked specimen depth on the homepage theater.

### Non-goals / still binding

- MOT-02 hard reduced-motion gate (static, operable equivalent).
- MOT-05 no Three.js/WebGL hero by default.
- No neon/glass/purple-glow Aceternity·Magic UI wholesale themes.

### Consequences

- Future audits should score against the dense grammar + reduced-motion, not the old “≤5 motions” count, until a superseding decision restores MOT-01 literally.
- Performance must still honor PERF budgets; prefer transform/opacity only.
