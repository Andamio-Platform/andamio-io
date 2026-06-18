import React from "react";
import { Kicker } from "./_ui";

interface Pain {
  headline: string;
  buyerQuote: string;
  translation: string;
}

const pains: Pain[] = [
  {
    headline: "It dies in a database.",
    buyerQuote: "“What happens when our vendor changes terms?”",
    translation:
      "A badge lives in your vendor's system. When the contract ends or the company folds, the records go with it — and so does the proof your learners earned.",
  },
  {
    headline: "Software can’t use it.",
    buyerQuote: "“Our hiring systems can’t act on these.”",
    translation:
      "A badge is a picture. In one 2025 survey, 60% of employers wanted credentials their systems could read, while only 34% of issuers supplied the structured data to make that possible.",
  },
  {
    headline: "The earner can’t keep it.",
    buyerQuote: "“Our alumni can’t carry it anywhere.”",
    translation:
      "A badge is trapped in the system that issued it. That's a large part of why so few are ever seen again.",
  },
];

export default function V2ProblemSection() {
  return (
    <section className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Kicker tone="muted">The badge problem</Kicker>

        <div className="mt-4 max-w-3xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
            Most badges are dead ends.
          </h2>
          <p className="mt-6 text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-xl">
            Most of the badges you issue will never be seen again. Each one costs
            something to produce, then proves someone did a thing once and sits in
            a profile doing nothing. The effort was real. The credential is a dead
            end.
          </p>
        </div>

        <dl className="mt-20 grid gap-14 sm:grid-cols-3 sm:gap-12">
          {pains.map((pain) => (
            <div
              key={pain.headline}
              className="relative flex flex-col border-t border-border pt-8"
            >
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
