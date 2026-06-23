// Source content for the "How it works" section. The section is now a single
// general-purpose badge demo (see V2IssuerExplorer), but the per-archetype
// material is preserved here and repurposed: the "problem" + supporting points
// feed the "Need Inspiration" drawer (inspiration-data.ts), and the per-role
// framing informs the role-neutral annotation copy (annotation-data.ts).
//
// Archetypes map to the canonical buyer personas (Theo / Carmen / Marcus), per
// docs/brainstorms/2026-06-22-unified-issuer-explorer-requirements.md.

export type ArchetypeKey = "cohort" | "cert" | "platform";

export interface Evidence {
  label: string;
  href: string;
}

export interface Step {
  name: string;
  lede: string;
  points: string[];
  evidence?: Evidence[];
}

export interface Archetype {
  label: string;
  qualifier: string;
  steps: Step[];
}

export const ORDER: ArchetypeKey[] = ["cohort", "cert", "platform"];

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  cert: {
    label: "Certification",
    qualifier: "You run a certification program. The credential has to hold up.",
    steps: [
      {
        name: "The problem",
        lede: "Your certs live in a vendor’s platform, and you don’t own the data.",
        points: [
          "Fake PDFs are easy to make, and hard to disprove.",
          "The badges aren’t machine-readable.",
          "A price hike or a vendor change puts the whole program at risk.",
        ],
        evidence: [
          {
            label: "Accredible — 2025 State of Credentialing Report",
            href: "https://www.accredible.com/reports/2025-state-of-credentialing-report",
          },
          {
            label: "StandOutCV — how many people lie on a resume",
            href: "https://standout-cv.com/usa/stats-usa/study-fake-job-references-resume-lies",
          },
        ],
      },
      {
        name: "The shift",
        lede: "Add a verification layer on top of the program you already run.",
        points: [
          "It runs alongside your current system, with no day-one migration.",
          "You own the data, and you own the certs.",
          "Anyone can check a credential without calling you.",
        ],
      },
      {
        name: "Your first credential",
        lede: "Start with one certification line, alongside your current flow.",
        points: [
          "Define what it certifies, down to the targets it proves.",
          "Issue it through the API, with no new tool for your team.",
          "The people you certify never touch crypto.",
        ],
      },
      {
        name: "What you’re left with",
        lede: "A credential that can’t be faked, and that you own for good.",
        points: [
          "It proves which targets were met, not just a pass.",
          "It outlives any vendor, including us.",
          "Holders carry it anywhere it’s useful.",
        ],
      },
    ],
  },
  platform: {
    label: "Platform operators",
    qualifier: "You run a platform others teach on. Recognition should travel.",
    steps: [
      {
        name: "The problem",
        lede: "The credentials your users earn die the day they leave your platform.",
        points: [
          "Recognition is trapped inside your walls.",
          "You depend on a credentialing vendor you don’t control.",
          "Your users walk away with nothing that travels.",
        ],
        evidence: [
          {
            label: "Accredible — 2025 State of Credentialing Report",
            href: "https://www.accredible.com/reports/2025-state-of-credentialing-report",
          },
        ],
      },
      {
        name: "The shift",
        lede: "Give your community recognition that travels beyond the platform.",
        points: [
          "Issue credentials your users actually own.",
          "Embed it as your own, through a clean API and a public badge page.",
          "Your platform gets more valuable to the clients you serve.",
        ],
      },
      {
        name: "Your first credential",
        lede: "Wire issuing into the moment a user finishes their work.",
        points: [
          "Your content owners define what their credentials mean.",
          "Each user gets a credential they carry anywhere.",
          "Users never touch crypto.",
        ],
      },
      {
        name: "What you’re left with",
        lede: "Portable recognition is something your platform now offers.",
        points: [
          "Users keep what they earned, for good.",
          "Anyone can verify it directly.",
          "The recognition you give travels everywhere your users go.",
        ],
      },
    ],
  },
  cohort: {
    label: "Cohort training",
    qualifier: "You run a cohort or practicum. The credential is the product.",
    steps: [
      {
        name: "The problem",
        lede: "Your graduates finish real work, but the proof is a PDF an employer can’t check.",
        points: [
          "There’s no machine-readable proof of which outcomes they hit.",
          "The recognition stays trapped in your own bubble.",
          "You pay for nothing an employer actually trusts.",
        ],
        evidence: [
          {
            label: "Accredible — 2025 State of Credentialing Report",
            href: "https://www.accredible.com/reports/2025-state-of-credentialing-report",
          },
        ],
      },
      {
        name: "The shift",
        lede: "You become the issuer, and the credential is proof of shipped work any employer can verify.",
        points: [
          "It records which targets a graduate met, not just that they finished.",
          "Anyone can check it without calling you.",
          "Your graduates never touch crypto.",
        ],
      },
      {
        name: "Your first credential",
        lede: "Start with your completion credential for one cohort.",
        points: [
          "Define what it certifies, and issue it from the tools you already use.",
          "Each graduate gets a credential they own.",
          "You keep the data, and you keep the standard.",
        ],
      },
      {
        name: "What you’re left with",
        lede: "A credential you issued gets verified by someone you never coordinated with.",
        points: [
          "Graduates carry it anywhere, even after the cohort ends.",
          "Employers verify it directly.",
          "Your program’s recognition travels beyond your bubble.",
        ],
      },
    ],
  },
};
