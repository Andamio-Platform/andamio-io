// Maps the badge-builder's typed inputs to the generator's params. The visitor
// types names, but the rings encode hashes — so we SHA-256 the inputs to
// synthesize a course_id (28 bytes) and slt_hash (32 bytes). This keeps the
// "your inputs deterministically become the rings" teaching moment honest,
// because the badge is explicitly a *preview*, not a signed on-chain credential.
//
// Pure: Web Crypto only, no React / Next / landing imports (extraction-ready, R9).

import type { BadgeParams } from "./badge-generator";
import { DEFAULT_SKILLS, shortHex, type BadgeSkill } from "./badge-display";

export interface BadgeInputs {
  courseName: string;
  moduleName: string;
  slts: string[];
  /** Optional face fields — preview path fills defaults when omitted. */
  earnerName?: string;
  did?: string;
  issuedAt?: string;
  skills?: BadgeSkill[];
  verifyUrl?: string;
  network?: string;
}

/** SHA-256 a string, return the first `bytes` bytes as lowercase hex. */
async function sha256Hex(input: string, bytes: number): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  const all = Array.from(new Uint8Array(digest));
  return all
    .slice(0, bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Canonicalize the SLT list so the hash is stable regardless of incidental
 *  whitespace or empty rows: trim each, drop empties, join with a newline. */
export function canonicalizeSlts(slts: string[]): string {
  return slts
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join("\n");
}

/**
 * Build the generator params from the visitor's inputs.
 * - courseName  → course title + outer ring (course_id, 28 bytes)
 * - slts (list) → inner ring (slt_hash, 32 bytes)
 * - moduleName  → module title
 * Display fields (earner, DID, …) are optional; shorts derive from hex.
 */
export async function buildBadgeParams(
  inputs: BadgeInputs,
): Promise<BadgeParams> {
  const courseName = inputs.courseName.trim();
  const moduleName = inputs.moduleName.trim();
  const [courseId, sltHash] = await Promise.all([
    sha256Hex(courseName, 28),
    sha256Hex(canonicalizeSlts(inputs.slts), 32),
  ]);
  const earnerTrim = inputs.earnerName?.trim();
  const earnerName =
    earnerTrim && earnerTrim.length > 0 ? earnerTrim : "Preview earner";
  const didTrim = inputs.did?.trim();
  const did =
    didTrim && didTrim.length > 0
      ? didTrim
      : `did:andamio:${courseId.slice(0, 8)}${sltHash.slice(0, 8)}`;
  return {
    courseTitle: courseName.length > 0 ? courseName : "Your Course",
    moduleTitle: moduleName.length > 0 ? moduleName : "Your Credential",
    courseId,
    sltHash,
    network: inputs.network ?? "preview",
    earnerName,
    did,
    issuedAt:
      inputs.issuedAt ?? new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    skills: inputs.skills ?? DEFAULT_SKILLS,
    verifyUrl: inputs.verifyUrl ?? "https://credentials.andamio.io/verify/demo",
    courseIdShort: shortHex(courseId),
    sltHashShort: shortHex(sltHash),
  };
}
