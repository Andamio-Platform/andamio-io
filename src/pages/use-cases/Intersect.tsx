import React from "react";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";

import {
  CheckBadgeIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export default function IntersectPage() {
  return (
    <V2PageLayout
      title="Intersect — Maintainer Retainer Program"
      description="Governance treasury and contributor tracking for Cardano's open source ecosystem. Credential-gated onboarding, milestone-based payments, and full on-chain accountability."
    >
      {/* Overview */}
      <section className="mb-16">
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Intersect is the member-based organization that coordinates
              Cardano&rsquo;s open source committees and working groups.
              Their Open Source Committee manages maintainers who build
              critical infrastructure for the ecosystem.
            </p>
            <p>
              The problem: how do you onboard, track, and pay 50+
              maintainers across multiple committees — with full transparency
              and zero payment disputes?
            </p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Andamio replaces invoice cycles, spreadsheet tracking, and
              manual treasury execution with credential-gated access,
              milestone-based smart contract escrow, and automatic fund
              release on reviewer approval.
            </p>
            <p>
              Every payment, every approval, every credential — recorded
              permanently on-chain. No discretionary delays. No disputed
              records.
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

      {/* Results */}
      <section className="mt-16">
        <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
          Pilot Results
        </h3>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result) => (
            <div
              key={result.label}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <p className="text-2xl font-bold text-primary">{result.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{result.label}</p>
            </div>
          ))}
        </div>
      </section>
    </V2PageLayout>
  );
}

const results = [
  { value: "10", label: "Pilot maintainers" },
  { value: "20", label: "Milestones completed" },
  { value: "0", label: "Fund disputes" },
  { value: "30%", label: "Admin time reduced" },
];

const cycles = [
  {
    title: "Onboard",
    icon: AcademicCapIcon,
    description:
      "Maintainers complete a prerequisite course to earn their access credential. No credential, no access — quality starts at the gate.",
    steps: [
      {
        label: "Prerequisite:",
        content:
          "Accept terms and conditions, complete orientation module, earn on-chain credential.",
      },
      {
        label: "Access:",
        content:
          "Credential unlocks the Maintainer Retainer Program workspace. No manual approval needed.",
      },
      {
        label: "Outcome:",
        content:
          "Every maintainer is verified before they touch a single task.",
      },
    ],
  },
  {
    title: "Deliver",
    icon: ClipboardDocumentCheckIcon,
    description:
      "Maintainers commit to monthly milestones. Funds move from treasury to escrow automatically when a task is accepted.",
    steps: [
      {
        label: "Commit:",
        content:
          "Maintainer accepts a task. Smart contract locks the reward in escrow.",
      },
      {
        label: "Evidence:",
        content:
          "Submit proof of work — artifacts, reports, deliverables aligned to acceptance criteria.",
      },
      {
        label: "Outcome:",
        content:
          "Clear expectations, transparent progress, no ambiguity about what was delivered.",
      },
    ],
  },
  {
    title: "Pay",
    icon: BanknotesIcon,
    description:
      "Reviewers approve completed work. Smart contract releases funds automatically. No invoices, no payment delays.",
    steps: [
      {
        label: "Review:",
        content:
          "OSC reviewer validates evidence against acceptance criteria.",
      },
      {
        label: "Release:",
        content:
          "Approved milestones trigger automatic fund release — up to 3,000 ADA per milestone.",
      },
      {
        label: "Outcome:",
        content:
          "Complete audit trail. Every payment tied to verified work, recorded permanently on-chain.",
      },
    ],
  },
];
