# Programmable Credential Badge — Design Spec

**Status:** approved  
**Date:** 2026-07-24  
**Approach:** Layered upgrade of existing `buildBadgeSvg` (Approach 1)

## Goal

Evolve the live Proof Rings generator into a fully programmable SVG credential system: native SVG for text, rings, icons, QR, and metadata panels; photographic scaffolding stays raster. Hybrid artwork is the long-term visual target; phase 1 ships programmable wins on the current concept-40 spine.

## Decisions

| Topic | Choice |
| --- | --- |
| Delivery | Evolve TypeScript `buildBadgeSvg` (site generator) |
| Visual strategy | Hybrid is long-term; phase 1 upgrades current generator |
| Rings | Keep `#badge-field` + perimeter `textPath`; PNG-like cyan/orange glow; equalizer = hash base + ambient pulse |
| QR | Real scannable SVG from `verifyUrl` |
| Raster | Inner scaffolding / complex photo effects remain `<image>` |
| Network | Cardano product labels |
| Bulk CLI | Out of scope (later) |
| Motion shell | `AnimatedProofBadge` dual-layer; `prefers-reduced-motion` / `is-reduced` respected |

## Architecture

```
BadgeParams → buildBadgeSvg
  → U1 ticks + equalizer attrs
  → textPath perimeter labels
  → concept-40 face (raster clip + lattice)
  → real QR SVG
  → OB3 / VC metadata CDATA
  → AnimatedProofBadge → CSS spin + tick equalizer
```

**Invariants**

- One generator spine — no parallel renderer.
- Semantic layers are native SVG.
- Uniqueness remains hash→geometry (U1); equalizer modulates around that fingerprint.
- Dual-layer paint: spinning rings vs static face/labels.

## Phases

### Phase 1 — Alive rings + real QR

- Cyan/teal lit ticks with amber/orange MSB accents; stronger glow.
- Per-tick CSS vars (`--tick-base`, `--tick-delay`) for equalizer pulse.
- Keep perimeter labels (`DEFAULT_PERIMETER`).
- Replace illustrative QR with a real QR SVG library.
- Update embedded credential note: QR encodes `verifyUrl` (still a presentation artifact until signed VC).

### Phase 2 — Programmable face polish

- Document frozen `BadgeParams` JSON example for future bulk.
- Tighten auto-size / wrap for long titles and pods.
- Unit tests: ring determinism, QR payload, helpers.

### Phase 3 — Hybrid retarget

- Align face rhythm toward hybrid composition.
- Optionally swap clipped plate image to a hybrid-derived public asset.
- No full-image vectorization; no scaffolding trace.

## Non-goals

- Bulk/CLI export of thousands of SVGs
- Vectorizing scaffolding or particle bokeh
- Second parallel badge renderer
- Fake mint UI / Credly clones

## Libraries

- Runtime QR: real SVG QR package (e.g. `@pjaudiomv/qrcode-svg` or `@qr-kit/core`)
- VTracer / Potrace: design-time only if needed later — not in runtime path
