---
name: landing-excellence
description: >-
  Guides Andamio landing work using the Landing Page Excellence program:
  issuer-primary Concept A narrative, Warm Index brand, canonical src/ui/system
  stack, requirements IDs, tool adoption matrix, and research catalogs. Use when
  planning or changing the homepage, /show-me, /issuer, landing UX/copy/a11y/perf/SEO,
  writing an implementation plan from docs/landing-page-excellence, or choosing
  UI kits / AI skills for the marketing funnel.
trigger: <landing-excellence>
---

# Landing Excellence

**Invoke:** `<landing-excellence>` for Andamio marketing landing funnel work.

**Docs root:** `docs/landing-page-excellence/`  
**Start here for later coding plans:** `docs/landing-page-excellence/implementation/2026-07-22-recommendations-and-next-steps.md`

## Product locks (do not reopen casually)

| Lock | Rule |
|---|---|
| Audience | Credential **issuers primary**; developers **secondary** (not equal in hero) |
| Concept | **Concept A** — issuer-led proof; progressive developer depth |
| Brand | **Warm Index** — ink/paper; orange `#FF6B35` sparingly; blue `#2F6BFF` wayfinding only; Inter + JetBrains Mono; square geometry |
| Canonical code | `src/ui/system/*` + copy in `src/ui/explore/content.ts` |
| Demos | KEEP `/show-me` + `/issuer` HowItWorks/BadgeBuilder; ARCHIVE V2 walkthrough as authority; REUSE V2 `badge/*` core only |
| Claims | HowItWorks Issue/Verify and BadgeBuilder are **illustrative**, not live API success |

Superseding any lock requires an **adopted decision** under `docs/landing-page-excellence/decisions/`.

## When to use

- Homepage / `/show-me` / `/issuer` / funnel CTAs
- Landing copy, IA, visual polish, motion, a11y, perf, SEO, QA
- Choosing Magics UI / Aceternity / shadcn / Motion / Lighthouse / Playwright for landing
- Writing or reviewing an **implementation plan** from the excellence docs
- Agent work that would otherwise invent a second landing stack

## When not to use

- App v2 product UI (use brand guide + app handoff; not this funnel program)
- Blog CMS content unrelated to the marketing funnel
- Deleting archived `src/ui/landing/*` trees without a dedicated cleanup decision

## Workflow

Copy and track:

```
Landing Excellence:
- [ ] 1. Read locks + shared context
- [ ] 2. Identify mode (plan / research / design-doc / implement / verify)
- [ ] 3. Load only the needed reference files below
- [ ] 4. Cite requirement IDs (AUD/UX/CNT/VIS/MOT/A11Y/SEO/TECH/PERF/QA)
- [ ] 5. Respect non-goals and adoption buckets
- [ ] 6. Stop at docs if no approved implementation plan + requirements approved
```

### Mode: plan (default until plan approved)

1. Read `implementation/2026-07-22-recommendations-and-next-steps.md`
2. Follow its reading order and suggested plan shape
3. Output a **separate implementation plan** (scope in/out, P0→P2 slices, evidence, rollback) — do **not** start visual redesign or new component stacks unless the user explicitly approves that plan

### Mode: research / shortlist

1. Methodology: `research/methodology.md`
2. Catalogs: `research/github-ai-resources/`, `research/ui-ux-resources/`
3. Apply [tools.md](tools.md) buckets: `adopt-now` | `evaluate` | `reference-only`
4. Never treat a shortlist as authorization to ship code

### Mode: design / copy (docs or comps only)

1. Concept A section jobs + CTA ladder — see [concept-a.md](concept-a.md)
2. Brand + rejected patterns — see [brand-and-cautions.md](brand-and-cautions.md)
3. Requirements under `requirements/01`–`05` for AUD/UX/CNT/VIS/MOT
4. Prefer docs/images over production code until the implementation plan is approved

### Mode: implement (only after plan + requirements `approved`)

1. Touch only [canonical.md](canonical.md) paths
2. Map each change to requirement IDs + acceptance tests
3. Prefer agent brief sequence in `agent-briefs/README.md`
4. Quality tools from [tools.md](tools.md); isolate Lighthouse (no concurrent `yarn build` + `yarn next` corruption of `.next`)
5. No analytics until privacy/event contract (TECH-01)

### Mode: verify

1. Routes: `/`, `/show-me`, `/issuer` (keyboard, axe, Playwright smoke)
2. Lighthouse: median of **3 cold mobile** runs in production mode
3. Evidence under program docs; WCAG 2.2 AA; hero budget + brand test

## Hard non-goals

- Revive `ModernLanding` / `V2Landing` / SB7 as homepage authority
- Equal issuer/developer hero
- Neon/dark SaaS / purple-glow / wholesale Aceternity·Magic UI themes
- Heavy Three.js/WebGL hero by default
- Analytics capturing badge/wallet/email/free text
- Claiming real mint/verify from illustrative demos
- Unknown-license installable skills without verification

## Priority backlog (when implementing)

**P0:** A11Y structure + keyboard funnel; CNT-02 demo truth; UX-07/TECH-02 link registry  
**P1:** Hero budget; CTA hierarchy; `/show-me` QA; SEO identity; fonts/SVG/Lighthouse; motion + reduced-motion; privacy before analytics  
**P2:** ≤2 evaluated micro-interactions restyled to Warm Index; optional Storybook

Full table: `implementation/2026-07-22-recommendations-and-next-steps.md`

## Vendored GitHub skills

77 catalog-derived skills are installed under `.claude/skills/` (see `<github-skills-index>`).
Use them as evaluate/reference helpers (a11y, copy, frontend patterns, planning).
They do **not** override these product locks. Refresh: `python .claude/skills/sync-github-skills.py`.

## Progressive references (read on demand)

| File | Use when |
|---|---|
| [canonical.md](canonical.md) | File ownership, KEEP/REUSE/ARCHIVE |
| [concept-a.md](concept-a.md) | Section jobs, CTA ladder, demo scope |
| [brand-and-cautions.md](brand-and-cautions.md) | Warm Index rules + rejected patterns |
| [tools.md](tools.md) | Adopt / evaluate / reference-only matrix |
| [requirements-map.md](requirements-map.md) | ID prefixes → requirement files |

## Authority chain

1. Adopted decisions in `docs/landing-page-excellence/decisions/`
2. Brand guide `docs/design-system/andamio-brand-guide.md` + `src/ui/system/tokens.ts` / `kit.tsx`
3. Requirements package (once `approved`)
4. Shortlists / catalogs (recommend only)
5. Legacy `src/ui/landing/*` (reference only, except V2 badge core)
