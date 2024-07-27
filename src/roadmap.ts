export interface Roadmap {
  era: string;
  year: string;
  epics: Epic[];
}

export interface Epic {
  name: string;
  description: string;
  features: string[];
  status: "complete" | "proposed" | "in progress" | "planned";
  quarter: 1 | 2 | 3 | 4;
}

export const roadmap: Roadmap[] = [
  {
    era: "Andamio 1.0: Initial Vision",
    year: "2023",
    epics: [
      {
        name: "Andamio Prototype",
        description: "Optional",
        features: [],
        status: "complete",
        quarter: 1,
      },
      {
        name: "Andamio Contributor Platform",
        description: "Testing at Gimbalabs",
        features: ["Contributors can make treasury commitments"],
        status: "complete",
        quarter: 1,
      },
      {
        name: "Andamio Course Platform",
        description: "Optional",
        features: [
          "Learners can create accounts at andamio.io",
          "Learners can track progress off-chain",
          "Creators can create a course a write course content",
          "Creators can deploy a course on-chain",
          "Creators can manage a course",
          // "Andamio team tests on-chain course enrollment",
          "Early access to Andamio Studio for creators",
          "Train-the-trainer workshops",
        ],
        status: "proposed",
        quarter: 4,
      },
    ],
  },
  {
    era: "Andamio 2.0: Building Partnerships",
    year: "2024",
    epics: [
      {
        name: "Andamio Prototype",
        description: "Optional",
        features: [],
        status: "complete",
        quarter: 1,
      },
      {
        name: "Andamio Contributor Platform",
        description: "Testing at Gimbalabs",
        features: ["Contributors can make treasury commitments"],
        status: "in progress",
        quarter: 3,
      },
      {
        name: "Andamio Course Platform",
        description: "Optional",
        features: [
          "Learners can create accounts at andamio.io",
          "Learners can track progress off-chain",
          "Creators can create a course a write course content",
          "Creators can deploy a course on-chain",
          "Creators can manage a course",
          // "Andamio team tests on-chain course enrollment",
          "Early access to Andamio Studio for creators",
          "Train-the-trainer workshops",
        ],
        status: "planned",
        quarter: 4,
      },
    ],
  },
];
