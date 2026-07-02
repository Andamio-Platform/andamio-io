import React from "react";
import {
  CheckCircleIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
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

export default function SyngentaPage() {
  return (
    <UseCaseLayout
      kicker="Use Case · Agriculture"
      title="Syngenta — Certified Field Experts"
      description="Agricultural supply chain credentials at enterprise scale. Train 1,000 agri-entrepreneurs, reach 100,000 smallholder farmers — with verifiable, portable proof of expertise."
      caption="Use Cases · Agriculture"
    >
      {/* Overview */}
      <Section>
        <div className="py-16 sm:py-20">
          <div className="grid max-w-4xl gap-12 lg:grid-cols-2">
            <div className="space-y-4 text-base leading-relaxed" style={{ color: color.inkMuted }}>
              <p>
                Syngenta works with 3 million farmers in India. To scale their
                Certified Field Expert program, they need a way to train
                agri-entrepreneurs on satellite application usage and issue
                credentials that any downstream party can verify — without
                depending on Syngenta&rsquo;s own systems.
              </p>
              <p>
                The challenge: paper certificates don&rsquo;t travel. Centralized
                platforms create vendor lock-in. How do you build a credentialed
                network of agricultural experts at scale?
              </p>
            </div>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: color.inkMuted }}>
              <p>
                Andamio powers a 7-chapter learning path with interactive practice
                environments, real-time feedback, and formal on-chain certification.
                Every credential issued is a permanent, verifiable record on
                Cardano — owned by the expert, not the platform.
              </p>
              <p>
                The World Food Programme has expressed interest in this model.
                When credentials are portable and verifiable, expertise crosses
                borders.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CycleGrid cycles={cycles} />

      <StatGrid heading="Scale" stats={scaleMetrics} gridCls="sm:grid-cols-3" />
    </UseCaseLayout>
  );
}

const scaleMetrics: Stat[] = [
  { value: "1K", label: "Agri-entrepreneurs trained" },
  { value: "100K", label: "Smallholder farmers reached" },
  { value: "3M", label: "Farmers in Syngenta's India network" },
];

const cycles: Cycle[] = [
  {
    title: "Train",
    icon: AcademicCapIcon,
    description:
      "Agri-entrepreneurs complete a structured 7-chapter learning path covering satellite applications, field management, and decision-making.",
    steps: [
      {
        label: "Curriculum:",
        content:
          "Platform introduction, registration, field management, satellite applications, decision making, and assessment.",
      },
      {
        label: "Practice:",
        content:
          "Interactive environments with real-time feedback. Learn by doing, not just reading.",
      },
      {
        label: "Outcome:",
        content:
          "Entrepreneurs build practical skills they can apply immediately in the field.",
      },
    ],
  },
  {
    title: "Certify",
    icon: CheckCircleIcon,
    description:
      "Successful completion earns an on-chain Certified Field Expert credential — verifiable by anyone, owned permanently by the expert.",
    steps: [
      {
        label: "Assessment:",
        content:
          "Formal evaluation validates competency against Syngenta's standards.",
      },
      {
        label: "Credential:",
        content:
          "On-chain certification on Cardano. Portable, permanent, not dependent on any platform.",
      },
      {
        label: "Outcome:",
        content:
          "Any downstream party — cooperatives, governments, NGOs — can verify expertise without contacting Syngenta.",
      },
    ],
  },
  {
    title: "Multiply",
    icon: ArrowTrendingUpIcon,
    description:
      "Certified experts train and support smallholder farmers in their region, extending Syngenta's reach from 1,000 to 100,000.",
    steps: [
      {
        label: "Reach:",
        content:
          "Each certified entrepreneur serves ~100 farmers. 1,000 entrepreneurs reach 100,000 farmers.",
      },
      {
        label: "Trust:",
        content:
          "Verifiable credentials mean farmers can confirm their advisor is qualified — no word-of-mouth required.",
      },
      {
        label: "Outcome:",
        content:
          "A self-sustaining credentialed network that scales expertise across the agricultural supply chain.",
      },
    ],
  },
];
