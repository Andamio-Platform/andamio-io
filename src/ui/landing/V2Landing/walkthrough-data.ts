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
        title: "Your catalog is portable. Another body cites your credential as a prerequisite.",
        lede: "Once your credentials compose, other issuers can gate their programs on yours without a data-sharing agreement. That’s the moment the network effect starts earning on your back catalog.",
        bullets: [
          "Partner cert bodies set your credential as a prerequisite, no integration",
          "Fraud-audit trail auditors can verify without calling you",
          "Your negotiating position with the incumbent platform fundamentally changes",
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
        title: "The credential itself carries the tier. The protocol enforces the rule.",
        lede: "Prerequisites live on the credential, not in your CRM. A partner holding three credentials from three issuers unlocks your gold tier automatically — because the protocol can read all three.",
        bullets: [
          "Prerequisite enforcement across issuers, no API handshake",
          "Partner tier upgrades resolve in real time when the credential lands",
          "Your sales team stops emailing compliance to verify",
        ],
      },
      {
        n: "03",
        k: "First month",
        title: "One partner tier. One prerequisite rule. One live enforcement.",
        lede: "Pick the tier that has the most friction — usually the one that unlocks pricing or co-selling rights. Wire the prerequisite to the credential. Ship.",
        bullets: [
          "Define the tier’s prerequisite as a credential the partner already holds (or will earn)",
          "Protocol enforces the check when the partner claims the tier",
          "Your portal shows the gate. The partner sees why it’s closed and how to open it.",
        ],
      },
      {
        n: "04",
        k: "Six months in",
        title: "Your tier structure is a capability ladder. Credentials chain across it.",
        lede: "Partners hold credentials from your bodies, your competitors’ bodies, and the industry associations. All of them compose into your tier logic. None of them required you to negotiate a data-sharing agreement.",
        bullets: [
          "Revenue unblocked: time-to-certified drops from weeks to the issuing cycle",
          "Partners self-serve into higher tiers — you stop being the bottleneck",
          "Industry-wide prerequisite chains become something you ship, not request",
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
        title: "Per-credential cost. Credentials that mean something downstream.",
        lede: "Instead of renting a seat, you pay per credential issued. The credential is portable, composable, and can be a prerequisite in somebody else’s program the day it lands.",
        bullets: [
          "Cost structure tracks outcomes, not seats",
          "Alumni credentials unlock admission into advanced programs elsewhere",
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
        title: "Your alumni carry your credential into work that pays them back.",
        lede: "A graduate of your cohort shows up at an employer that gates access on credentials like yours. The employer verifies without calling you. Your brand just got used somewhere you aren’t.",
        bullets: [
          "Alumni become network nodes: their credential is your marketing",
          "Advanced programs can require your credential as a prerequisite",
          "You keep running the cohort you love. The credential does more work than the cohort.",
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
