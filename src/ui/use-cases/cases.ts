/**
 * Use cases — one record per partner, rendered by the single CaseDetail
 * template at /use-cases/[slug] and the filterable index at /use-cases.
 *
 * Honesty rules: every outcome row says whether it is a measured `result`, a
 * program `target`, or a public `fact`. Partner facts come only from what the
 * partner (or Andamio) has published; no invented adoption numbers.
 */

import {
  type ProofSkill,
  type ProofTheme,
} from "~/ui/system/proof-badge/credential";

export const SECTORS = [
  "Governance",
  "Agriculture",
  "Nature finance",
  "Innovation funding",
  "Sports",
  "Business development",
] as const;
export type Sector = (typeof SECTORS)[number];

export type OutcomeKind = "result" | "target" | "fact";

export interface CaseOutcome {
  k: string;
  v: string;
  kind: OutcomeKind;
}

export interface CaseStudy {
  slug: string;
  partner: string;
  sector: Sector;
  title: string;
  summary: string;
  logo?: string;
  /**
   * Large mark beside the outcomes readout. Defaults to `logo`.
   * Use this when the badge mark is the wrong color for the page
   * (Toha's badge file is black and vanishes on the navy ground).
   */
  wordmark?: string;
  /** Width of the outcomes mark, as a percentage of its column. */
  logoWidth: `${number}%`;
  /** Badge colors for the partner's MiniBadge. */
  theme: ProofTheme;
  badgeCourse: string;
  /** Stand-in face until a live credential replaces these fields. */
  badge: {
    module: string;
    earner: string;
    skills: readonly ProofSkill[];
    /** 56 hex chars. */
    courseId: string;
    /** 64 hex chars. */
    sltHash: string;
    issuedAt: string;
  };
  /** Only when the partner has made it public. */
  adoption?: "invisible" | "visible";
  challenge: readonly string[];
  approach: readonly string[];
  cycleLabel: string;
  cycle: readonly {
    id: string;
    label: string;
    detail: string;
    points?: readonly string[];
  }[];
  outcomes: readonly CaseOutcome[];
  outcomesNote?: string;
  quote?: { text: string; name: string; role: string; href: string };
  links?: readonly { label: string; href: string }[];
}

export const CASES: readonly CaseStudy[] = [
  {
    slug: "BarcaFanLab",
    partner: "FC Barcelona",
    sector: "Sports",
    title: "Barça Fan Lab",
    summary:
      "FC Barcelona's fan learning platform, built with Andamio on Cardano. Fans sign in with BarçaID, work through program areas and earn verifiable credentials, without ever seeing the blockchain.",
    logo: "/customer/fcbarcelona/fcbarcelona-badge.png",
    logoWidth: "63%",
    theme: {
      cyan: "#4f7dff",
      cyanHot: "#c9d8ff",
      orange: "#e0405e",
      orangeHot: "#ffb3c1",
    },
    badgeCourse: "Barça Fan Lab",
    badge: {
      module: "History and values",
      earner: "Alex Martín",
      skills: [
        { label: "Club history", icon: "badge" },
        { label: "Community", icon: "checklist" },
        { label: "BarçaID", icon: "scaffold" },
        { label: "Credentials", icon: "calculator" },
      ],
      courseId: "b4ca000101a11e01f4ab0001a1b2c3d4e5f60718293a4b5c6d7e8f90",
      sltHash:
        "b4ca000101a11e02f4ab0002a1b2c3d4e5f60718293a4b5c6d7e8f90aabbccdd",
      issuedAt: "2026-09-25T10:00:00Z",
    },
    adoption: "invisible",
    challenge: [
      "FC Barcelona wants fans to do more than consume content: to learn about the club, take part in community activities and be recognized for it in a way that is transparent and verifiable.",
      "That recognition has to work for millions of fans who have never used a crypto wallet.",
    ],
    approach: [
      "Fans sign in with BarçaID, the club's existing identity. Signing in creates a personal Cardano wallet for each fan automatically, and transactions are sponsored, so the blockchain stays invisible.",
      "Andamio is the technology partner and the platform used to build the participation experience. The project is funded by Project Catalyst Fund 13.",
    ],
    cycleLabel: "Fan program areas",
    cycle: [
      {
        id: "values",
        label: "History and values",
        detail:
          "The club's history, identity and values, including what 'Més que un club' means.",
      },
      {
        id: "society",
        label: "Sustainability and inclusion",
        detail:
          "Sustainability, inclusion, women's empowerment and responsible digital innovation.",
      },
      {
        id: "community",
        label: "Fan communities",
        detail: "Linking physical fan communities with digital participation.",
      },
      {
        id: "web3",
        label: "Web3 (experimental)",
        detail:
          "Practical Web3 applications, from collectibles and loyalty to smart contracts. The club frames this area as learning and experimentation, not confirmed use cases.",
      },
    ],
    outcomes: [
      { k: "launched", v: "25 September 2026", kind: "fact" },
      {
        k: "sign-in",
        v: "BarçaID; a Cardano wallet is created for each fan",
        kind: "fact",
      },
      { k: "transactions", v: "Sponsored; fans pay no fees", kind: "fact" },
      { k: "funding", v: "Project Catalyst Fund 13", kind: "fact" },
      { k: "adoption", v: "Not disclosed by the club", kind: "fact" },
    ],
    quote: {
      text: "FC Barcelona has just launched Barça Fan Lab, developed with @Andamio_teams using Cardano. Fans will be able to learn about Barça's history and values, take part in community activities, and gain verifiable digital credentials…",
      name: "Cardano Foundation",
      role: "on X, 25 Sep 2026",
      href: "https://x.com/Cardano_CF",
    },
  },
  {
    slug: "Intersect",
    partner: "Intersect",
    sector: "Governance",
    title: "Intersect: Maintainer Retainer Program",
    summary:
      "Onboarding, tracking and paying the maintainers behind Cardano's open source infrastructure, with credential-gated access and milestone escrow.",
    logo: "/customer/intersect/intersect-badge.png",
    logoWidth: "80%",
    theme: {
      cyan: "#2f6bff",
      cyanHot: "#d5e2ff",
      orange: "#ffd36a",
      orangeHot: "#fff3c4",
    },
    badgeCourse: "Maintainer Onboarding",
    badge: {
      module: "Monthly milestone",
      earner: "Priya Nair",
      skills: [
        { label: "Terms", icon: "checklist" },
        { label: "Orientation", icon: "badge" },
        { label: "Milestone", icon: "scaffold" },
        { label: "Review", icon: "warning" },
      ],
      courseId: "15ec000101a11e017ec70001a1b2c3d4e5f60718293a4b5c6d7e8f91",
      sltHash:
        "15ec000101a11e027ec70002a1b2c3d4e5f60718293a4b5c6d7e8f9100112233",
      issuedAt: "2025-12-01T09:00:00Z",
    },
    challenge: [
      "Intersect coordinates Cardano's open source committees and working groups. Its Open Source Committee manages maintainers who build critical ecosystem infrastructure.",
      "The question: how do you onboard, track and pay dozens of maintainers across committees, with full transparency and no payment disputes?",
    ],
    approach: [
      "Andamio replaces invoice cycles, spreadsheets and manual treasury execution with credential-gated access, milestone escrow and fund release on reviewer approval.",
      "Every payment, approval and credential is recorded on-chain.",
    ],
    cycleLabel: "Maintainer lifecycle",
    cycle: [
      {
        id: "onboard",
        label: "Onboard",
        detail:
          "Maintainers complete a prerequisite course and earn the access credential. No credential, no access.",
        points: [
          "Prerequisite: accept terms, complete the orientation module, and earn the on-chain credential.",
          "Access: the credential unlocks the Maintainer Retainer workspace. No manual approval.",
          "10 pilot maintainers were verified before they touched a task.",
        ],
      },
      {
        id: "commit",
        label: "Commit",
        detail:
          "A maintainer accepts a monthly milestone; the reward is locked in escrow.",
        points: [
          "The maintainer accepts a task.",
          "The smart contract locks the reward in escrow.",
          "Funds move from the treasury to escrow when the task is accepted.",
        ],
      },
      {
        id: "evidence",
        label: "Evidence",
        detail:
          "They submit artifacts and reports against the acceptance criteria.",
        points: [
          "Proof of work: artifacts, reports, and deliverables.",
          "Each item is aligned to the acceptance criteria.",
          "What was delivered is on the record, not in a side conversation.",
        ],
      },
      {
        id: "review",
        label: "Review",
        detail: "An Open Source Committee reviewer checks the evidence.",
        points: [
          "An OSC reviewer validates the evidence against the acceptance criteria.",
          "Approval is what releases the milestone.",
          "The decision is recorded on-chain.",
        ],
      },
      {
        id: "pay",
        label: "Pay",
        detail:
          "Approval releases the funds, up to 3,000 ADA per milestone, with a full audit trail.",
        points: [
          "Approved milestones release funds automatically, up to 3,000 ADA.",
          "No invoices and no payment delay.",
          "20 milestones completed, 0 disputes, and admin time reduced by 30%.",
        ],
      },
    ],
    outcomes: [
      { k: "pilot maintainers", v: "10", kind: "result" },
      { k: "milestones completed", v: "20", kind: "result" },
      { k: "fund disputes", v: "0", kind: "result" },
      { k: "admin time", v: "Reduced by 30%", kind: "result" },
    ],
    outcomesNote: "Pilot figures reported by the Andamio team.",
  },
  {
    slug: "Syngenta",
    partner: "Syngenta",
    sector: "Agriculture",
    title: "Syngenta: Certified Field Experts",
    summary:
      "Training agri-entrepreneurs in India on satellite applications and certifying them with credentials any cooperative, government or NGO can verify.",
    logo: "/customer/syngenta/syngenta-badge.png",
    logoWidth: "90%",
    theme: { cyan: "#9fcf3a", cyanHot: "#e4f5bf", orange: "#f2b33d" },
    badgeCourse: "Certified Field Expert",
    badge: {
      module: "Satellite applications",
      earner: "Ravi Mehta",
      skills: [
        { label: "Field management", icon: "scaffold" },
        { label: "Satellite reading", icon: "calculator" },
        { label: "Decision making", icon: "warning" },
        { label: "Assessment", icon: "checklist" },
      ],
      courseId: "59b6000101a11e01f1e1d001a1b2c3d4e5f60718293a4b5c6d7e8f92",
      sltHash:
        "59b6000101a11e02f1e1d002a1b2c3d4e5f60718293a4b5c6d7e8f9222334455",
      issuedAt: "2025-06-15T08:00:00Z",
    },
    challenge: [
      "Syngenta works with millions of farmers in India. To scale its Certified Field Expert program it needs credentials that downstream parties can verify without depending on Syngenta's systems.",
      "Paper certificates don't travel, and centralized platforms create lock-in.",
    ],
    approach: [
      "Andamio powers a seven-chapter learning path with practice environments, feedback and formal on-chain certification.",
      "Each credential is a permanent record on Cardano, owned by the expert rather than the platform.",
    ],
    cycleLabel: "Field expert lifecycle",
    cycle: [
      {
        id: "train",
        label: "Train",
        detail:
          "A seven-chapter path: platform, field management, satellite applications, decision making.",
        points: [
          "7 chapters cover platform introduction, registration, field management, satellite applications, decision making, and assessment.",
          "Interactive practice with real-time feedback.",
          "Entrepreneurs leave with skills they can use in the field.",
        ],
      },
      {
        id: "practice",
        label: "Practice",
        detail: "Interactive environments with real-time feedback.",
        points: [
          "Learn by doing, not only by reading.",
          "Feedback arrives while the exercise is still open.",
          "Practice sits inside the seven-chapter path, before the formal assessment.",
        ],
      },
      {
        id: "assess",
        label: "Assess",
        detail: "Formal evaluation against Syngenta's standards.",
        points: [
          "The evaluation checks competency against Syngenta's standards.",
          "It closes the seven-chapter path.",
          "Passing is what earns the credential.",
        ],
      },
      {
        id: "certify",
        label: "Certify",
        detail:
          "An on-chain Certified Field Expert credential, verifiable by anyone.",
        points: [
          "The credential is on Cardano: portable, and not dependent on one platform.",
          "Cooperatives, governments, and NGOs can verify it without calling Syngenta.",
          "The expert owns it.",
        ],
      },
      {
        id: "multiply",
        label: "Multiply",
        detail: "Certified experts advise smallholder farmers in their region.",
        points: [
          "Each certified entrepreneur serves about 100 farmers.",
          "1,000 entrepreneurs are the path to 100,000 farmers.",
          "The India network is 3 million farmers, and a farmer can confirm the advisor is qualified.",
        ],
      },
    ],
    outcomes: [
      { k: "agri-entrepreneurs", v: "1,000 to train", kind: "target" },
      { k: "smallholder farmers", v: "100,000 to reach", kind: "target" },
      { k: "India network", v: "3 million farmers", kind: "fact" },
      {
        k: "interest",
        v: "The World Food Programme has expressed interest in this model",
        kind: "fact",
      },
    ],
  },
  {
    slug: "Toha",
    partner: "Toha Network",
    sector: "Nature finance",
    title: "Toha Network: Nature Regeneration",
    summary:
      "Financing environmental action in New Zealand: contributors earn credentials and MAHI tokens for verified planting and restoration, signing up with email.",
    logo: "/customer/toha/toha-badge.png",
    wordmark: "/customer/toha/toha-logo.svg",
    logoWidth: "50%",
    theme: { cyan: "#4fd1a5", cyanHot: "#c8f5e4", orange: "#f2a64a" },
    badgeCourse: "Verified Restoration",
    badge: {
      module: "Native planting",
      earner: "Aroha Te Rangi",
      skills: [
        { label: "Onboard", icon: "badge" },
        { label: "Planting", icon: "scaffold" },
        { label: "Verification", icon: "checklist" },
        { label: "MAHI", icon: "calculator" },
      ],
      courseId: "704a000101a11e01e5704e01a1b2c3d4e5f60718293a4b5c6d7e8f93",
      sltHash:
        "704a000101a11e02e5704e02a1b2c3d4e5f60718293a4b5c6d7e8f9333445566",
      issuedAt: "2025-08-20T11:00:00Z",
    },
    adoption: "invisible",
    challenge: [
      "Toha Network connects impact investors with land managers and environmental contributors. Contributors take real actions, such as native planting and biodiversity restoration.",
      "They are land managers, not crypto users, so the financing network has to feel like any other web product.",
    ],
    approach: [
      "Contributors sign up with email; a managed identity is created for them. Verified actions earn on-chain credentials and MAHI tokens, and investment flows through on-chain escrow.",
      "The words Cardano, blockchain and smart contract don't appear on Toha Network's homepage. That is the point.",
    ],
    cycleLabel: "Contributor lifecycle",
    cycle: [
      {
        id: "onboard",
        label: "Onboard",
        detail: "Email sign-up. No wallet, no blockchain knowledge.",
        points: [
          "Contributors sign up with email.",
          "Social login creates a managed identity.",
          "No wallet and no blockchain knowledge required.",
        ],
      },
      {
        id: "act",
        label: "Act",
        detail: "Complete an environmental action from a pledge template.",
        points: [
          "Actions include native planting, biodiversity restoration, and habitat protection.",
          "Each action follows a pledge template defined by the network.",
          "Pilot actions are at Te Kautuku and Kotare Station.",
        ],
      },
      {
        id: "verify",
        label: "Verify",
        detail: "The action is verified against the network's criteria.",
        points: [
          "The action is checked against the network's criteria.",
          "Only a verified action counts.",
          "The record stays on-chain.",
        ],
      },
      {
        id: "earn",
        label: "Earn",
        detail: "A credential and MAHI tokens, as portable proof of impact.",
        points: [
          "13+ contributors hold an on-chain credential and MAHI tokens.",
          "That is portable proof of impact.",
          "The credential travels with the contributor.",
        ],
      },
      {
        id: "fund",
        label: "Fund",
        detail:
          "Investors fund outcomes; escrow releases only on verified results.",
        points: [
          "Invest: buy MAHI tokens, with return tied to verified outcomes.",
          "Fund: choose a project or region and see what the money achieves.",
          "Donate: a path for tax credits. Escrow releases only on verified results.",
        ],
      },
    ],
    outcomes: [
      { k: "pilot sites", v: "Te Kautuku and Kotare Station", kind: "fact" },
      { k: "verified contributors", v: "13+", kind: "result" },
      { k: "backers", v: "Air New Zealand, Te Puni Kōkiri", kind: "fact" },
    ],
  },
  {
    slug: "DecentralizedInnovation",
    partner: "Project Catalyst",
    sector: "Innovation funding",
    title: "Decentralized innovation funds: certified reviewers",
    summary:
      "A reviewer credential ladder for community funds like Project Catalyst: certify reviewers, build their reputation and raise the quality of funding decisions.",
    logo: "/customer/project-catalyst/catalyst-badge.png",
    logoWidth: "90%",
    theme: {
      cyan: "#2c4ddf",
      cyanHot: "#b7c4ff",
      orange: "#da67c6",
      orangeHot: "#f6c4ec",
    },
    badgeCourse: "Proposal Reviewer L1",
    badge: {
      module: "Structured feedback",
      earner: "Elena Varga",
      skills: [
        { label: "Level 1", icon: "badge" },
        { label: "Proposal review", icon: "checklist" },
        { label: "Reputation", icon: "warning" },
        { label: "Milestones", icon: "calculator" },
      ],
      courseId: "ca7a000101a11e01c4740001a1b2c3d4e5f60718293a4b5c6d7e8f94",
      sltHash:
        "ca7a000101a11e02c4740002a1b2c3d4e5f60718293a4b5c6d7e8f9444556677",
      issuedAt: "2026-01-12T14:00:00Z",
    },
    challenge: [
      "Community funds depend on reviewers, and review quality decides where the money goes.",
      "Without a record of who is qualified and how they have performed, every round starts from zero.",
    ],
    approach: [
      "Reviewers earn credentials level by level. Each level unlocks harder reviews and better-paid work, and every review adds to a reputation that travels with the reviewer.",
      "Andamio itself has been funded through Project Catalyst, and this is the model we propose for its reviewers.",
    ],
    cycleLabel: "Reviewer ladder",
    cycle: [
      {
        id: "l1",
        label: "Level 1",
        detail:
          "Community members certify to assess proposals and give structured feedback.",
        points: [
          "Community members earn Level 1 certification.",
          "They assess proposals and give structured feedback.",
          "Each review adds to a reputation that travels with the reviewer.",
        ],
      },
      {
        id: "review",
        label: "Paid reviews",
        detail:
          "Certified reviewers join funding rounds; compensation rewards accuracy.",
        points: [
          "Certified reviewers join a funding round.",
          "Compensation is meant to reward accuracy.",
          "The review record strengthens the funding decision.",
        ],
      },
      {
        id: "l2",
        label: "Level 2",
        detail:
          "Experienced reviewers certify for complex proposals and advanced criteria.",
        points: [
          "Experienced reviewers advance to Level 2.",
          "They apply advanced criteria on harder proposals.",
          "Higher compensation is tied to that harder work.",
        ],
      },
      {
        id: "milestones",
        label: "Milestone reviewer",
        detail:
          "A team certified to validate project milestones and completion.",
        points: [
          "Milestone reviewers watch project stages.",
          "They validate results against the milestone.",
          "Oversight is what the credential is for. This ladder is a proposed model, not a live deployment.",
        ],
      },
    ],
    outcomes: [
      {
        k: "status",
        v: "A proposed model, not a live deployment",
        kind: "fact",
      },
      {
        k: "levels",
        v: "Level 1, Level 2, milestone reviewer",
        kind: "target",
      },
    ],
  },
  {
    slug: "LeadGenDAO",
    partner: "LeadGen DAO",
    sector: "Business development",
    title: "LeadGen DAO: certified lead generators",
    summary:
      "LeadGen DAO, created by ELK, trains and certifies lead generators and pays them for verified leads, so companies get quality pipeline without an agency.",
    logo: "/customer/leadgen/leadgen-badge.png",
    wordmark: "/customer/leadgen/leadgen-mark.svg",
    logoWidth: "50%",
    theme: {
      cyan: "#1a4f9c",
      cyanHot: "#3ec6ef",
      orange: "#5fa318",
      orangeHot: "#c6ef3a",
    },
    badgeCourse: "Certified Lead Generator",
    badge: {
      module: "Lead brief",
      earner: "Jordan Hale",
      skills: [
        { label: "Course", icon: "badge" },
        { label: "Brief", icon: "checklist" },
        { label: "Verified lead", icon: "calculator" },
        { label: "Mentorship", icon: "scaffold" },
      ],
      courseId: "1ead000101a11e016e4d0001a1b2c3d4e5f60718293a4b5c6d7e8f95",
      sltHash:
        "1ead000101a11e026e4d0002a1b2c3d4e5f60718293a4b5c6d7e8f9555667788",
      issuedAt: "2025-03-04T16:00:00Z",
    },
    challenge: [
      "Building a sales pipeline usually means an in-house team or an agency that works behind closed doors: expensive, inconsistent and hard to see into.",
      "People who can source good leads rarely have a way to be recognized and paid fairly for it.",
    ],
    approach: [
      "LeadGen DAO uses Andamio for contributor onboarding and verification: clear learning paths set the quality and compliance bar for representing a business.",
      "Andamio's task tracking and treasury features reward verified leads with an auditable record.",
    ],
    cycleLabel: "Lead generator lifecycle",
    cycle: [
      {
        id: "train",
        label: "Train",
        detail:
          "Complete the LeadGen course and earn the lead generator credential.",
        points: [
          "The course certifies connectors to a quality bar.",
          "Certified connectors review a company's lead brief.",
          "They commit to supplying leads for that business.",
        ],
      },
      {
        id: "deliver",
        label: "Deliver",
        detail: "Commit to a company's lead brief and deliver leads.",
        points: [
          "The connector delivers leads against the brief.",
          "Each delivered lead is checked before it counts.",
          "Palmyra, NMKR, and Socious are among the companies served.",
        ],
      },
      {
        id: "paid",
        label: "Get paid",
        detail: "Verified leads release the reward.",
        points: [
          "Compensation follows a successfully delivered lead.",
          "The reward is tied to verified work, not a side invoice.",
          "The record of the lead and the payment stays auditable.",
        ],
      },
      {
        id: "mentor",
        label: "Mentor",
        detail: "Experienced generators certify as mentors for newcomers.",
        points: [
          "Experienced generators earn a mentor credential.",
          "They train and support new lead generators.",
          "Mentors are paid for that guidance.",
        ],
      },
      {
        id: "govern",
        label: "Govern",
        detail: "Mentors join the DAO and take part in governance.",
        points: [
          "Mentors can join the DAO.",
          "Members take part in governance and decisions.",
          "Membership is the access to the DAO's benefits.",
        ],
      },
    ],
    outcomes: [
      { k: "created by", v: "ELK", kind: "fact" },
      {
        k: "companies served",
        v: "Palmyra (Zengate Global), NMKR, Socious",
        kind: "fact",
      },
      { k: "since", v: "2025", kind: "fact" },
    ],
  },
];

export function caseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
