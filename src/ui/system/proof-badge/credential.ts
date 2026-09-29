/**
 * Credential data for ProofRingBadge.
 *
 * `fromOpenBadge` maps an Andamio Open Badges 3.0 credential (the JSON baked
 * into credentials.andamio.io badge SVGs) onto the fields the badge face
 * renders, so real credentials from the backend can be passed straight in.
 */

export type SkillIcon = "scaffold" | "warning" | "calculator" | "checklist" | "badge";

export type ProofSkill = { label: string; icon: SkillIcon };

/** The Access Token holder who claimed the credential. */
export type ProofHolder = {
  /** Alias the Access Token was minted under. */
  alias: string;
  displayName?: string;
};

export type ProofCredential = {
  brand: string;
  course: string;
  module: string;
  holder: ProofHolder;
  /** Marks showcase data that does not come from a real holder credential. */
  holderIsSample?: boolean;
  issuerDid: string;
  /** ISO 8601 timestamp. */
  issuedAt: string;
  network: string;
  skills: ProofSkill[];
  /** Course policy id (hex). */
  courseId: string;
  /** Blake2b hash of the module's Student Learning Targets (hex). */
  sltHash: string;
  verifyUrl: string;
  /** Andamioscan (or other explorer) page for the course. */
  courseUrl?: string;
  /** Explorer page for the hash, when one exists. */
  hashUrl?: string;
  theme?: ProofTheme;
};

/** CSS custom properties the badge reads; see proof-badge.css. */
export type ProofTheme = Partial<{
  cyan: string;
  cyanHot: string;
  orange: string;
  orangeHot: string;
  bandCool: string;
  bandWarm: string;
  label: string;
  accent: string;
  ink: string;
}>;

/** Subset of the Andamio Open Badges 3.0 credential that the face uses. */
export type AndamioOpenBadge = {
  name?: string;
  validFrom?: string;
  issuer?: string | { id?: string; name?: string; url?: string };
  credentialSubject?: {
    achievement?: { name?: string; description?: string };
  };
  evidence?: Array<{ id?: string; network?: string }>;
  "andamio:course"?: string;
  "andamio:onChainAnchor"?: { network?: string; courseId?: string; sltHash?: string };
  "andamio:theme"?: Partial<Record<AndamioThemeKey, string>>;
};

type AndamioThemeKey =
  | "deep"
  | "ink"
  | "raised"
  | "prim"
  | "prim_lt"
  | "sec"
  | "sec_lt"
  | "bone"
  | "slate"
  | "hair"
  | "core1"
  | "core2"
  | "itext"
  | "imuted"
  | "iline"
  | "extlabel"
  | "slt_label"
  | "ev_label"
  | "ctitle"
  | "mtitle";

const CARDANO_NETWORKS: Record<string, string> = {
  mainnet: "Cardano mainnet",
  preprod: "Cardano preprod",
  preview: "Cardano preview",
};

export function badgeVerifyUrl(courseId: string, sltHash: string): string {
  return `https://credentials.andamio.io/badges/${courseId}.${sltHash}.svg`;
}

/** Map `andamio:theme` onto the badge's ring and label variables. */
export function themeFromAndamio(
  theme: AndamioOpenBadge["andamio:theme"],
): ProofTheme | undefined {
  if (!theme) return undefined;
  return {
    cyan: theme.prim,
    cyanHot: theme.prim_lt,
    orange: theme.sec,
    orangeHot: theme.sec_lt,
    bandCool: theme.raised,
    bandWarm: theme.ink,
    label: theme.prim,
    accent: theme.sec,
    ink: theme.itext,
  };
}

export function fromOpenBadge(
  badge: AndamioOpenBadge,
  extras: Pick<ProofCredential, "holder"> &
    Partial<Omit<ProofCredential, "holder">>,
): ProofCredential {
  const issuer = typeof badge.issuer === "string" ? { id: badge.issuer } : badge.issuer;
  const anchor = badge["andamio:onChainAnchor"] ?? {};
  const courseId = anchor.courseId ?? "";
  const sltHash = anchor.sltHash ?? "";
  const network = anchor.network ?? badge.evidence?.[0]?.network ?? "mainnet";
  return {
    brand: issuer?.name ?? "Andamio",
    course: badge["andamio:course"] ?? badge.name ?? "",
    module: badge.credentialSubject?.achievement?.name ?? badge.name ?? "",
    issuerDid: issuer?.id ?? "",
    issuedAt: badge.validFrom ?? "",
    network: CARDANO_NETWORKS[network] ?? `Cardano ${network}`,
    skills: [],
    courseId,
    sltHash,
    verifyUrl: badgeVerifyUrl(courseId, sltHash),
    courseUrl: badge.evidence?.[0]?.id,
    theme: themeFromAndamio(badge["andamio:theme"]),
    ...extras,
  };
}

/** "About Andamio Issuer" — the credentials.andamio.io definition artifact. */
export const ANDAMIO_ISSUER_BADGE: AndamioOpenBadge = {
  name: "About Andamio Issuer",
  validFrom: "2026-07-01T00:00:00Z",
  issuer: {
    id: "did:web:credentials.andamio.io",
    name: "Andamio",
    url: "https://credentials.andamio.io",
  },
  credentialSubject: {
    achievement: {
      name: "About Andamio Issuer",
      description: "About Andamio Issuer — Andamio Issuer",
    },
  },
  evidence: [
    {
      id: "https://andamioscan.io/courses/ae192632aabe00ed2042eaef596bc15f3887fa32e75e8f9b8fa516df",
      network: "mainnet",
    },
  ],
  "andamio:course": "Andamio Issuer",
  "andamio:onChainAnchor": {
    network: "mainnet",
    courseId: "ae192632aabe00ed2042eaef596bc15f3887fa32e75e8f9b8fa516df",
    sltHash: "e9b5343186f83ed804a9fd87293a7378e3b237743b76d56da73b111d855631db",
  },
  "andamio:theme": {
    deep: "#0E0A1F",
    ink: "#15112B",
    raised: "#201A3C",
    prim: "#8B6CF0",
    prim_lt: "#B9A6F7",
    sec: "#E86CA8",
    sec_lt: "#F2A6CC",
    itext: "#15203A",
  },
};

/** Skills drawn on the concept-40 artwork, used as showcase sample data. */
export const SAMPLE_SKILLS: ProofSkill[] = [
  { label: "Scaffold Erection", icon: "scaffold" },
  { label: "Risk Assessment", icon: "warning" },
  { label: "Load Calculations", icon: "calculator" },
  { label: "Inspection & QA", icon: "checklist" },
];

/**
 * Homepage showcase: the real "About Andamio Issuer" record, with the
 * artwork's sample holder and skills, keeping the artwork's cyan/orange
 * palette rather than the record's theme.
 */
export const DEFAULT_CREDENTIAL: ProofCredential = {
  ...fromOpenBadge(ANDAMIO_ISSUER_BADGE, {
    holder: { alias: "jordan_smith", displayName: "Jordan Smith" },
    holderIsSample: true,
    skills: SAMPLE_SKILLS,
  }),
  theme: undefined,
};

/**
 * Showcase-only ring phrases. Real credentials render without them. Copy
 * rules: no "proof of work", no "soulbound", permanence never leads.
 */
export const SHOWCASE_PHRASES: readonly string[] = [
  "ANCHORED ON CARDANO",
  "VERIFY IT YOURSELF",
  "OPEN BADGES 3.0",
  "OWNED BY THE EARNER",
  "NOT A RENTED PICTURE",
  "A CREDENTIAL, NOT A JPEG",
  "READ IT. OWN IT. VERIFY IT.",
  "TRAVELS WITH THE EARNER",
  "DEFINED BY THE ISSUER",
  "REVIEWED BY A TEACHER",
  "CLAIMED ON-CHAIN",
  "EVIDENCE, REVIEWED",
  "HASHES, NOT PRIVATE DATA",
  "BUILT FROM LEARNING TARGETS",
  "SOFTWARE CAN READ IT",
  "W3C VERIFIABLE CREDENTIAL",
  "SIGNED · ANCHORED · PORTABLE",
  "ON YOUR ACCESS TOKEN",
  "MEANING SET BY THE ISSUER",
  "VERIFIABLE ANYWHERE",
  "ISSUED WITH ANDAMIO",
  "DEFINE · COMMIT · REVIEW · CLAIM",
];

/** `ae1926…a516df` — keeps both ends of a long hex value readable. */
export function middleTruncate(value: string, head = 6, tail = 6): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}
