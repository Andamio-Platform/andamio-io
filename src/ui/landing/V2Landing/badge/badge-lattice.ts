/** Hash-driven scaffold lattice (U2) + earner micro-pattern for Proof Ring face. */

import { mulberry32, seedFromHex } from "./badge-display";

const CX = 512;
const CY = 512;

/** Soft beams/joints clipped to core disk — seeded by courseId. */
export function buildHashLattice(
  courseId: string,
  stroke: string,
  joint: string,
): string {
  const rnd = mulberry32(seedFromHex(courseId));
  const beams: string[] = [];
  const n = 14;
  for (let i = 0; i < n; i++) {
    const a1 = rnd() * Math.PI * 2;
    const a2 = a1 + (rnd() * 0.9 - 0.2);
    const r1 = 80 + rnd() * 280;
    const r2 = 80 + rnd() * 280;
    const x1 = CX + Math.cos(a1) * r1;
    const y1 = CY + Math.sin(a1) * r1;
    const x2 = CX + Math.cos(a2) * r2;
    const y2 = CY + Math.sin(a2) * r2;
    beams.push(
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${stroke}" stroke-width="${(1.1 + rnd()).toFixed(2)}" opacity="${(0.12 + rnd() * 0.22).toFixed(2)}"/>`,
    );
    if (rnd() > 0.45) {
      beams.push(
        `<circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="${(2 + rnd() * 3).toFixed(1)}" fill="${joint}" opacity="${(0.2 + rnd() * 0.35).toFixed(2)}"/>`,
      );
    }
  }
  return beams.join("");
}

/** Hairline constellation from DID / earner salt — unique per earner. */
export function buildEarnerPattern(salt: string, stroke: string): string {
  const rnd = mulberry32(seedFromHex(salt || "earner"));
  const parts: string[] = [];
  const dots = 18;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < dots; i++) {
    const a = rnd() * Math.PI * 2;
    const r = 40 + rnd() * 200;
    pts.push([CX + Math.cos(a) * r, CY + Math.sin(a) * r]);
  }
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i]!;
    parts.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rnd() * 1.4).toFixed(1)}" fill="${stroke}" opacity="${(0.15 + rnd() * 0.25).toFixed(2)}"/>`,
    );
    if (i > 0 && rnd() > 0.4) {
      const [x0, y0] = pts[i - 1]!;
      parts.push(
        `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${stroke}" stroke-width="0.7" opacity="${(0.08 + rnd() * 0.14).toFixed(2)}"/>`,
      );
    }
  }
  return parts.join("");
}
