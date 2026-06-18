/* Scripted-mock data for the cert-body Public Credential Verifier demo.
 *
 * All values are illustrative examples, not real on-chain records. They exist
 * to make the "verification is a public read" claim executable on the landing
 * page. Real preprod.api.andamio.io reads are a later roadmap step.
 *
 * Keep this file declarative — no JSX. The component (V2VerifierDemo) owns all
 * rendering and interaction. */

export type VerifierStatus = "valid" | "revoked" | "not-found";

export type VerifierTone = "verified" | "revoked" | "neutral";

export interface VerifierScenario {
  /** Stable key + the example chip label that selects this scenario. */
  key: VerifierStatus;
  chipLabel: string;
  /** Credential id shown in the input and echoed in the result header. */
  credentialId: string;
  /** Result fields. Absent on not-found, where there is nothing to show. */
  credentialName?: string;
  issuer?: string;
  /** Truncated holder address — the on-chain controller of the credential. */
  holder?: string;
  /** On-chain anchor: the block and transaction the issue was recorded in. */
  anchor?: { block: string; tx: string };
  /** Status badge label + tone. */
  badgeLabel: string;
  tone: VerifierTone;
  /** One-line plain-language explanation shown under the result. */
  note: string;
}

/** Pre-fills the verifier input and resolves to the `valid` scenario. */
export const SAMPLE_ID = "AND-7F3K-2027";

export const VERIFIER_SCENARIOS: VerifierScenario[] = [
  {
    key: "valid",
    chipLabel: "Valid",
    credentialId: SAMPLE_ID,
    credentialName: "Certified Solutions Architect",
    issuer: "Meridian Industry Association",
    holder: "addr1q9x…7v2k",
    anchor: { block: "11,482,003", tx: "a3f9c1…e21c" },
    badgeLabel: "Verified",
    tone: "verified",
    note: "Issued on-chain and currently valid. Anyone can read this record without contacting the issuer.",
  },
  {
    key: "revoked",
    chipLabel: "Revoked",
    credentialId: "AND-4B8Q-2026",
    credentialName: "Certified Solutions Architect",
    issuer: "Meridian Industry Association",
    holder: "addr1qate…9p4m",
    anchor: { block: "10,905,217", tx: "7c0b44…9af1" },
    badgeLabel: "Revoked",
    tone: "revoked",
    note: "The issuer revoked this credential on-chain. The revocation is public too — no one has to call to find out.",
  },
  {
    key: "not-found",
    chipLabel: "Not found",
    credentialId: "AND-0000-0000",
    badgeLabel: "Not found",
    tone: "neutral",
    note: "No credential with this id has been issued. A failed lookup is just as readable as a successful one.",
  },
];

/** Resolve a typed/selected id to a scenario. Unknown ids resolve to not-found. */
export function resolveScenario(id: string): VerifierScenario {
  const trimmed = id.trim().toLowerCase();
  const match = VERIFIER_SCENARIOS.find(
    (s) => s.key !== "not-found" && s.credentialId.toLowerCase() === trimmed,
  );
  return match ?? VERIFIER_SCENARIOS.find((s) => s.key === "not-found")!;
}
