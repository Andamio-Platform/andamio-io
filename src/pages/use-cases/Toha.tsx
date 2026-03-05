import React from "react";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";

import {
  CheckBadgeIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function TohaPage() {
  return (
    <V2PageLayout
      title="Toha Network — Nature Regeneration"
      description="Nature regeneration financing powered by verifiable credentials. Contributors earn MAHI tokens for verified environmental actions — no wallets, no blockchain knowledge required."
    >
      {/* Overview */}
      <section className="mb-16">
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Toha Network connects impact investors with land managers and
              environmental contributors in New Zealand. Contributors take
              real environmental actions — native planting, biodiversity
              restoration — and earn MAHI tokens for verified outcomes.
            </p>
            <p>
              The challenge: how do you build a transparent financing network
              for environmental impact where contributors are non-technical
              land managers, not crypto users?
            </p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Andamio powers the invisible infrastructure. Contributors sign
              up with email. Credentials are issued for verified actions.
              Investment flows through on-chain escrow. The blockchain is
              completely invisible to users.
            </p>
            <p>
              The words &ldquo;Cardano,&rdquo; &ldquo;blockchain,&rdquo; and
              &ldquo;smart contract&rdquo; don&rsquo;t appear on the Toha
              homepage. That&rsquo;s the point — Web2 UX, Web3 trust.
            </p>
          </div>
        </div>
      </section>

      {/* Cycles Section */}
      <section className="mx-auto grid gap-12 md:grid-cols-3">
        {cycles.map((cycle, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-foreground">
              <cycle.icon className="h-7 w-7 text-primary" /> {cycle.title}
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {cycle.description}
            </p>
            <ul className="space-y-3">
              {cycle.steps.map((step, stepIdx) => (
                <li key={stepIdx} className="flex items-start gap-2">
                  <CheckBadgeIcon
                    className="h-5 w-5 flex-shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{step.label}</span>{" "}
                    {step.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Backers */}
      <section className="mt-16">
        <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
          Institutional Backers
        </h3>
        <div className="mx-auto flex max-w-md justify-center gap-12">
          {backers.map((backer) => (
            <div key={backer} className="text-center">
              <p className="font-semibold text-foreground">{backer}</p>
            </div>
          ))}
        </div>
      </section>
    </V2PageLayout>
  );
}

const backers = ["Air New Zealand", "Te Puni Kokiri"];

const cycles = [
  {
    title: "Act",
    icon: GlobeAltIcon,
    description:
      "Land managers and environmental contributors take real actions — native planting, biodiversity restoration, habitat protection.",
    steps: [
      {
        label: "Onboard:",
        content:
          "Contributors sign up with email. No wallet, no blockchain knowledge. Social login creates a managed identity.",
      },
      {
        label: "Action:",
        content:
          "Complete verified environmental actions through pledge templates defined by the network.",
      },
      {
        label: "Credential:",
        content:
          "Each verified action earns an on-chain credential and MAHI tokens — portable proof of impact.",
      },
    ],
  },
  {
    title: "Fund",
    icon: CurrencyDollarIcon,
    description:
      "Investors and funders choose their participation path — invest for returns, fund for targeted impact, or donate for tax credits.",
    steps: [
      {
        label: "Invest:",
        content:
          "Purchase MAHI tokens through presale. Financial return tied to verified environmental outcomes.",
      },
      {
        label: "Fund:",
        content:
          "Target specific projects or regions. Track exactly where your money goes and what it achieves.",
      },
      {
        label: "Escrow:",
        content:
          "All investment flows through on-chain escrow. Funds release only on verified outcomes.",
      },
    ],
  },
  {
    title: "Scale",
    icon: UserGroupIcon,
    description:
      "As verified actions accumulate, the network grows. More contributors, more investors, more measurable impact.",
    steps: [
      {
        label: "Portability:",
        content:
          "Credentials travel with contributors. Impact proof is permanent and verifiable by anyone.",
      },
      {
        label: "Transparency:",
        content:
          "Every action, every investment, every outcome — recorded on-chain. Full accountability.",
      },
      {
        label: "Network:",
        content:
          "Active pilot projects in Te Kautuku and Kotare Station with 13+ verified contributors.",
      },
    ],
  },
];
