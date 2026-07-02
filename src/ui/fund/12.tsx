import React from "react";
import { color } from "~/ui/system/tokens";
import { Section, Kicker, Display } from "~/ui/system/kit";

const proposals = [
  {
    title: "FC Barcelona + Community management + Using Cardano tech",
    description:
      "Using Cardano-native technology to onboard members, train them, encourage contributions, and build their reputation within the Barça fan community.",
    link: "https://cardano.ideascale.com/c/idea/125751",
  },
  {
    title: "Andamio Purpose Sidechain / Layer 2 Concept",
    description:
      "Implementing a purpose-built Cardano network sidechain with Layer 2 solutions to streamline and secure educational transactions and data management.",
    link: "https://cardano.ideascale.com/c/idea/122585",
  },
  {
    title: "Adapting On-Chain Reputation to Catalyst Voices",
    description:
      "Contribute to the progress of Catalyst Voices by implementing on-chain, role-based reputation-building capabilities.",
    link: "https://cardano.ideascale.com/c/idea/122267",
  },
  {
    title: "Enabling Advanced Contribution and Skills Tracking via APIs",
    description:
      "Enabling seamless integration of contribution tracking and token creation capabilities into existing applications via robust API services.",
    link: "https://cardano.ideascale.com/c/idea/122101",
  },
  {
    title: "Skills and contribution infrastructure on Cardano",
    description:
      "Andamio infrastructure enables skills acquisition and connecting to contribution opportunities to achieve the highest levels of community engagement and efficiency of work.",
    link: "https://cardano.ideascale.com/c/idea/122087",
  },
  {
    title: "Developing a Self Sovereign On-chain Identity (SSOI)",
    description:
      "Develop a decentralized identity solution on Cardano that grants users full control over their identity while leveraging the blockchain's security and transparency.",
    link: "https://cardano.ideascale.com/c/idea/122055",
  },
];

export default function Fund12() {
  return (
    <>
      {/* Header */}
      <Section bordered={false}>
        <div className="pb-12 pt-16 sm:pt-24">
          <Kicker>Fund 12 · Project Catalyst</Kicker>
          <Display as="h1" size="lg" className="mt-5">
            Andamio, Build Trust.
          </Display>
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed"
            style={{ color: color.inkMuted }}
          >
            Proposals submitted to Project Catalyst.
          </p>
        </div>
      </Section>

      {/* Proposals */}
      <Section bordered={false}>
        <div className="py-16 sm:py-20">
          <div
            className="grid gap-px md:grid-cols-2"
            style={{ background: color.cell }}
          >
            {proposals.map((proposal) => (
              <div
                key={proposal.title}
                className="flex flex-col p-6"
                style={{ background: color.paper }}
              >
                <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em]">
                  {proposal.title}
                </h3>
                <p
                  className="mt-3 flex-1 text-sm leading-relaxed"
                  style={{ color: color.inkMuted }}
                >
                  {proposal.description}
                </p>
                <div className="mt-5">
                  <a
                    href={proposal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:underline"
                    style={{ color: color.blue }}
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
