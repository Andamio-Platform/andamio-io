We're going to lock the content of just the landing page for now. 

And we are not yet ready to work on the rest of the site because we need to fully update the design concept for this landing page and blog site. 

We're going to work in three rounds:
1. Round 1: Prototypes and Exploration
2. Round 2: Mood Board and Revisions
3. Round 3: Finalizing the Landing Page Design

Today we are only focused on round one. Your task is to design 10 different iterations of the landing page only. Keep the content but feel free to mess around with all of the design and style. Nothing is sacred and anything can be changed. Just keep the content the same for now. 

The goal is to create a simple, professional and yet somehow memorable landing page. It's hard to do. This is a tough balance to strike. That's why we're going to make at least 10 different options. In the document below, keep a list of the 10 options you create. Dispatch different design agents to do different research about what different badge resellers do. Collect some ideas:
- Play with fonts
- Play with colors
- Play with the whole layout
- Do a few that are purely light background
- Do a few that are purely dark background
- Do a few that mix it up a bit

---

## Round 1 — Execution Notes (2026-06-27)

**Content lock.** Copy is frozen, lifted verbatim from the live `V2Landing`
("Badges are due for an upgrade" → Andamio Issuer + badge demo → Andamio API →
proof / close). Single source of truth: `src/ui/explore/content.ts`. Every
iteration imports the same words; only font, color, and layout change.

**Delivery.** Live routes in this app. Gallery at **`/explore`**; iterations at
**`/explore/01` … `/explore/10`**. Run `npm run dev` and open `/explore`.

**Research.** Four parallel design-research agents fed the build: (1) badge /
credential resellers (Credly, Accredible, Sertifier, Canva, Open Badges), (2)
developer / API product pages (Stripe, Vercel, Clerk, Supabase), (3) editorial /
typographic & Swiss-brutalist sites, (4) tasteful blockchain / protocol brands.

**The 10 iterations** (scheme distribution per brief — 4 light · 3 dark · 3 mixed):

| # | Title | Scheme | Idea |
|---|-------|--------|------|
| 01 | Editorial Light | light | Serif display (Fraunces), ink-on-paper restraint, one rust accent. |
| 02 | Terminal Protocol | dark | Monospace, hairline rules, a developer's-console reading of the page. |
| 03 | Brutalist Contrast | mixed | Hard black/white bands that flip, oversized type, one acid accent. |
| 04 | Soft Warm SaaS | light | Warm cream, rounded cards, Bricolage Grotesque, friendly coral. |
| 05 | Midnight Premium | dark | Deep navy, subtle glow, Sora, quiet enterprise gravitas. |
| 06 | Swiss Grid | light | Strict 12-col grid, red accent, typographic discipline. |
| 07 | Credential Showcase | mixed | The badge as hero object throughout, product-shoot treatment. |
| 08 | Whitepaper Document | light | Reads like a typeset spec — serif + mono, numbered clauses. |
| 09 | Neon Protocol | dark | Tasteful cyber-Cardano, grid field, disciplined neon glow. |
| 10 | Warm Magazine | mixed | Cream / charcoal spreads, Fraunces, drop-cap, pull-quotes. |

*Status: all 10 live and rendering (HTTP 200, typecheck clean). 01 is the
hand-built reference template; 02–10 came from a parallel build fan-out.
Full-page + hero screenshots in `screenshots/explore/`. Open `/explore` to
compare.*

---

## Round 2 — Mood Board + Second Batch (2026-06-27)

**Mood board** lives at **`/explore/moodboard`** — decomposes the 10 into the
seven dimensions we actually decide on (type, scheme, accent, hero, badge
treatment, layout, tone), each at full fidelity, so we mix parts instead of
voting for a page. A `SELECTION` panel tracks the converging direction.

**James's picks / leanings (R1 review):**
- **Typography** — Inter / Swiss (committed). No serif display.
- **Scheme** — Light (leaning, not committed → batch tests one dark + one mixed).
- **Accent** — **Orange is out** (doesn't fit). Standouts: Coral, Acid Yellow,
  Cool Blue (not committed).
- **Hero** — Full-bleed type, **badge withheld**. Reveal the badge in the
  section below via a **scroll-driven sideways slide** into view.
- **Badge treatment** — Museum specimen (leaning).
- **Layout** — Visible grid + Document/margin-notes (his two favorites).
- **Tone** — Authoritative · Protocol · Instrumental · Editorial · Humane.
- **R1 favorites:** 03, 06, 07 — but no "aha" yet.

**Round 2 batch (11–15)** — shared spine: Inter/Swiss type, no orange,
full-bleed hero with the badge withheld, then a framer-motion sideways reveal
into a museum-specimen frame. Varies accent / scheme / layout:

| # | Title | Scheme | Accent | Layout flavor |
|---|-------|--------|--------|---------------|
| 11 | Swiss Coral | light | Coral | Strict visible 12-col grid |
| 12 | Spec Sheet | light | Cool blue | Document + margin-note rail |
| 13 | Acid Protocol | dark | Acid yellow | Dark grid field (disciplined) |
| 14 | Editorial Vault | mixed | Coral | Light editorial → charcoal vault reveal |
| 15 | Instrument | light | Cool blue | Grid + mono data-rail hybrid |

*Status: 11–15 live (HTTP 200, typecheck clean), all honoring the shared spine
— full-bleed Inter hero, badge withheld, framer-motion sideways reveal into a
museum-specimen frame, no orange. Screenshots (hero / reveal-mid / reveal /
full) in `screenshots/explore/`. Reveal is motion — best judged live by
scrolling on `localhost:3001`.*

---

## Round 3 — Convergence on 11 + 12 + 15 (2026-06-27)

James's favorites: **11, 12, 15**. Direction = synthesize the best of each.

**What to lift from each (his words):**
- **11** — the light background grid, the hero, and the padding between the
  horizontal lines (its generous vertical rhythm).
- **12** — the **type**: prefers 12's cut over 11's. (Both Inter; the difference
  is weight — 12 is semibold/600, more open; 11 is bold/700, tighter "slab".)
- **15** — the **floating outline rail on the right**. He likes 15's right-side
  floating placement more than 12's left-margin bookmarks — but 12's bookmark
  vibe/function is nice. → Combine: 12's section-outline *function*, 15's
  right-side floating *form*.

**Color:** a **3-color theme** per variant — coral · cool-blue · **Andamio
brand orange `#FF6B35` kept but used sparingly** (a touchpoint or two; orange is
back, but disciplined).

**Spine retained:** full-bleed hero, withheld badge, sideways reveal into a
museum specimen.

**Convergence batch (16–20)** — all light, all the same family; vary the
3-color role assignment + which donor dominates:

| # | Title | Dominant donor | Orange used on |
|---|-------|----------------|----------------|
| 16 | Coral Index | 11 (grid/rhythm) | live dot + VERIFIED only |
| 17 | Blueprint Spec | 12 (data-sheet) | live + reveal highlight only |
| 18 | Instrument Coral | 15 (right rail) | status VERIFIED + live only |
| 19 | Warm Index | balanced, mono | the lead accent — but precise |
| 20 | Tri-tone | 11+12+15 equal | verified/live moments only |

*Status: 16–20 live (HTTP 200, typecheck clean). Now one unified family —
identical structure (11 grid + 12 type + 15 right rail/scroll-spy); the only
variable is the 3-color theme. Screenshots in `screenshots/explore/`.
16 coral-led · 17 blue/blueprint · 18 blue/instrument (most alive) ·
19 orange-led-disciplined · 20 strict tri-tone.*

**Chosen direction: 19 · Warm Index** (orange kept as the brand signal but
disciplined). Open question raised: the right-side section rail feels app-like.

**Rail-placement study (21, 22), both off 19:**
- **21 · Left rail** — same panel mirrored left. More conventional, but stays a
  chrome panel and pushes the hero off its full-bleed left edge (loses 11's
  hero punch).
- **22 · Editorial rail** — kept right, de-chromed: no panel/border/console,
  just chapter-marks floating in the margin, active section emphasized. Reads as
  a progress annotation, not a sidebar; hero stays full-bleed. **Leading option.**
  Also surfaces a 3rd choice: drop the rail entirely (now ambient, low-cost).

**Rail decision: 22 · Editorial rail.** Chosen.

---

## Design System — "Warm Index" (2026-06-27)

Iteration 22 extracted into a real, reusable design system. Lives in
**`src/ui/system/`**; documented as a living style guide at **`/explore/system`**;
composed back into the full page at **`/explore/final`** (verified pixel-faithful
to 22). All typecheck clean, all routes 200.

- **`tokens.ts`** — the single source of truth. Encodes the *rules*, not just
  values: type (Inter semibold "12 cut" + JetBrains Mono labels), the 3-color
  policy (orange = brand signal, sparing: brand mark · primary CTA · live ·
  VERIFIED; blue = wayfinding/data; coral = specimen tint only), 12-col grid /
  1320 measure / vertical rhythm, and the reveal motion constants.
- **`kit.tsx`** — components: `Page` (grid + rail + offset), `TopNav`, `Brand`,
  `EditorialRail` (scroll-spy), `Section`, `SectionHead`, `Kicker`, `Display`,
  `Button`/`Stitch`, `SpecimenReveal` (the signature scroll-in credential),
  `DataList`, `StackLayers`, `NumberWatermark`, `Footer`, `useActiveSection`.
- **`AndamioLanding.tsx`** — the chosen page, composed entirely from the kit.

Tailwind note: tokens drive **inline styles** (colors/sizes); structural utility
classes stay literal in source so Tailwind's scanner generates them.

*Boundary held: the live production landing (`src/ui/landing/V2Landing`) is
untouched — shipping is a separate decision (carries the brand-color call).
Next, when greenlit: wire the real badge-builder demo into `SpecimenReveal`'s
slot, mobile polish, then promote `/explore/final` to the production landing.*

### System applied to `/whitepaper` + `/roadmap` (2026-06-27)

First real pages built on the system (replacing their dark `V2Navigation` /
`ModernPageLayout` chrome):
- **`/roadmap`** — system chrome; the editorial rail is the **product index**
  (scroll-spy over each track); `RoadmapTrack` (`src/ui/system/`) is the
  system-styled timeline. Status colors: ink = shipped · orange = in progress
  (the sparing brand-active signal) · outline = planned/proposed.
- **`/whitepaper`** hub + **`/whitepaper/[slug]`** — system chrome; the rail
  lists the four papers as **cross-page links** (active = current paper);
  `PaperArticle` restyled to light Inter prose, blue links. Orange = the single
  "Download the PDF" CTA only.

System generalization this surfaced: `EditorialRail`/`Page` now take a custom
`sections` list + optional `activeId` (cross-page) + `RailItem.href`; defaults
to the landing index, so `/explore/final` is unchanged.*

### System promoted to the homepage `/` (2026-06-27)

`src/pages/index.tsx` now renders `AndamioLanding` (the system page) instead of
`V2Landing`. Production hardening done in the same pass:
- **Mobile menu** added to system `TopNav` (hamburger → full nav). Now
  production-ready across `/`, `/whitepaper`, `/roadmap`.
- **Top-nav links fixed:** Issuer/API were dead `#issuer`/`#andamio-api`
  anchors on non-landing pages → now `/#issuer` / `/#andamio-api` (work from
  every page; still scroll in-page on home since the path matches).
- Iteration labels cleaned off the landing ("Index No. 22" → "Live on Cardano";
  dropped the "22" closing watermark and the dev footer caption/back-link).

`V2Landing` is now unused by `/` but left in the repo (revertible).

⚠️ **Open: the live `BadgeBuilderDemo` is not on the homepage.** The system
"how it works" slot uses the static `SpecimenReveal` (scroll-in specimen). The
locked copy `demo.note` ("a control console drives the live badge…") now
over-promises. Decide: (a) wire the real `BadgeBuilderDemo` into the reveal slot
— restores interactivity and makes the copy true; or (b) soften the note to
match the static specimen.

⚠️ **Brand-color change is now live on `/`** — orange moved to a disciplined
supporting role. Reaches nav/app/docs eventually; this is the page where it
ships first.*

### System applied to `/blog` + `/about` (2026-06-27)

- **`/blog`** (App Router) — `app/blog/layout.tsx` now uses system chrome
  (TopNav + GridField + Footer) on a light body instead of `V2Navigation` /
  dark `ThemeProvider`. List (`page.tsx`, async server component) and post
  (`[blogPostId]/page.tsx`, markdoc prose) restyled with system tokens — server
  components styled via `tokens.ts` (no client wrappers needed), light prose.
- **`/about`** (Pages Router) — rebuilt on the system `Page` (no rail); team
  grid, mission, and CTAs in system tokens. Kept the `#technology` / `#team`
  anchors that `about/our-technology` and `about/our-team` redirect to.

The public marketing surface now runs on the system end-to-end: `/`,
`/whitepaper` (+slug), `/roadmap`, `/blog` (+post), `/about`. Still un-migrated
(not requested): `/use-cases`, `/customers`, `/brand`, `/fund`, `/summit`,
`/contact`, `/calendar`, `/privacy-policy`, `/terms`. Old chrome
(`V2Navigation`, `V2PageLayout`, `ModernPageLayout`, `V2CTAFooter`) is now
unused by the migrated routes but left in place (still used by the above).*


### Rule refinements: borderless lead + clean header rules (2026-06-27)

Two corrections from reviewing `/`, promoted to system rules and applied
everywhere:

1. **Lead/hero section carries no bottom rule.** The hero's `border-b` created
   a heavy divider directly under the CTA row, doubling with the next section's
   header. Hero `Section` is now `bordered={false}`; the same applies to every
   page's lead header block (`pb-12 pt-16 sm:pt-24`) — `about`, `contact`,
   `calendar`, `roadmap`, `privacy-policy`, `summit`, `terms`, `use-cases`,
   `fund/12` + `fund/14`, plus the App-Router index headers (`blog`,
   `customers`). `whitepaper` already had a borderless header.
2. **Section-header rules carry no trailing meta.** `SectionHead` dropped its
   `meta` slot (was rendering a faint, illegible "Specimen 001" on the rule).
   One component change → applies everywhere by construction.

Encoded in `tokens.ts` ("THE RULES THIS SYSTEM ENCODES" #3) and the living
guide `/explore/system` principles.

**Robustness note:** the meta fix was a single-component edit (free everywhere)
because section headers ARE componentized. The borderless-lead fix had to be
applied to ~13 files because page headers are *not* a shared component — the
`pb-12 pt-16 sm:pt-24` lead block is duplicated inline. Candidate next
refactor: extract a `PageHeader` component so the next header-wide change is
also a one-liner.
