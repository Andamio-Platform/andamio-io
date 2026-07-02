# Andamio Brand Guide

**Status:** v1.0 locked 2026-06-28 · **v1.1 DRAFT 2026-06-29 — for review**
**Canon for:** every Andamio surface — marketing (`landing-page-and-blog`),
App v2 (`andamio-app-v2`), docs, demos.

> **⟢ For Monday review (v1.1 draft, sculpt freely):** two additions, both
> derived from a component audit of the marketing kit + App v2.
> 1. **§7** — seven new component contracts now present in the marketing kit but
>    previously undocumented (Stitch, Text input, Segmented control, Micro-label,
>    Hairline, Live pulse, Specimen frame).
> 2. **§7.1 — Governing shadcn (App v2)** — the cross-surface plan: a token
>    bridge, a variant-intent map, and app-only contracts. *This is the part most
>    worth pressure-testing.* Nothing here changes a **locked** value (§§1–6).
>
> **2026-06-29 additions** (landing fine-tuning → propagated per §11.1):
> - **§3.2** — orange-wordmark-in-headline exception (hero accent + the two
>   product names). Codifies existing hero usage; **your sign-off requested.**
> - **§7** — `Full-viewport section` contract (the `Section screen` variant).
> - **§5 / `tokens.ts`** — `navClearance` (`--nav-clear` `5rem`) added to the frame.
**Relationship to other docs:** This is the *canon*. The
[app-v2 handoff brief](./app-v2-handoff-brief.md) is the *migration plan* that
applies this canon to App v2 (incl. the current-state audit). Where they ever
disagree, **this file wins.**

Three decisions were locked to resolve marketing↔app drift (2026-06-28):
1. **Accents anchor to the logo** — orange `#FF6B35`, blue `#2F6BFF`. App v2 conforms.
2. **Mono = JetBrains Mono.** App v2 conforms (was Geist Mono).
3. **Headings = Inter 600 / −0.045em.** App v2 conforms (was 700 / −0.025em).

---

## 0. How this governs

- **Brand DNA is identical on every surface** — logo, color, type, accent
  discipline, motion feel (§§1–6).
- **Surface expression differs** — a marketing page and a dense app are not the
  same artifact. Where they legitimately diverge, it's called out as
  *Marketing* vs *App*. The DNA never diverges; only the density does.
- **Conformance is reviewable** — §10 is the per-surface checklist. §11 is how
  to change this canon.

---

## 1. Brand idea & voice

**What Andamio is:** an open protocol for interoperable credentials on Cardano —
"a credentialing company that happens to use blockchain." Verifiable credentials
that keep working after you issue them. Recipients own their credentials;
developers integrate via REST API; the blockchain is invisible to end users.

**The ownership promise:** *Own Your Badges.* The through-line everywhere is
ownership and durability — credentials that outlive their issuer.

**Hero by surface (locked):**
- **Marketing → the Issuer is the hero.** "Badges are due for an upgrade." The
  buyer is an organization that issues credentials.
- **App (`app.andamio.io`) → the Learner is the hero.** The person earning and
  owning the credential.
- One hero *per surface*. Mixed heroes on one surface is the most common way
  positioning leaks — don't.

**Voice & tone:** confident, plain, technical-but-human. No hype, no
blockchain-maximalism. Say the one important thing and stop — the verbal
equivalent of the accent discipline (§3.2). Mono labels and data readouts carry
the "engineered/verifiable" texture; prose stays human.

---

## 2. Logo & lockups

- **Primary lockup:** mark **+ logotype** — `logo-with-typography.svg`
  (the colorful scaffold mark + "ANDAMIO"). Variants exist: `-dark` (dark bg),
  `-stacked`, and `-for-orange-bg`.
- **The mark carries the exact brand orange `#FF6B35`** — which is *why* the UI
  accent is anchored to it (§3). Logo orange === UI accent orange, always.
- **Sizing:** ~22px tall in top nav, ~30px in footer. App: match nav height to
  its header. Always links to home.
- **Clearspace:** keep at least the mark's height of clear space around the
  lockup. Don't crowd it with rules or text.
- **Don't:** recolor the wordmark, stretch, add effects, place the light lockup
  on a busy/low-contrast background (use `-dark` / `-for-orange-bg` instead), or
  separate mark from wordmark in primary placements (nav/footer use the lockup).

---

## 3. Color

### 3.1 Palette

**Neutrals (the surface does the work):**

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FFFFFF` | Background |
| `ink` | `#0A0A0A` | Primary text, solid rules |
| `inkMuted` | `rgba(10,10,10,0.60)` | Body / secondary text |
| `inkFaint` | `rgba(10,10,10,0.45)` | Tertiary labels |
| `inkGhost` | `rgba(10,10,10,0.30)` | Faint meta |
| `inkWatermark` | `rgba(10,10,10,0.10)` | Oversized tabular numerals |
| `cell` | `rgba(10,10,10,0.15)` | Inner dividers / card edges |
| `grid` | `rgba(10,10,10,0.05)` | Faint structural grid |

> Both surfaces already agree on `ink = #0A0A0A` and `paper = #FFFFFF` — no
> change needed there. App's cool `muted-foreground` (`#525E6E`) should move to
> ink-at-opacity for exact agreement, but this is low-priority.

**Accents (each has exactly one job):**

| Token | Hex | Job |
|---|---|---|
| `orange` | **`#FF6B35`** | Brand signal — sparing (see §3.2) |
| `blue` | **`#2F6BFF`** | Wayfinding + data/links only |
| `coralTint` | `rgba(255,107,74,0.055)` | Credential-plate background tint only |

**Semantic state palette** (an app needs this; marketing rarely uses it). These
**coexist with** the accents — they never override the orange-discipline:

| Token | Hex | Use | Foreground |
|---|---|---|---|
| `error` / destructive | `#EC2929` | Errors, destructive confirm | white |
| `success` | `#008149` | Success, completion | white |
| `warning` | `#ED990E` | Caution | **ink** (not white — see §9) |
| `info` | `#0F74C5` | Neutral information | white |

> `info` (`#0F74C5`) is intentionally **not** the wayfinding blue (`#2F6BFF`):
> info is a status, blue is interaction. Keeping them distinct prevents "is this
> a link or a banner?" ambiguity.

### 3.2 Accent discipline — the single most important rule

This is what stops the brand looking generic. **Enforce it in code review.**

- **Orange `#FF6B35`** — only: the brand mark, the **one** primary CTA / primary
  action on a view, the live-pulse dot, the "VERIFIED" stamp. **Never** on
  headings, body, kickers, numerals, decoration, or as a success color.
  *If a screen has three orange things, two are wrong.*
  - **Exception — wordmark accent in a display headline.** A **product or brand
    wordmark** may take orange *within* a display headline: the hero accent
    (`Own Your `**`Badges`**) and the two product names in the two-products map
    (**`Andamio Issuer`** / **`Andamio API`**). The accent must be a *name*, not
    arbitrary emphasis — still **one accent idea per screen**, never a phrase or
    a verb highlighted for color. Kickers, numerals, and body stay ink. *(v1.1 —
    derived from the landing hero + products section.)*
- **Blue `#2F6BFF`** — wayfinding and data **only**: links, nav-active, the rail,
  data readouts. **Never a button fill, heading, or body color.**
- **Coral tint** — background wash for credential artifacts only. Never type.
- Everything else is **ink on paper** at varying opacity.

> **App-v2 structural note:** shadcn's stock `secondary` variant renders blue as
> a *button fill* — which this rule forbids. Remapping shadcn's variant taxonomy
> onto this intent model (one orange primary; blue = links/nav-active only) is
> the real integration decision, not a value tweak. See **§7.1** for the plan;
> handoff brief §8 for the audit.

### 3.3 Conformance deltas (App v2 → canon)

| What | App v2 today | Canon | Action |
|---|---|---|---|
| Primary orange | `#F55C23` `oklch(0.669 0.199 38.6)` | `#FF6B35` | change `--primary` + `--ring` |
| Wayfinding blue | `#004488` `oklch(0.387 0.134 250.5)` | `#2F6BFF` | change link/nav-active; **stop** using as `secondary` fill |
| State palette | error/success/warning/info (already present) | keep — adopt as canon | tidy to the hexes above |

---

## 4. Typography

- **Display & UI sans:** **Inter**, weight **600**, tracking **−0.045em**,
  leading **0.92** for large display ("the 12 cut"). Stack:
  `'Inter', system-ui, -apple-system, sans-serif`. **Never a serif.**
- **Mono:** **JetBrains Mono** — *only* for kickers, small labels, section
  numbers, data readouts. Stack:
  `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`.
- **Kicker:** 11px, uppercase, tracking 0.18em, mono, muted — **never orange.**

**Fluid display scale (clamp):**

| Step | clamp | Use |
|---|---|---|
| `hero` | `clamp(2.9rem, 8.5vw, 7rem)` | Marketing hero |
| `xl` | `clamp(2.6rem, 7vw, 5.5rem)` | Section titles |
| `lg` | `clamp(2rem, 4.5vw, 3.5rem)` | Sub-heads |
| `md` | `clamp(1.9rem, 4vw, 2.9rem)` | Card titles |
| `sm` | `clamp(1.6rem, 3.4vw, 2.6rem)` | Leads |

**Body scale (app needs this; marketing's display scale is too large for dense
UI):** standard 14 / 16 px body, 12–13 px secondary, all Inter. The *display*
scale and the mono-label convention stay identical across surfaces so headings
and labels read the same; only the body density differs.

**Conformance delta (App v2 → canon):** headings move from Inter **700 /
−0.025em** to **600 / −0.045em**; mono moves from **Geist Mono** to **JetBrains
Mono**.

---

## 5. Spacing, grid, structure

**The frame:**

| Property | Value |
|---|---|
| Grid | fixed **12 columns**, faint (`grid`) |
| Content measure | **1320px** marketing · **1280px** app (`MAX_CONTENT_WIDTH`) — treat as agreement |
| Container padding | `px-6 sm:px-10` (24 → 40px) |
| Rail reserve | `150px` (marketing rail only) |
| Nav clearance | `5rem` (`--nav-clear` / `layout.navClearance`) — sticky-nav offset for anchor scroll + full-viewport sections |

### 5.1 Spacing scale — 4px base, role-driven

The base grid is 4px (Tailwind-native, so every step is already a 4px multiple).
The rule that was *missing* and is now canon: **one role → one step.** Spacing is
chosen by intent, never eyeballed. Use a role; reach for a raw step only for
one-offs. Governs layout spacing — not 1–2px optical nudges.

**Canonical steps (px):** `4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 96`
(`space.scale` → `xs … 5xl`). Off-rhythm strays (`20 · 28 · 56 · 80`) are drift —
migrate them to the nearest role.

**Roles** (`space.*` in `tokens.ts`):

| Role | Step | Class | Use |
|---|---|---|---|
| `sectionY` | 64→96 | `py-16 sm:py-24` | a section's content block (vertical rhythm) |
| `headerTop` | 64→96 | `pt-16 sm:pt-24` | lead / page-header top padding |
| `cardPad` | 24 | `p-6` | card / panel interior |
| `gapTight` | 8 | `gap-2` | label↔value, icon↔text |
| `gap` | 16 | `gap-4` | default flex / grid gap |
| `gapRow` | 40 | `gap-y-10` | between grid rows |
| `rhythmTight` | 12 | `mt-3` | closely-related elements |
| `rhythm` | 24 | `mt-6` | heading → body (the default step-down) |
| `rhythmGroup` | 48 | `mt-12` | block → block within a section |

> **Reconciled (2026-06-28):** section vertical padding had drifted between
> `py-16 sm:py-24` and `py-14 sm:py-20`; canonical is **`py-16 sm:py-24`**
> (`sectionY`). `p-7` (28) → `p-6`. The marketing pages that still use the old
> strays are a pending migration; new code uses the roles.

### 5.2 Adopt vs. diverge

- **Adopt:** the 12-col grid, the ~1300px measure, **and the spacing scale +
  roles** on both surfaces — same proportional skeleton, same rhythm rules. (The
  app needs the scale *more* than marketing: dense forms/tables drift instantly
  without it.)
- **Diverge by surface:** full-bleed ink hairline rules, the editorial margin
  rail, and the withheld-credential hero are **marketing-only**. The app uses
  `cell`-weight dividers in dense layouts, its own navigation, and a denser
  vertical rhythm (smaller `sectionY`) — but built from the *same* step scale.
- **The landing page goes further:** it drops the full-bleed *between-section*
  rules entirely and separates sections by **whitespace rhythm** (a more generous
  `sectionY`, `py-24 sm:py-32`). Inner marketing pages (roadmap, about,
  use-cases) **keep** the between-section rule — it suits their denser, more
  document-like reading. In-section dividers (`cell`/`rule` borders inside a
  section) stay everywhere; only the section-to-section boundary changes.

---

## 6. Motion signature

One signature gesture: **a credential is withheld, then revealed by a deliberate,
physical motion** (marketing: a sideways scroll into a museum-specimen frame).

- offset `["start end", "center center"]`; element slides from `["60%","0%"]`;
  opacity ramps `0→1` over progress `0→0.55`; frame widens `["44%","100%"]`;
  SSR-safe (deterministic at progress 0).

**Principle for any surface:** credential/verify moments *resolve* with intention
— a reveal, not a fade. Reuse the *feel* (not the museum frame) at App v2 mint /
verify moments.

---

## 7. Component intent contracts

Surface-agnostic intent every implementation must honor (marketing kit lives in
`src/ui/system/kit.tsx`; the app builds equivalents in its own stack):

| Primitive | Contract |
|---|---|
| Brand | mark+logotype lockup, links home, fixed heights |
| Primary nav | the brand's **one** orange CTA; full-bleed bottom border |
| Button hierarchy | exactly **one** orange primary per view; `ink`/`outline`/`ghost` for the rest; blue is **never** a fill |
| Stitch (action group) | connected buttons whose borders overlap −1px to read as one stitched control; each member keeps its own variant; stacks vertically on mobile |
| Text input / field | square, `cell` hairline, Inter, **no radius**; focus = blue inset shadow (`inset 0 0 0 1.5px #2F6BFF`); muted placeholder. Never rounded |
| Segmented control | square radio group; `cell` dividers between segments; selected = faint ink tint + `ink` text; inactive = `inkMuted`. (App: shadcn `toggle-group` conformed to this) |
| Heading/Display | Inter 600, the clamp scale, tight tracking |
| Kicker / label | mono 11px uppercase, muted, **never orange** |
| Micro-label | mono **10px** uppercase, tracking 0.16em; `inkFaint` → **`blue` when focused/linked**; no background. The instrument-panel label (distinct from the 11px Kicker) |
| Section header rule | kicker · optional `[LIVE]` pulse · rule — **no trailing meta text**. *Exception: a section omits the rule when its lead content carries its own header (the hero headline; the demo card's own title bar)* |
| Full-viewport section | the landing's `Section screen` variant: at least one viewport tall, content vertically centered. Height = `calc(100svh − var(--nav-clear))` so content centers in the area **below** the sticky nav (not behind it); the same `--nav-clear` drives anchor `scroll-padding-top`. Taller-than-viewport content flows naturally (the min-height is a floor). Marketing-only |
| Hairline / rule | thin divider; `strong` → `ink` (`rule`), else `cell`; square, full-bleed between marketing sections |
| Live pulse | a single orange `#FF6B35` square dot, `animate-pulse`, paired with a mono label; the **only** non-CTA use of orange (live / real-time) |
| Data readouts | mono (`DataList` / `StackLayers` idioms) |
| Code sample / API call | a square `rule`-bordered card; mono header bar (square `ink` bullet + `inkFaint` label) over a `cell` divider; request in `ink` mono, response below a `cell` divider in `inkMuted` mono; horizontal-scroll, code never wraps. Must show a **real** call — real path, auth header, and response shape — as proof the API is live; never a fabricated endpoint |
| Popover / info card | square (no rounded), `ink` hairline border on `paper`; a mono uppercase kicker header above a `cell` hairline divider, then body in Inter `inkMuted` (13px); one editorial drop shadow. **Never** the rounded shadcn default — override its corner/padding/fill |
| Modal / dialog | the Popover/info-card idiom at scale: square, `ink` hairline, `paper`, mono header bar + square close, on a dimmed scrim (`black/70`), opening with a subtle zoom. Radix-backed (Esc · click-outside · focus trap). Used for the badge zoom. **Never** the rounded shadcn default |
| Specimen frame | the credential's museum frame (marketing signature): square `rule` hairlines, mono kicker header + caption, `coralTint` plate, orange "Verified" stamp; reveal motion per §6 |
| Two-up contrast | a question heading (Inter 600) over a `cell` hairline, then paired peer columns; each column = a mono mode-label (`inkFaint`, **never** an accent, structured `[audience · action]`), an Inter 600 name, muted blurb, and an optional mono inline link (square `ink` bullet) jumping to that option's deep-dive; columns split by one `cell` vertical rule (stack on mobile); a mono `inkFaint` note below ties them to their shared foundation. Frames two equal options without ranking them (the two-products map). Used as the deep-dive lead-in |
| State / feedback | use the §3.1 state palette, **not** the brand accents |

**Build-on-day-one primitive (both surfaces):** a `PageHeader` (kicker + display
+ subtitle). Its absence is the one real fragility in the marketing system — the
header block is duplicated inline ~13×, so structural header changes can't
propagate. Don't repeat that in the app.

---

## 7.1 Governing shadcn (App v2)  ⟢ *v1.1 draft — review this*

App v2 is built on **shadcn/ui (~45 components)**. The elegant rule: **don't
style 45 components — govern the CSS-variable layer once, and document only the
exceptions.** shadcn derives nearly everything from a handful of root tokens, so
fixing those values cascades repo-wide. Documenting each component instead is
maintenance debt.

### The token bridge — the single conformance lever

Set in App v2 `globals.css` `:root`. Fixing this short list conforms ~95% of
components automatically; no per-component edits:

| Brand token (§3 / §4 / §5) | shadcn CSS var | App today → canon |
|---|---|---|
| orange `#FF6B35` | `--primary`, `--ring` | repoint from `#F55C23` |
| blue `#2F6BFF` | `--secondary` (links / nav-active only — see map) | from `#004488` |
| **square** | `--radius` | **`0.5rem` → `0px`** |
| Inter 600 / −0.045em / lh 0.92 | `h1`–`h6` `@layer base` | from 700 / −0.025em |
| JetBrains Mono | `--font-mono` | from Geist Mono |
| `cell` / `ink` neutrals | `--border`, `--input`, `--muted`, `--foreground` | already ink-on-paper; tidy to the §3.1 opacity ramp |

> One `--radius: 0px` line squares every shadcn component. Never set radius
> per-component.

### Variant-intent map — the exceptions

shadcn's variant taxonomy doesn't match the intent model (§3.2). Document the
deltas; the load-bearing one is `secondary`:

| shadcn variant | Brand intent | Action |
|---|---|---|
| `button` / `badge` `default` | orange primary | ✓ keep |
| `button` / `badge` **`secondary`** | renders **blue as a fill** — forbidden (§3.2) | **forbid; use `outline` / `ghost`.** Also `sheet` close button: `bg-secondary` → `bg-muted` |
| `button` `destructive` | state-red (§3.1) | ✓ keep |
| `button` `outline` / `ghost` | secondary / tertiary actions | ✓ keep |
| `button` / `link` `link` | wayfinding **blue text only** | ✓ keep (verify never a fill) |

### App-only component contracts

The marketing kit has no analogue for dense UI. Most auto-conform via the token
bridge; these few need a contract because their default intent fights the brand:

| Primitive | Contract |
|---|---|
| Dialog / Sheet / Drawer | inherit the **Popover / info card** contract: square, `ink` hairline, no rounded |
| Form field | label per §7 Text-input; **errors use state-red (§3.1), never orange**; helper text `inkMuted` |
| Table | `cell` hairline borders; `blue` for sortable headers / data links; row status via the state palette, not orange |
| Tabs | active tab = `ink` fill/underline, **not blue** (blue is wayfinding; a tab is selection) |
| Tooltip | square `cell`/`ink` container, **mono** label, small |
| Toast (Sonner) | success / error / warning / info from the **state palette**; **never orange** |
| Skeleton · Progress · Slider · Accordion · Select · … | no prose needed — conform via the token bridge |

### Sequence

Token bridge → variant map → app-only contracts → **then** extract a shared
`@andamio/tokens` package (§11) — *only once App v2 conforms*, so we never
package a moving target.

---

## 8. Accessibility

- `ink #0A0A0A` on `paper`: ~20:1 — excellent.
- **`blue #2F6BFF`** on white ≈ **4.5:1** — passes AA for body text → safe for links.
- **`orange #FF6B35`** on white ≈ **3:1** — **fails AA for normal text.** Use
  orange as a *fill* (buttons/marks) with large bold labels (AA-large ≈ 3:1,
  borderline), never as small text on white. If a compliant orange *text* color
  is needed, darken it; don't repaint the brand orange.
- **`warning #ED990E`**: low contrast with white → pair with **ink** foreground.
  `error`, `success`, `info` take white foreground.
- Don't encode meaning in color alone (orange "verified", state colors) — pair
  with an icon or label.

---

## 9. Do / Don't (quick card)

**Do**
- One orange thing per view (the primary action / verified state).
- Blue for links, nav-active, data — and nothing else.
- Inter 600 headings; JetBrains Mono for labels/data; ink-on-paper for everything else.
- Use the state palette for feedback; pair state color with icon/label.

**Don't**
- Orange headings, orange body, orange "success", or >1 orange CTA. *(Sole
  exception: a product/brand wordmark accent inside a display headline — §3.2.)*
- Blue as a button fill (the shadcn `secondary` trap).
- A serif, anywhere.
- White text on `warning` amber; small orange text on white.
- Trailing meta text floating on a section-header rule.

---

## 10. Per-surface conformance checklist

**App v2 (to reach canon):**
- [ ] `--primary` + `--ring` → `#FF6B35`
- [ ] link / nav-active → `#2F6BFF`; remove blue-as-`secondary`-fill
- [ ] remap shadcn button variants → one orange primary, blue = link/nav only
- [ ] mono → JetBrains Mono; headings → Inter 600 / −0.045em
- [ ] adopt state palette hexes (§3.1); keep them distinct from brand accents
- [ ] build a `PageHeader` primitive before broad header use

**Marketing (already canon):** no changes — it is the reference.

---

## 11. Governance

- This file is the source of truth. Changing a **locked** value (§ header) is a
  brand decision — get James's sign-off and bump the version + date.
- The machine-readable values live in `src/ui/system/tokens.ts`; the rendered
  living guide is `/explore/system`. Keep all three in sync; when they disagree,
  this file is canonical and the others are bugs.
- **Next step toward durable sync:** extract a shared `@andamio/tokens` package
  both repos import — but only once App v2 has conformed to the locked values
  above (don't package a moving target). See **§7.1** (conformance sequence) and
  handoff brief §6 / §8.

### 11.1 Change propagation — landing → guide  ⟢ *v1.1 draft*

The marketing site (`src/ui/system/`) is the **reference implementation**. During
the fine-tuning phase, every change to it is triaged for propagation so the guide
stays true — keeping them in lockstep *is* the brand-guide review.

| You tweak… | Propagate to |
|---|---|
| **Copy** (words in `content.ts`) | nothing — *unless* it shifts a §1 voice/tone principle |
| **A token value** (color, type size, spacing, radius) | `tokens.ts` → guide §3 / §4 / §5 **and** the §7.1 token-bridge row → `/explore/system` |
| **A component's style or structure** (popover, input, a primitive) | the component in `kit.tsx` → guide §7 contract → `/explore/system` specimen |
| **An accent / usage rule** (where orange or blue may appear, a new "don't") | guide §3.2 / §9 |

**The one rule that keeps it honest:** `tokens.ts` is the single source of truth
for *values*; the guide is the single source of truth for *intent*. The guide
**never re-hardcodes a hex** — except the §7.1 token-bridge table, which is the
one intentional mirror, so it must be re-checked whenever a token value moves.

**Working agreement:** each landing change ships with a one-line **Sync note** —
what propagated, or `copy-only — no guide impact`. That note is the audit trail
of this review phase.

---

## Pointers

- Tokens (machine-readable): `src/ui/system/tokens.ts`
- Components: `src/ui/system/kit.tsx`
- Living style guide (rendered): `/explore/system`
- Reference composition: `src/ui/system/AndamioLanding.tsx` → `/`
- App-sync plan + current-state audit: `docs/design-system/app-v2-handoff-brief.md`
- Decision history: `docs/brainstorms/2026-06-27-design-inspiration.md`
