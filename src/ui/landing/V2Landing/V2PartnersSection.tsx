import React from "react";
import Link from "next/link";

interface UseCase {
  segment: string;
  buyerTitle: string;
  problem: string;
  fit: string;
}

const useCases: UseCase[] = [
  {
    segment: "Professional certification bodies",
    buyerTitle: "VP of Certification, Head of Credentialing",
    problem:
      "Credentials sit inside Credly or Accredible. Compliance asks about fraud-proof records. A competitor body can't verify your credentials without a phone call.",
    fit: "Issue credentials anchored on Cardano alongside your current platform. Fraud-resistant records your compliance team can point to. Portable across the network without data-sharing agreements.",
  },
  {
    segment: "Partner & channel certification programs",
    buyerTitle: "Head of Partner Enablement, Chief Revenue Officer",
    problem:
      "Your partners issue their own badges. Your customers hold credentials from multiple vendors. No one can enforce a prerequisite across the ecosystem you built.",
    fit: "Programmatic access control. Cross-vendor prerequisites enforced by the protocol. Your partner tier means something because the credential itself says so.",
  },
  {
    segment: "Corporate training & cert entities",
    buyerTitle: "Founder / CEO of a mid-market training business",
    problem:
      "Stuck on a platform that prices per-seat and locks your catalog inside their database. A badge is a marketing artifact, not a capability record.",
    fit: "Per-credential cost. No per-seat licensing. Credentials survive any vendor change — because they don't live in anyone's private database.",
  },
];

export default function V2PartnersSection() {
  return (
    <section id="use-cases" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Who we&rsquo;re built for
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              If you already issue credentials, we make them portable, composable, and fraud-resistant.
            </h2>
          </div>
          <Link
            href="/use-cases"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            See deeper use cases
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <article
              key={useCase.segment}
              className="flex flex-col rounded-xl border border-border bg-card p-8"
            >
              <h3 className="font-display text-xl font-semibold leading-snug text-foreground">
                {useCase.segment}
              </h3>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {useCase.buyerTitle}
              </p>

              <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80">
                    Today
                  </p>
                  <p className="mt-1.5">{useCase.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    With Andamio
                  </p>
                  <p className="mt-1.5">{useCase.fit}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
