import React from "react";

interface Pain {
  headline: string;
  buyerQuote: string;
  translation: string;
}

const pains: Pain[] = [
  {
    headline: "Locked to a platform.",
    buyerQuote: "“What happens if Credly changes their pricing?”",
    translation:
      "Your credentials live in someone else's database. When that platform changes terms, gets acquired, or disappears, your credentials go with it.",
  },
  {
    headline: "Unusable across issuers.",
    buyerQuote: "“We need to verify credentials from multiple vendors.”",
    translation:
      "A learner holds a credential from you and two other issuers. Nothing composes. Each one is a dead end verified by phone, PDF, or trust.",
  },
  {
    headline: "Proof of nothing.",
    buyerQuote: "“Our badges don’t mean anything anymore.”",
    translation:
      "Without enforced prerequisites, a credential is a JPEG that says someone showed up. It doesn’t unlock anything else.",
  },
];

export default function V2ProblemSection() {
  return (
    <section className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-6">
          <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-current opacity-70" aria-hidden />
            The old world
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground opacity-80">
            01 / 05
          </span>
        </div>

        <div className="mt-6 max-w-3xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
            Three ways a credential becomes a dead end.
          </h2>
          <p className="mt-6 text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-xl">
            It was issued once. It was put on LinkedIn. It never did anything
            again. Three failure modes, one root cause: the credential lives
            inside somebody else’s database.
          </p>
        </div>

        <dl className="mt-20 grid gap-14 sm:grid-cols-3 sm:gap-12">
          {pains.map((pain, index) => (
            <div
              key={pain.headline}
              className="relative flex flex-col border-t-2 border-foreground pt-10"
            >
              <span className="absolute -top-[11px] left-0 bg-background pr-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-foreground">
                Dead end 0{index + 1}
              </span>
              <dt className="font-display text-xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-2xl">
                {pain.headline}
              </dt>
              <p className="mt-5 border-l-2 border-primary pl-4 text-base italic leading-[1.55] text-foreground/85">
                {pain.buyerQuote}
              </p>
              <dd className="mt-4 text-[15px] leading-relaxed tracking-[-0.005em] text-muted-foreground">
                {pain.translation}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
