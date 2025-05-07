import { type Roadmap } from "~/roadmap";

export const futureRoadmap: Roadmap[] = [
  {
    era: "Andamio v1: Andamio Network Launch",
    year: "2025",
    epics: [
      {
        name: "1.0 Andamio Mainnet Release",
        description:
          "Fully featured Andamio Platform with Access Token, learning, contribution, and credential features",
        features: [],
        status: "complete",
        quarter: 1,
      },
      {
        name: "1.1 Refining User Experience",
        description:
          "Gather feedback from Andamio Foundation Era members and continuously improve UX",
        features: [],
        status: "inProgress",
        quarter: 1,
      },
      {
        name: "1.2 Public Onboarding",
        description: "Self service onboarding portal and public release",
        features: [],
        status: "inProgress",
        quarter: 2,
      },
      {
        name: "Governance Features, Phase 1: Course Governance",
        description:
          "Initial integration of governance features with on-chain smart contracts and Andamio Platform",
        features: [],
        status: "planned",
        quarter: 2,
      },
      {
        name: "Governance Features, Phase 2: Project Governance",
        description:
          "Integration of governance features with project, contribution and treasury management",
        features: [],
        status: "planned",
        quarter: 3,
      },
    ],
  },
  {
    era: "Go-To-Market Strategy Implementation",
    year: "2025-2026",
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
        quarter: 2,
      },
    ],
  },
];
