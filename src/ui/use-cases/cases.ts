/**
 * Use cases — one record per partner, rendered by the single CaseDetail
 * template at /use-cases/[slug] and the filterable index at /use-cases.
 *
 * Honesty rules: every outcome row says whether it is a measured `result`, a
 * program `target`, or a public `fact`. Partner facts come only from what the
 * partner (or Andamio) has published; no invented adoption numbers.
 */

import { type ProofTheme } from "~/ui/system/proof-badge/credential";

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
  /** Badge colors for the partner's MiniBadge. */
  theme: ProofTheme;
  badgeCourse: string;
  /** Only when the partner has made it public. */
  adoption?: "invisible" | "visible";
  challenge: readonly string[];
  approach: readonly string[];
  cycleLabel: string;
  cycle: readonly { id: string; label: string; detail: string }[];
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
    theme: {
      cyan: "#4f7dff",
      cyanHot: "#c9d8ff",
      orange: "#e0405e",
      orangeHot: "#ffb3c1",
    },
    badgeCourse: "Barça Fan Lab",
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
    links: [
      {
        label: "FC Barcelona announcement",
        href: "https://www.fcbarcelona.com/en/club/news/4581767/fc-barcelona-launches-barca-fan-lab-a-new-digital-experience-that-connects-club-values-with-new-web3-ways-of-participation-and-innovation",
      },
    ],
  },
  {
    slug: "Intersect",
    partner: "Intersect",
    sector: "Governance",
    title: "Intersect: Maintainer Retainer Program",
    summary:
      "Onboarding, tracking and paying the maintainers behind Cardano's open source infrastructure, with credential-gated access and milestone escrow.",
    logo: "/customer/intersect/intersect-badge.png",
    theme: { cyan: "#5b7cff", cyanHot: "#d3dcff" },
    badgeCourse: "Maintainer Onboarding",
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
      },
      {
        id: "commit",
        label: "Commit",
        detail:
          "A maintainer accepts a monthly milestone; the reward is locked in escrow.",
      },
      {
        id: "evidence",
        label: "Evidence",
        detail:
          "They submit artifacts and reports against the acceptance criteria.",
      },
      {
        id: "review",
        label: "Review",
        detail: "An Open Source Committee reviewer checks the evidence.",
      },
      {
        id: "pay",
        label: "Pay",
        detail:
          "Approval releases the funds, up to 3,000 ADA per milestone, with a full audit trail.",
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
    theme: { cyan: "#9fcf3a", cyanHot: "#e4f5bf", orange: "#f2b33d" },
    badgeCourse: "Certified Field Expert",
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
      },
      {
        id: "practice",
        label: "Practice",
        detail: "Interactive environments with real-time feedback.",
      },
      {
        id: "assess",
        label: "Assess",
        detail: "Formal evaluation against Syngenta's standards.",
      },
      {
        id: "certify",
        label: "Certify",
        detail:
          "An on-chain Certified Field Expert credential, verifiable by anyone.",
      },
      {
        id: "multiply",
        label: "Multiply",
        detail: "Certified experts advise smallholder farmers in their region.",
      },
    ],
    outcomes: [
      { k: "agri-entrepreneurs", v: "1,000 to train", kind: "target" },
      { k: "smallholder farmers", v: "100,000 to reach", kind: "target" },
      { k: "India network", v: "3 million farmers", kind: "fact" },
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
    theme: { cyan: "#4fd1a5", cyanHot: "#c8f5e4", orange: "#f2a64a" },
    badgeCourse: "Verified Restoration",
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
      },
      {
        id: "act",
        label: "Act",
        detail: "Complete an environmental action from a pledge template.",
      },
      {
        id: "verify",
        label: "Verify",
        detail: "The action is verified against the network's criteria.",
      },
      {
        id: "earn",
        label: "Earn",
        detail: "A credential and MAHI tokens, as portable proof of impact.",
      },
      {
        id: "fund",
        label: "Fund",
        detail:
          "Investors fund outcomes; escrow releases only on verified results.",
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
    theme: { cyan: "#3fd9e8" },
    badgeCourse: "Proposal Reviewer L1",
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
      },
      {
        id: "review",
        label: "Paid reviews",
        detail:
          "Certified reviewers join funding rounds; compensation rewards accuracy.",
      },
      {
        id: "l2",
        label: "Level 2",
        detail:
          "Experienced reviewers certify for complex proposals and advanced criteria.",
      },
      {
        id: "milestones",
        label: "Milestone reviewer",
        detail:
          "A team certified to validate project milestones and completion.",
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
    theme: { cyan: "#f7a54a", cyanHot: "#fcd48a", orange: "#3fd9e8" },
    badgeCourse: "Certified Lead Generator",
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
      },
      {
        id: "deliver",
        label: "Deliver",
        detail: "Commit to a company's lead brief and deliver leads.",
      },
      {
        id: "paid",
        label: "Get paid",
        detail: "Verified leads release the reward.",
      },
      {
        id: "mentor",
        label: "Mentor",
        detail: "Experienced generators certify as mentors for newcomers.",
      },
      {
        id: "govern",
        label: "Govern",
        detail: "Mentors join the DAO and take part in governance.",
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
    links: [{ label: "leadgendao.com", href: "https://leadgendao.com/" }],
  },
];

export function caseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
