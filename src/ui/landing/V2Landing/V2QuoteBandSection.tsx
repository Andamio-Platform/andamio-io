import React from "react";
import { Kicker } from "./_ui";

export default function V2QuoteBandSection() {
  return (
    <section
      id="ecosystem"
      className="flex min-h-screen flex-col justify-center border-y border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[62rem] px-5 sm:px-8 lg:px-14 2xl:px-20">
        <Kicker>In the ecosystem</Kicker>

        <p className="mt-6 max-w-[40ch] font-display text-[1.75rem] font-medium leading-[1.18] tracking-[-0.025em] text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
          Organizations are already issuing Andamio credentials. They mean
          something inside their world first.
        </p>

        <div className="mt-12 grid gap-10 border-t border-border pt-8 sm:grid-cols-2 sm:gap-16">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
              Intersect
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              The member body that stewards the Cardano ecosystem is issuing
              maintainer credentials to a live cohort on Andamio.
            </p>
          </div>
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
              Where it goes
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              The same machinery that attests a person learned something can
              attest that knowledge is trustworthy. Put your expertise into a
              form software can read, and the credential record becomes a record
              of knowledge too.
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs tracking-[-0.005em] text-muted-foreground">
          Named organizations current as of June 2026.
        </p>
      </div>
    </section>
  );
}
