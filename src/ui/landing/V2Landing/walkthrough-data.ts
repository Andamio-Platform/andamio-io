import type { DemoId } from "./step-demos";

export type Archetype = "cert" | "partner" | "cohort";

export interface Step {
  n: string;
  k: string;
  title: string;
  lede: string;
  bullets: string[];
  /** Optional id of an interactive demo to mount under this step's bullets.
   *  Resolved against STEP_DEMOS in step-demos.tsx. The id is type-checked
   *  against the registry (DemoId is a type-only import — no component is
   *  pulled into the data layer at runtime). */
  demoId?: DemoId;
}

export interface WalkthroughEntry {
  label: string;
  chipLabel: string;
  chipKicker: string;
  buyer: string;
  steps: Step[];
  cta: {
    label: string;
    href: string;
    secondary: { label: string; href: string };
  };
}

export const WALKTHROUGH: Record<Archetype, WalkthroughEntry> = {
  cert: {
    label: "Certify professionals",
    chipLabel: "I certify professionals",
    chipKicker: "01 · Cert body",
    buyer: "VP of Certification · Head of Credentialing",
    steps: [
      {
        n: "01",
        k: "Today",
        title: "You issue through Credly. Your credential lives in their database.",
        lede: "Every verification call your compliance team takes is a call you could have avoided. Every price email from Credly is a reminder the credential isn’t yours.",
        bullets: [
          "Verification is a phone call, a PDF, or a proprietary API",
          "Migration cost sits on a shelf — 18 months the day a platform changes terms",
          "Compliance can’t point to a fraud-resistant record without a vendor on the phone",
        ],
      },
      {
        n: "02",
        k: "The shift",
        title: "Anchor the credential on-chain. Keep issuing through Credly for now.",
        lede: "Andamio runs alongside your current platform. Your issuing workflow stays the same; the record of issue lives somewhere that doesn’t depend on anyone’s database.",
        bullets: [
          "Issue through the API from inside your existing tooling — no new interface to learn",
          "Verification becomes public read, not a support ticket",
          "The credential outlives the vendor that processed it",
        ],
        demoId: "cert-verifier",
      },
      {
        n: "03",
        k: "First month",
        title: "One credential type. One cohort. One public verification URL.",
        lede: "We start with the certification that gives you the most fraud exposure. We wire it up alongside your existing issue flow, shadow for a cycle, then flip the canonical record to the on-chain version.",
        bullets: [
          "Parallel issuing with your current platform — zero migration risk",
          "Public verifier link you can put in RFPs and compliance decks",
          "Your ops team keeps their dashboard, sees a new ‘on-chain’ column",
        ],
      },
      {
        n: "04",
        k: "Six months in",
        title: "Your credential is portable, and it keeps earning trust.",
        lede: "The work doesn’t stop mattering when the cohort ends. Your credential lives with the people who earned it and stays verifiable for as long as they hold it — a fraud-resistant record you can point to in RFPs and audits.",
        bullets: [
          "Holders carry the credential anywhere it’s useful, even if they leave",
          "Auditors verify the record themselves, without calling you",
          "Your most valuable credentials stop depending on a vendor staying in business",
        ],
      },
    ],
    cta: {
      label: "Book a 20-min walkthrough — cert-body context",
      href: "mailto:hello@andamio.io?subject=Walkthrough%20%E2%80%94%20certification%20body",
      secondary: { label: "Read the cert-body brief", href: "#" },
    },
  },

  partner: {
    label: "Run a partner program",
    chipLabel: "I run a partner program",
    chipKicker: "02 · Partner",
    buyer: "Head of Partner Enablement · Chief Revenue Officer",
    steps: [
      {
        n: "01",
        k: "Today",
        title: "Your partners issue their own badges. Nobody can enforce a prerequisite.",
        lede: "A partner tier is only as strong as the credential behind it. When the credential lives in three platforms your customers can’t read, the tier stops meaning anything.",
        bullets: [
          "Cross-vendor integration is bespoke per partner, every year",
          "Manual certification bottlenecks push deals a week to the right",
          "Partner tiers and pricing gates run on a spreadsheet, not the credential",
        ],
      },
      {
        n: "02",
        k: "The shift",
        title: "The credential carries the tier. Verification is a public read.",
        lede: "Partner status lives on the credential, not in a spreadsheet. When a partner earns the requirement, their tier is provable in real time — no email to compliance, no PDF, no call to a vendor.",
        bullets: [
          "Tier status travels with the credential the partner holds",
          "Verification resolves in real time, as a public read",
          "Your team stops emailing around to confirm who’s certified",
        ],
      },
      {
        n: "03",
        k: "First month",
        title: "One partner tier. One credential that proves it.",
        lede: "Pick the tier with the most friction — usually the one that unlocks pricing or co-selling rights. Define the credential a partner earns to reach it, and let that credential be the proof.",
        bullets: [
          "Define the tier’s requirement as a credential the partner earns",
          "When they hold it, their status is provable on the spot — a public read",
          "Your portal shows what’s required and who qualifies, without a support loop",
        ],
      },
      {
        n: "04",
        k: "Six months in",
        title: "Partner status that proves itself, year over year.",
        lede: "As the program grows, the credential stays the source of truth for who is qualified. Partners keep what they earn, and proving a tier becomes a read instead of a renewal project.",
        bullets: [
          "Time-to-certified drops from weeks to the issuing cycle",
          "Partners self-serve proof of their tier — you stop being the bottleneck",
          "The record outlives any one platform you run the program on",
        ],
      },
    ],
    cta: {
      label: "Book a 20-min walkthrough — partner program",
      href: "mailto:hello@andamio.io?subject=Walkthrough%20%E2%80%94%20partner%20program",
      secondary: { label: "Read the partner-ops brief", href: "#" },
    },
  },

  cohort: {
    label: "Run cohort-based training",
    chipLabel: "I run cohort training",
    chipKicker: "03 · Cohort",
    buyer: "Founder / CEO of a mid-market training business",
    steps: [
      {
        n: "01",
        k: "Today",
        title: "Your credential is a marketing artifact, not a capability record.",
        lede: "The learner finishes the cohort. The badge goes on LinkedIn. Six months later it does nothing — because nothing else in the ecosystem can read it.",
        bullets: [
          "Per-seat licensing punishes you for growing",
          "Your catalog lives in a platform that prices you out when you scale",
          "Alumni can’t carry the credential into work that requires it",
        ],
      },
      {
        n: "02",
        k: "The shift",
        title: "Per-credential cost. Credentials your alumni keep.",
        lede: "Instead of renting a seat, you pay per credential issued. The credential is portable and owned by the learner — yours to define, theirs to carry.",
        bullets: [
          "Cost structure tracks outcomes, not seats",
          "Alumni hold the credential and can take it anywhere it’s useful",
          "The catalog you built is the catalog you own",
        ],
      },
      {
        n: "03",
        k: "First month",
        title: "One cohort. Credentials issued alongside your current assessment flow.",
        lede: "We don’t touch your curriculum. We wire the credential issue as a webhook off your assessment pass event. The learner gets the same email. The credential is now portable.",
        bullets: [
          "Webhook from your LMS into the issuing API — 1-day integration",
          "Learner UX unchanged: same cohort, same email, same completion moment",
          "Public verification link in the learner’s credential page",
        ],
      },
      {
        n: "04",
        k: "Six months in",
        title: "Your alumni carry your credential into the work that follows.",
        lede: "A graduate keeps the credential and can show it anywhere it’s useful. An employer can verify it directly, without calling you — your brand shows up in places you aren’t.",
        bullets: [
          "Alumni hold the credential themselves, for good",
          "Employers verify the record directly, no support ticket",
          "Your catalog stays yours, on infrastructure no vendor controls",
        ],
      },
    ],
    cta: {
      label: "Book a 20-min walkthrough — cohort program",
      href: "mailto:hello@andamio.io?subject=Walkthrough%20%E2%80%94%20cohort%20training",
      secondary: { label: "Read the cohort-training brief", href: "#" },
    },
  },
};
