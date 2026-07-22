# Temporary generator for root design.md — run once, then delete if desired.
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "design.md"

CONTENT = r'''# Andamio Marketing Design Brief

**File:** `design.md` (repository root)
**Version:** 1.0
**Date:** 2026-07-22
**Status:** Directive creative brief and design specification for a future UI/UX design AI
**Scope:** Homepage first; then the complete marketing route ecosystem
**Implementation status:** Documentation only. Do not implement UI from this file until a separate implementation plan is approved.

---

## 0. How to use this document

### 0.1 Audience

This file is written for an AI (or human) designer who will redesign Andamio’s public marketing experience. It is intentionally long and information-dense. Read it as the single source of creative and product authority for design work.

### 0.2 Standalone contract

This brief is **standalone-first**. It embeds the product truth, brand rules, route inventory, caveats, and acceptance criteria needed to design without repository access. Repository paths are included so that a designer *with* access can verify against source.

### 0.3 Authority labels (mandatory)

Every material claim in this brief is labeled. Respect the labels:

| Label | Meaning |
|---|---|
| **ADOPTED** | Locked by product/brand decision. Do not reverse casually. |
| **USER-DIRECTED** | Explicit owner instruction for this redesign brief. Overrides prior Concept A *presentation* details where noted, without erasing product truth. |
| **REQUIRED** | Formal requirement ID (AUD/UX/CNT/VIS/MOT/A11Y/SEO/TECH/PERF/QA). Treat as acceptance criteria once requirements are approved. |
| **RECOMMENDED** | Strong program guidance. Follow unless a better evidence-backed alternative is proposed. |
| **HYPOTHESIS** | Proposed KPI or design experiment. Not proven. |
| **OPEN** | Owner decision still required before implementation. |
| **UNVERIFIED** | Audit limitation. Do not treat as a passing grade. |
| **STALE** | Known outdated page/content. Prefer retire/merge/restructure. |

### 0.4 Authority hierarchy

When sources conflict:

1. This brief’s **USER-DIRECTED** design thesis (product-first interactive badge; progressive self-selection).
2. **ADOPTED** product locks (issuer-primary conversion; Warm Index DNA; canonical stack; illustrative demos).
3. Brand guide intent (`docs/design-system/andamio-brand-guide.md`) and machine tokens (`src/ui/system/tokens.ts`).
4. Requirements package (`docs/landing-page-excellence/requirements/`).
5. Audits, shortlists, and research catalogs (recommend only).
6. Legacy stacks under `src/ui/landing/*` (reference only, except V2 badge core).

### 0.5 What this brief authorizes and forbids

**Authorizes:**

- A complete UI/UX redesign direction for the marketing site.
- Evolving Warm Index composition, depth, texture, and interaction (**disciplined evolution**).
- Recommending keep / merge / retire / restructure for secondary marketing routes.
- Restructuring homepage copy and IA while preserving factual product claims.
- Designing a product-first interactive credential badge as the first impression.

**Forbids (until a later implementation plan):**

- Shipping production code from this brief alone.
- Claiming real credential mint/verify from illustrative demos.
- Silent behavioral profiling or cross-session personalization without privacy approval.
- Reviving archived V2 walkthrough / ModernLanding / SB7 as homepage authority.
- Cloning neon dark SaaS kits, Aceternity/Magic UI defaults, Credly/Accredible layouts, or purple-glow AI-marketing aesthetics.

### 0.6 Design AI operating procedure

1. Read §1–§6 completely before proposing visuals.
2. Propose the homepage interaction choreography first (§5–§7).
3. Then expand to connected funnel routes (`/show-me`, `/issuer`, `/developers`).
4. Then apply route recommendations for the wider marketing system (§8).
5. Produce the deliverables in §16.
6. Self-score against §17 before presenting comps.
7. If any item in §18 “do not proceed if…” fails, stop and ask the owner.

---

## 1. Product primer (what Andamio is)

### 1.1 One-sentence product truth — ADOPTED

Andamio is a credentialing company that happens to use blockchain: it issues **permanent, useful, owned, verifiable** digital credentials whose earners keep them, whose issuers define their meaning, and whose proof travels with the credential—not in a vendor’s private database.

### 1.2 What the visitor must understand without blockchain literacy — REQUIRED CNT-01

In the first two beats of the homepage experience, a visitor should understand:

1. This is a **credential badge**, not a decorative logo.
2. It is a **new kind of digital credential** with durable, useful, owned, verifiable properties.
3. Andamio can show how to use it, how it is built, and why that matters.
4. The next step is to **look into the product**, not to read a persona manifesto.

Blockchain, Cardano, hashes, and API details may deepen later. They must not gate comprehension.

### 1.3 The artifact: Proof Rings credential badge — ADOPTED

The visual and interactive protagonist is the Andamio **Proof Rings** credential badge.

**Current live hero asset:** `/public/andamio-credential-badge.svg`
**Canonical copy reference:** `CREDENTIAL_BADGE_SRC` in `src/ui/explore/content.ts`
**Generator core (reusable):** `src/ui/landing/V2Landing/badge/` (`buildBadgeSvg`, palettes, fonts)

**What the badge is:**

- A self-contained SVG credential presentation.
- Rings encode credential identity data (course identity and learning-target hash geometry).
- Presentation layer people can see and share.
- Backed by on-chain validation of who earned, who submitted evidence, and who approved.
- Interoperable with existing badging systems via an OB3 layer (interop claim; signing maturity may evolve).

**Current real demo seed used in product demos:**

- Course: “Getting Started with Andamio”
- Uses real mainnet-style course_id / slt_hash values in demos
- Rule: never truncate credential addresses, course IDs, or hashes in UI proof surfaces

**Caption truth currently used:**

> A real credential, issued on Andamio. The rings encode where it came from and what it certifies.

### 1.4 Four product properties (issuer outcome language) — ADOPTED

| Property | Meaning in plain language |
|---|---|
| **Permanent** | It outlives whoever issued it; not locked in a vendor database that can switch it off. |
| **Useful** | Software can act on it, not just look at a picture. |
| **Yours** | Issuer defines meaning; earner keeps ownership. |
| **Proof** | The work and its review travel inside it; others can verify. |

These four properties are the issuer outcome spine. They must remain visible in the redesigned experience, even if their presentation changes.

### 1.5 Credential lifecycle — ADOPTED

Canonical work cycle:

1. **Define** — Issuer writes skills/standards/targets and how people prove them.
2. **Evidence** — Learner commits and submits evidence.
3. **Review** — Authorized reviewer accepts or requests resubmission.
4. **Claim** — Learner claims a credential carrying what was done, who reviewed, and what it proves.

On `/issuer`, the demo compresses evidence/review/claim into an **Issue** beat for teaching, then **Verify**. That compression is a demo affordance, not a claim that issuance is a single blind click.

**Hard claim boundary — REQUIRED CNT-02:**

- HowItWorks Issue/Verify and BadgeBuilder interactions are **illustrative**.
- Never claim real mint, real verify, or backend success from local UI state.

### 1.6 Audience model — ADOPTED + USER-DIRECTED

**ADOPTED commercial priority:**

- Primary conversion audience: **credential issuers** (organizations that issue badges/credentials and are unsatisfied with rental databases / picture badges / noise).
- Secondary audience: **developers** building on the protocol.
- Tertiary: curious/community/Cardano visitors.

**USER-DIRECTED presentation change for this redesign:**

- Do **not** open with a persona hero (“For issuers…” / dual-rail marketplace / API-first hero).
- Open with the **product** (the credential badge) as the first thing any visitor meets.
- Personalization happens **through progressive interaction with the product**, not through an immediate “which persona are you?” splash that feels like every other SaaS landing page.

Issuer remains the primary commercial KPI. Developer depth remains secondary. Curious/community paths remain valid but must not redefine primary KPI reporting.

### 1.7 What Andamio is not

- Not a badge marketplace clone of Credly/Accredible.
- Not a blockchain education site first.
- Not an NFT gallery.
- Not a dark neon “AI agent platform” aesthetic.
- Not a surveillance analytics vendor (“Your data” means the issuer owns analytics; Andamio records credential-loop interactions, not share/view tracking).

### 1.8 Current homepage manifesto (structure-editable)

Current live copy (preserve product truth; structure may be edited):

- Headline lead: “This is an Andamio”
- Headline accent: “credential badge.”
- Manifesto:
  1. “It is a new kind of digital credential, built on a unique set of principles that we believe will change how people build trust on the internet.”
  2. “We’d like to show you how you can use it, how it’s built, and why that matters. We trust that you’ll have some good ideas for how to use it.”
- Primary CTA: “Show me” → `/show-me`

**Copy authority for redesign — USER-DIRECTED:** preserve product truth and key claims; allow restructuring and tighter wording. Do not invent unsupported claims.

### 1.9 Ownership promise — ADOPTED

*Own Your Badges.*

Voice: confident, plain, technical-but-human. No hype. No blockchain-maximalism. Say the important thing and stop.

---

## 2. Current-state audit (what exists today)

### 2.1 Architecture snapshot — ADOPTED

| Concern | Current state |
|---|---|
| Stack | Hybrid Next.js: Pages Router for most marketing; App Router for blog/customers/brand/sitemap/robots |
| Canonical UI | `src/ui/system/*` |
| Canonical copy | `src/ui/explore/content.ts` (canonical despite path) |
| Brand system | Warm Index tokens + kit |
| Primary funnel | `/` → `/show-me` → `/issuer` |
| Developer secondary | `/developers`, docs, API, `/cli`, `/bot` |
| Badge core reuse | `src/ui/landing/V2Landing/badge/*` only |
| Archived | V2 walkthrough/verifier/page composition, ModernLanding, SB7 |

### 2.2 Live homepage section map (`AndamioLanding.tsx`)

| # | Section | Job today | Strength | Problem |
|---|---|---|---|---|
| 1 | Hero `#top` | Artifact + manifesto + Show me | Product-first headline already exists; real badge SVG | Two-column text+static plate; manifesto dense; badge not interactive; SpecimenReveal signature exists in kit but unused on `/` |
| 2 | Issuer `#issuer` | Teaser: permanent/useful/yours/proof | Clear issuer outcome language | Card row feels generic; deep proof lives elsewhere |
| 3 | Developers `#developers` | Compact secondary CTA | Correct hierarchy | Visually similar shape to issuer teaser; weak differentiation |
| 4 | Ecosystem `#ecosystem` | Portable / Agent ready / Your data / Community | Honest “Coming soon” for agents | Disabled CTA feels dead; community Discord competes later |
| 5 | Closing `#closing` | Transformation + CTAs | Philosophical close is distinctive | Needs walkthrough primary over Discord (partially addressed on `dev`) |

### 2.3 `/show-me` (StoryFork)

Full-viewport isolated flow with three doors:

1. Issuer: “I already issue digital credentials. I’m not satisfied with them.”
2. Builder: “I am a developer, and I want to learn how to build on Andamio.”
3. Curious: “What do you mean by ‘a unique set of principles’?”

Issuer path teaches use → built → matters, then routes. Escape/Close returns home.

**Strengths:** Strong narrative; incorporates retired problem section; reduced-motion support exists.
**Problems:** Explicit persona fork immediately after hero feels conventional; no skip link; recovery/keyboard completeness still a P0/P1 concern; isolation from site chrome can feel abrupt.

### 2.4 `/issuer`

- Decisions/assumptions list
- HowItWorks tabs: Define (BadgeBuilder) / Issue / Verify
- Walkthrough CTA
- “Get the report” disabled

**Strengths:** Best product proof surface; live badge builder; deep link `#how-it-works`.
**Problems:** Illustrative claims must stay explicit; dense controls on mobile; report CTA dead-end.

### 2.5 Full marketing route inventory and disposition recommendations

| Route | Role today | Disposition — RECOMMENDED |
|---|---|---|
| `/` | First impression; product overview | **KEEP + MAJOR REDESIGN** (priority). Product-first interactive badge. |
| `/show-me` | Orientation / story fork | **KEEP + RESTRUCTURE**. Evolve from immediate persona doors into progressive self-selection continuation after badge exploration. May become a route *or* an in-page chapter system, but must remain a recoverable narrative path with exits. |
| `/issuer` | Issuer proof + demo | **KEEP + POLISH**. Authoritative demo remains. Improve a11y, demo truth labeling, mobile density, CTA clarity. |
| `/developers` | Developer hub | **KEEP**. Secondary depth. Do not compete with homepage hero. |
| `/cli` | CLI product page | **KEEP**. Linked from Developers. |
| `/bot` | Discord credential gating | **KEEP**. Community/builder exit. |
| `/pricing` | Issuer + API pricing | **KEEP + FIX**. Resolve “Join the waitlist” label vs walkthrough mailto mismatch. Clarify two products. |
| `/papers` + `/papers/[slug]` | Long-form protocol narrative | **KEEP**. Curious/issuer depth. |
| `/use-cases` + details | Social proof | **KEEP + CLEAN**. Remove legacy V2 motion dependency; dedupe near-duplicate case cards. |
| `/roadmap` | What’s shipping | **KEEP**. Footer/community exit. |
| `/about` | Team/mission | **KEEP + ALIGN VOICE**. Bring mission copy into Concept A / product-first voice; unify link registry. |
| `/contact` | Channels | **MERGE or REWRITE**. Discord “Coming Q3 2024” is **STALE**. Prefer footer/connect patterns. |
| `/blog` | Follow-along content | **KEEP**. Not a conversion path. Fix date sorting and chrome consistency over time. |
| `/customers` | Case/content | **KEEP or MERGE into use-cases** if redundant. |
| `/brand` | Internal/public brand specimens | **KEEP as system reference**, not conversion. |
| `/calendar` | Teamup embed | **KEEP if used**, else retire from sitemap prominence. |
| `/summit` | Event countdown to Nov 2024 | **RETIRE or ARCHIVE**. **STALE**. |
| `/fund/12`, `/fund/14` | Catalyst proposals | **KEEP as historical**, demote from primary IA. |
| `/privacy-policy`, `/terms` | Legal | **KEEP**. |
| `/explore/*` | Prototypes / system guide | **KEEP blocked from robots**. Not marketing IA. |

### 2.6 Known defects and caveats — REQUIRED / UNVERIFIED

**P0/P1 structural and trust issues:**

- Keyboard funnel completeness across `/`, `/show-me`, `/issuer` (A11Y-03)
- Reduced-motion equivalents for all intentional motion (MOT-02 / A11Y-04)
- External link registry drift: `content.ts` vs `external-links.ts` API hosts (UX-07 / TECH-02)
- Social identity drift: `@AndamioPlatform` vs `andamio_teams` (SEO-02)
- Demo claim truth must remain illustrative (CNT-02)
- Broad Google Fonts import beyond Warm Index families (PERF-03)
- No analytics; no privacy-approved event contract yet (TECH-01)
- Local Lighthouse/CWV baselines incomplete or non-representative (PERF caveats)
- Concurrent `yarn build` + `next dev` can corrupt `.next` and produce false 500s — tooling, not app proof

**Evidence limitations — UNVERIFIED:**

- Desktop observation only for some audits
- Mobile, screen reader, zoom, full keyboard passes incomplete at audit time
- Production CDN/social card rendering not fully verified
- KPI thresholds are hypotheses, not measured baselines

### 2.7 What is already good (do not throw away)

1. Product-first headline language already exists (“This is an Andamio credential badge.”).
2. Warm Index DNA is distinctive and anti-slop when followed.
3. Real credential SVG and Proof Rings generator are unique IP.
4. `/issuer` BadgeBuilder is a rare marketing demo with real encoding behavior.
5. Story content (use / built / matters; villains of rental/picture/noise) is strong and differentiated.
6. Conversion ladder L0–L3 is thoughtfully defined.
7. Canonical stack boundary prevents legacy chaos.

---

## 3. Design thesis — USER-DIRECTED

### 3.1 Thesis statement

**The credential introduces itself.**

The first impression is not “a landing page about issuers.” It is a living credential artifact that a visitor can inspect, understand, lightly customize, and follow into a path that fits them. Personalization emerges from product exploration. Commercial priority remains issuer conversion.

### 3.2 Why this is unique (anti-slop rationale)

Most credential/SaaS landings do one of these:

1. Persona hero (“For HR teams…”)
2. Dual-rail marketplace (Issuer | Developer equal columns)
3. Abstract 3D orb / particle field with a generic headline
4. Feature card grid above the fold
5. Dark neon kit clone

Andamio must not.

Andamio’s unfair advantage is a **real, encoded, inspectable credential object** with rings, provenance, and a teachable lifecycle. The design must make that object the protagonist. If the badge were removed and the page still looked like a generic AI startup, the design failed.

### 3.3 Brand test (north star) — REQUIRED VIS-02

If the first viewport could belong to another brand after removing the nav, branding is too weak.

Pass conditions:

- Andamio name/mark is hero-level.
- Credential specimen is the dominant visual plane.
- Headline does not overpower the brand or the artifact.
- Warm Index DNA is recognizable without kitspeak.

### 3.4 Relationship to Concept A — ADOPTED + USER-DIRECTED

Concept A (issuer-led proof narrative with progressive developer depth) remains the **commercial and narrative architecture**.

This brief **changes the opening presentation**:

| Concept A (prior presentation) | This brief (USER-DIRECTED) |
|---|---|
| Hero: brand + outcome + Show me + specimen | Hero: **interactive specimen as protagonist**; text supports the artifact |
| `/show-me` immediate three-door persona fork | Progressive self-selection after badge exploration; doors may appear later as earned choices |
| Issuer teaser before developer teaser | Still true after product introduction |
| Closing: walkthrough > Discord | Still true |

Do not revive rejected Concepts B (equal dual-rail) or C (API-first hero).

---

## 4. Anti-AI-slop and uniqueness rules

### 4.1 Rejected patterns — ADOPTED

| Pattern | Why rejected | Safer alternative |
|---|---|---|
| Neon dark SaaS, purple glow, glass orbs | Generic AI-marketing; kills Warm Index | Ink-on-paper editorial surface |
| Wholesale Launch UI / Magic UI / Aceternity look | Brand dilution; license risk | Steal section jobs only; restyle every pixel |
| Heavy Three.js / WebGL hero | LCP/INP/a11y cost; distracts from proof | SVG/static specimen + intentional Motion |
| Hero card grids, floating promo chips, stats strips | Dashboard clutter | One dominant specimen plane |
| Orange overuse | Becomes generic SaaS | One orange primary idea per view |
| Blue button fills | Violates wayfinding-only blue | Orange primary; blue links only |
| Rounded-full pill clusters / alternate display fonts | Breaks square DNA | Inter + JetBrains Mono; square geometry |
| Dark-mode-first marketing | Warm Index is paper-first | Light lead |
| Claim inflation from demo clicks | Trust risk | Label illustrative |
| Competitor clone (Credly/Accredible) | Commodity marketplace | Differentiate ownership/proof |
| Unbounded Google Fonts | Perf/privacy | Bound Inter + JetBrains Mono |
| Continuous particle loops / decorative animation | Noise | 2–5 intentional motions only |

### 4.2 Positive uniqueness checklist — RECOMMENDED

A design proposal is unique enough only if it can answer yes to most of these:

1. Does the credential badge do something no stock landing kit can fake?
2. Can a visitor learn ring meaning / lifecycle / ownership without leaving the first experience?
3. Does personalization feel like exploring a product, not filling a persona quiz?
4. Would a screenshot still read as Andamio without the wordmark?
5. Is motion revealing information rather than decorating emptiness?
6. Is the page quieter than typical SaaS while feeling more specific?
7. Are technical details progressive, not dumped in the hero?
8. Does reduced-motion still feel complete and intentional?

### 4.3 “Beautiful” definition for this project

Beautiful here means:

- Editorial clarity and material specificity (paper, ink, hairlines, specimen plate)
- Craft in typography, spacing rhythm, and artifact lighting/texture
- Interaction that teaches
- Restraint

Beautiful does **not** mean maximal decoration, glassmorphism, or cinematic 3D for its own sake.

---
'''

OUT.write_text(CONTENT, encoding="utf-8")
print(f"seeded {OUT} ({OUT.stat().st_size} bytes)")
