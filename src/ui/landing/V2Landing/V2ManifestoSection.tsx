import React from "react";

interface Belief {
  headline: string;
  elaboration: string;
}

const leadBelief: Belief = {
  headline: "Credentials should outlive the platform that issued them.",
  elaboration:
    "A credential locked inside a vendor’s database isn’t a credential. It’s a rental.",
};

const beliefs: Belief[] = [
  {
    headline:
      "A credential that can’t unlock anything else is a receipt.",
    elaboration:
      "If your customers hold a credential and can’t use it anywhere but your app, you’ve issued a souvenir.",
  },
  {
    headline:
      "Composability is not a feature. It’s the architecture.",
    elaboration:
      "Credly and Accredible are world-class at issuing. They are not composable. That gap is where we work.",
  },
  {
    headline:
      "The credential graph is coming. We’re building it.",
    elaboration:
      "Every credential a person earns should compose with every other — across issuers, across industries, across time. One graph. No gatekeeper.",
  },
];

export default function V2ManifestoSection() {
  return (
    <section
      id="beliefs"
      className="relative overflow-hidden border-t border-border/60 bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-6">
          <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-8 bg-current opacity-70" aria-hidden />
            What we believe
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground opacity-80">
            01 / 04
          </span>
        </div>

        <div className="mt-6 max-w-4xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
            {leadBelief.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {leadBelief.elaboration}
          </p>
        </div>

        <ol className="mt-20 space-y-0">
          {beliefs.map((belief, index) => (
            <li
              key={belief.headline}
              className="grid gap-6 border-t border-border py-10 sm:grid-cols-[72px_1fr] sm:gap-12"
            >
              <p className="font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                0{index + 2}
              </p>
              <div>
                <p className="font-display text-2xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-3xl lg:text-[2.25rem]">
                  {belief.headline}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-lg">
                  {belief.elaboration}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
