/**
 * Illustrative QR-like module grid for badge face (not a standards QR encoder).
 * Finder patterns + data modules from verifyUrl seed — visual only / ClaimFence.
 */

import { mulberry32, seedFromHex } from "./badge-display";

export function buildQrModulesSvg(
  verifyUrl: string,
  x: number,
  y: number,
  size: number,
  dark: string,
  light: string,
): string {
  const n = 21;
  const cell = size / n;
  const rnd = mulberry32(seedFromHex(verifyUrl || "andamio-verify"));
  const grid: boolean[][] = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => rnd() > 0.48),
  );

  const setCell = (r: number, c: number, v: boolean) => {
    const row = grid[r];
    if (row) row[c] = v;
  };

  const paintFinder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        setCell(r0 + r, c0 + c, edge || core);
      }
    }
  };
  paintFinder(0, 0);
  paintFinder(0, n - 7);
  paintFinder(n - 7, 0);

  for (let i = 0; i < n; i++) {
    setCell(6, i, i % 2 === 0);
    setCell(i, 6, i % 2 === 0);
  }

  let rects = `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="2" fill="${light}"/>`;
  for (let r = 0; r < n; r++) {
    const row = grid[r];
    if (!row) continue;
    for (let c = 0; c < n; c++) {
      if (!row[c]) continue;
      rects += `<rect x="${(x + c * cell).toFixed(2)}" y="${(y + r * cell).toFixed(2)}" width="${(cell + 0.15).toFixed(2)}" height="${(cell + 0.15).toFixed(2)}" fill="${dark}"/>`;
    }
  }
  return rects;
}
