import React from "react";

interface ContrastRow {
  dimension: string;
  deadEnd: string;
  composable: string;
}

const contrastData: ContrastRow[] = [
  {
    dimension: "Ownership",
    deadEnd: "Stored in the issuing platform\u2019s database.",
    composable: "Anchored publicly. Outlives any platform.",
  },
  {
    dimension: "Verification",
    deadEnd: "A phone call, an email, or a proprietary API.",
    composable: "Anyone can check. No call to the issuer.",
  },
  {
    dimension: "Prerequisites",
    deadEnd: "Manually enforced, usually via spreadsheet.",
    composable: "Enforced by the protocol. Across issuers.",
  },
  {
    dimension: "Cross-issuer use",
    deadEnd: "Not possible without a bespoke integration.",
    composable: "Default. No data-sharing agreement required.",
  },
  {
    dimension: "Fraud resistance",
    deadEnd: "As strong as the database password.",
    composable: "As strong as the underlying cryptography.",
  },
  {
    dimension: "User experience",
    deadEnd: "Earner needs an account on each platform.",
    composable: "Earner signs up with email. No crypto wallets.",
  },
];

export default function V2ComparisonSection() {
  return (
    <section className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            The side-by-side
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
            Dead-end versus composable.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Six places the difference shows up. The same credential. Two
            very different futures for the people who hold it.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border bg-surface-subtle text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <div className="px-5 py-4 sm:px-6">Dimension</div>
            <div className="border-l border-border px-5 py-4 sm:px-6">
              Dead-end credential
            </div>
            <div className="border-l border-border bg-primary/5 px-5 py-4 text-primary sm:px-6">
              Composable credential
            </div>
          </div>
          <dl className="divide-y divide-border">
            {contrastData.map((row) => (
              <div
                key={row.dimension}
                className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <dt className="px-5 py-5 font-display text-sm font-semibold text-foreground sm:px-6 sm:text-base">
                  {row.dimension}
                </dt>
                <dd className="border-l border-border px-5 py-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
                  {row.deadEnd}
                </dd>
                <dd className="border-l border-border bg-primary/5 px-5 py-5 text-sm leading-relaxed text-foreground sm:px-6">
                  {row.composable}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
