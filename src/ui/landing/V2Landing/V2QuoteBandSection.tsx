import React from "react";

interface QuoteStat {
  v: string;
  k: string;
}

const stats: QuoteStat[] = [
  { v: "−34%", k: "Inbound verification tickets" },
  { v: "2", k: "Cross-issuer prerequisite chains live" },
  { v: "0", k: "Learner-facing changes" },
];

export default function V2QuoteBandSection() {
  return (
    <section
      id="quote"
      className="border-y border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[62rem] px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
          <span className="h-px w-8 bg-current opacity-70" aria-hidden />
          From an early design partner
        </span>

        <blockquote className="mt-8 max-w-[36ch] font-display text-[1.75rem] font-medium leading-[1.2] tracking-[-0.025em] text-foreground sm:text-[2.25rem] lg:text-[2.75rem]">
          “Once our credential lived somewhere other than a vendor’s database,
          the verification calls stopped. That alone paid for the first year.
          The compose part — other issuers gating on us — is what made it a
          strategy instead of a cost-save.”
        </blockquote>

        <div className="mt-12 grid gap-10 border-t border-border pt-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10">
          <div>
            <p className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
              Head of credential operations
            </p>
            <p className="mt-1 text-[13px] tracking-[-0.005em] text-muted-foreground">
              40k-credential-per-year certifying body · North America
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.k} className="flex flex-col gap-1">
                <dt className="font-display text-[1.75rem] font-semibold leading-none tracking-[-0.035em] text-primary tabular-nums sm:text-[2.25rem]">
                  {s.v}
                </dt>
                <dd className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {s.k}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-8 text-xs italic tracking-[-0.005em] text-muted-foreground">
          Name withheld during pilot. Full case study available under NDA on
          request.
        </p>
      </div>
    </section>
  );
}
