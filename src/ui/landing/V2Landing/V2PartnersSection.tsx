import React from "react";
import { Kicker } from "./_ui";

interface Archetype {
  n: string;
  label: string;
  headline: string;
  body: string;
  fit: string;
  buyer: string;
}

const archetypes: Archetype[] = [
  {
    n: "Certification",
    label: "If you certify professionals",
    headline:
      "Your credential is the deliverable. Make it fraud-resistant, portable, and cheap to verify.",
    body: "Issue alongside Credly or Accredible. Anchor the record of issue on-chain. Verification becomes a public read, not a support ticket.",
    fit: "Fit: HRCI, CompTIA, Scaled Agile, OffSec — any body whose credential name is the product.",
    buyer: "Buyer: VP Certification · Head of Credentialing",
  },
  {
    n: "Partner programs",
    label: "If you run a partner program",
    headline:
      "The credential carries the tier — verifiable, fraud-resistant, and held by the partner.",
    body: "Partner status that travels with the credential instead of living in a spreadsheet. Verifiable in real time, so tier checks resolve without a support loop.",
    fit: "Fit: channel programs, GSI partner tiers, cloud-partner certification — anywhere partner status has to be proven.",
    buyer: "Buyer: Head of Partner Enablement · CRO",
  },
  {
    n: "Cohort training",
    label: "If you run cohort-based training",
    headline:
      "Per-credential pricing. Credentials your alumni actually keep.",
    body: "Pay per credential issued, not per seat. Alumni hold the credential themselves and can carry it anywhere — even after the cohort ends.",
    fit: "Fit: Pavilion-shape cohort schools, platform academies, founder-led programs.",
    buyer: "Buyer: Founder / CEO · Head of Programs",
  },
];

export default function V2PartnersSection() {
  return (
    <section id="archetypes" className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Kicker tone="muted">Who Andamio Issuer is for</Kicker>

        <div className="mt-4 max-w-3xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl">
            Three kinds of work, one credential layer.
          </h2>
          <p className="mt-6 text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-xl">
            Pick the one that describes your day. Each goes somewhere
            different.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {archetypes.map((a) => (
            <a
              key={a.n}
              href="#walkthrough"
              className="group relative flex flex-col rounded-lg border border-border bg-card/40 p-9 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="mb-5 text-[13px] font-semibold text-muted-foreground">
                {a.n}
              </span>
              <p className="text-[14px] font-semibold text-primary">
                {a.label}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[1.5rem]">
                {a.headline}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed tracking-[-0.005em] text-muted-foreground">
                {a.body}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed tracking-[-0.005em] text-muted-foreground">
                {a.fit}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
                See the 4-step walkthrough{" "}
                <span
                  aria-hidden
                  className="transition-transform duration-150 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span className="mt-6 border-t border-border pt-4 text-[13px] text-muted-foreground">
                {a.buyer}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
