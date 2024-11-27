import MenuBar from "~/ui/landing/MenuBar";
import React, { useEffect } from "react";
import Link from "next/link";
import Footer from "~/ui/landing/Footer";
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

      // We don't need the type guard anymore since proposal.category is already typed correctly
      acc[proposal.fund]![proposal.category].push(proposal);

      return acc;
    },
    {} as Record<number, { technology: Proposal[]; adoption: Proposal[] }>,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <MenuBar />
      <VideoBackground>
        <main className="px-6 py-16 lg:px-24">
          <section className="mb-16 text-center">
            <div className="relative z-10 flex flex-col justify-center space-y-8">
              {/* Countdown and Call to Action */}
              <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                <div className="flex flex-col text-center md:flex-row">
                  <h2 className="mr-4 text-2xl font-bold text-primary">
                    Register to Vote
                  </h2>
                  <div
                    id="registerCountdown"
                    className="inline-block text-2xl font-extrabold text-secondary"
                  ></div>
                </div>
                <div className="flex flex-col text-center md:flex-row">
                  <h2 className="mr-4 text-2xl font-bold text-primary">
                    Time is Running Out to Vote!
                  </h2>
                  <div
                    id="voteCountdown"
                    className="text-2xl font-extrabold text-secondary"
                  ></div>
                </div>
              </div>
            </div>
            <h1 className="mt-8 text-5xl font-black uppercase text-primary sm:text-6xl md:text-7xl">
              Project Catalyst Proposals
            </h1>
            <p className="mx-auto mt-4 max-w-4xl text-lg font-light text-muted-foreground">
              Discover our proposals for Cardano Project Catalyst and track the
              progress of each initiative.
            </p>
          </section>

          {Object.keys(groupedProposals)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((fund) => {
              const techProposals =
                groupedProposals[parseInt(fund)]?.technology;
              const adoptionProposals =
                groupedProposals[parseInt(fund)]?.adoption;

              return (
                <section key={fund} className="my-12">
                  <h2 className="mb-8 text-3xl font-bold text-primary">
                    Fund {fund} Proposals
                  </h2>

                  <div className="grid gap-12 lg:grid-cols-2">
                    {/* Technology column on the left */}
                    <div>
                      {!!techProposals && techProposals.length > 0 && (
                        <>
                          <h3 className="mb-4 text-2xl font-semibold text-primary">
                            Technology Oriented
                          </h3>
                          <div className="grid gap-8 md:grid-cols-2">
                            {techProposals?.map((proposal, index) => (
                              <ProposalCard proposal={proposal} key={index} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Adoption column on the right */}
                    <div>
                      {!!adoptionProposals && adoptionProposals.length > 0 && (
                        <>
                          <h3 className="mb-4 text-2xl font-semibold text-primary">
                            Adoption Oriented
                          </h3>
                          <div className="grid gap-8 md:grid-cols-2">
                            {adoptionProposals.map((proposal, index) => (
                              <ProposalCard proposal={proposal} key={index} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              );
            })}
          <div
            className="flex flex-col items-center justify-center px-6 py-16 text-center md:px-12"
            style={{
              minHeight: "calc(100vh - 5rem - 5rem)", // Adjust for navbar and footer heights
            }}
          >
            <h3 className="text-4xl font-black uppercase text-secondary sm:text-5xl md:text-6xl lg:text-7xl">
              Vote for Andamio
            </h3>
            <p className="mt-6 w-full max-w-3xl px-4 text-start text-lg font-medium text-gray-700 md:text-xl">
              Andamio's cutting-edge technology drives secure, scalable Cardano
              adoption. Vote to empower communities and shape a decentralized
              future.
            </p>

            {/* Benefits Section */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-md">
                <CardIcon>
                  <BriefcaseIcon className="h-12 w-12 text-secondary" />
                </CardIcon>
                <CardHeader>
                  <h4 className="text-lg font-bold text-primary sm:text-xl">
                    Enterprise-ready Solution
                  </h4>
                </CardHeader>
                <CardContent>
                  <p className="text-md text-justify font-light text-gray-600 sm:mt-6">
                    Andamio enables companies to harness Cardano’s blockchain
                    for secure, efficient, and scalable growth.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-md">
                <CardIcon>
                  <DocumentTextIcon className="h-12 w-12 text-secondary" />
                </CardIcon>
                <CardHeader>
                  <h4 className="text-lg font-bold text-primary sm:text-xl">
                    Next-Generation Smart Contracts
                  </h4>
                </CardHeader>
                <CardContent>
                  <p className="text-md text-justify font-light text-gray-600">
                    Andamio’s advanced smart contracts deliver automation,
                    transparency, and trust, setting new standards for Cardano.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-md">
                <CardIcon>
                  <ShieldCheckIcon className="h-12 w-12 text-secondary" />
                </CardIcon>
                <CardHeader>
                  <h4 className="text-lg font-bold text-primary sm:text-xl">
                    Transparent On-Chain Operations
                  </h4>
                </CardHeader>
                <CardContent>
                  <p className="text-md text-justify font-light text-gray-600">
                    With verifiable on-chain transactions, Andamio ensures
                    transparency, efficiency, and security.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </VideoBackground>
    </div>
  );
};

type ProposalCardProps = {
  proposal: Proposal;
};

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => (
  <Card className="flex flex-col justify-start rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-primary">
        {proposal.title}
      </CardTitle>
      <Badge
        className={`${proposal.status === "completed"
          ? "bg-green-200 text-green-800"
          : proposal.status === "in progress"
            ? "bg-yellow-200 text-yellow-800"
            : "bg-blue-200 text-blue-800"
          } rounded px-3 py-1 text-xs font-semibold`}
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
      <Link
        href={proposal.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
      >
        View Proposal
      </Link>
    </CardContent>
  </Card>
);

export default FundProposals;

const VideoBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Video container */}
        <div className="fixed left-0 top-0 h-full w-full overflow-hidden opacity-70">
          <video
            className="min-h-screen min-w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video/bg-video-002.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content overlay */}
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
};

const proposals: Proposal[] = [
  {
    title: "Decentralized Governance Smart Contracts",
    summary:
      "Building a complete set of open-source, ready-to-deploy governance smart contracts.",
    deliverables: [
      { description: "R&D of tug-of-war governance models", completed: false },
      {
        description: "R&D of Consent Decision-Making governance model",
        completed: false,
      },
    ],
    status: "voting",
    link: "https://cardano.ideascale.com/c/cardano/idea/132774",
    fund: 13,
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
    status: "voting",
    link: "https://cardano.ideascale.com/c/cardano/idea/134562",
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
        completed: false,
      },
      {
        description: "Andamio Client with UTxO-RPC integration",
        completed: false,
      },
      {
        description: "Inclusion of Andamio Network Txs in SDK and Client",
        completed: false,
      },
    ],
    status: "voting",
    link: "https://cardano.ideascale.com/c/cardano/idea/131718",
    fund: 13,
    category: "technology",
  },
  // Add additional proposals here
  {
    title:
      "Cardano Youth Adoption: Global Education & Wallet Activation via Goodwall",
    summary:
      "Using Goodwall's 2.5M+ network for Cardano education and wallet activation.",
    deliverables: [
      {
        description: "Onboarding Goodwall to Andamio",
        completed: false,
      },
      {
        description: "Development of the Learn to Work programs",
        completed: false,
      },
      {
        description:
          "Set up a treasury to distribute rewards for approved work submissions",
        completed: false,
      },
    ],
    status: "voting",
    link: "https://cardano.ideascale.com/c/cardano/idea/134665",
    fund: 13,
    category: "adoption",
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
    status: "voting",
    link: "https://cardano.ideascale.com/c/cardano/idea/134587",
    fund: 13,
    category: "adoption",
  },
  {
    title: "Andamio+Identus+Mātou: Identity for Education & Economic Impact",
    summary: "A decentralised system where learners earn tokenised credentials through DIDs & VCs, allowing skills accumulation, credential sharing & recognition enabling seamless transition from education to work.",
    deliverables: [
      {
        description: "Provide a decentralised identity system for learners and communities",
        completed: false,
      },
      {
        description: "Create a practical system for education and employment",
        completed: false,
      },
    ],
    status: "voting",
    link: "https://cardano.ideascale.com/c/cardano/idea/132155",
    fund: 13,
    category: "adoption",
  },
  {
    title: "Andamio Governance Smart Contracts + Gimbalabs PBL Governance",
    summary:
      "Build a set of smart contracts that grant governance and decision-making power to people with a record of maintaining public resources. Publish a playbook so that anyone can use this governance model.",
    deliverables: [
      {
        description: "Create spaces for students to start contributing",
        completed: false,
      },
      {
        description: "Create systems that support contributors to become decision-makers",
        completed: false,
      },
    ],
    status: "voting",
    link: "https://cardano.ideascale.com/c/cardano/idea/131346",
    fund: 13,
    category: "technology",
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
        completed: false,
      },
      {
        description: "Detailed sidechain architecture design document",
        completed: false,
      },
      {
        description:
          "Migrated smart contracts and data on the purpose sidechain",
        completed: false,
      },
      {
        description: "Extensive testing on a public Cardano testnet",
        completed: false,
      },
    ],
    status: "in progress",
    link: "https://cardano.ideascale.com/c/cardano/idea/122585",
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
        completed: false,
      },
      {
        description: "Develop initial components of the SSOI system",
        completed: false,
      },
      {
        description: "SSOI prototype implementation and testing",
        completed: false,
      },
    ],
    status: "in progress",
    link: "https://cardano.ideascale.com/c/cardano/idea/122585",
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
    link: "https://cardano.ideascale.com/c/cardano/idea/113455   ",
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
    link: "https://cardano.ideascale.com/c/cardano/idea/104780",
    fund: 10,
    category: "adoption",
  },
];
