export interface Roadmap {
  category: string;
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

export const roadmap: Roadmap[] = [
  {
    category: "Founding & Vision",
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
    category: "Andamio Protocol",
    epics: [
      {
        name: "Andamio Protocol 1.0: Initial Mainnet Release",
        description:
          "Andamio protocol goes live with Access Token, learning, contribution, and credential features",
        features: [
          "Access Token minting with unique token name",
          "Global Credential validator",
          "Course and Project validators",
          "Instance registration and administration",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 1,
      },
      {
        name: "Andamio V2 Audit",
        description: "Access Token and Global State validators audited by TxPipe",
        features: ["Updates and documentation"],
        status: "inProgress",
        years: ["2025"],
        quarter: 4,
      },
      {
        name: "Transaction Sponsorship - Testing Phase",
        description:
          "Enable frictionless user onboarding by sponsoring blockchain transactions for new users",
        features: [
          "Mainnet deployment and initial testing",
          "Anti-farming mechanisms",
          "Sponsored transaction monitoring",
          "Performance optimization",
        ],
        status: "inProgress",
        years: ["2025"],
        quarter: 4,
      },
      {
        name: "Protocol Documentation and CIP",
        description:
          "Comprehensive protocol documentation and Cardano Improvement Proposal submission",
        features: [
          "Complete Global State documentation",
          "Local State Validator specifications",
          "Protocol integration guides",
          "Cardano Improvement Proposal submission",
        ],
        status: "inProgress",
        years: ["2025"],
        quarter: 4,
      },
      {
        name: "Andamio Protocol 2.0",
        description:
          "Andamio validators in Aiken and extensible Global State validator with enhanced capabilities",
        features: [
          "Rewrite validators in Aiken",
          "Generalized Global State validator",
          "Creation of custom local state validators",
          "Multi-prerequisites support for complex learning paths",
        ],
        status: "inProgress",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Open Source Validators",
        description:
          "Open source Andamio V2 validators for the community to build on",
        features: ["Andamio Access Token and Global State V2 validators open source", "Documentation"],
        status: "inProgress",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Self-Sovereign On-chain Identity (SSOI) Standard",
        description:
          "Standardization of professional identity built on verifiable contributions and credentials. Prove what you've done, not who you are - enabling privacy-preserving professional reputation across platforms",
        features: [
          "Draft Cardano Improvement Proposal",
          "Universal credential verification standard",
          "Portable identity framework",
          "Privacy-preserving verification mechanisms",
          "Cross-platform identity integration",
        ],
        status: "planned",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Transaction Sponsorship - Full Release",
        description:
          "Production-ready transaction sponsorship enabling seamless onboarding at scale for educational platforms and partnership integrations",
        features: [
          "High-volume transaction processing",
          "Advanced anti-farming protections",
          "Multi-organization sponsorship pools",
          "Comprehensive analytics and monitoring",
          "Integration guides for educational platforms",
        ],
        status: "planned",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Local State Validator Expansion",
        description:
          "Partner with third-party developers to expand Local State Validator implementations",
        features: [
          "Build local validators with ecosystem partners",
          "Integrate existing contribution systems",
          "Developer documentation for validator creation",
          "Validator testing framework",
          "Launch governance experiments",
        ],
        status: "planned",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Andamio Purpose Sidechain Test Network",
        description:
          "Implementation of dedicated sidechain for cost-effective scaling",
        features: [
          "Dedicated validation network",
          "Reduced transaction costs",
          "Increased throughput capacity",
          "Seamless Cardano mainnet integration",
        ],
        status: "proposed",
        years: ["2026"],
        quarter: 3,
      },
    ],
  },
  {
    category: "Andamio Platform + Services",
    epics: [
      {
        name: "Andamio Platform 1.0 ",
        description:
          "Initial Mainnet Release of Andamio Platform. The Andamio Platform is a reference implementation that shows what can be built on top of the Andamio Protocol.",
        features: [
          "Access token minting",
          "Credential validator",
          "Course validator",
          "Project validator",
          "Instance registration and administration",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 1,
      },
      {
        name: "Andamio Platform 1.1 ",
        description: "Refined User Experience",
        features: [
          "Workflows for launching Projects, Credentials, and Courses",
          "Improved transaction flows",
          "Optimized on-chain interactions",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 2,
      },
      {
        name: "Andamio Platform 1.2",
        description: "Improved reporting features and mainstream accessibility",
        features: [
          "Web3 Authentication",
          "Transaction History",
          "Notification Center",
          "Export reports",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 2,
      },
      {
        name: "Andamio Platform 1.3",
        description: "Cardano Wallet-Only Login and Enhanced Privacy",
        features: [
          "Wallet-only authentication (deprecated Discord login)",
          "Database upgrades - no personal data collected",
          "Andamio Access Token for account access",
          "Check Wallet page",
          "Course Studio UX improvements",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 3,
      },
      {
        name: "Andamio Platform 1.4",
        description: "Self-Service Publishing and Task Management",
        features: [
          "Course and Project activation (150 ADA course, 250 ADA bundled)",
          "Smart bundled publishing with prerequisite detection",
          "Task commitment lifecycle improvements",
          "Wallet support restricted to Eternl and Lace",
          "External Task Query API",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 4,
      },
      {
        name: "Andamio Platform 1.5",
        description: "Native Assets and Advanced Features",
        features: [
          "Native asset support for token rewards and deposits",
          "User data export and account deletion (GDPR compliance)",
          "Tiptap v3 editor upgrade",
          "Nostr integration for real-time chat",
          "Enhanced OpenAPI with taskCommitments endpoints",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 4,
      },
      {
        name: "Andamio SDK",
        description: "Andamio SDK for embedding contribution opportunities",
        features: [
          "SDK documentation",
          "Integration examples",
          "Contribution widget components",
          "Configurable front-end app",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 3,
      },
      {
        name: "Andamio API 1.0",
        description:
          "Develop high-value API services for ecosystem integration",
        features: [
          "Credential Verification API",
          "Project Performance API",
          "Ecosystem Intelligence API",
          "Reputation Scoring API",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 4,
      },
      {
        name: "Andamio API 2.0",
        description:
          "Develop high-value API services for ecosystem integration",
        features: [
          "Credential Verification API",
          "Project Performance API",
          "Ecosystem Intelligence API",
          "Reputation Scoring API",
        ],
        status: "inProgress",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Enterprise Integration Tools",
        description:
          "Tools for enterprise adoption and integration with traditional systems",
        features: [
          "Enterprise authentication adapters",
          "Legacy system connectors",
          "Compliance reporting tools",
          "Custom deployment solutions",
        ],
        status: "proposed",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Platform Interoperability Framework",
        description:
          "Framework for connecting Andamio with other coordination platforms",
        features: [
          "Universal credential standard",
          "Cross-platform contribution tracking",
          "Interoperable reputation systems",
          "Multi-platform project management",
        ],
        status: "proposed",
        years: ["2027"],
        quarter: 1,
      },
    ],
  },
  {
    category: "Partnerships + Integrations",
    epics: [
      {
        name: "Catalyst Partnerships",
        description:
          "Work with funded projects to deliver solutions for contributor onboarding and project tracking",
        features: [],
        status: "complete",
        years: ["2025"],
        quarter: 2,
      },
      {
        name: "5am App",
        description:
          "Building teams of skilled farmers and agriculture entrepreneurs in India. Partner with Syngenta and satellite oracle providers to enable credentialed training, satellite data integration, and resource allocation for agricultural excellence",
        features: [
          "Training Agriculture Entrepreneurs to become Certified Field Experts",
          "Satellite data integration for agricultural monitoring",
          "Resource allocation and coordination platform",
          "Training curriculum and certification pathways",
          "Enterprise-scale agricultural credentialing",
        ],
        status: "inProgress",
        years: ["2026"],
        quarter: undefined,
      },
    ],
  },

  {
    category: "Prototypes and System Designs",
    epics: [
      {
        name: "Andamio Course Platform Prototype",
        description:
          "Initial designs and deployment of Andamio course application.",
        features: [],
        status: "complete",
        years: ["2024"],
        quarter: 1,
      },
      {
        name: "Alpha Onboarding to Course Platform",
        description:
          "Content plaform testing with Deep Funding Academy, Governance Guild, Gimbalabs and Mesh",
        features: [],
        status: "complete",
        years: ["2024"],
        quarter: 1,
      },

      {
        name: "Andamio Contributor Platform Prototype",
        description: "Testing at Gimbalabs",
        features: ["Contributors can make treasury commitments"],
        status: "complete",
        years: ["2024"],
        quarter: 3,
      },
      {
        name: "Andamio Course Platform: Preproduction Release",
        description:
          "For students of Plutus PBL and Mesh PBL, public testing on Cardano Preprod",
        features: [],
        status: "complete",
        years: ["2024"],
        quarter: 3,
      },
      {
        name: "Andamio Contribution and Credential Features",
        description:
          "Designs and Preprod deployment of contribution and credential features",
        features: [],
        status: "complete",
        years: ["2024"],
        quarter: 4,
      },
    ],
  },

  {
    category: "Tokenomics",
    epics: [
      {
        name: "Tokenomics Research",
        description:
          "Ongoing research into sustainable economic models for protocol development and ecosystem growth. We are exploring various approaches to value capture, incentive alignment, and long-term sustainability, though we have no formal plans for a token launch at this time.",
        features: [
          "Economic model exploration",
          "Revenue sustainability research",
          "Incentive mechanism design",
          "Community feedback on economic approaches",
        ],
        status: "inProgress",
        years: ["2026"],
        quarter: undefined,
      },
    ],
  },
  {
    category: "Governance",
    epics: [
      {
        name: "Off-Chain Governance Experiments",
        description:
          "Initial off-chain governance experiments to test patterns",
        features: [
          "Community feedback mechanisms",
          "Experimental governance proposals",
          "Governance simulation tools",
          "Governance metrics tracking",
        ],
        status: "complete",
        years: ["2025"],
        quarter: 2,
      },
      {
        name: "Governance Features, Phase 1: Course Governance",
        description:
          "Initial integration of governance features with on-chain smart contracts and Andamio Platform",
        features: [
          "Credential-based voting mechanisms",
          "Course content governance validators",
          "Transparent decision tracking",
        ],
        status: "planned",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Governance Features, Phase 2: Project Governance",
        description:
          "Integration of governance features with project, contribution and treasury management",
        features: [
          "Treasury governance validators",
          "Contribution approval mechanisms",
          "Project milestone governance",
        ],
        status: "planned",
        years: ["2026"],
        quarter: 4,
      },
      {
        name: "Governance Framework Design",
        description:
          "Design and documentation of credential-based governance system",
        features: [
          "Credential-based voting patterns",
          "Governance validator specifications",
          "Decision-making authority separation from economic rights",
          "Transparent governance processes",
        ],
        status: "planned",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Platform Governance Implementation",
        description:
          "Implementation of governance features within the Andamio Platform",
        features: [
          "Platform-based governance experiments",
          "Public roadmap with community feedback",
          "Transparent priority-setting processes",
          "User suggestion incorporation system",
        ],
        status: "proposed",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "Reputation-Based Governance",
        description:
          "Advanced governance systems using reputation and contribution history",
        features: [
          "Reputation-weighted voting",
          "Domain-specific expertise recognition",
          "Historical contribution influence",
          "Adaptive governance weight algorithms",
        ],
        status: "proposed",
        years: ["2026"],
        quarter: 1,
      },
      {
        name: "On-Chain Governance Validators",
        description:
          "Development and deployment of on-chain governance validators",
        features: [
          "Treasury governance validators",
          "Protocol upgrade governance",
          "Parameter change governance",
          "Credential-based voting implementation",
        ],
        status: "proposed",
        years: ["2026"],
        quarter: 2,
      },
      {
        name: "Governance Analytics Dashboard",
        description:
          "Comprehensive analytics for governance participation and outcomes",
        features: [
          "Governance participation metrics",
          "Decision outcome tracking",
          "Governance effectiveness analysis",
          "Participant engagement visualization",
        ],
        status: "proposed",
        years: ["2027"],
        quarter: 1,
      },
    ],
  },
  {
    category: "Catalyst Proposals",
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
