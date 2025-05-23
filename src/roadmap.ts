export interface Roadmap {
  category: string;
  epics: Epic[];
}

export interface Epic {
  name: string;
  description: string;
  features: string[];
  status: "complete" | "proposed" | "inProgress" | "planned";
  year: string;
  quarter: 1 | 2 | 3 | 4;
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
        year: "2023",
        quarter: 2,
      },
      {
        name: "Team forming and Org-building",
        description:
          "Clarifying itentions for Andamio in how we organize and build it",
        features: [],
        status: "complete",
        year: "2023",
        quarter: 2,
      },
      {
        name: "Andamio system designs",
        description:
          "Refining and combining components prototyped at Bridge Builders, Gimbalabs, Mesh, and ODIN",
        features: [],
        status: "complete",
        year: "2023",
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
        year: "2025",
        quarter: 1,
      },
      {
        name: "Andamio Protocol 2.0",
        description:
          "Rewrite Andamio validators in Aiken and deploy a more extensible Global State validator",
        features: [
          "Rewrite validators in Aiken",
          "Deploy a more extensible Global State validator",
          "Enable creation of custom local state validators",
        ],
        status: "inProgress",
        year: "2025",
        quarter: 2,
      },
      {
        name: "Protocol Documentation and CIP",
        description:
          "Comprehensive documentation and potential Cardano Improvement Proposal",
        features: [
          "Complete Global State documentation",
          "Local State Validator specifications",
          "Protocol integration guides",
          "Cardano Improvement Proposal submission",
        ],
        status: "inProgress",
        year: "2025",
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
        year: "2025",
        quarter: 3,
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
        year: "2026",
        quarter: 1,
      },
      {
        name: "Self-Sovereign On-chain Identity (SSOI) Standard",
        description:
          "Standardization of emergent identity built on skills and credentials",
        features: [
          "Publish Cardano Improvement Proposal",
          "Universal credential verification standard",
          "Portable identity framework",
          "Privacy-preserving verification mechanisms",
          "Cross-platform identity integration",
        ],
        status: "planned",
        year: "2025",
        quarter: 4,
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
        year: "2025",
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
        year: "2025",
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
        status: "inProgress",
        year: "2025",
        quarter: 2,
      },

      {
        name: "White Label SDK",
        description: "Andamio SDK for embedding contribution opportunities",
        features: [
          "SDK documentation",
          "Integration examples",
          "Contribution widget components",
          "Configurable front-end app",
        ],
        status: "inProgress",
        year: "2025",
        quarter: 3,
      },
      {
        name: "Open Sourcing Andamio Platform",
        description:
          "Open source Andamio Platform for the community to build on",
        features: [
          "Andamio platform open source",
          "Documentation",
          "Developer tokenomics",
        ],
        status: "planned",
        year: "2025",
        quarter: 4,
      },
      {
        name: "Andamio APIs",
        description:
          "Develop high-value API services for ecosystem integration",
        features: [
          "Credential Verification API",
          "Project Performance API",
          "Ecosystem Intelligence API",
          "Reputation Scoring API",
        ],
        status: "inProgress",
        year: "2025",
        quarter: 3,
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
        year: "2026",
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
        year: "2027",
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
        status: "inProgress",
        year: "2025",
        quarter: 2,
      },
      {
        name: "Cardano Ecosystem",
        description:
          "Launch with 3-5 high-visibility funded projects focusing on minimal viable platform connecting projects with contributors",
        features: [],
        status: "inProgress",
        year: "2025",
        quarter: 2,
      },
      {
        name: "Web3 Accessibility",
        description:
          "Expand to 10-15 additional projects with clear funding needs and establish reputation scoring",
        features: [
          "Reputation scoring implementation",
          "TVL visualization dashboards",
          "Andamio Contributors Circle for early adopters",
          "Portable contribution history demonstrations",
          "FC Barcelona: Launch initial 'learn to work' cycles",
        ],
        status: "planned",
        year: "2025",
        quarter: 3,
      },
      {
        name: "FC Barcelona",
        description:
          "Scale messaging based on proven results and open platform for integration",
        features: [
          "Open APIs for platform integration",
          "SDK for embedding contribution opportunities",
          "Cross-project credential sharing",
          "Real-time ecosystem impact dashboards",
          "FC Barcelona: Expand 'learn to work' cycles with improved UX",
        ],
        status: "planned",
        year: "2025",
        quarter: 4,
      },
      {
        name: "Mainstream Adoption",
        description:
          "Begin transition beyond blockchain-specific projects with mainstream-friendly interfaces",
        features: [
          "Blockchain complexity hidden from mainstream users",
          "Bridges to traditional work platforms",
          "No-blockchain-experience onboarding paths",
          "FC Barcelona: Showcase proof-of-concept for mainstream adoption",
        ],
        status: "proposed",
        year: "2026",
        quarter: 1,
      },
      {
        name: "Cross-Chain Implementation",
        description:
          "Extend Andamio infrastructure to support additional blockchain ecosystems",
        features: [
          "Multi-chain credential verification",
          "Cross-chain contribution tracking",
          "Interoperable treasury management",
          "Unified reputation system across chains",
        ],
        status: "proposed",
        year: "2026",
        quarter: 3,
      },
      {
        name: "Enterprise Implementation",
        description:
          "Adapt Andamio for enterprise coordination and talent management",
        features: [
          "Enterprise-grade security and compliance",
          "Integration with existing HR systems",
          "Custom workflow implementations",
          "Private credential verification networks",
        ],
        status: "proposed",
        year: "2026",
        quarter: 4,
      },
      {
        name: "Educational Institutions",
        description:
          "Implement Andamio in educational settings for skill verification and project-based learning",
        features: [
          "Academic credential verification",
          "Project-based learning frameworks",
          "Student contribution tracking",
          "Educational institution dashboards",
        ],
        status: "proposed",
        year: "2027",
        quarter: 2,
      },
      {
        name: "Global Coordination Networks",
        description:
          "Implement Andamio for large-scale coordination across organizational boundaries",
        features: [
          "Multi-organization coordination tools",
          "Global talent pools with verified credentials",
          "Cross-border project management",
          "Distributed team coordination infrastructure",
        ],
        status: "proposed",
        year: "2027",
        quarter: 4,
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
        year: "2024",
        quarter: 1,
      },
      {
        name: "Alpha Onboarding to Course Platform",
        description:
          "Content plaform testing with Deep Funding Academy, Governance Guild, Gimbalabs and Mesh",
        features: [],
        status: "complete",
        year: "2024",
        quarter: 1,
      },

      {
        name: "Andamio Contributor Platform Prototype",
        description: "Testing at Gimbalabs",
        features: ["Contributors can make treasury commitments"],
        status: "complete",
        year: "2024",
        quarter: 3,
      },
      {
        name: "Andamio Course Platform: Preproduction Release",
        description:
          "For students of Plutus PBL and Mesh PBL, public testing on Cardano Preprod",
        features: [],
        status: "complete",
        year: "2024",
        quarter: 3,
      },
      {
        name: "Andamio Contribution and Credential Features",
        description:
          "Designs and Preprod deployment of contribution and credential features",
        features: [],
        status: "complete",
        year: "2024",
        quarter: 4,
      },
    ],
  },

  {
    category: "Tokenomics",
    epics: [
      {
        name: "Sustainable Tokenomics Development",
        description:
          "Design token mechanisms ensuring long-term protocol sustainability and value capture",
        features: [
          "Token launch to support Andamio team runway",
          "Protocol governance transition to community",
          "Autonomous background operation systems",
        ],
        status: "inProgress",
        year: "2025",
        quarter: 2,
      },
      {
        name: "ANT Token Launch",
        description:
          "Launch of Andamio token with self-sustaining economic model",
        features: [
          "Token backing through reserve growth",
          "Separation between economics and governance",
          "Concrete token utility features",
          "Initial distribution mechanism",
        ],
        status: "proposed",
        year: "2025",
        quarter: 3,
      },
      {
        name: "API Access Subscription Model",
        description:
          "Implementation of subscription-based revenue model for API access",
        features: [
          "Tiered API access model",
          "Token staking for premium features",
          "Usage-based pricing structure",
          "Developer incentive program",
        ],
        status: "proposed",
        year: "2026",
        quarter: 1,
      },
      {
        name: "Platform Subscription Tiers",
        description: "Expanded subscription services for platform features",
        features: [
          "Premium organization features",
          "Discord bot integration subscription",
          "Data analytics dashboard access",
          "Talent discovery services",
        ],
        status: "proposed",
        year: "2026",
        quarter: 2,
      },
      {
        name: "Validator Staking Economics",
        description: "Economic model for validator operation and staking",
        features: [
          "Validator staking requirements",
          "Transaction fee allocation system",
          "Validator reward distribution",
          "Cross-validator operation incentives",
        ],
        status: "proposed",
        year: "2026",
        quarter: 3,
      },
      {
        name: "White-Label Solution Economics",
        description:
          "Tokenomics model for enterprise and white-label implementations",
        features: [
          "Enterprise licensing model",
          "Custom deployment pricing",
          "White-label revenue sharing",
          "Enterprise token utility",
        ],
        status: "proposed",
        year: "2026",
        quarter: 4,
      },
      {
        name: "Data Provider Incentive System",
        description:
          "Economic model to incentivize high-quality data contributions",
        features: [
          "Data quality reward mechanisms",
          "Reputation-based incentive multipliers",
          "Data verification staking",
          "Long-term data provider benefits",
        ],
        status: "proposed",
        year: "2027",
        quarter: 1,
      },
      {
        name: "Cross-Chain Token Utility",
        description:
          "Expansion of token utility across multiple blockchain ecosystems",
        features: [
          "Cross-chain token bridging",
          "Multi-chain staking benefits",
          "Unified token utility across ecosystems",
          "Chain-specific token features",
        ],
        status: "proposed",
        year: "2027",
        quarter: 3,
      },
    ],
  },
  {
    category: "Governance",
    epics: [
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
        year: "2025",
        quarter: 3,
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
        year: "2025",
        quarter: 3,
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
        year: "2025",
        quarter: 4,
      },
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
        status: "inProgress",
        year: "2025",
        quarter: 2,
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
        year: "2026",
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
        year: "2026",
        quarter: 2,
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
        year: "2026",
        quarter: 1,
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
        year: "2027",
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
        year: "2023",
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
        year: "2024",
        quarter: 2,
        link: {
          href: "https://www.lidonation.com/en/proposals/open-source-cardano-go-libraries-docs-andamio-cli-f11",
          label: "View Proposal",
        },
      },
      {
        name: "F12: Developing a Self Sovereign On-chain Identity (SSOI)",
        description:
          "Research and development into emergent identity built on skills and credentials",
        features: [],
        status: "complete",
        year: "2025",
        quarter: 2,
        link: {
          href: "https://www.lidonation.com/en/proposals/developing-a-self-sovereign-on-chain-identity-ssoi-f12",
          label: "View Proposal",
        },
      },
      {
        name: "F12: Andamio Purpose Sidechain / Layer 2 Concept",
        description:
          "Develop a Purpose Cardano Sidechain dedicated to Andamio network operations, enabling efficient on-chain record storage and user interactions. Andamio smart contracts and data will migrate to this sidechain, which uses Cardano Node software for compatibility with existing Cardano smart contracts.",
        features: [],
        status: "complete",
        year: "2025",
        quarter: 1,
        link: {
          href: "https://www.lidonation.com/en/proposals/andamio-purpose-sidechain-layer-2-concept-f12",
          label: "View Proposal",
        },
      },
      {
        name: "F13: Andamio SDK & UTxO-RPC client",
        description:
          "Develop Andamio SDKs and a UTxO-RPC Client enabling seamless integration with the Andamio network for both existing products and new decentralized solutions, without reliance on centralized third-party services.",
        features: [],
        status: "inProgress",
        year: "2025",
        quarter: 3,
        link: {
          href: "https://www.lidonation.com/en/proposals/andamio-sdk-utxo-rpc-client-f13",
          label: "View Proposal",
        },
      },
      {
        name: "F13: FC Barcelona - Fan engagement infrastructure Cardano",
        description:
          "Leverage Cardano to support Barça in engaging fans through digital community initiatives, driving mainstream adoption of Cardano.",
        features: [],
        status: "inProgress",
        year: "2025",
        quarter: 4,
        link: {
          href: "https://www.lidonation.com/en/proposals/fc-barcelona-fan-engagement-infrastructure-cardano-f13",
          label: "View Proposal",
        },
      },
    ],
  },
];
