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
    note: "Every time an employer can’t independently verify a credential, your team absorbs the call. Cost compounds with every cohort that ships — quietly, and off-spreadsheet.",
  },
  {
    label: "Platform lock-in risk",
    cost: "Paid as migration cost, eventually",
    note: "Microsoft spent 18 months disentangling from Credly. Every org on a proprietary platform carries this cost on a shelf until the day they don’t.",
  },
  {
    label: "Cross-vendor integration",
    cost: "Paid per partner, per year",
    note: "When your partners and customers hold credentials from three platforms, every integration is bespoke. You pay again the year the schema changes.",
  },
  {
    label: "Revenue delays from cert bottlenecks",
    cost: "Paid in missed pipeline",
    note: "Partner programs gate revenue on certification. Manual issue-and-verify loops push every deal a week to the right. Multiply by your pipeline.",
  },
  {
    label: "Fraud liability",
    cost: "Paid when it surfaces",
    note: "Operation Nightingale surfaced 7,600 fabricated diplomas. The cert bodies whose names were on them absorbed the reputation cost. A public, on-chain issuer signature stops that surface from existing.",
  },
];

export default function V2ComposabilityTaxSection() {
  return (
    <section
      id="tax"
      className="bg-foreground py-24 text-background sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-[104px]">
          <div className="lg:self-start">
            <div className="flex items-baseline justify-between gap-6">
              <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-8 bg-current opacity-70" aria-hidden />
                The cost of dead-end credentials
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-background/50">
                02 / 05
              </span>
            </div>

            <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-background sm:text-5xl lg:text-6xl">
              You’re already paying the Dead-End&nbsp;Tax.
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed tracking-[-0.005em] text-background/70 sm:text-xl">
              Every organization issuing credentials today pays the Dead-End
              Tax. It doesn’t show up as a line item — which is why it keeps
              getting paid.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-background/60">
              Five places it shows up, in our experience so far. None of them
              are on anyone’s invoice.
            </p>
          </div>

          <dl className="flex flex-col">
            {taxLines.map((line, index) => (
              <div
                key={line.label}
                className="grid grid-cols-[48px_1fr] items-baseline gap-6 border-t border-background/15 py-9 first:border-t-0 first:pt-0"
              >
                <dt className="font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-background/50">
                  0{index + 1}
                </dt>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <p className="font-display text-lg font-semibold leading-[1.2] tracking-[-0.015em] text-background sm:text-[1.375rem]">
                      {line.label}
                    </p>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                      {line.cost}
                    </p>
                  </div>
                  <p className="mt-3.5 max-w-[58ch] text-[15px] leading-relaxed tracking-[-0.005em] text-background/65">
                    {line.note}
                  </p>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Lead-magnet card — spans full width under the 2-column tax layout */}
        <div className="mt-20 grid gap-8 border border-background/20 bg-background/[0.04] p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-center md:gap-16 md:p-14">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              Lead magnet · 8-page brief · PDF
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.1] tracking-[-0.025em] text-background sm:text-[1.75rem] lg:text-[2.125rem]">
              The Dead-End Tax: <br className="hidden sm:inline" />
              an 8-page brief on what credentials cost when they don’t
              compose.
            </h3>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-background/70">
              Five cost categories with real-world examples, source
              citations, and dollar-or-time impact for each. Useful to anyone
              issuing credentials, not just Andamio prospects.
            </p>
            <a
              href="/dead-end-tax.html"
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-primary underline-offset-4 hover:underline"
            >
              Preview the report <span aria-hidden>→</span>
            </a>
          </div>

          <form
            action="mailto:hello@andamio.io"
            method="get"
            className="flex flex-col gap-3"
          >
            <label
              htmlFor="mag-email"
              className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-background/55"
            >
              Work email
            </label>
            <div className="flex overflow-hidden rounded-sm border border-background/25 bg-background/[0.04]">
              <input
                id="mag-email"
                name="subject"
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 bg-transparent px-4 py-3.5 text-sm tracking-[-0.005em] text-background placeholder:text-background/40 focus:outline-none"
              />
              <button
                type="submit"
                className="border-l border-[oklch(0.55_0.19_38)] bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send the audit
              </button>
            </div>
            <span className="text-xs leading-relaxed text-background/50">
              Opens your mail client with a pre-filled message to the
              enterprise team. No marketing automation. No drip.
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
