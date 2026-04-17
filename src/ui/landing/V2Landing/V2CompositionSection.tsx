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
      "A different organization \u2014 never talked to Org A, never signed a data-sharing agreement \u2014 sets Credential A as a prerequisite for their own program.",
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
      id="composability"
      className="border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              The one thing no one else can do
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Credentials that compose.
              <br />
              Across issuers who never met.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Credly, Accredible, and Canvas can issue badges. None of them can
              enforce a prerequisite from a credential they didn&rsquo;t issue.
              That&rsquo;s the category line.
            </p>
          </div>

          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li
                key={step.actor}
                className="rounded-lg border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm font-medium tabular-nums text-muted-foreground">
                    0{index + 1}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {step.actor}
                  </p>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {step.action}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
