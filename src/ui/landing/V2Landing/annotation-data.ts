// Copy for the badge annotations on the "How it works" demo. Role-neutral, in
// the landing voice, within the no-cross-issuer-composability guardrail (gating
// stays within your own pathways; cross-org value is portability, never
// automatic enforcement).

export interface RingNote {
  label: string;
  sub: string;
  body: string;
}

// Outer ring — the course identity. Carries the moat point: the inner ring is
// derivable by anyone, but a unique course identity comes from the course's
// on-chain token. The exact "two ways to get the token" wording is an open
// question (plan R10) — see the comment in V2IssuerExplorer where this renders;
// this copy states only the verified conceptual point, no specific on-chain claim.
export const OUTER_RING: RingNote = {
  label: "Course identity",
  sub: "outer ring · policy ID",
  body: "The inner ring you can derive yourself. A course identity is different. It comes from the course’s own on-chain token, so it can’t be faked by typing a name. That token is what makes the credential verifiably the real thing.",
};

// Inner ring — the learning targets, hashed. Derivable by anyone, deterministic.
export const INNER_RING: RingNote = {
  label: "Learning targets",
  sub: "inner ring · SLT hash",
  body: "Your learning targets, hashed into the ring. The same targets always produce the same hash, and anyone can derive it. This is the proof of what the credential certifies.",
};

export interface InfoCard {
  title: string;
  body: string;
}

// The old "shift" / "what you're left with" messaging, rewritten general across roles.
export const SHIFT: InfoCard = {
  title: "What changes",
  body: "You become the issuer. The credential records which targets were met, not just that someone finished, and anyone can check it without calling you. The people you credential never touch crypto.",
};

export const LEFT_WITH: InfoCard = {
  title: "What you keep",
  body: "A credential that can’t be faked and that you own for good. It outlives any vendor, including us, and holders carry it anywhere it’s useful.",
};
