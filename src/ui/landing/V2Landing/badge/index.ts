// Proof Rings badge generator — the reusable, framework-free core.
//
// Public API for rendering Andamio "Proof Rings" credential badges as
// self-contained SVG strings, entirely in the browser. Pure: depends only on
// standard browser APIs (Web Crypto) — NO React / Next / landing imports — so
// this folder can be copied or extracted verbatim into another app
// (e.g. andamio-app-v2's holder view) or published as a shared package.
//
// Two entry points:
//   • buildBadgeSvg(params, palette)  — render from a real credential
//     (pass on-chain course_id + slt_hash directly; this is what the app uses).
//   • buildBadgeParams({ courseName, moduleName, slts })  — derive params by
//     SHA-256-hashing typed inputs (the landing demo's "preview" path).
//
// See ./README.md for the consumption guide.

export { buildBadgeSvg, esc } from "./badge-generator";
export type { BadgeParams, BuildOptions } from "./badge-generator";

export { buildBadgeParams, canonicalizeSlts } from "./badge-model";
export type { BadgeInputs } from "./badge-model";

export {
  PALETTES,
  ALL_TOKENS,
  mix,
  lightInterior,
  whiteInterior,
  invertColors,
  withInterior,
} from "./palettes";
export type { Palette, InteriorStyle } from "./palettes";
