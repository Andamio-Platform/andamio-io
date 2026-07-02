import React from "react";
import {
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Section } from "~/ui/system/kit";
import { color } from "~/ui/system/tokens";
import {
  UseCaseLayout,
  CycleGrid,
  StatGrid,
  type Cycle,
  type Stat,
} from "~/ui/use-cases/chrome";

export default function IntersectPage() {
  return (
    <UseCaseLayout
      kicker="Use Case · Governance"
      title="Intersect — Maintainer Retainer Program"
      description="Governance treasury and contributor tracking for Cardano's open source ecosystem. Credential-gated onboarding, milestone-based payments, and full on-chain accountability."
      caption="Use Cases · Governance"
    >
      {/* Overview */}
      <Section>
        <div className="py-16 sm:py-20">
          <div className="grid max-w-4xl gap-12 lg:grid-cols-2">
            <div className="space-y-4 text-base leading-relaxed" style={{ color: color.inkMuted }}>
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
            <div className="space-y-4 text-base leading-relaxed" style={{ color: color.inkMuted }}>
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
        </div>
      </Section>

      <CycleGrid cycles={cycles} />

      <StatGrid
        heading="Pilot Results"
        stats={results}
        gridCls="sm:grid-cols-2 lg:grid-cols-4"
      />
    </UseCaseLayout>
  );
}

const results: Stat[] = [
  { value: "10", label: "Pilot maintainers" },
  { value: "20", label: "Milestones completed" },
  { value: "0", label: "Fund disputes" },
  { value: "30%", label: "Admin time reduced" },
];

const cycles: Cycle[] = [
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
