// Copy for the badge annotations on the "How it works" demo and CredentialTheater.
// Role-neutral, in the landing voice, within the no-cross-issuer-composability
// guardrail (gating stays within your own pathways; cross-org value is
// portability, never automatic enforcement).

export interface RingNote {
  label: string;
  sub: string;
  body: string;
}

export const OUTER_RING: RingNote = {
  label: "Course identity",
  sub: "outer ring · course_id ticks",
  body: "The inner ring you can derive yourself. A course identity is different. It comes from the course’s own on-chain token, so it can’t be faked by typing a name. That token is what makes the credential verifiably the real thing.",
};

export const INNER_RING: RingNote = {
  label: "Learning targets",
  sub: "inner ring · SLT hash ticks",
  body: "Your learning targets, hashed into the ring. The same targets always produce the same hash, and anyone can derive it. This is the proof of what the credential certifies.",
};

/** Field notes for the evolved Proof Ring inspector (all visible face fields). */
export const BADGE_FIELD_NOTES: Record<string, RingNote> = {
  outer: OUTER_RING,
  inner: INNER_RING,
  brand: {
    label: "Issuer brand",
    sub: "logo · ANDAMIO",
    body: "Who stands behind the credential. The mark tells you the protocol family; the rings tell you what was proven.",
  },
  course: {
    label: "Course",
    sub: "human-readable title",
    body: "The named pathway this credential belongs to. Readable on the face; bound to the outer ring’s course_id on-chain.",
  },
  module: {
    label: "Module",
    sub: "credential headline",
    body: "What this specific achievement is called — the title people share and employers scan first.",
  },
  earner: {
    label: "Earner",
    sub: "holder name · micro-pattern",
    body: "Who earned it. The faint constellation under the face is seeded from the earner DID (or name), so each holder’s badge has a unique texture.",
  },
  did: {
    label: "DID",
    sub: "decentralized identifier",
    body: "A stable identifier for the holder in this credential context. Copy the full value from the face control — demos may use a fictional DID wired for inspection.",
  },
  issued: {
    label: "Issued",
    sub: "timestamp",
    body: "When this credential was issued. On a live credential this is part of the signed record; here it is illustrative face data.",
  },
  network: {
    label: "Network",
    sub: "Cardano · mainnet / preprod / preview",
    body: "Which Cardano network anchors the on-chain proof. Andamio credentials are Cardano-native — never a side-chain substitute on the face.",
  },
  skills: {
    label: "Skills",
    sub: "attested capabilities",
    body: "Capabilities attested by this credential. Marks are generic; labels come from the credential’s skill list.",
  },
  courseId: {
    label: "Course ID",
    sub: "short face · full hex on copy",
    body: "Compact label on the face for scanning. Copy puts the full course_id hex on the clipboard — the same bytes encoded in the outer ring ticks.",
  },
  sltHash: {
    label: "SLT hash",
    sub: "short face · full hex on copy",
    body: "Compact fingerprint of the learning targets. Copy yields the full slt_hash hex — the same bytes in the inner ring.",
  },
  qr: {
    label: "Verify",
    sub: "QR · illustrative",
    body: "A verify affordance on the face. On this site the module pattern is illustrative — not a live on-chain lookup. Real verify happens in product flows.",
  },
  core: {
    label: "What it certifies",
    sub: "titles + rings together",
    body: "Titles you can read. Rings you can verify. The work and its review travel with the credential — not locked in a vendor database that can be switched off.",
  },
};

export interface InfoCard {
  title: string;
  body: string;
}

export const SHIFT: InfoCard = {
  title: "What changes",
  body: "You become the issuer. The credential records which targets were met, not just that someone finished, and anyone can check it without calling you. The people you credential never touch crypto.",
};

export const LEFT_WITH: InfoCard = {
  title: "What you keep",
  body: "A credential that can’t be faked and that you own for good. It outlives any vendor, including us, and holders carry it anywhere it’s useful.",
};
