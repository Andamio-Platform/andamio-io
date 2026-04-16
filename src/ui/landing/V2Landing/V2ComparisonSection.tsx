import React from "react";

interface FeatureRow {
  feature: string;
  detail: string;
}

const featureData: FeatureRow[] = [
  {
    feature: "Ownership",
    detail:
      "Credentials belong to the recipient. Portable across every app on the protocol.",
  },
  {
    feature: "Accessibility",
    detail: "No per-user licensing. Start building without upfront commitments.",
  },
  {
    feature: "Privacy",
    detail:
      "Personal data stays off-chain. Only credential proofs are recorded.",
  },
  {
    feature: "Wallets",
    detail:
      "Users don\u2019t need one. Organizations sponsor transactions. Blockchain is invisible.",
  },
  {
    feature: "Durability",
    detail:
      "Credentials survive on Cardano mainnet regardless of any single platform. Open source.",
  },
  {
    feature: "Integration",
    detail:
      "REST API. Add credentials to your existing app without learning Cardano.",
  },
];

export default function V2ComparisonSection() {
  return (
    <section className="border-t border-border/60 bg-surface-subtle py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Andamio gives you.
            </h2>
            <p className="mt-6 text-base text-muted-foreground">
              Six guarantees of the protocol — the same whether you build with
              the API or work directly with the smart contracts.
            </p>
          </div>

          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {featureData.map((row) => (
              <div key={row.feature}>
                <dt className="font-display text-base font-semibold text-foreground">
                  {row.feature}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
