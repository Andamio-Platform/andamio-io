import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardIcon,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import {
  BriefcaseIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Footer from "~/ui/landing/Footer";

type ProposalCategory = "technology" | "adoption";
type Proposal = {
  title: string;
  summary: string;
  deliverables: { description: string; completed: boolean }[];
  status: "voting" | "in progress" | "completed";
  link: string;
  fund: number;
  category: ProposalCategory;
};

const GridOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent"></div>
    <div className="grid h-full grid-cols-16">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="border-r border-primary/30"></div>
      ))}
    </div>
    <div className="absolute inset-0">
      <div className="flex h-full flex-col">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex-1 border-b border-primary/20"></div>
        ))}
      </div>
    </div>
    <div className="absolute left-1/4 top-0 h-full w-px bg-primary/25"></div>
    <div className="absolute left-1/2 top-0 h-full w-px bg-primary/30"></div>
    <div className="absolute left-3/4 top-0 h-full w-px bg-primary/25"></div>
  </div>
);

const FundProposals: React.FC = () => {
  useEffect(() => {
    const registerCountdownElement =
      document.getElementById("registerCountdown");
    const registerEndDate = new Date("2024-11-20T21:45:00Z").getTime();
    const registerCountdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = registerEndDate - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (registerCountdownElement) {
        registerCountdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      if (timeLeft < 0) {
        clearInterval(registerCountdownTimer);
        if (registerCountdownElement) {
          registerCountdownElement.innerHTML = "Registration has closed!";
        }
      }
    }, 1000);

    const voteCountdownElement = document.getElementById("voteCountdown");
    const voteEndDate = new Date("2024-12-12T11:00:00Z").getTime();
    const voteCountdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = voteEndDate - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (voteCountdownElement) {
        voteCountdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      if (timeLeft < 0) {
        clearInterval(voteCountdownTimer);
        if (voteCountdownElement) {
          voteCountdownElement.innerHTML = "Voting has closed!";
        }
      }
    }, 1000);

    return () => {
      clearInterval(registerCountdownTimer);
      clearInterval(voteCountdownTimer);
    };
  }, []);

  const groupedProposals: Record<
    number,
    { technology: Proposal[]; adoption: Proposal[] }
  > = proposals.reduce(
    (acc, proposal) => {
      if (!acc[proposal.fund]) {
        acc[proposal.fund] = {
          technology: [],
          adoption: [],
        };
      }

      // We don't need the type guard anymore since proposal.category is already typed correctly
      acc[proposal.fund]![proposal.category].push(proposal);

      return acc;
    },
    {} as Record<number, { technology: Proposal[]; adoption: Proposal[] }>,
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <GridOverlay />
      {/* Navigation Bar - matches ModernLanding.tsx light theme */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-card/90 backdrop-blur-sm shadow-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  className="h-10 w-auto"
                  src="/andamio-logo-no-white-overflow.png"
                  alt="Andamio"
                  width={100}
                  height={100}
                />
                <span className="text-xl font-bold text-foreground">Andamio</span>
              </Link>
            </div>
            <div className="hidden items-center space-x-8 md:flex">
              <a
                href="https://docs.andamio.io"
                className="font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Docs
              </a>
              <Link
                href="/roadmap"
                className="font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Roadmap
              </Link>
              <Link
                href="/blog"
                className="font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Blog
              </Link>
              <Link
                href="https://app.andamio.io/course/86affc4de251b0fb7636c376383bcebf6ca7ca426528f9b7a5adc298"
                className="font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Andamio 101
              </Link>
              <Link
                href="/customers"
                className="font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="/fund/13"
                className="font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <span role="img" aria-label="rocket">🚀</span> Project Catalyst
              </Link>
              <Link
                href="https://app.andamio.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90"
              >
                <span>Enter App</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        {/* Header */}
        <div className="relative mb-16">
          {/* Angular accent lines */}
          <div className="absolute -top-8 left-0 h-1 w-32 bg-gradient-to-r from-primary to-transparent shadow-md shadow-primary/20"></div>
          <div className="absolute -top-4 left-8 h-1 w-16 bg-gradient-to-r from-muted-foreground/40 to-transparent"></div>
          <div className="mb-6 flex items-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent"></div>
            <h1 className="text-4xl font-bold text-foreground lg:text-6xl">
              Project Catalyst Fund 14
            </h1>
          </div>
          <p className="max-w-3xl text-xl text-muted-foreground">
            Proposals that Andamio has submitted to Project Catalyst. Explore reasoning, progress, and impact.
          </p>
        </div>

        {/* Proposals Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {Object.keys(groupedProposals)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((fund) => {
              const techProposals = groupedProposals[parseInt(fund)]?.technology;
              const adoptionProposals = groupedProposals[parseInt(fund)]?.adoption;

              return [
                ...(techProposals || []),
                ...(adoptionProposals || []),
              ].map((proposal, idx) => (
                <ProposalCard proposal={proposal} key={proposal.title + idx} />
              ));
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

type ProposalCardProps = {
  proposal: Proposal;
};

// Update Card and Badge components to match light style
const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => (
  <Card className="group relative overflow-hidden border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
    <CardHeader>
      <CardTitle className="text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary lg:text-2xl">
        {proposal.title}
      </CardTitle>
      <Badge
        className={`${
          proposal.status === "completed"
            ? "bg-success/10 text-success border-success/30"
            : proposal.status === "in progress"
              ? "bg-accent/10 text-accent border-accent/30"
              : "bg-primary/10 text-primary border-primary/30"
        } rounded-full px-3 py-1 text-xs font-medium border`}
      >
        {proposal.status}
      </Badge>
      <CardDescription className="mt-2 text-muted-foreground">
        {proposal.summary}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {proposal.deliverables.map((deliverable, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Checkbox checked={deliverable.completed} disabled />
            <p className="text-sm font-light text-foreground">
              {deliverable.description}
            </p>
          </li>
        ))}
      </ul>
      <a
        href={proposal.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80 hover:underline"
      >
        View Proposal
      </a>
    </CardContent>
  </Card>
);

export default FundProposals;

const proposals: Proposal[] = [
  {
    title: "Integration Web2 with solution Nestr.io: On‑Chain Task and Contributor Verification",
    summary:
      "Most collaboration tools are off-chain, hiding verifiable proof of work, while on-chain ools are too technical and lack proven, DAO-friendly collaboration models. A blockchain-powered collaboration tool based on proven decentralized practices, that record tasks and contributor activity, enabling verifiable proof of work.",
    deliverables: [
      {
        description: "Architecture & Integration Plan",
        completed: false,
      },
      {
        description: "Protocol & SDK Development",
        completed: false,
      },
      {
        description: "On‑Chain Proof of Work Submission",
        completed: false,
      },
            {
        description: "Indexing & Auditability",
        completed: false,
      },
      {
        description: "Testnet Validation & Final Report",
        completed: false,
      },
    ],
    status: "voting",
    link: "https://projectcatalyst.io/funds/14/cardano-use-cases-concepts/onchain-task-and-contributor-verification",
    fund: 14,
    category: "technology",
  },
  {
    title: "Andamio Auth: T3 App Template with Cardano Token-Based Login",
    summary:
      "Cardano wallets can connect to dApps, but production apps still need authentication to Web2 services for data and APIs. Cardano devs need wallet connectivity integrated with traditional auth systems. We're open-sourcing Andamio Auth in a T3 App template connecting Cardano wallets and Web2 auth. Used in production at app.andamio.io, with JWT sessions, database integration, and protected routes.",
    deliverables: [
      {
        description: "Core Template: T3 App template with Cardano wallet connection (CIP-30), Prisma database with basic user schema, Protected tRPC routes for authenticated database access, and more",
        completed: false,
      },
      {
        description: "OAuth2 Compliance & Standards",
        completed: false,
      },
      {
        description: "Industry-standard README.md and 'Getting Started' guide that help devs get the template up and running with Web3 Auth in under 10 minutes",
        completed: false,
      },
            {
        description: "Hands-on Starter Kit",
        completed: false,
      },
      {
        description: "Andamio SDK Integration",
        completed: false,
      },
    ],
    status: "voting",
    link: "https://projectcatalyst.io/funds/14/cardano-open-developers/andamio-auth-t3-app-template-with-cardano-token-based-login",
    fund: 14,
    category: "technology",
  },
  {
    title: "Catalyst Review Made Trustworthy with Andamio Protocol",
    summary:
      "Reviewers have no structured path to build skills, earn portable reputation, or prove impact, weakening Catalyst’s trust layer. We create a structured reviewer journey: learn, certify, contribute—each step verified on-chain, ensuring trust, transparency, and portable reputation.",
    deliverables: [
      {
        description: "Curriculum Design & Onboarding Flow: Andamio interactive flow for Reviewers",
        completed: false,
      },
      {
        description: "Reviewer Contributions and Treasury Compensation: Activation of contribution system for Reviewers",
        completed: false,
      },
      {
        description: "Traceability report: data on reviewer participation, tasks completed, treasury operations, payouts executed, and insights for scaling to future Catalyst funds.",
        completed: false,
      },
    ],
    status: "voting",
    link: "https://projectcatalyst.io/funds/14/cardano-open-ecosystem/catalyst-review-made-trustworthy-with-andamio-protocol",
    fund: 14,
    category: "technology",
  },
  {
    title: "FC Barcelona - Fan Engagement Infrastructure",
    summary:
      "Engage FC Barcelona fans through a learn-to-work platform, driving adoption of Cardano.",
    deliverables: [
      {
        description: "Onboarding of FC Barcelona's team to Andamio",
        completed: false,
      },
      {
        description: "Development of the Learn to Work programs",
        completed: false,
      },
    ],
    status: "in progress",
    link: "https://projectcatalyst.io/funds/13/cardano-partners-enterprise-randd/fc-barcelona-fan-engagement-infrastructure-cardano",
    fund: 13,
    category: "adoption",
  },
  // Add more proposals with "category" property as "technology" or "adoption"
  {
    title: "Andamio SDK & UTxO-RPC client",
    summary:
      "Creating SDKs and a UTxO-RPC client to simplify integration of features like credentialing and treasury management.",
    deliverables: [
      {
        description: "Andamio SDK architecture and prototyping",
        completed: true,
      },
      {
        description: "Andamio Client with UTxO-RPC integration",
        completed: true,
      },
      {
        description: "Inclusion of Andamio Network Txs in SDK and Client",
        completed: true,
      },
    ],
    status: "completed",
    link: "https://milestones.projectcatalyst.io/projects/1300020",
    fund: 13,
    category: "technology",
  },
  // Add additional proposals here
  {
    title: "Syngenta Agricultural Insight",
    summary:
      "Empowering small-farm advisors with a decentralized system for data-driven agronomic and commercial decisions.",
    deliverables: [
      {
        description: "Develop training materials for agri-entrepreneurs",
        completed: false,
      },
      {
        description: "Add content based on interaction with farmers",
        completed: false,
      },
    ],
    status: "in progress",
    link: "https://projectcatalyst.io/funds/13/cardano-partners-enterprise-randd/syngenta-agricultural-insight-and-earth-observation-data-uplifts-subsistence-farmers-into-profitability",
    fund: 13,
    category: "adoption",
  },
  {
    title: "Andamio Purpose Sidechain / Layer 2 Concept",
    summary:
      "Implementing a purpose sidechain to streamline and secure transactions.",
    deliverables: [
      {
        description: "Initial research report on potential solutions",
        completed: true,
      },
      {
        description: "Established infrastructure on cloud servers",
        completed: true,
      },
      {
        description: "Detailed sidechain architecture design document",
        completed: true,
      },
      {
        description:
          "Migrated smart contracts and data on the purpose sidechain",
        completed: true,
      },
      {
        description: "Extensive testing on a public Cardano testnet",
        completed: true,
      },
    ],
    status: "completed",
    link: "https://milestones.projectcatalyst.io/projects/1200031",
    fund: 12,
    category: "technology",
  },
  {
    title: "Developing a Self Sovereign On-chain Identity (SSOI)",
    summary:
      "Creating a blockchain-native framework for secure and decentralized identity management.",
    deliverables: [
      {
        description: "Design preliminary framework for the SSOI system",
        completed: true,
      },
      {
        description: "Develop initial components of the SSOI system",
        completed: true,
      },
      {
        description: "SSOI prototype implementation and testing",
        completed: true,
      },
    ],
    status: "completed",
    link: "https://milestones.projectcatalyst.io/projects/1200099",
    fund: 12,
    category: "technology",
  },
  {
    title: "Open-Source Cardano Go Libraries + Docs + Andamio CLI",
    summary: "Building an open-source Andamio CLI in Golang.",
    deliverables: [
      {
        description:
          "Initialize an Andamio instance with onboarding docs and a Contributor treasury",
        completed: true,
      },
      {
        description: "Publish detailed documentation for existing libraries",
        completed: true,
      },
      {
        description: "Publish Andamio CLI project roadmap",
        completed: true,
      },
      {
        description:
          "Use Andamio, Bursa, and Apollo to deliver Contribution Management features in the Andamio CLI.",
        completed: true,
      },
      {
        description:
          "Public release of the Andamio CLI, with a record of improvements to existing libraries, documentation, and onboarding resources.",
        completed: true,
      },
    ],
    status: "completed",
    link: "https://milestones.projectcatalyst.io/projects/1100216",
    fund: 11,
    category: "technology",
  },
  {
    title:
      "DAOs <3 smart contracts for skill acquisition and contribution tracking",
    summary:
      "Building an open-source system to facilitate DAO governance and collaboration.",
    deliverables: [
      {
        description:
          "Andamio platform beta launch, integrating skill and contribution tracking and treasury management.",
        completed: true,
      },
      {
        description: "Pilot project expansion and integration",
        completed: true,
      },
      {
        description: "Launch and community adoption",
        completed: true,
      },
    ],
    status: "completed",
    link: "https://milestones.projectcatalyst.io/projects/1000061",
    fund: 10,
    category: "adoption",
  },
];
