# Andamio Brand Guide

**Status:** v1.0 — **locked** 2026-06-28
**Canon for:** every Andamio surface — marketing (`landing-page-and-blog`),
App v2 (`andamio-app-v2`), docs, demos.
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
- **Blue `#2F6BFF`** — wayfinding and data **only**: links, nav-active, the rail,
  data readouts. **Never a button fill, heading, or body color.**
- **Coral tint** — background wash for credential artifacts only. Never type.
- Everything else is **ink on paper** at varying opacity.

> **App-v2 structural note:** shadcn's stock `secondary` variant renders blue as
> a *button fill* — which this rule forbids. Remapping shadcn's variant taxonomy
> onto this intent model (one orange primary; blue = links/nav-active only) is
> the real integration decision, not a value tweak. See handoff brief §8.

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

| Property | Value |
|---|---|
| Grid | fixed **12 columns**, faint (`grid`) |
| Content measure | **1320px** marketing · **1280px** app (`MAX_CONTENT_WIDTH`) — treat as agreement |
| Container padding | `px-6 sm:px-10` |
| Section rhythm | `py-16 sm:py-24` (marketing) — app uses its own denser rhythm |

- **Adopt:** the 12-col grid and ~1300px measure on both surfaces — same
  proportional skeleton.
- **Diverge by surface:** full-bleed ink hairline rules, the editorial margin
  rail, and the withheld-credential hero are **marketing-only**. The app uses
  `cell`-weight dividers in dense layouts and its own navigation.

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
| Heading/Display | Inter 600, the clamp scale, tight tracking |
| Kicker / label | mono 11px uppercase, muted, **never orange** |
| Section header rule | kicker · optional `[LIVE]` pulse · rule — **no trailing meta text** |
| Data readouts | mono (`DataList` / `StackLayers` idioms) |
| State / feedback | use the §3.1 state palette, **not** the brand accents |

**Build-on-day-one primitive (both surfaces):** a `PageHeader` (kicker + display
+ subtitle). Its absence is the one real fragility in the marketing system — the
header block is duplicated inline ~13×, so structural header changes can't
propagate. Don't repeat that in the app.

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
- Orange headings, orange body, orange "success", or >1 orange CTA.
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
  above (don't package a moving target). See handoff brief §6 / §8.

---

## Pointers

- Tokens (machine-readable): `src/ui/system/tokens.ts`
- Components: `src/ui/system/kit.tsx`
- Living style guide (rendered): `/explore/system`
- Reference composition: `src/ui/system/AndamioLanding.tsx` → `/`
- App-sync plan + current-state audit: `docs/design-system/app-v2-handoff-brief.md`
- Decision history: `docs/brainstorms/2026-06-27-design-inspiration.md`
