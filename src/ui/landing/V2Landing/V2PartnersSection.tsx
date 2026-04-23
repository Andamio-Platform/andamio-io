import React from "react";

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
    n: "01 · Certification",
    label: "If you certify professionals",
    headline:
      "Your credential is the deliverable. Make it fraud-resistant, portable, and cheap to verify.",
    body: "Issue alongside Credly or Accredible. Anchor the record of issue on-chain. Verification becomes a public read, not a support ticket.",
    fit: "Fit: HRCI, CompTIA, Scaled Agile, OffSec — any body whose credential name is the product.",
    buyer: "Buyer: VP Certification · Head of Credentialing",
  },
  {
    n: "02 · Partner programs",
    label: "If you run a partner program",
    headline:
      "The credential carries the tier. The protocol enforces the rule across vendors.",
    body: "Cross-vendor prerequisites your CRM can’t express. Partner tiers that unlock in real time when the credential lands. Revenue gates that resolve without a support loop.",
    fit: "Fit: channel programs, GSI partner tiers, cloud-partner certification — anywhere partner status should compose.",
    buyer: "Buyer: Head of Partner Enablement · CRO",
  },
  {
    n: "03 · Cohort training",
    label: "If you run cohort-based training",
    headline:
      "Per-credential cost. Credentials that work downstream, not just on LinkedIn.",
    body: "Alumni carry your credential into programs that gate on it. Other issuers can set your credential as a prerequisite — your catalog earns for you after the cohort ends.",
    fit: "Fit: Pavilion-shape cohort schools, platform academies, founder-led programs.",
    buyer: "Buyer: Founder / CEO · Head of Programs",
  },
];

export default function V2PartnersSection() {
  return (
    <section id="archetypes" className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-6">
          <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-current opacity-70" aria-hidden />
            The first issuers on the graph
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground opacity-80">
            05 / 05
          </span>
        </div>

        <div className="mt-7 max-w-3xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl">
            Three kinds of work, one protocol.
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
              className="group relative flex flex-col border border-foreground bg-background p-9 transition-[background,transform,box-shadow,color] duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-foreground hover:text-background hover:shadow-[6px_6px_0_var(--primary)]"
            >
              <span className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground group-hover:text-background/60">
                {a.n}
              </span>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                {a.label}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-[1.15] tracking-[-0.025em] text-foreground group-hover:text-background sm:text-[1.5rem]">
                {a.headline}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed tracking-[-0.005em] text-muted-foreground group-hover:text-background/80">
                {a.body}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed tracking-[-0.005em] text-muted-foreground group-hover:text-background/70">
                {a.fit}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary group-hover:text-primary">
                See the 4-step walkthrough{" "}
                <span
                  aria-hidden
                  className="transition-transform duration-150 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span className="mt-6 border-t border-dashed border-border pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground group-hover:border-background/20 group-hover:text-background/60">
                {a.buyer}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
