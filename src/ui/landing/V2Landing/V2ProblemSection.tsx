import React from "react";

interface Pain {
  headline: string;
  buyerQuote: string;
  translation: string;
}

const pains: Pain[] = [
  {
    headline: "Platform lock-in.",
    buyerQuote: "\u201cWhat happens if Credly changes their pricing?\u201d",
    translation:
      "Microsoft spent eighteen months migrating off Credly. Your credentials live in someone else's database — until they don't.",
  },
  {
    headline: "Cross-vendor verification is manual.",
    buyerQuote: "\u201cWe need to verify credentials from multiple vendors.\u201d",
    translation:
      "When a learner holds badges from three issuers, nothing composes. Each one is a dead end verified by phone, PDF, or trust.",
  },
  {
    headline: "A badge isn\u2019t proof of anything.",
    buyerQuote: "\u201cOur badges don\u2019t mean anything anymore.\u201d",
    translation:
      "Attendance is not assessment. Without enforced prerequisites, a badge is a JPEG that says someone showed up.",
  },
];

export default function V2ProblemSection() {
  return (
    <section className="border-t border-border/60 bg-surface-subtle py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            The state of credentialing
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            What a badge actually does today: almost nothing.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every team we talk to names the same three pains. None of them are
            solved by issuing a prettier PNG.
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
