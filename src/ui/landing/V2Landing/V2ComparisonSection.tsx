import React from "react";

interface FeatureRow {
  feature: string;
  detail: string;
}

const featureData: FeatureRow[] = [
  {
    feature: "No platform lock-in",
    detail:
      "Credentials survive any vendor change. They exist on Cardano mainnet, not in our database — or anyone else\u2019s.",
  },
  {
    feature: "Cross-issuer composability",
    detail:
      "A credential from Org A can gate access to Org B\u2019s program without API integrations or trust agreements. No competitor can do this.",
  },
  {
    feature: "Fraud-resistant by construction",
    detail:
      "On-chain records your compliance team can audit. Tamper-proof. No \u201cwe\u2019ll email a verification letter\u201d workflow.",
  },
  {
    feature: "Coexists with your stack",
    detail:
      "Runs alongside your LMS, CRM, or current certification platform. Add it, don\u2019t migrate. REST API only.",
  },
  {
    feature: "No crypto wallets for your users",
    detail:
      "Your organization sponsors transactions. Earners sign up with email. The blockchain stays invisible.",
  },
  {
    feature: "Per-credential pricing",
    detail:
      "Flat cost per credential issued. No per-seat licensing. No catalog hostage-taking.",
  },
];

export default function V2ComparisonSection() {
  return (
    <section className="border-t border-border/60 bg-surface-subtle py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What you actually get
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Six things Credly and Accredible can&rsquo;t match.
            </h2>
            <p className="mt-6 text-base text-muted-foreground">
              Guarantees of the protocol itself \u2014 the same whether your team
              calls our API or works directly with the smart contracts.
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
