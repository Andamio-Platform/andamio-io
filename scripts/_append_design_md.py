# Append remaining sections to design.md
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "design.md"

APPEND = r'''
## 5. First-impression choreography — USER-DIRECTED

### 5.1 Goal

Within the first viewport and the first 30–90 seconds of interaction, a visitor should:

1. Recognize Andamio’s credential badge as the subject.
2. Understand it is not a picture badge / rental database row.
3. Be able to inspect anatomy (rings / provenance / proof).
4. Glimpse lifecycle (define → evidence → review → claim / verify).
5. Optionally customize one bounded field (title, module, palette, or interior) and see the artifact respond.
6. Reveal an intent that routes them onward — without a generic persona splash as the opening move.

### 5.2 Hero composition budget — REQUIRED UX-02 / VIS-02 / VIS-03

First viewport contains only:

- Brand (wordmark / name at hero level)
- One headline
- One short supporting sentence
- One CTA group
- One dominant interactive specimen plane

Forbidden in first viewport:

- Stats strips
- Card grids
- Feature icon rows
- Floating promo chips / stickers
- Schedules, address blocks, “this week” callouts
- Equal issuer/developer columns
- API code blocks as the hero subject

### 5.3 Interaction layers (all required in the experience)

The owner directed that visitors should get anatomy, lifecycle, and customization together as a personalized product introduction. Implement as **progressive layers**, not three simultaneous competing panels.

#### Layer A — Presence (0–3s)

- Badge enters as a museum specimen (static or restrained reveal).
- Reduced-motion: final composed state immediately; no sideways thrash.
- Caption establishes reality: real credential / rings encode origin and certification.

#### Layer B — Anatomy / proof (on intentional inspect)

Visitor can focus/hover/tap regions to learn:

| Zone | Teaches |
|---|---|
| Outer ring | Course / program identity encoding |
| Inner ring | Learning targets / SLT hash encoding |
| Title / module fields | Human-readable meaning |
| Network / verified marks | Provenance / verification posture |
| Plate / frame | Specimen seriousness (not app chrome) |

Use existing annotation concepts from `annotation-data.ts` (OUTER_RING, INNER_RING, etc.) as content truth.

#### Layer C — Lifecycle reveal

Without leaving the hero experience, show a compact, legible lifecycle:

Define → Evidence → Review → Claim → Verify

This can be:

- a sequential spotlight on the artifact, or
- a quiet step rail beside the specimen, or
- a guided “look inside” chapter that expands below the fold

It must not become a dense dashboard.

#### Layer D — Bounded customization

Allow **one small, reversible customization moment** on the homepage:

Examples of acceptable bounds:

- Change module title text and watch ring geometry update (illustrative hash path), or
- Toggle palette / interior light vs inverted, or
- Focus a single SLT line

Hard limits:

- Do not put the full `/issuer` BadgeBuilder console in the homepage hero.
- Label clearly if generated preview hashes are illustrative.
- Prefer pristine state to show the **real Getting Started credential** before edits.
- Provide reset-to-real-credential.

#### Layer E — Progressive intent disclosure

After exploration (or via an explicit continue control), ask for intent in product language, not marketing persona language.

Prefer prompts like:

- “I need to issue better credentials.”
- “I want to build with this.”
- “I want the principles / story.”

Avoid opening with:

- “I’m a busy executive”
- “I’m a developer / I’m an issuer” as the first screen content

### 5.4 Default path without interaction

Visitors who do not click must still understand the product by scrolling:

1. Artifact + truth
2. Why ordinary badges fail (rental / picture / noise) — concise
3. Four properties
4. How path teaser → `/issuer#how-it-works`
5. Secondary developer path
6. Ecosystem honesty
7. Closing walkthrough primary

No-click path is mandatory. Interaction deepens; it does not gate comprehension.

### 5.5 Motion signature for the opening — ADOPTED feel + USER-DIRECTED use

Brand motion signature (museum withhold → reveal):

- offset `["start end","center center"]`
- badge X `60% → 0%`
- opacity 0→1 by progress 0→0.55
- frame width `44% → 100%`
- SSR-safe at progress 0

`SpecimenReveal` exists in `kit.tsx` and is demonstrated on `/explore/system` and `/brand`, but is **not** currently used on live `/`. This redesign should either:

- adopt that signature on `/`, or
- invent a sibling signature that preserves the same *withheld → deliberate resolve* feel while supporting interactivity.

**REQUIRED MOT-01:** 2–5 intentional motions total on funnel.
**REQUIRED MOT-02:** every motion has a reduced-motion equivalent.
**REQUIRED MOT-05:** no Three.js/WebGL homepage hero without a superseding decision.

### 5.6 Mobile first-impression constraints

- Specimen remains dominant; do not stack five teaching panels above the fold.
- Prefer: badge → one sentence → primary CTA → “Inspect” control that opens a focused overlay/sheet for anatomy.
- Touch targets ≥ comfortable size; BadgeBuilder-level density belongs on `/issuer`, not homepage hero (A11Y-07).
- Height budget must respect `100svh - nav-clear`.

---

## 6. Personalized journey model — USER-DIRECTED

### 6.1 Model: progressive self-selection

Personalization is **earned through product interaction**, then made explicit by visitor choice.

```text
[Enter /]
   → meet credential
   → inspect / lifecycle / light customize
   → continue
   → choose intent (issuer | build | principles/curious)
   → adapted next sections + route exits
```

### 6.2 State machine (conceptual)

| State ID | Meaning | UI consequence |
|---|---|---|
| `S0_arrive` | No intent known | Product-first hero; no persona chrome |
| `S1_exploring` | Interacting with badge layers | Teaching UI; still no hard persona split |
| `S2_intent_issuer` | Chose issuer intent | Emphasize `/issuer`, walkthrough, properties, use cases |
| `S2_intent_builder` | Chose builder intent | Emphasize `/developers`, docs/API, quieter issuer proof link |
| `S2_intent_curious` | Chose principles/curious | Emphasize papers, principles, roadmap, use cases |
| `S3_deep` | On destination route | Route template; retain back-path to product |

### 6.3 Privacy rules for personalization — REQUIRED TECH-01 spirit

- Session-local only by default.
- Explicit choices only (no silent profiling).
- Do not store badge field contents, wallet/credential addresses, emails, or free text for personalization.
- No cross-session identity stitching without privacy approval.
- If analytics later exists, use stable CTA/state IDs, not content payloads.

### 6.4 Relationship to `/show-me`

**RECOMMENDED:** treat `/show-me` as the deep narrative continuation of progressive self-selection, not as a cold persona quiz immediately after a static hero.

Options the designer may propose (pick one and justify):

1. **Route continuation:** homepage exploration CTA → `/show-me` already in an intent-aware chapter.
2. **Inline then route:** homepage handles S0–S2; `/show-me` becomes optional deep story.
3. **Unified experience:** `/show-me` content partially lands on `/` as expandable chapters; route remains for shareable deep links.

Whichever option: preserve recovery (back, close, Escape → home or doors) — REQUIRED UX-05.

### 6.5 Conversion ladder (unchanged economics) — ADOPTED

| Level | Issuer | Developer |
|---|---|---|
| L0 orient | Understand permanent/useful/owned/proof | Understand REST credential primitives |
| L1 self-select | Enter issuer evaluation path | Enter developer resources |
| L2 evaluate | Inspect HowItWorks / BadgeBuilder | Read docs / tools |
| L3 intent | Walkthrough mailto or issuer app | Open integration resource |
| L4 confirmed | Owned booking/workspace success only | API key + first authenticated request |

`mailto:` is L3 intent, not L4 — REQUIRED CNT-03.

### 6.6 CTA hierarchy — REQUIRED UX-03

1. Product continue / Show me / issuer evaluation
2. Walkthrough or Start issuing
3. Developer Build / Docs
4. Community Discord

Discord must not outrank issuer walkthrough / Start issuing without measurement evidence (CNT-04).

Stable analytics IDs from funnel audit should be preserved or mapped explicitly when labels change.

---

## 7. Recommended homepage information architecture

### 7.1 Section jobs (redesigned `/`)

| Order | Section job | Content budget | Interaction | Primary CTA |
|---|---|---|---|---|
| 1 | **Product presence** | Brand, one headline, one support line, specimen | Inspect/customize layers | Continue / Show me |
| 2 | **Why ordinary badges fail** | Rental / picture / noise — tight | Optional expand | none or subtle |
| 3 | **What this credential is** | Permanent / useful / yours / proof | Linked to artifact states | See how it works → `/issuer` |
| 4 | **How path teaser** | One paragraph + demo promise | Preview lifecycle | `/issuer#how-it-works` |
| 5 | **Intent gate** (if not completed in hero) | 2–3 product-language choices | Sets S2 state | Routes or adapts below |
| 6 | **Adapted path module** | Issuer *or* builder *or* curious emphasis | Session-local | Context CTA |
| 7 | **Ecosystem honesty** | Portable / data ownership / community; agent as coming soon | Minimal | Pattern / Discord secondary |
| 8 | **Close** | Trust thesis + walkthrough primary | none | Walkthrough; Discord secondary |

### 7.2 Anti-patterns for homepage sections

- Do not duplicate full `/issuer` demo.
- Do not duplicate full `/developers` API reference.
- Do not add logo clouds as proof substitutes for credential mechanics.
- Do not use “Agent ready” as a fake primary value if still coming soon; honesty > hype.
- Do not create a second hero mid-page.

### 7.3 Content truth to retain while restructuring — REQUIRED CNT-01..05

Retain:

- Credential badge as subject
- Unique principles / ownership / proof
- Define–evidence–review–claim cycle
- Illustrative demo boundaries
- Walkthrough as intent
- Two products: Issuer (org) and API (developers), priced separately

Editable:

- Sentence rhythm
- Section order details
- Density
- Teaching microcopy around rings

---

## 8. Full marketing-route design system

### 8.1 Shared chrome — RECOMMENDED

Unify:

- Top nav + secondary CTA consistency across Pages and App Router shells
- Footer columns and legal
- Skip link + `<main>` on all funnel and primary marketing routes (A11Y-01)
- One external-link registry (UX-07 / TECH-02)
- One social identity (SEO-02)

### 8.2 Route templates

Design AI should define 4 templates:

1. **Product theater** — `/` (interactive artifact)
2. **Narrative chamber** — `/show-me` (focused, recoverable)
3. **Proof workbench** — `/issuer` (demo + conversion)
4. **Documentation product page** — `/developers`, `/cli`, `/bot`, `/pricing`, papers, about

Secondary templates:

5. **Evidence gallery** — use cases / customers
6. **Follow-along** — blog / roadmap
7. **Legal**

### 8.3 Cross-route continuity

| From | To | Continuity requirement |
|---|---|---|
| `/` product theater | `/show-me` | Carry intent if known; don’t reset comprehension |
| `/` or `/show-me` | `/issuer` | Land on proof; support `#how-it-works` |
| `/issuer` | `/` | Back to overview / product theater |
| Builder exits | `/developers` / docs / API | Visually quieter than issuer conversion |
| Curious exits | `/papers` / use cases / roadmap | Principles tone, not sales pressure |

### 8.4 Keep / merge / retire summary

See §2.5. Highest cleanup priorities:

1. Retire `/summit` staleness
2. Fix `/contact` Discord staleness
3. Fix `/pricing` CTA label mismatch
4. Clean `/use-cases` legacy V2 motion import
5. Decide customers vs use-cases overlap

---

## 9. Visual direction — Warm Index disciplined evolution — USER-DIRECTED + ADOPTED

### 9.1 DNA that must survive

| Element | Rule |
|---|---|
| Surface | Ink on paper; light editorial lead |
| Orange `#FF6B35` | Brand mark, one primary CTA/view, live pulse, VERIFIED |
| Blue `#2F6BFF` | Links, nav-active, data only — never button fill |
| Coral tint | Specimen plate only |
| Type | Inter 600 / −0.045em; JetBrains Mono labels/data; no serif |
| Geometry | Square (radius 0) |
| Spacing | Role-driven 4px grid |
| Measure | ~1320px marketing |

### 9.2 What “disciplined evolution” allows

Allowed:

- Richer paper texture / subtle material depth
- Stronger specimen lighting, shadow, and plate craft
- New compositional geometries for the interactive badge theater
- Tighter editorial layouts; more expressive whitespace rhythm on `/`
- Refined motion between layers
- Better mobile specimen choreography

Not allowed without brand decision:

- New primary accent colors
- Serif display faces
- Rounded-pill system language
- Dark-neon marketing lead
- Replacing Inter/JetBrains as defaults

### 9.3 Orange wordmark-in-headline exception — OPEN (v1.1 draft)

Brand guide v1.1 draft allows orange on a product/brand wordmark inside a display headline (e.g., “credential badge”). Treat as allowed if used as **one accent idea**, not arbitrary emphasis. Owner sign-off still pending for formal brand lock.

### 9.4 Contrast — REQUIRED VIS-05

- Orange on white ≈ 3:1 — fill/large text only; not small body text
- Blue on white ≈ 4.5:1 — OK for links
- Ink on paper excellent
- Never encode meaning by color alone

### 9.5 Imagery

Primary imagery = credential artifact and its states.
Secondary = restrained diagrams of lifecycle / stack.
Avoid stock handshake photos, generic dashboard mockups, and fake 3D crystals.

---

## 10. Interaction and motion language

### 10.1 Intentional motion set — REQUIRED MOT-01

Ship 2–5 motions, for example:

1. Specimen reveal / resolve
2. Anatomy focus transition
3. Lifecycle step change
4. Soft hover/focus feedback on controls
5. Optional page-section enter (very restrained)

### 10.2 Reduced motion — REQUIRED MOT-02 / A11Y-04

For each motion, specify:

- Instant final state, or
- Crossfade opacity only, or
- Static diagram equivalent

Live pulse must have a static equivalent (label/icon), not color-only blinking.

### 10.3 Interaction states to design

- Default pristine credential
- Hover/focus ring zone
- Active teaching panel
- Customizing (dirty) state with reset
- Intent selected
- Disabled coming-soon
- Error/empty customization input
- Zoomed specimen (modal/dialog pattern already in BadgeBuilder)

### 10.4 Micro-interaction borrowing limits — REQUIRED MOT-04 / VIS-06

At most **two** evaluate-bucket micro-interactions from Magic UI / React Bits / Aceternity.

Each must:

- be restyled to Warm Index
- pass reduced-motion
- pass Lighthouse budgets
- teach something product-specific

Otherwise remove.

### 10.5 Performance constraints on interaction — REQUIRED PERF-*

- Homepage interactive badge must not blow `/` first-load JS budget (≤160 kB target)
- Prefer progressive enhancement: static SVG first, interactive module deferred
- Optimize LCP SVG (PERF-04)
- Bound fonts (PERF-03)
- Avoid multiple inline badge font payloads on first paint

---

## 11. Component and content contracts

### 11.1 Canonical implementation targets — ADOPTED

| Role | Path |
|---|---|
| Home | `src/pages/index.tsx` → `src/ui/system/AndamioLanding.tsx` |
| Show-me | `src/pages/show-me.tsx` → `src/ui/system/StoryFork.tsx` |
| Issuer | `src/pages/issuer.tsx` → `AndamioIssuer.tsx` + `HowItWorks.tsx` + `BadgeBuilder.tsx` |
| Kit/tokens | `src/ui/system/kit.tsx`, `tokens.ts` |
| Copy | `src/ui/explore/content.ts` |
| Badge core | `src/ui/landing/V2Landing/badge/*` |
| Styles | `src/styles/globals.css` |
| SEO | `src/components/site/metatags.tsx`, `src/lib/seo.ts` |

### 11.2 Existing primitives to reuse

- `Page`, `Section`, `Display`, `Button`, `ButtonRow`, `ArtifactPlate`, `SpecimenReveal`, `Footer`, `Brand`
- `BadgeBuilder` patterns (console, zoom dialog, ring focus) — extract conceptual patterns for homepage lite version
- Annotation copy in `annotation-data.ts`

### 11.3 New conceptual components the design may introduce

Names are conceptual; implementation later:

1. **CredentialTheater** — homepage interactive specimen shell
2. **RingInspector** — anatomy teaching layer
3. **LifecycleRibbon** — compact define→verify teaching
4. **IntentContinue** — progressive self-selection control
5. **PathModule** — adapted post-intent section
6. **ClaimFence** — consistent illustrative-demo labeling pattern

### 11.4 Strict exclusions — ADOPTED

Do not extend as authorities:

- `ModernLanding/*`
- `V2Landing` page/walkthrough/verifier (except badge core + annotation data)
- `SB7PageLanding.tsx`
- shadcn `badge.tsx` chip as if it were Proof Rings

### 11.5 Dual-system risk warning

Marketing Warm Index (`--sys-*` / kit) and shadcn theme tokens coexist. Design must specify Warm Index for marketing surfaces. Do not accidentally inherit shadcn rounded/`secondary` blue-fill patterns on funnel pages.

---

## 12. Copy and voice system

### 12.1 Voice — ADOPTED

Confident, plain, technical-but-human. No hype. No blockchain-maximalism. One important thing, then stop.

### 12.2 Claim register (do / don’t)

| Claim type | Allowed? | Notes |
|---|---|---|
| Permanent / useful / owned / proof | Yes | Core truth |
| Work and review travel inside credential | Yes | Differentiator |
| Illustrative issue/verify in demo | Yes, if labeled | CNT-02 |
| Real mint from homepage demo | No | |
| “Booked walkthrough” from mailto | No | L3 only |
| Surveillance analytics of badge shares | No | Opposite of “Your data” |
| OB3 interop | Yes, carefully | Don’t overclaim signing maturity |
| Cardano mainnet live / audited | Yes, as factual meta | Footer already states TxPipe audit |

### 12.3 Terminology

Prefer:

- credential badge / Andamio credential
- issuer / earner / reviewer
- define, evidence, review, claim, verify
- permanent, useful, yours/owned, proof

Avoid as lead language:

- soulbound
- proof of work (ambiguous/wrong frame)
- NFT-first framing
- “web3” hype diction

### 12.4 CTA language patterns

- Product: “Show me”, “Look inside”, “See how it works”
- Issuer intent: “Book a 20-minute walkthrough”, “Start issuing credentials”
- Developer: “Build on Andamio”, “Docs”, “API reference”
- Community: “Join the Discord” (secondary)

---

## 13. Accessibility and responsive specification

### 13.1 Target — REQUIRED A11Y-05

WCAG 2.2 AA on funnel routes.

### 13.2 Must-pass items

| ID | Requirement |
|---|---|
| A11Y-01 | Skip link + one `<main>` on `/`, `/show-me`, `/issuer`, `/developers` |
| A11Y-02 | HowItWorks full WAI-ARIA tabs pattern |
| A11Y-03 | Keyboard-complete L0–L3 funnel |
| A11Y-04 / MOT-02 | Reduced-motion equivalents |
| A11Y-06 | Focus visible; not obscured by sticky nav |
| A11Y-07 | Operable touch targets; homepage lite controls usable at 375px |
| A11Y-08 | No horizontal overflow at 320px; reflow at 400% zoom |

### 13.3 Personalized UI a11y

- Intent changes must be announced to screen readers (live region or clear heading update)
- Ring inspector must be keyboard operable; not hover-only
- Zoom/dialog patterns need focus trap + Escape
- Customization inputs need labels and reset affordance

### 13.4 Responsive breakpoints to design

320 · 375 · 768 · 1024 · ≥1440, light lead (dark optional later)

---

## 14. Performance, SEO, privacy specification

### 14.1 Performance budgets — REQUIRED

| ID | Budget |
|---|---|
| PERF-01 | `/` ≤160 kB first-load JS; `/issuer` ≤175; `/show-me` ≤180; shared ≤125 (or ratified exception) |
| PERF-02 | Field p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 when telemetry exists |
| PERF-03 | Bound fonts to Inter + JetBrains Mono; evaluate Fontsource |
| PERF-04 | Optimize LCP SVGs |
| PERF-05 | Lighthouse median ≥90 ×4 categories ×3 cold mobile runs on `/`, `/issuer`, `/show-me` |
| PERF-06 | Single toaster system |

Caveat: unthrottled local DevTools numbers are not baselines. Isolate builds; avoid concurrent `.next` corruption.

### 14.2 SEO — REQUIRED

| ID | Rule |
|---|---|
| SEO-01 | Explicit `/show-me` index policy (sitemap **or** intentional noindex) — OPEN owner confirm |
| SEO-02 | One official social handle everywhere |
| SEO-03 | Production OG asset verification |
| SEO-04 | Unique title/description/canonical/OG/Twitter per canonical route |

### 14.3 Privacy / analytics — REQUIRED TECH-01 / QA-07

No analytics until privacy/consent/retention/ownership approved.

Forbidden payloads forever without exceptional legal approval:

- badge inputs
- wallet/credential addresses
- email body
- free text

Personalization in this redesign is session-local explicit choice only.

---

## 15. Research synthesis (tools and craft sources)

### 15.1 Adopt-now

Motion, Playwright, Lighthouse, axe-core, WebAIM, SVGOMG, shadcn patterns (interaction only), prefers-reduced-motion guidance, optional reg-suit / Storybook if review cost justified.

### 15.2 Evaluate (bounded)

Launch UI (structure only), Magic UI / React Bits / Aceternity (≤2 micro-interactions, restyled), Fontsource, playwright-mcp, context7, obra/superpowers workflow skills.

### 15.3 Reference-only

Credly, Accredible, Lapa Ninja, gallery sites, Tailwind defaults as brand, awesome-copilot dumps until reviewed.

### 15.4 Catalog scale

- 75 verified GitHub AI resources
- 87 UI/UX websites/tools
- Vendored skills under `.claude/skills/` with prefixes `obra-`, `anthropic-`, `ms-`, `ecc-`, `tob-`, `arz-`, `ghcp-`, `davila-`
- Project authority skill: `landing-excellence`

Vendor skills never override this brief’s product/brand locks.

---

## 16. Deliverables expected from the design AI

Produce, in order:

1. **One-page thesis poster** — credential-first statement + anti-slop pledges
2. **Sitemap + route disposition table** (keep/merge/retire)
3. **Journey / state model** (S0–S3) with recovery
4. **Homepage wireframes** (320 / 768 / 1440) for layers A–E
5. **Interaction storyboard** for anatomy + lifecycle + customization + intent
6. **Visual system evolution board** (Warm Index DNA + allowed evolutions + forbidden examples)
7. **High-fidelity homepage comps** (light lead)
8. **`/show-me` and `/issuer` comps** showing continuity
9. **Secondary route template comps** (at least developers + pricing + use-cases)
10. **Motion spec** with reduced-motion equivalents
11. **Content matrix** (what copy is kept/edited/new; claim fence notes)
12. **Accessibility annotations** on comps
13. **Design QA self-score** against §17
14. **Open questions list** for owner

Do not deliver only moodboards. Do not deliver kit-clone mockups with Andamio logo pasted on.

---

## 17. Acceptance criteria and design-review scorecard

Score each 0–2 (0 fail, 1 partial, 2 pass). Ship design direction only if total ≥ 40/48 and no P0 item is 0.

### 17.1 P0 gates (must not be 0)

| Gate | IDs | Pass means |
|---|---|---|
| Product-first opening | USER-DIRECTED, VIS-02, UX-02 | Badge is protagonist; no persona-first hero |
| Issuer commercial priority | AUD-01, UX-03 | Issuer conversion still primary after personalization |
| Claim fence | CNT-02, CNT-03 | No fake mint/booking claims |
| Warm Index DNA | VIS-01, VIS-04 | Accents/type/geometry held |
| No WebGL default hero | MOT-05 | Specimen/SVG/Motion path |
| A11y architecture | A11Y-01..05 | Spec shows keyboard/SR/reduced-motion plan |
| Hero budget | UX-02, VIS-03 | No hero clutter |

### 17.2 Full scorecard

| # | Criterion | Related IDs | Score |
|---|---|---|---|
| 1 | Credential protagonist clarity | VIS-02 | |
| 2 | Anatomy teaching quality | USER-DIRECTED | |
| 3 | Lifecycle teaching quality | CNT-01 | |
| 4 | Bounded customization quality | USER-DIRECTED, CNT-02 | |
| 5 | Progressive self-selection (not persona splash) | USER-DIRECTED, AUD-03 evolved | |
| 6 | No-click comprehension path | UX-02 | |
| 7 | Issuer CTA hierarchy | UX-03, CNT-04 | |
| 8 | Developer secondary depth | AUD-02, UX-06 | |
| 9 | `/issuer` continuity | UX-04 | |
| 10 | `/show-me` recovery | UX-05 | |
| 11 | Anti-slop distinctiveness | VIS-06, rejected patterns | |
| 12 | Warm Index evolution discipline | VIS-01..04 | |
| 13 | Motion intentional + reduced-motion | MOT-01..02 | |
| 14 | Responsive plan 320→1440 | A11Y-08 | |
| 15 | Perf awareness (JS/LCP/fonts) | PERF-01..04 | |
| 16 | SEO/metadata awareness | SEO-01..04 | |
| 17 | Privacy-safe personalization | TECH-01 | |
| 18 | Route disposition completeness | §2.5 / §8 | |
| 19 | Copy claim register respected | CNT-* | |
| 20 | Deliverables complete (§16) | QA mindset | |
| 21 | Verification matrix awareness | V-* | |
| 22 | Legacy exclusions respected | UX-01 | |
| 23 | Mobile specimen usability | A11Y-07 | |
| 24 | Beautiful specificity (not generic) | brand test | |

---

## 18. Open decisions, assumptions, caveats

### 18.1 OPEN owner decisions before implementation

1. Approve requirements package (`in-review` → `approved`).
2. Confirm `/show-me` indexability policy (SEO-01).
3. Approve privacy/event contract before analytics (TECH-01).
4. Confirm official Twitter/X handle (SEO-02).
5. Confirm API reference host ownership (TECH-02 / UX-07).
6. Decide fate of structural commits already on `dev`.
7. Sign off brand guide v1.1 draft items (wordmark-orange exception; shadcn governance).
8. Choose `/show-me` integration option from §6.4.
9. Confirm retire/merge list for stale routes (`/summit`, `/contact`, customers overlap).

### 18.2 Assumptions used in this brief

- Homepage remains the highest-priority surface.
- Issuer remains commercially primary even though opening is product-first.
- Proof Rings badge remains the visual system centerpiece.
- Canonical code stays in `src/ui/system` + `content.ts`.
- Design may evolve Warm Index expression without inventing a new brand.

### 18.3 Do not proceed if…

Stop and ask the owner if the design proposal:

1. Opens with a persona/dual-rail/API hero instead of the credential.
2. Makes developer and issuer visually equal in the first viewport.
3. Uses neon/dark/purple-glow kit aesthetics as the lead look.
4. Claims real issuance/verification from illustrative UI.
5. Requires WebGL/Three.js for the homepage hero.
6. Depends on silent tracking for personalization.
7. Revives archived V2/ModernLanding/SB7 as authority.
8. Fails the brand test (nav removed → could be any SaaS).

---

## 19. Repository reference appendix

### 19.1 Canonical code

- `src/pages/index.tsx`
- `src/ui/system/AndamioLanding.tsx`
- `src/ui/system/StoryFork.tsx`
- `src/ui/system/AndamioIssuer.tsx`
- `src/ui/system/HowItWorks.tsx`
- `src/ui/system/BadgeBuilder.tsx`
- `src/ui/system/kit.tsx`
- `src/ui/system/tokens.ts`
- `src/ui/explore/content.ts`
- `src/styles/globals.css`
- `src/components/site/metatags.tsx`
- `src/lib/seo.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

### 19.2 Badge / assets

- `public/andamio-credential-badge.svg`
- `public/logo-with-typography.svg` (+ variants)
- `public/andamio.png`
- `src/ui/landing/V2Landing/badge/` (`buildBadgeSvg`, palettes, fonts, README)
- `src/ui/landing/V2Landing/annotation-data.ts`
- `scripts/badge-parity-check.mjs`

### 19.3 Decisions / requirements / audits

- `docs/design-system/andamio-brand-guide.md`
- `docs/design-system/app-v2-handoff-brief.md`
- `docs/landing-page-excellence/README.md`
- `docs/landing-page-excellence/decisions/2026-07-21-concept-direction.md`
- `docs/landing-page-excellence/decisions/2026-07-21-keep-reuse-archive.md`
- `docs/landing-page-excellence/implementation/2026-07-21-design-strategy.md`
- `docs/landing-page-excellence/implementation/2026-07-22-recommendations-and-next-steps.md`
- `docs/landing-page-excellence/implementation/component-map.md`
- `docs/landing-page-excellence/implementation/verification-matrix.md`
- `docs/landing-page-excellence/implementation/rollout-and-rollback.md`
- `docs/landing-page-excellence/requirements/01-audience-and-positioning.md` … `09-testing-acceptance.md`
- `docs/landing-page-excellence/audits/2026-07-21-*.md`
- `docs/landing-page-excellence/research/shortlists/adoption-matrix.md`
- `docs/landing-page-excellence/research/shortlists/rejected-and-cautions.md`
- `docs/landing-page-excellence/research/shortlists/ui-ux-shortlist.md`
- `docs/landing-page-excellence/research/shortlists/github-ai-shortlist.md`
- `docs/landing-page-excellence/agent-briefs/shared-context.md`

### 19.4 Skills

- `.claude/skills/landing-excellence/`
- `.claude/skills/github-skills-index/`
- `.claude/skills/seo-skill/`
- Vendored GitHub skills (evaluate/reference): see `github-skills-index`

### 19.5 Conversion / event vocabulary (proposed)

See funnel audit for full stable IDs. Critical homepage IDs:

- `home.hero_show_me`
- `home.issuer_learn_more`
- `home.issuer_walkthrough`
- `home.developer_build`
- `home.developer_docs`
- `home.closing` walkthrough / discord
- `/show-me` `show.door_*`, `show.issuer_*`, `show.builder_*`, `show.curious_*`
- `/issuer` `issuer.demo_*`, `issuer.*_walkthrough`

---

## 20. Final directive to the design AI

Design Andamio’s marketing site as if the **credential itself is the host**, welcoming visitors into its meaning.

Make it:

- **Unique** — because the artifact is real and inspectable
- **Beautiful** — through Warm Index craft and restraint
- **Interactive** — to teach anatomy, lifecycle, and light customization
- **Personalized** — through progressive self-selection, not persona clichés
- **Commercially clear** — issuers convert; developers go deep second
- **Honest** — illustrative demos stay illustrative; coming-soon stays coming-soon
- **Accessible and fast** — AA, reduced-motion, performance budgets

If a proposal could be reused for any other AI SaaS by swapping the logo, it is wrong for Andamio.

---

*End of design brief.*
'''

with OUT.open("a", encoding="utf-8") as f:
    f.write(APPEND)

print(f"appended -> {OUT} total={OUT.stat().st_size} bytes lines={sum(1 for _ in OUT.open(encoding='utf-8'))}")
