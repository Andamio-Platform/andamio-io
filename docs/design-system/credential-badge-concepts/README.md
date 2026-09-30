# Andamio credential badge concepts

**Status:** exploration · not shipped  
**Date:** 2026-07-23  
**Audience:** design + product + frontend  

Concept stills live in [`images/`](./images/). They are **not** under `public/` and are **not** served on the website.

---

## Problem

The live Proof Rings artifact (`src/ui/landing/V2Landing/badge/`) reads as a **coin / medallion**: circular field, concentric tick rings, cream core. That shape is familiar in crypto NFT aesthetics and physical medals, but weak as a **credential badge** — something you pin, share, verify, and own.

Yet the current system already has the right *idea*:

| Layer | Source | Role |
| --- | --- | --- |
| Outer ring ticks | `courseId` (hex → binary) | Course / program identity |
| Inner ring ticks | `sltHash` (hex → binary) | Assignment / learner proof |
| Core copy | course + module titles | Human-readable claim |
| Metadata | Open Badges 3.0 / VC JSON-LD | Machine-verifiable truth |

**Invariant we keep:** one shared design system; **every issued credential is visually unique** because hashes (and related on-chain anchors) drive generative geometry. Same silhouette for a cohort; different binary fingerprint per person / issuance.

---

## What the industry suggests

Digital credentials succeed when the **image + metadata** travel together (Open Badges / W3C Verifiable Credentials), and when the image stays readable at thumbnail size while staying on-brand ([Customize digital badges](https://www.verifyed.io/blog/customize-digital-badges), [What digital badges are](https://www.sertifier.com/blog/digital-badges/), [Digital badge design ideas](https://www.bcdiploma.com/en/blog/digital-badge-design-best-design-ideas-icons-and-templates-industry-examples)).

Useful patterns:

- **Skill-aligned shape / icon**, not a generic seal ([BCdiploma design guide](https://www.bcdiploma.com/en/blog/digital-badge-design-best-design-ideas-icons-and-templates-industry-examples)).
- **Theme color by credential family** (e.g. technical vs soft skill) while keeping issuer brand constants ([BCdiploma](https://www.bcdiploma.com/en/blog/digital-badge-design-best-design-ideas-icons-and-templates-industry-examples)).
- **Rich standardized metadata** attached to the visual ([VerifyEd](https://www.verifyed.io/blog/customize-digital-badges), [Sertifier](https://www.sertifier.com/blog/digital-badges/)).
- **Issuer-controlled render methods** so the same VC can be expressed as badge, card, or accessible readout ([VC Rendering Methods](https://w3c.github.io/vc-render-method/)).
- **Deterministic generative art from identity** so uniqueness is cryptographic, not decorative noise ([ETCH on-chain generative credentials](https://github.com/tyler-james-bridges/etch)).

Andamio already encodes hashes as geometry. The redesign goal is to make that encoding feel like a **badge of trust**, not a coin of value.

---

## Design principles (Andamio)

1. **Badge, not coin** — Prefer shields, cards, plaques, patches, tickets, scaffold frames. Avoid pure circular medallions as the default silhouette.
2. **Same system, unique instance** — Shared layout, type, and color rules; `courseId` / `sltHash` (and optional earner salt) drive the variable layer.
3. **Hashes are first-class** — Binary / hex should be *legible as proof*, not only decorative ticks. Always keep full hashes available on focus / inspect (never truncate in proof surfaces).
4. **Warm Index** — Scaffold blue `#175A72`, orange sparingly, teal wayfinding, ink/paper, Inter + JetBrains Mono, square DNA. Soft edges for motion; no neon purple glow.
5. **Scaffolding of trust** — Structure, joints, beams — not floating orbs.
6. **Motion has a job** — Animate the uniqueness layer (hash stream, tick hydrate, scaffold assemble), not random sparkle.
7. **Thumbnail test** — Title + issuer mark readable at ~88×88 ([Sertifier guidance](https://www.sertifier.com/blog/digital-badges/)).
8. **Standards-compatible** — Visual is a render of an OB3 / VC claim; do not imply fake mint/verify UI.

---

## Uniqueness encodings (shared across concepts)

Ideas for how **one template** stays unique per issuance:

| Code | Encoding | What moves |
| --- | --- | --- |
| U1 | **Binary margin** — `courseId` / `sltHash` as tick strips on edges | Ticks light in issuance order |
| U2 | **Scaffold density** — hash bits → joint density / beam opacity | Soft lattice breathes |
| U3 | **Glyph field** — hex mapped to mono glyph grid behind titles | Cells pulse on verify |
| U4 | **Ribbon weave** — bit runs as warp/weft in a banner | Weave shimmers along path |
| U5 | **Barcode + human hex** — machine strip + full hex on demand | Strip scrolls slowly |
| U6 | **Color fingerprint** — hash → hue offsets within Warm Index bounds | Accent drifts gently |
| U7 | **Path signature** — hash → Bézier / scaffold route behind mark | Path draws on load |
| U8 | **Stamp constellation** — hash → node positions in a small graph | Nodes blink in sequence |
| U9 | **Layer peel** — outer family color, inner earner pattern | Layers offset on hover |
| U10 | **Typographic salt** — title fixed; tracking / rule weight from hash | Hairlines animate width |

Current product uses **U1** on concentric rings. Concepts below explore non-coin carriers for the same idea.

---

## Ten concepts

### 01 — Heraldic shield · binary edge  
**File:** `images/01-heraldic-shield-binary-edge.png`  
Classic **badge** silhouette (shield), not a coin. Course title in Inter; module in stronger weight; full `COURSE_ID` / `SLT_HASH` in JetBrains Mono along the lower plate. Outer shield rim encodes `courseId` as binary notches; inner band encodes `sltHash`.  
**Motion:** notch lights cascade clockwise on reveal; verified pulse on the Andamio mark.

### 02 — Vertical credential card  
**File:** `images/02-vertical-credential-card.png`  
Passport / ID card: square-radius-free Warm Index plate. Top brand bar, large readable titles, hex block as the hero fingerprint, QR / verify affordance as quiet secondary. Side rail is a vertical binary strip from hashes.  
**Motion:** side-rail bits stream upward like a proof ticker; hex digits soft-highlight in chunks.

### 03 — Scaffold plaque (square)  
**File:** `images/03-scaffold-plaque.png`  
Square plaque framed by soft scaffold beams (brand metaphor). Center: typographic credential. Background joints densify from hash (U2).  
**Motion:** beams drift / assemble behind the plate; joints glow sparsely (orange rare).

### 04 — Ribbon banner badge  
**File:** `images/04-ribbon-banner-badge.png`  
Flat shield + ribbon (achievement badge vernacular from education platforms). Ribbon weave pattern = hash bits (U4). Titles sit in the shield body; mono hashes on the ribbon tails.  
**Motion:** ribbon weave shimmers; tails gently sway (CSS / SVG, reduced-motion static).

### 05 — Issue ticket / stub  
**File:** `images/05-issue-ticket-stub.png`  
Horizontal ticket with perforated stub. Main body = human claim; stub = truncated visual of hashes with “full proof on inspect.” Stub edge = barcode (U5). Feels issued, not minted as a coin.  
**Motion:** stub barcode scrolls; perforation dashes soft-flicker.

### 06 — Hex skill patch  
**File:** `images/06-hex-skill-patch.png`  
Hexagonal cloth-patch metaphor (skills ecosystems). Interior type stack; perimeter ticks = binary; corner pip color from credential family.  
**Motion:** perimeter ticks hydrate bit-by-bit; family pip breathes.

### 07 — Diagonal cut plate  
**File:** `images/07-diagonal-cut-plate.png`  
Asymmetric square plate with a diagonal information split: claim on one side, hash field on the other (U3 glyph grid). Strong “document of record” feel.  
**Motion:** glyph grid cells flicker in hash order; diagonal rule draws in.

### 08 — Typographic poster credential  
**File:** `images/08-typographic-poster.png`  
Editorial poster: oversized module title, course as eyebrow, Andamio wordmark quiet. Entire background is a soft hash glyph field (U3) — uniqueness is atmospheric, not a ring.  
**Motion:** background glyphs drift / reseed on idle; focus freezes them for readability.

### 09 — Bookplate stamp  
**File:** `images/09-bookplate-stamp.png`  
Rectangular ink stamp / bookplate (ownership metaphor — *you own this credential*). Ruled type, mono hashes as library call numbers. Border dashes from hash (U1 without circle).  
**Motion:** ink “sets” (opacity settle); border dashes print in sequence.

### 10 — Layered passport spread  
**File:** `images/10-layered-passport-spread.png`  
Two overlapping square sheets (issuer sheet + earner sheet). Shared titles; earner sheet carries unique hash constellation (U8). Reads as portable identity, not token.  
**Motion:** sheets offset on hover; constellation nodes pulse in hash sequence.

---

## Comparison to current Proof Rings

| | Current | Target direction |
| --- | --- | --- |
| Silhouette | Circle / coin | Badge, card, plaque, patch, ticket |
| Uniqueness | Ring ticks from hashes | Same data → edge, weave, grid, scaffold, constellation |
| Typography | Compact circular wrap | Clear hierarchy; hashes as proof block |
| Motion | Ring spin | Hash hydrate, scaffold assemble, ticker |
| Metaphor | Medallion | Scaffold of trust / owned credential |

**Do not throw away** the deterministic `ringTicks` math — re-home it onto linear rails, shield rims, ribbon weaves, or glyph grids.

---

## Motion guidelines (for any chosen concept)

- Prefer **2–3 intentional motions** on the hero (hydrate, soft drift, verify pulse).
- Respect `prefers-reduced-motion`: freeze to the final unique still.
- Pause when tab hidden (existing `is-page-hidden` pattern).
- Never animate core title text with CSS `scale` (known flicker on SVG text).

---

## Recommended next steps

1. Pick **2 silhouette directions** from the ten (suggest: **02 card** + **03 scaffold plaque**, or **01 shield** if “badge” vernacular matters most).
2. Prototype SVG generator variants beside `badge-generator.ts` without breaking canonical OB embed.
3. Keep `layout: "canonical" | "hero"` (or extend) so marketing scale ≠ wallet thumbnail.
4. Validate thumbnail + dark/light + axe contrast before funnel swap.

---

## Sources

- [How to Customize Digital Badges (VerifyEd)](https://www.verifyed.io/blog/customize-digital-badges)
- [What digital badges are and how to use them (Sertifier)](https://www.sertifier.com/blog/digital-badges/)
- [Digital Badge Design: Best Design Ideas (BCdiploma)](https://www.bcdiploma.com/en/blog/digital-badge-design-best-design-ideas-icons-and-templates-industry-examples)
- [Verifiable Credential Rendering Methods (W3C)](https://w3c.github.io/vc-render-method/)
- [ETCH — generative on-chain credentials](https://github.com/tyler-james-bridges/etch)
- [Open Badges 3.0 overview (Certifier)](https://certifier.io/blog/open-badges-3-0)

---

## Image index

| # | File | Silhouette |
| --- | --- | --- |
| 01 | `images/01-heraldic-shield-binary-edge.png` | Shield badge |
| 02 | `images/02-vertical-credential-card.png` | Vertical card |
| 03 | `images/03-scaffold-plaque.png` | Square plaque |
| 04 | `images/04-ribbon-banner-badge.png` | Shield + ribbon |
| 05 | `images/05-issue-ticket-stub.png` | Ticket |
| 06 | `images/06-hex-skill-patch.png` | Hex patch |
| 07 | `images/07-diagonal-cut-plate.png` | Asymmetric plate |
| 08 | `images/08-typographic-poster.png` | Poster |
| 09 | `images/09-bookplate-stamp.png` | Stamp / bookplate |
| 10 | `images/10-layered-passport-spread.png` | Layered sheets |

### Round 2 — logo-native expansions (2026-07-23)

Seeded from **02 / 07 / 08 / 09 / 10**, using real marks in `public/andamio-logo-no-white-overflow.png` and `public/andamio-logo-w-typography.jpg` (scaffold lattice, coral/teal rounds, triangle **A**). Goal: Andamio-unique credentials — generative uniqueness for each earner, not everyday badge templates.

| # | File | Parent | Idea |
| --- | --- | --- | --- |
| 11 | `images/11-card-living-logo-aperture.png` | 02 card | Logo as living scaffold aperture / watermark window |
| 12 | `images/12-card-earner-particle-fingerprint.png` | 02 card | Earner pass; logo rounds as hash fingerprint field |
| 13 | `images/13-plate-scaffold-beam-split.png` | 07 plate | Diagonal split by literal scaffold beam; logo → hash matrix |
| 14 | `images/14-plate-torn-reveal-underlayer.png` | 07 plate | Torn paper revealing on-chain scaffold underlayer |
| 15 | `images/15-poster-logo-galaxy-type.png` | 08 poster | Giant type over logo-galaxy generative field |
| 16 | `images/16-poster-andamio-as-scaffold-type.png` | 08 poster | ANDAMIO letterforms built from scaffold beams |
| 17 | `images/17-bookplate-logo-seal-exlibris.png` | 09 stamp | Real logo as embossed ownership seal |
| 18 | `images/18-bookplate-multi-stamp-hash-stack.png` | 09 stamp | Overlapping logo stamps = unique hash stack |
| 19 | `images/19-passport-logo-constellation-spread.png` | 10 passport | Hash constellation from logo lattice + rounds |
| 20 | `images/20-passport-fanned-dossier-holograph.png` | 10 passport | Fanned dossier sheets + holographic logo seal |

### Round 3 — futuristic facet cards from #12 (2026-07-23)

Seed: `12-card-earner-particle-fingerprint.png`. Shared rules:

- Still a **credential card**, denser info (DID, course/module, issued, network, issuer, skills, COURSE_ID, SLT_HASH, verify/QR).
- Outer edge encodes uniqueness as **binary tick lines** (lit/dim dashes) — not ASCII `0`/`1`.
- Silhouette is **faceted / notched / crystalline** — not plain rectangle, circle, or cube.
- Exact Andamio logo DNA; particle/scaffold center stays unique per earner.

| # | File | Edge silhouette |
| --- | --- | --- |
| 21 | `images/21-facet-card-tick-edge-rich.png` | Faceted crystalline card |
| 22 | `images/22-blade-edge-card-hash-ticks.png` | Blade / chevron side cuts |
| 23 | `images/23-crystal-edge-card-lit-bits.png` | Crystal fracture edge |
| 24 | `images/24-stepped-plate-card-proof-rail.png` | Stepped ziggurat plate |
| 25 | `images/25-winged-tech-card-dash-rim.png` | Winged tech notches |
| 26 | `images/26-hexcut-card-microbar-rim.png` | Hex-cut / honeycomb notches |
| 27 | `images/27-keydock-card-proof-ticks.png` | Keycard docks |
| 28 | `images/28-chevron-card-glass-panels.png` | Chevron / arrowhead card |
| 29 | `images/29-floating-tickframe-card.png` | Floating outer tick frame |
| 30 | `images/30-asymmetric-crystal-card-cascade.png` | Asymmetric crystal facets |

### Round 4 — circular Proof Rings futures (2026-07-24)

Circular credentials (current Proof Rings silhouette), denser info, outer uniqueness as **binary tick lines** (not ASCII `0`/`1`), careful radial hierarchy inside the core.

| # | File | Idea |
| --- | --- | --- |
| 31 | `images/31-circular-dual-tick-rings-info.png` | Dual tick rings + stacked core info |
| 32 | `images/32-circular-triple-ring-radial.png` | Triple rings + radial text bands |
| 33 | `images/33-circular-instrument-dial.png` | Precision instrument dial sectors |
| 34 | `images/34-circular-corona-data-rings.png` | Binary corona + data rings |
| 35 | `images/35-circular-scaffold-lattice-core.png` | Scaffold lattice ring + core card |
| 36 | `images/36-circular-cream-core-hash-arcs.png` | Cream core + hash text arcs |
| 37 | `images/37-circular-holograph-particle-core.png` | Holographic particle core |
| 38 | `images/38-circular-chronograph-trust.png` | Chronograph / trust watch face |
| 39 | `images/39-circular-glass-annulus-meta.png` | Glass metadata annulus |
| 40 | `images/40-circular-proof-rings-evolved.png` | Evolved multi-ring Proof Rings |
