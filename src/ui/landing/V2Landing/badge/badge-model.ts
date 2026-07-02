// Maps the badge-builder's typed inputs to the generator's params. The visitor
// types names, but the rings encode hashes — so we SHA-256 the inputs to
// synthesize a course_id (28 bytes) and slt_hash (32 bytes). This keeps the
// "your inputs deterministically become the rings" teaching moment honest,
// because the badge is explicitly a *preview*, not a signed on-chain credential.
//
// Pure: Web Crypto only, no React / Next / landing imports (extraction-ready, R9).

import type { BadgeParams } from "./badge-generator";

export interface BadgeInputs {
  courseName: string;
  moduleName: string;
  slts: string[];
}

/** SHA-256 a string, return the first `bytes` bytes as lowercase hex. */
async function sha256Hex(input: string, bytes: number): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
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
 * - slts (list) → inner ring (slt_hash, 32 bytes) — the learning targets define the credential
 * - moduleName  → module title (the badge's headline)
 * Deterministic: identical inputs always produce identical hex.
 */
export async function buildBadgeParams(inputs: BadgeInputs): Promise<BadgeParams> {
  const courseName = inputs.courseName.trim();
  const moduleName = inputs.moduleName.trim();
  const [courseId, sltHash] = await Promise.all([
    sha256Hex(courseName, 28),
    sha256Hex(canonicalizeSlts(inputs.slts), 32),
  ]);
  return {
    courseTitle: courseName || "Your Course",
    moduleTitle: moduleName || "Your Credential",
    courseId,
    sltHash,
    network: "preview",
  };
}
