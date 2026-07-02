import React from "react";
import { Kicker } from "./_ui";

interface Problem {
  headline: string;
  body: string;
}

// Drawn directly from the Andamio Issuer paper — "The problem with badges".
const problems: Problem[] = [
  {
    headline: "It’s a picture, not data",
    body: "A badge can be shared on LinkedIn, but your systems can’t act on it. In a 2025 survey, 91% of employers looked for digital credentials when hiring. Only 34% of issuers gave them data a system can read.",
  },
  {
    headline: "It lives in your vendor’s database",
    body: "It can be quietly changed, switched off, or lost if the vendor closes its doors. The proof your people earned goes with it.",
  },
  {
    headline: "The vendor controls it, not you",
    body: "Whoever runs the platform controls your credentialing system. The records, the rules, and whether any of it survives.",
  },
];

export default function V2ProblemSection() {
  return (
    <section className="flex min-h-screen flex-col justify-center border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <Kicker tone="muted">The problem with badges</Kicker>

        <div className="mt-5 max-w-5xl">
          <h2 className="font-display text-5xl font-bold leading-[1.0] tracking-[-0.02em] text-foreground sm:text-7xl lg:text-8xl">
            Badges aren’t effective
          </h2>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-2xl">
            The digital credential most organizations issue is a badge. And a
            badge falls short in three ways.
          </p>
        </div>

        <dl className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-16">
          {problems.map((p, i) => (
            <div key={p.headline} className="flex flex-col border-t-2 border-border pt-8">
              <span className="font-display text-2xl font-bold tabular-nums text-primary/60">
                0{i + 1}
              </span>
              <dt className="mt-5 font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                {p.headline}
              </dt>
              <dd className="mt-4 text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground">
                {p.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
