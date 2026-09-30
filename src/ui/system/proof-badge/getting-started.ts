import type { BadgeParams } from "./builder-params";

/**
 * The demo's starting point is the REAL "Getting Started with Andamio"
 * credential — the same badge presented on the landing hero (fig. 1). Pristine
 * inputs render the real on-chain identity (courseId/sltHash below, mainnet);
 * the first edit flips the badge to a derived preview, so "your inputs become
 * the rings" stays honest. Starting SLT lines are editable display copy only —
 * the pristine rings come from the real hashes, never from hashing these lines.
 */
export const GETTING_STARTED = {
  courseName: "Getting Started with Andamio",
  moduleName: "Mint Access Token and Commit to Assignment",
  slts: ["I can mint my Access Token", "I can commit to an assignment"],
  params: {
    courseTitle: "Getting Started with Andamio",
    moduleTitle: "Mint Access Token and Commit to Assignment",
    // Real on-chain hashes (mainnet). Face shorts derive from these; clipboard uses full hex.
    courseId: "ab5d9217bbbac409ffbe7c8c65d9b358932245079a7f8547a28bc755",
    sltHash: "1b37e6b411bc614e9da67943124219053eafa717793e5424f4a33765e42328a3",
    network: "mainnet",
    // Fictional but wired display fields (not on-chain for this demo specimen).
    earnerName: "Jordan Smith",
    did: "did:andamio:8f3a7c1e",
    issuedAt: "2025-06-03T10:30:00Z",
    skills: [
      { id: "s1", label: "Access Token" },
      { id: "s2", label: "Commit" },
      { id: "s3", label: "Evidence" },
      { id: "s4", label: "Review" },
    ],
    verifyUrl: "https://credentials.andamio.io/verify/demo/getting-started",
  } satisfies BadgeParams,
  /** Pine Gold — the palette the real badge was generated with. */
  paletteIndex: 3,
} as const;
