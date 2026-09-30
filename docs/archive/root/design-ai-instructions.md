# Additional Instructions for the Design AI

**Use with:** repository + [`design.md`](design.md)  
**Purpose:** Creative priorities and presentation preferences that amplify the brief.  
**Conflict rule:** If these instructions fight a hard lock in `design.md` (claims, a11y, anti-slop, no fake mint, Warm Index DNA), **`design.md` wins**. If they only intensify craft, motion, and interactivity, follow these.

---

## Paste this to the AI

```text
You are designing the Andamio marketing site UI/UX.

Primary inputs:
1) This repository
2) design.md at the repo root (authoritative product, brand, route, and acceptance brief)

Read design.md fully before proposing visuals. Then apply the ADDITIONAL CREATIVE DIRECTION below.

============================================================
ADDITIONAL CREATIVE DIRECTION (OWNER PRIORITIES)
============================================================

### 1) Make it feel alive — not a static brochure
The landing page must feel interesting, premium, and alive.
- Components should move with purpose: enter, settle, respond, reveal.
- Scrolling should change the composition (parallax-lite, specimen resolve, section choreography).
- Hover/focus/press states should be crafted, not default.
- Idle states may have subtle life (e.g. soft specimen breathing, verified pulse, ring highlight) so the page never feels frozen.
- Motion must teach or emphasize hierarchy — never random decoration.

Do NOT ship a flat “docs page with a big PNG.”
Do NOT ship endless particle fields, emoji confetti, or meaningless loops.

### 2) The badge is the star — interactive AND kinetic
The Proof Rings credential badge is the protagonist of the first impression.
Design it so visitors can:
- see it move into place (withheld → revealed / museum resolve)
- inspect ring anatomy (interactive hotspots / focus zones)
- follow a short lifecycle reveal (define → evidence → review → claim / verify)
- lightly customize something and watch the badge respond
- zoom/inspect it like a specimen

The badge should feel physical and engineered: rings, plate, verified mark, captions.
Interaction + motion together. Not a static hero image with text beside it.

### 3) Beautiful, distinctive, anti-generic
Optimize for beauty through craft:
- editorial typography, spacing rhythm, material depth, specimen lighting
- ink/paper Warm Index DNA (orange sparingly, blue for wayfinding only, square geometry)
- composition that could not be a swapped-logo AI SaaS template

Hard rejects (from design.md — enforce them):
- neon / purple-glow / glassmorphism AI-slop
- generic dark SaaS dashboard look
- hero card grids, floating promo chips, stats strip clutter
- Three.js / WebGL hero by default
- Credly/Accredible marketplace clones

### 4) Theme preference: craft dark as a first-class experience
Warm Index brand DNA is ink-on-paper, but this product already supports theming.
Owner preference for the redesign presentation:
- Deliver BOTH light and dark comps with equal quality.
- For the primary “wow” presentation / hero mood, prefer a refined DARK Warm Index:
  deep ink surfaces, quiet paper contrast, disciplined orange, no neon.
- Light mode must still be excellent and on-brand (not an afterthought invert).
- Dark mode must NOT become cyberpunk purple/blue glow.
- Specimen/badge may sit in a forced light plate island when needed for credential legibility.

In short: dark is favorable for atmosphere and first impression boards, as long as it stays Warm Index and readable.

### 5) Progressive product exploration > persona splash
Do not open with “Are you an issuer or a developer?”
Open with the credential. Let interaction create personalization.
After exploration, offer intent choices in product language and adapt the journey.

Issuer conversion remains commercially primary; developers are secondary depth.

### 6) Motion budget — rich choreography, disciplined systems
You may design a richly animated page, but organize motion into clear systems (not 30 unrelated effects):
Suggested signature systems (aim for about 3–5 systems, many states inside them):
1) Specimen/badge kinetic system (enter, idle life, inspect, customize response)
2) Scroll narrative system (section reveals / frame resolve)
3) Teaching system (anatomy + lifecycle transitions)
4) Control feedback system (buttons, focus, intent selection)
5) Optional ambient atmosphere (LogoWash-level restraint only)

Every animated behavior needs a prefers-reduced-motion equivalent that still feels intentional and complete.

### 7) Homepage priority, full marketing awareness
Homepage is the first impression and highest priority.
Also design continuity for /show-me, /issuer, /developers, and recommend keep/merge/retire for other marketing routes as in design.md.
Do not ignore stale/broken UX noted in design.md.

### 8) Honesty constraints (non-negotiable)
- Illustrative demos must look/read as illustrative — never claim real mint/verify from UI toys.
- mailto walkthrough = intent, not “booked.”
- Coming soon stays coming soon.
- No silent tracking-based personalization.

### 9) Accessibility & performance still count
Beauty does not excuse inaccessibility or jank.
- WCAG 2.2 AA mindset
- Keyboard-operable badge inspection (not hover-only)
- 320px / mobile compositions required
- Prefer progressive enhancement: beautiful static first paint, then motion/interactivity
- Respect design.md performance budgets; defer heavy interaction modules

### 10) What to deliver first
1. Dark + light homepage hero comps with interactive badge storyboard
2. Motion/interaction storyboard for badge layers (anatomy, lifecycle, customize, intent)
3. Reduced-motion variants of the same
4. Then /show-me and /issuer continuity
5. Then broader route recommendations
6. Self-score against design.md §17 scorecard

Success test:
If I mute the sound of the brand and remove the logo, it should STILL feel like a specific credential product — living, inspectable, and premium — not a generic animated SaaS template.
```

---

## Short owner note (for you)

| Topic | What to tell the AI | Why |
|---|---|---|
| Dark mode | Favor refined dark for wow comps; still ship excellent light | Brand is paper-first, but dark can be atmospheric if it stays Warm Index (not neon) |
| Motion | Want a living page | Aligns with SpecimenReveal + interactive badge; keep reduced-motion |
| Interactivity | Badge must move *and* respond | Core differentiator vs static landings |
| Beauty | Craft > decoration | Matches anti-slop research in `design.md` |

If you want dark as the **default site theme** (not just the presentation mood), say that explicitly to the AI and mark it as an owner decision overriding “light lead” language in `design.md` §9 / §13.
