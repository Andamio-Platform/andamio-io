# Decision: Proof instrument (dark) site direction

- **Status:** adopted
- **Date:** 2026-09-30
- **Owner:** site owner (@MIxAxIM), approved 2026-09-30
- **Supersedes (in part):**
  - [2026-07-21-keep-reuse-archive.md](2026-07-21-keep-reuse-archive.md): "archive does not mean delete" for V2, ModernLanding, SB7
  - [2026-07-21-concept-direction.md](2026-07-21-concept-direction.md): non-goal "wholesale replacement of Warm Index"
  - [2026-07-21-prototype-approval.md](2026-07-21-prototype-approval.md): the Warm Index ink/paper re-lock
  - [2026-07-24-dense-motion-override.md](2026-07-24-dense-motion-override.md): "keeping Warm Index branding"
  - `DESIGN.md` sections 4.1, 9.1, 9.2, 18.3 (light editorial lead, dark-mode-first rejected)
  - Requirements VIS-01 and VIS-05 (colour and contrast on paper)
  - The banned-claim entry for FC Barcelona
- **Still binding:** Concept A (issuer-primary), CNT-02 demo truth, MOT-02 reduced motion, MOT-05 no WebGL hero, WCAG 2.2 AA, no analytics on badge, wallet, email or free text.

## Context

The live Proof Ring credential badge (`src/ui/system/proof-badge/`) is now the hero and the strongest brand signal on the site. It is dark navy with cyan and orange rings. Around it, the Warm Index light pages read as a different product. The owner asked for one visual language across the whole site, built from the badge.

At the same time the legacy landing trees (`src/ui/landing/V2Landing`, `ModernLanding`, `SB7PageLanding`) were kept only as reference. Live code still imported three modules from V2. They slow builds and confuse agents.

On 25 Sep 2026 FC Barcelona launched Barça Fan Lab, built with Andamio on Cardano and funded by Catalyst Fund 13. The partnership is public.

## Options considered

1. Keep Warm Index light and use the badge as a dark island. Rejected: two products on one page.
2. Light base with dark proof bands. Rejected by the owner.
3. **Fully dark "proof instrument" site in the badge palette.** Adopted.

## Decision

1. **Theme.** The site is dark only. `next-themes` is forced to `dark` and the theme toggle is removed. Tokens move to the badge palette:
   - deep navy page (`#0b121b`), raised navy surfaces
   - cream text
   - cyan explains (links, data, focus)
   - orange acts (primary CTA, live states), one orange action per view
   - Inter + JetBrains Mono, square geometry, no neon, no purple, no glass cards, no gradient text
2. **Design rules.** Structure comes from ticks, arcs and monospace readouts. Every decorative mark encodes something real (a hash, a date, a count). Only the hero badge moves continuously; everything else is triggered by scroll, hover or interaction.
3. **Legacy code.** V2Landing, ModernLanding, SB7 and their dead dependencies are deleted after the badge core and field notes move into `src/ui/system/proof-badge/`.
4. **Partners.** FC Barcelona may be named, with its crest in the partner rail, using public facts only (Barça Fan Lab, BarçaID sign-in, automatic Cardano wallet with sponsored transactions, four program areas with the Web3 area labelled experimental, Catalyst Fund 13). No adoption numbers.
5. **Three audience lifecycles.** Each page uses the one for its audience:
   - Earner: Enroll, Submit evidence, Get reviewed, Claim, Carry it anywhere
   - Organization: Define, Review, Issue, Verify
   - Developer: Commit, Review, Claim, gate on credentials
6. **Two adoption modes.** Invisible (the organization sponsors transactions and wallets are created for users) and visible (users connect their own Cardano wallet). This replaces the "blockchain is invisible" versus "bring your own wallet" contradiction.
7. **Analytics (TECH-01).** Umami, self-hosted on GCP (Cloud Run + Cloud SQL Postgres). No cookies, no consent banner. The client loads only when `NEXT_PUBLIC_UMAMI_URL` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` are set. Events are enum funnel steps only.
8. **Routes.** `/summit`, `/fund/*`, `/calendar` merge into `/community`; `/contact` folds into `/about#contact`; `/explore/system` merges into `/brand`; `/customers` and `/explore/concept-a` redirect.

## Owner creative direction (folded in from `design-ai-instructions.md`)

These owner priorities still hold under the dark direction:

- **The badge is the protagonist.** Visitors can watch it resolve, inspect ring anatomy by hover and keyboard, follow the lifecycle, and lightly customize it and see it respond.
- **Alive, not a brochure.** Motion teaches or sets hierarchy; no particle fields, confetti or meaningless loops. Organize motion into a few systems (badge, scroll reveal, teaching, control feedback), each with a reduced-motion equivalent.
- **Open with the credential, not a persona quiz.** Offer intent choices in product language after exploration. Issuer conversion stays commercially primary.
- **Honesty.** Illustrative demos read as illustrative. A mailto walkthrough is intent, not a booking. Coming soon stays coming soon. No tracking-based personalization.
- **Accessibility and performance.** WCAG 2.2 AA, keyboard-operable inspection, 320px layouts, a complete static first paint before motion, heavy modules deferred.
- **Success test.** Remove the logo and the page should still feel like a specific credential product.

## Consequences

- The `landing-excellence` skill, `DESIGN.md`, the brand guide and VIS-01/VIS-05 are updated to point here.
- `design-ai-instructions.md` (owner preference for refined dark) is folded into this decision and archived.
- Light-theme screenshots and audits from July become historical.
