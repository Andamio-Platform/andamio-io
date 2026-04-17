import React from "react";

interface Pillar {
  number: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "Issue",
    description:
      "Define what a credential means and what it takes to earn one. Issue through the API from inside your existing workflows — no new interface for your team to learn.",
  },
  {
    number: "02",
    title: "Verify",
    description:
      "Any credential, from any issuer, in real time. Your compliance team, your partners, and your customers check the same on-chain record. No phone calls. No PDFs.",
  },
  {
    number: "03",
    title: "Gate",
    description:
      "Use credentials to gate content, partner tiers, pricing, or access — including credentials your organization didn't issue. The protocol enforces prerequisites across issuers.",
  },
];

export default function V2PillarsSection() {
  return (
    <section className="border-t border-border/60 bg-surface-subtle py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What the protocol does
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Issue.
              <br />
              Verify.
              <br />
              Gate.
            </h2>
          </div>

          <dl className="divide-y divide-border/80">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-8 first:pt-0 sm:gap-x-10"
              >
                <dt className="font-display text-sm font-medium tabular-nums text-muted-foreground sm:text-base">
                  {pillar.number}
                </dt>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
