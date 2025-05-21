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
}

// whitepaper?

export const roadmap: Roadmap[] = [
  {
    category: "Andamio v1: Andamio Network Launch",
    epics: [
      {
        name: "1.0 Andamio Mainnet Release",
        description:
          "Fully featured Andamio Platform with Access Token, learning, contribution, and credential features",
        features: [],
        status: "complete",
        year: "2025",
        quarter: 1,
      },
      {
        name: "1.1 Refining User Experience",
        description:
          "Gather feedback from Andamio Foundation Era members and continuously improve UX",
        features: [],
        status: "inProgress",
        year: "2025",
        quarter: 1,
      },
      {
        name: "1.2 Public Onboarding",
        description: "Self service onboarding portal and public release",
        features: [],
        status: "inProgress",
        year: "2025",
        quarter: 2,
      },
      {
        name: "Governance Features, Phase 1: Course Governance",
        description:
          "Initial integration of governance features with on-chain smart contracts and Andamio Platform",
        features: [],
        status: "planned",
        year: "2025",
        quarter: 2,
      },
      {
        name: "Governance Features, Phase 2: Project Governance",
        description:
          "Integration of governance features with project, contribution and treasury management",
        features: [],
        status: "planned",
        year: "2025",
        quarter: 3,
      },
    ],
  },
  {
    category: "Go-To-Market Strategy Implementation",
    epics: [
      {
        name: "Phase 1: Foundations",
        description:
          "Launch with 3-5 high-visibility funded projects focusing on minimal viable platform connecting projects with contributors",
        features: [
          "Core credential verification system",
          "Treasury tracking system",
          "Success demonstration metrics",
          "FC Barcelona: Test customization for white-label solutions",
          "Integration with Mesh Web3 services for simplified user onboarding",
        ],
        status: "planned",
        year: "2025",
        quarter: 2,
      },
      {
        name: "Phase 2: Rising Structures",
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
        name: "Phase 3: Network Nexus",
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
        name: "Phase 4: Expanding Horizons",
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
        name: "Sustainable Tokenomics Development",
        description:
          "Design token mechanisms ensuring long-term protocol sustainability and value capture",
        features: [
          "Token launch to support Andamio team runway",
          "Protocol governance transition to community",
          "Autonomous background operation systems",
        ],
        status: "proposed",
        year: "2026",
        quarter: 2,
      },
    ],
  },
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
      {
        name: "DAOs <3 smart contracts for skill-acquisition and contribution tracking",
        description: "Catalyst Fund 10 Proposal",
        features: [],
        status: "complete",
        year: "2023",
        quarter: 4,
      },
    ],
  },
  {
    category: "Partnerships & System Design",
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
        name: "Catalyst F11: Andamio CLI and Cardano Go",
        description: "Access token and enrollment coming in November 2024",
        features: [],
        status: "complete",
        year: "2024",
        quarter: 2,
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
      {
        name: "Developing a Self Sovereign On-chain Identity (SSOI)",
        description:
          "Research and development into emergent identity built on skills and credentials",
        features: [],
        status: "complete",
        year: "2024",
        quarter: 4,
      },
      {
        name: "Andamio Purpose Sidechain / Layer 2 Concept",
        description:
          "Research and development into how a Cardano sidechain can be used to reduce costs and barriers to entry while increasing the scalability of the Andamio Network",
        features: [],
        status: "complete",
        year: "2024",
        quarter: 4,
      },
    ],
  },
  {
    category: "Andamio v1: Andamio Network Launch",
    epics: [
      {
        name: "1.0 Andamio Mainnet Release",
        description:
          "Fully featured Andamio Platform with Access Token, learning, contribution, and credential features",
        features: [],
        status: "complete",
        year: "2025",
        quarter: 1,
      },
      {
        name: "1.1 Refining User Experience",
        description:
          "Gather feedback from Andamio Foundation Era members and continuosly improve UX",
        features: [],
        status: "inProgress",
        year: "2025",
        quarter: 1,
      },
      {
        name: "1.2 Public Onboarding",
        description: "Self service onboarding portal and public release",
        features: [],
        status: "inProgress",
        year: "2025",
        quarter: 2,
      },
      {
        name: "Governance Features, Phase 1: Course Governance",
        description:
          "Initial integration of governance features with on-chain smart contracts and Andamio Platform",
        features: [],
        status: "planned",
        year: "2025",
        quarter: 2,
      },
      {
        name: "Governance Features, Phase 2: Project Governance",
        description:
          "Integration of governance features with project, contribution and treasury management",
        features: [],
        status: "planned",
        year: "2025",
        quarter: 3,
      },
    ],
  },
];
