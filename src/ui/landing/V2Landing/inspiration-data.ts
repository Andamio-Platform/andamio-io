// "Need Inspiration" drawer content. Repurposes the archetype material from
// explorer-content.ts into application ideas, each as a problem + how Andamio
// helps. Role framing is kept, but the help line stays within the
// no-cross-issuer-composability guardrail: cross-org value is portability
// ("anyone can verify it"), never automatic cross-org enforcement.

export interface InspirationItem {
  title: string;
  problem: string;
  help: string;
}

export const INSPIRATION: InspirationItem[] = [
  {
    title: "Cohort training",
    problem: "Your graduates finish real work, but the proof is a PDF an employer can’t check.",
    help: "Issue a credential that records which targets each graduate met, and anyone can verify it without calling you.",
  },
  {
    title: "Certification",
    problem: "Your certs live in a vendor’s platform, and you don’t own the data.",
    help: "Add a verification layer on the program you already run, keep ownership of the data and the certs, and let anyone check a credential directly.",
  },
  {
    title: "Platform operators",
    problem: "The credentials your users earn die the day they leave your platform.",
    help: "Give your community recognition they own and carry anywhere, embedded as your own through a clean API and a public badge page.",
  },
];
