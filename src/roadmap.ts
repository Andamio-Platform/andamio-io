export interface Roadmap {
  category: string;
  /** One-line description of the product / track. */
  tagline?: string;
  /** "product" tracks render as release timelines; "history" tracks render in the History & Funding section. */
  kind?: "product" | "history";
  epics: Epic[];
}

export interface Epic {
  name: string;
  description: string;
  features: string[];
  status: "complete" | "proposed" | "inProgress" | "planned";
  years: string[];
  quarter: 1 | 2 | 3 | 4 | undefined;
  link?: {
    href: string;
    label: string;
  };
}

// Product tracks are sourced from the Product Circle public roadmap
// (product-circle/roadmap: historical-releases.json + roadmap-public.json),
// the curated source of truth for what ships and roughly when. Blurbs are
// customer-voice and intentionally do not mirror the internal board.
// "Founding & Vision" and "Catalyst Proposals" are preserved historical
// context (kind: "history") that the release data does not carry.
export const roadmap: Roadmap[] = [
  {
    category: "Andamio Issuer",
    tagline: "Verifiable, learner-owned credentials",
    kind: "product",
    epics: [
      {
        name: "On-chain credential issuance",
        description:
          "The on-chain foundation for issuing credentials: protocol utilities and data encoding that let credentials be written to and verified on Cardano.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Andamio Issuer 1.0",
        description:
          "Turn the badges you issue into credentials you control. Andamio Issuer adds a verifiable credential layer on top of the programs you already run: credentials that outlive their issuer, that software can verify, and that belong to the people who earn them. No new tools or accounts for you or your people to manage.",
        features: [],
        status: "inProgress",
        years: ["2026"],
        quarter: 3,
      },
    ],
  },
  {
    category: "Andamio API",
    tagline: "The integration layer for credentials and identity",
    kind: "product",
    epics: [
      {
        name: "Andamio API 1.0",
        description:
          "The Andamio API goes live on Cardano mainnet: developer email sign-in, a consolidated dashboard for learners and teachers, and the first assignment-commitment flows.",
        features: [],
        status: "complete",
        years: ["2025"],
        quarter: 4,
      },
      {
        name: "Andamio API 2.0",
        description:
          "A ground-up rebuild: a developer gateway portal at api.andamio.io, a consistent response format across every endpoint, and access-token ownership verification.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Andamio API 2.2",
        description:
          "Billing and pricing go public: tier and plan endpoints, metered quotas, and sponsored-transaction support so apps never ask users to pay gas.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Andamio API 2.3",
        description:
          "Wallet-based developer login with CIP-30 signatures and refresh tokens, plus cross-environment enterprise key provisioning.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Andamio API 2.4",
        description:
          "Back-office controls to set up and meter enterprise customers: enterprise key provisioning, allocation lifecycle, and a sponsorship reconciler with full observability.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Andamio API 2.5",
        description:
          "2.5 is when apps can integrate Andamio Issuer directly. Where 2.4 gave Andamio the back-office controls to set up and meter enterprise customers, 2.5 ships the public Issuer API their own apps call: issue and read credentials, sign users in without wallets, every action sponsored, with no third-party infrastructure to wire up.",
        features: [],
        status: "inProgress",
        years: ["2026"],
        quarter: 3,
      },
    ],
  },
  {
    category: "Apps & Tooling",
    tagline: "Web app, templates, CLI, and bots for building on Andamio",
    kind: "product",
    epics: [
      {
        name: "Andamio App Template v2.0",
        description:
          "A modernized starter template (Next.js 15) for building apps on Andamio, with an agent-agnostic skills structure for AI-assisted development.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Andamio App v2.0",
        description:
          "The Andamio web app, rebuilt: project overviews, the full task-commitment lifecycle, manager dashboards, and sponsored migration from V1 to V2.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Andamio CLI v0.1",
        description:
          "First release of the Andamio CLI: import and export course modules, manage content, and drive course updates from the terminal.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Andamio CLI v0.13",
        description:
          "The CLI matures: teacher assignment workflows, richer course tooling, and a hardened release pipeline.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Andamio Bot v1.0",
        description:
          "A credential-gated Discord bot you can deploy in minutes: gate channels on what people have actually earned.",
        features: [],
        status: "planned",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Andamio App v2.5.0",
        description:
          "The Andamio web app: the interface where learners and teachers interact with courses, credentials, and assignments.",
        features: [],
        status: "planned",
        years: ["2026"],
        quarter: 3,
      },
      {
        name: "Andamio CLI v0.14.0",
        description:
          "The developer-facing command-line interface to Andamio: drive courses, credentials, and protocol actions from your terminal.",
        features: [],
        status: "planned",
        years: ["2026"],
        quarter: undefined,
      },
    ],
  },
  {
    category: "Credential Badges",
    tagline: "Open Badges 3.0 visuals and credential integration",
    kind: "product",
    epics: [
      {
        name: "Credential Badges 0.1",
        description:
          "The foundation for verifiable credential badges: a hosted Open Badges 3.0 issuer profile and the first set of V2 credential badge visuals.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Credential Badges v1.0",
        description:
          "Andamio Credential Badges 1.0 introduces Open Badges 3.0 (OB3) credential integration and badge visuals.",
        features: [],
        status: "planned",
        years: ["2026"],
        quarter: 2,
      },
    ],
  },
  {
    category: "Andamio Pioneers",
    tagline: "Developer cohorts learning to build on Andamio",
    kind: "product",
    epics: [
      {
        name: "Pioneers Cohort 1",
        description:
          "The first Andamio Pioneers developer cohort: ten weekly sessions taking developers through building on Andamio, February to April 2026.",
        features: [],
        status: "complete",
        years: ["2026"],
        quarter: 1,
      },
    ],
  },
  {
    category: "Founding & Vision",
    tagline: "How Andamio began",
    kind: "history",
    epics: [
      {
        name: "Andamio Founded",
        description:
          "By a group of Catalyst veterans, Gimbalabs contributors, and Cardano builders",
        features: [],
        status: "complete",
        years: ["2023"],
        quarter: 2,
      },
      {
        name: "Team forming and Org-building",
        description:
          "Clarifying itentions for Andamio in how we organize and build it",
        features: [],
        status: "complete",
        years: ["2023"],
        quarter: 2,
      },
      {
        name: "Andamio system designs",
        description:
          "Refining and combining components prototyped at Bridge Builders, Gimbalabs, Mesh, and ODIN",
        features: [],
        status: "complete",
        years: ["2023"],
        quarter: 3,
      },
    ],
  },
  {
    category: "Catalyst Proposals",
    tagline: "Project Catalyst funding milestones",
    kind: "history",
    epics: [
      {
        name: "F10: DAOs <3 smart contracts for skill-acquisition and contribution tracking",
        description:
          "Develop core Andamio smart contracts for skill-acquisition and contribution tracking",
        features: [],
        status: "complete",
        years: ["2023"],
        quarter: 4,
        link: {
          href: "https://www.lidonation.com/en/proposals/daos-3-smart-contracts-for-skill-acquisition-and-contribution-tracking-f10",
          label: "View Proposal",
        },
      },
      {
        name: "F11: Open-Source Cardano Go Libraries + Docs + Andamio CLI",
        description: "Develop Andamio CLI using Cardano Go libraries",
        features: [],
        status: "complete",
        years: ["2024"],
        quarter: 2,
        link: {
          href: "https://www.lidonation.com/en/proposals/open-source-cardano-go-libraries-docs-andamio-cli-f11",
          label: "View Proposal",
        },
      },
      {
        name: "F12: Andamio Purpose Sidechain / Layer 2 Concept",
        description:
          "Develop a Purpose Cardano Sidechain dedicated to Andamio network operations, enabling efficient on-chain record storage and user interactions. Andamio smart contracts and data will migrate to this sidechain, which uses Cardano Node software for compatibility with existing Cardano smart contracts.",
        features: [],
        status: "complete",
        years: ["2025"],
        quarter: 1,
        link: {
          href: "https://www.lidonation.com/en/proposals/andamio-purpose-sidechain-layer-2-concept-f12",
          label: "View Proposal",
        },
      },
      {
        name: "F12: Developing a Self Sovereign On-chain Identity (SSOI)",
        description:
          "Research and development into emergent identity built on skills and credentials",
        features: [],
        status: "complete",
        years: ["2025"],
        quarter: 2,
        link: {
          href: "https://www.lidonation.com/en/proposals/developing-a-self-sovereign-on-chain-identity-ssoi-f12",
          label: "View Proposal",
        },
      },
      {
        name: "F13: Andamio SDK & UTxO-RPC client",
        description:
          "Develop Andamio SDKs and a UTxO-RPC Client enabling seamless integration with the Andamio network for both existing products and new decentralized solutions, without reliance on centralized third-party services.",
        features: [],
        status: "complete",
        years: ["2025"],
        quarter: 3,
        link: {
          href: "https://www.lidonation.com/en/proposals/andamio-sdk-utxo-rpc-client-f13",
          label: "View Proposal",
        },
      },
      {
        name: "F13: FC Barcelona - Fan engagement infrastructure Cardano",
        description:
          "Building teams of engaged fans and community leaders. Leverage Cardano to support Barça through digital community initiatives and contribution-based recognition, driving mainstream adoption of Cardano with scalable infrastructure and proven engagement models.",
        features: [
          "Open APIs for platform integration",
          "SDK for embedding contribution opportunities",
          "Cross-project credential sharing",
          "Real-time ecosystem impact dashboards",
          "Expand 'learn to work' cycles with improved UX",
        ],
        status: "inProgress",
        years: ["2025", "2026", "2027"],
        quarter: undefined,
        link: {
          href: "https://www.lidonation.com/en/proposals/fc-barcelona-fan-engagement-infrastructure-cardano-f13",
          label: "View Proposal",
        },
      },
    ],
  },
];
