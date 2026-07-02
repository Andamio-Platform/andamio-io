import React, { useEffect } from "react";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";

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

      acc[proposal.fund]![proposal.category].push(proposal);

      return acc;
    },
    {} as Record<number, { technology: Proposal[]; adoption: Proposal[] }>,
  );

  return (
    <Page nav={{ items: nav.items, cta: nav.cta }}>
      <Metatags
        title="Project Catalyst Proposals"
        description="Proposals that Andamio has submitted to Project Catalyst. Explore reasoning, progress, and impact."
      />

      {/* Header */}
      <Section bordered={false}>
        <div className="pb-12 pt-16 sm:pt-24">
          <Kicker>Proposals</Kicker>
          <Display as="h1" size="lg" className="mt-5">
            Project Catalyst
          </Display>
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed"
            style={{ color: color.inkMuted }}
          >
            Proposals that Andamio has submitted to Project Catalyst. Explore
            reasoning, progress, and impact.
          </p>
        </div>
      </Section>

      {/* Proposals Grid */}
      <Section bordered={false}>
        <div className="py-16 sm:py-20">
          <div
            className="grid gap-px lg:grid-cols-2"
            style={{ background: color.cell }}
          >
            {Object.keys(groupedProposals)
              .sort((a, b) => parseInt(b) - parseInt(a))
              .map((fund) => {
                const techProposals =
                  groupedProposals[parseInt(fund)]?.technology;
                const adoptionProposals =
                  groupedProposals[parseInt(fund)]?.adoption;

                return [
                  ...(techProposals ?? []),
                  ...(adoptionProposals ?? []),
                ].map((proposal, idx) => (
                  <ProposalCard proposal={proposal} key={proposal.title + idx} />
                ));
              })}
          </div>
        </div>
      </Section>

      <Footer
        tagline={footerData.tagline}
        meta={footerData.meta}
        copyright={footerData.copyright}
        columns={footerData.columns}
        backHref="/"
        backLabel="← Back to home"
        caption="Project Catalyst"
      />
    </Page>
  );
};

type ProposalCardProps = {
  proposal: Proposal;
};

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => (
  <div className="flex flex-col p-6" style={{ background: color.paper }}>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em] lg:text-xl">
        {proposal.title}
      </h3>
      <span
        className="shrink-0 border px-2.5 py-1 text-[11px] font-semibold tracking-[-0.01em]"
        style={{
          borderColor: color.cell,
          color:
            proposal.status === "completed" ? color.blue : color.inkMuted,
        }}
      >
        {proposal.status}
      </span>
    </div>

    <p
      className="mt-3 text-sm leading-relaxed"
      style={{ color: color.inkMuted }}
    >
      {proposal.summary}
    </p>

    <ul className="mt-5 flex-1 space-y-2.5">
      {proposal.deliverables.map((deliverable, idx) => (
        <li key={idx} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-[10px]"
            style={{
              border: `1px solid ${
                deliverable.completed ? color.blue : color.cell
              }`,
              background: deliverable.completed ? color.blue : "transparent",
              color: "#fff",
            }}
          >
            {deliverable.completed ? "✓" : ""}
          </span>
          <p className="text-sm leading-snug" style={{ color: color.ink }}>
            {deliverable.description}
          </p>
        </li>
      ))}
    </ul>

    <div className="mt-5">
      <a
        href={proposal.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:underline"
        style={{ color: color.blue }}
      >
        View Proposal →
      </a>
    </div>
  </div>
);

export default FundProposals;

const proposals: Proposal[] = [
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
