import React from "react";

interface TaxLine {
  label: string;
  cost: string;
  note: string;
}

const taxLines: TaxLine[] = [
  {
    label: "Verification-call overhead",
    cost: "Paid by your help desk",
    note: "Every time an employer can\u2019t independently verify a credential, your team absorbs the call.",
  },
  {
    label: "Platform lock-in risk",
    cost: "Paid as migration cost, eventually",
    note: "Microsoft spent 18 months disentangling from Credly. Every org on a proprietary platform carries this on a shelf.",
  },
  {
    label: "Cross-vendor integration work",
    cost: "Paid per partner, per year",
    note: "When your partners and customers hold credentials from three platforms, every integration is bespoke.",
  },
  {
    label: "Revenue delays from cert bottlenecks",
    cost: "Paid in missed pipeline",
    note: "Partner programs gate revenue on certification. Manual issue-and-verify loops push every deal a week to the right.",
  },
  {
    label: "Fraud liability",
    cost: "Paid when it surfaces",
    note: "Operation Nightingale surfaced 7,600 fabricated diplomas. The cert bodies whose names were on them absorbed the reputation cost.",
  },
];

export default function V2ComposabilityTaxSection() {
  return (
    <section className="border-t border-border/60 bg-surface-subtle py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              The cost of dead-end credentials
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
              You&rsquo;re already paying the Dead-End Tax.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground sm:text-xl">
              Every organization issuing credentials today pays the
              Dead-End Tax. It doesn&rsquo;t show up as a line item —
              which is why it keeps getting paid.
            </p>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              Five places it lives, in our experience so far:
            </p>
          </div>

          <dl className="divide-y divide-border">
            {taxLines.map((line, index) => (
              <div
                key={line.label}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-8 py-7 first:pt-0 sm:gap-x-12"
              >
                <dt className="font-display text-sm font-medium tabular-nums text-muted-foreground sm:text-base">
                  0{index + 1}
                </dt>
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="font-display text-lg font-semibold text-foreground sm:text-xl">
                      {line.label}
                    </p>
                    <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">
                      {line.cost}
                    </p>
                  </div>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {line.note}
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
