import React from "react";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";

import {
  CheckBadgeIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function SyngentaPage() {
  return (
    <V2PageLayout
      title="Syngenta — Certified Field Experts"
      description="Agricultural supply chain credentials at enterprise scale. Train 1,000 agri-entrepreneurs, reach 100,000 smallholder farmers — with verifiable, portable proof of expertise."
    >
      {/* Overview */}
      <section className="mb-16">
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
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
          <div className="space-y-4 text-muted-foreground">
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

      {/* Scale */}
      <section className="mt-16">
        <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
          Scale
        </h3>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
          {scaleMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <p className="text-2xl font-bold text-primary">{metric.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>
    </V2PageLayout>
  );
}

const scaleMetrics = [
  { value: "1K", label: "Agri-entrepreneurs trained" },
  { value: "100K", label: "Smallholder farmers reached" },
  { value: "3M", label: "Farmers in Syngenta's India network" },
];

const cycles = [
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
