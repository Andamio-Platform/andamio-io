import React from "react";

interface Pain {
  headline: string;
  buyerQuote: string;
  translation: string;
}

const pains: Pain[] = [
  {
    headline: "Locked to a platform.",
    buyerQuote: "\u201cWhat happens if Credly changes their pricing?\u201d",
    translation:
      "Your credentials live in someone else's database. When that platform changes terms, gets acquired, or disappears, your credentials go with it.",
  },
  {
    headline: "Unusable across issuers.",
    buyerQuote: "\u201cWe need to verify credentials from multiple vendors.\u201d",
    translation:
      "A learner holds a credential from you and two other issuers. Nothing composes. Each one is a dead end verified by phone, PDF, or trust.",
  },
  {
    headline: "Proof of nothing.",
    buyerQuote: "\u201cOur badges don\u2019t mean anything anymore.\u201d",
    translation:
      "Without enforced prerequisites, a credential is a JPEG that says someone showed up. It doesn\u2019t unlock anything else.",
  },
];

export default function V2ProblemSection() {
  return (
    <section className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            The old world
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
            This is a dead-end credential.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            It was issued once. It was put on LinkedIn. It never did anything
            again. Three things make a credential a dead end today.
          </p>
        </div>

        <dl className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {pains.map((pain, index) => (
            <div
              key={pain.headline}
              className="flex flex-col border-t-2 border-foreground/80 pt-6"
            >
              <dt className="font-display text-xs font-medium tabular-nums text-muted-foreground">
                0{index + 1}
              </dt>
              <p className="mt-4 font-display text-2xl font-semibold leading-tight text-foreground">
                {pain.headline}
              </p>
              <p className="mt-4 text-base italic leading-relaxed text-foreground/80">
                {pain.buyerQuote}
              </p>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pain.translation}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
