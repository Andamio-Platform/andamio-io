/**
 * Builder inputs → badge params. The visitor types names, but the rings encode
 * hashes, so the inputs are SHA-256'd into a course_id (28 bytes) and an
 * slt_hash (32 bytes). The result is a preview, never a signed credential.
 */

export interface BadgeSkill {
  id: string;
  label: string;
}

export interface BadgeParams {
  courseTitle: string;
  moduleTitle: string;
  /** Hex, 28 bytes — outer ring. */
  courseId: string;
  /** Hex, 32 bytes — inner ring. */
  sltHash: string;
  /** "mainnet" | "preprod" | "preview" */
  network: string;
  earnerName?: string;
  did?: string;
  issuedAt?: string;
  skills?: BadgeSkill[];
  verifyUrl?: string;
  /** Program logo. Not hashed; preview only, never uploaded. */
  mark?: string;
}

export interface BadgeInputs {
  courseName: string;
  moduleName: string;
  slts: string[];
  earnerName?: string;
  did?: string;
  issuedAt?: string;
  skills?: BadgeSkill[];
  verifyUrl?: string;
  network?: string;
}

export const DEFAULT_SKILLS: BadgeSkill[] = [
  { id: "s1", label: "Access Token" },
  { id: "s2", label: "Commit" },
  { id: "s3", label: "Evidence" },
  { id: "s4", label: "Review" },
];

async function sha256Hex(input: string, bytes: number): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(digest))
    .slice(0, bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Trim each SLT, drop empties, join with newlines, so the hash is stable. */
export function canonicalizeSlts(slts: string[]): string {
  return slts
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join("\n");
}

export async function buildBadgeParams(
  inputs: BadgeInputs,
): Promise<BadgeParams> {
  const courseName = inputs.courseName.trim();
  const moduleName = inputs.moduleName.trim();
  const [courseId, sltHash] = await Promise.all([
    sha256Hex(courseName, 28),
    sha256Hex(canonicalizeSlts(inputs.slts), 32),
  ]);
  const trimmedEarner = inputs.earnerName?.trim();
  const earnerName = trimmedEarner ? trimmedEarner : "Preview earner";
  const trimmedDid = inputs.did?.trim();
  const did = trimmedDid
    ? trimmedDid
    : `did:andamio:${courseId.slice(0, 8)}${sltHash.slice(0, 8)}`;
  return {
    courseTitle: courseName || "Your Course",
    moduleTitle: moduleName || "Your Credential",
    courseId,
    sltHash,
    network: inputs.network ?? "preview",
    earnerName,
    did,
    issuedAt:
      inputs.issuedAt ?? new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    skills: inputs.skills ?? DEFAULT_SKILLS,
    verifyUrl: inputs.verifyUrl ?? "https://credentials.andamio.io/verify/demo",
  };
}
