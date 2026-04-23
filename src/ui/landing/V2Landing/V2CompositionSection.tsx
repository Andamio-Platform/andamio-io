import React from "react";

interface Step {
  actor: string;
  action: string;
  detail: string;
}

const steps: Step[] = [
  {
    actor: "Org A",
    action: "Issues Credential A.",
    detail:
      "A certification body issues a credential to a learner. Records it on the protocol. Done.",
  },
  {
    actor: "Org B",
    action: "Requires Credential A to claim Credential B.",
    detail:
      "A different organization — never talked to Org A, never signed a data-sharing agreement — sets Credential A as a prerequisite for their own program.",
  },
  {
    actor: "The protocol",
    action: "Enforces the rule.",
    detail:
      "No API handshake. No trust broker. The learner presents Credential A, the protocol verifies, and Credential B becomes claimable.",
  },
];

export default function V2CompositionSection() {
  return (
    <section
      id="graph"
      className="border-t border-border/60 bg-surface-subtle py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-6">
          <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-8 bg-current opacity-70" aria-hidden />
            The new world
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground opacity-80">
            03 / 04
          </span>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
              This is the Credential Graph.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-xl">
              A credential you issue can be a prerequisite for a program you
              don’t run. A credential your learners hold from another issuer
              can unlock access inside yours. No data-sharing agreement. No
              API handshake.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Every credential composes with every other. No gatekeeper, no
              platform walls, no dead ends.
            </p>
          </div>

          <ol className="flex flex-col">
            {steps.map((step, index) => (
              <li
                key={step.actor}
                className="grid grid-cols-[64px_1fr] items-baseline gap-8 border-t border-border py-10 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  0{index + 1}
                </span>
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                    {step.actor}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[1.75rem]">
                    {step.action}
                  </h3>
                  <p className="mt-4 max-w-[54ch] text-base leading-relaxed tracking-[-0.005em] text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
