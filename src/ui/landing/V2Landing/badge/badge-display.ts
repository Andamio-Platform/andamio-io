/** Pure helpers for evolved Proof Ring display fields (no React). */

export interface BadgeSkill {
  id: string;
  label: string;
}

/** Compact face label: first 8 + … + last 4 of hex (or custom short). */
export function shortHex(hex: string, head = 8, tail = 4): string {
  const h = hex.replace(/^0x/i, "").toLowerCase();
  if (h.length <= head + tail + 1) return h;
  return `${h.slice(0, head)}…${h.slice(-tail)}`;
}

/** Deterministic u32 from hex/string for lattice / earner pattern. */
export function seedFromHex(hex: string): number {
  const h = hex.replace(/^0x/i, "").toLowerCase() || "0";
  let s = 0;
  for (let i = 0; i < h.length; i++) {
    s = (Math.imul(31, s) + h.charCodeAt(i)) >>> 0;
  }
  return s || 1;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const DEFAULT_PERIMETER = [
  "ANDAMIO PROOF RING",
  "COURSE VERIFIED",
  "SLT VERIFIED",
  "BLOCKCHAIN VERIFIED",
  "SKILLS ATTESTED",
] as const;

export const DEFAULT_SKILLS: BadgeSkill[] = [
  { id: "s1", label: "Access Token" },
  { id: "s2", label: "Commit" },
  { id: "s3", label: "Evidence" },
  { id: "s4", label: "Review" },
];

export function networkLabel(network: string): string {
  const n = network.toLowerCase();
  if (n === "mainnet") return "Cardano · mainnet";
  if (n === "preprod") return "Cardano · preprod";
  if (n === "preview") return "Cardano · preview";
  return `Cardano · ${network}`;
}
