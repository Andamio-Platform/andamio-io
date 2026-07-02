# Proof Rings badge generator (reusable core)

A framework-free TypeScript port of the `credential-badges` generator
(`gen.py` / `colors.py` / `fonts.css`). Renders an Andamio "Proof Rings"
credential badge as a **self-contained SVG string**, entirely client-side.

## Why it's reusable

This folder imports **nothing** from React, Next, shadcn, or the rest of this
repo — only standard browser APIs (`crypto.subtle`, `TextEncoder`). It is
verified zero-coupled by `scripts/badge-parity-check.mjs`. That means another
app can reuse it by **copying the folder verbatim**, or it can later be lifted
into a shared `@andamio/badge` package without code changes.

The rings round-trip: the tick geometry decodes back to the on-chain hashes
(`buildBadgeSvg` is the inverse of `credential-badges` `decode.py`).

## Public API (`./badge`)

```ts
import { buildBadgeSvg, PALETTES, withInterior } from ".../badge";

const svg = buildBadgeSvg(
  { courseTitle, moduleTitle, courseId, sltHash, network: "mainnet" },
  withInterior(PALETTES[0], "light"), // or "inverted"
  { idSuffix: "unique-per-render" },   // scopes internal SVG ids; omit for a single badge
);
```

| Export | Purpose |
|---|---|
| `buildBadgeSvg(params, palette, opts?)` | Render the SVG from a credential. **Primary entry point.** |
| `buildBadgeParams({ courseName, moduleName, slts })` | *Demo only.* SHA-256s typed names into ring hex (preview, no real anchor). |
| `PALETTES` | The 10 color identities (`Palette[]`). |
| `withInterior(pal, "light" \| "inverted")` | Apply the light/dark interior style (the builder's toggle). |
| `lightInterior` / `whiteInterior` / `invertColors` / `mix` | Individual transforms. |
| `BadgeParams`, `BadgeInputs`, `Palette`, `InteriorStyle` | Types. |

## Consuming this in andamio-app-v2

The app already has the **real** on-chain `course_id` and `slt_hash` for a
holder's credential. So the app does **not** use `buildBadgeParams` (that's the
demo's hash-from-text path) — it calls `buildBadgeSvg` directly with the real
values to render the same beautiful badge the landing demo previews:

```ts
const svg = buildBadgeSvg(
  { courseTitle, moduleTitle, courseId, sltHash, network: "mainnet" },
  withInterior(palette, interiorStyle),
);
// inject as inline SVG; constrain with CSS `svg { width: 100% }` (the SVG
// carries width/height="1024", which is intrinsic, not responsive).
```

To point the app at it today: copy this `badge/` folder into app-v2. When the
shared package is worth standing up, this folder becomes its `src/`.
