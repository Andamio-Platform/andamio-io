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
      "Define credentials that mean something in your context. Anyone can issue. Recipients carry them across every app on the protocol.",
  },
  {
    number: "02",
    title: "Verify",
    description:
      "Check any credential, from any issuer, in real time. On-chain records mean no phone calls, no PDFs, no trust required.",
  },
  {
    number: "03",
    title: "Gate",
    description:
      "Use credentials to unlock content, roles, or rewards. Build learning paths, contributor programs, or access tiers — all anchored on proof.",
  },
];

export default function V2PillarsSection() {
  return (
    <section className="border-t border-border/60 bg-surface-subtle py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Your app.
              <br />
              Shared credentials.
              <br />
              Users own the proof.
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
