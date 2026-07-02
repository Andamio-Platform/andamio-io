import React from "react";
import { Kicker } from "./_ui";

interface Pillar {
  number: string;
  title: string;
  description: React.ReactNode;
  tag: string;
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "Issue",
    description: (
      <>
        Define what a credential means and what it takes to earn one, then
        issue from the tools you already use — a no-code dashboard or the
        API. No new interface for your team to learn, no blockchain to
        operate, no wallets, no crypto.
      </>
    ),
    tag: "No-code · API · No wallets",
  },
  {
    number: "02",
    title: "Verify",
    description: (
      <>
        Any Andamio credential, checked in real time against the same public
        record. Your compliance team, a partner, and an employer all read the
        same thing. Verification is a public read — no phone calls, no PDFs,
        no call to the vendor.
      </>
    ),
    tag: "Public read · On-chain",
  },
  {
    number: "03",
    title: "Own",
    description: (
      <>
        The credential is immutable and stored on public infrastructure no
        single company controls. It can&rsquo;t be quietly changed or switched
        off, it doesn&rsquo;t vanish when a vendor does, and it lives with the
        person who earned it — who can carry it anywhere, even after they
        leave your program.
      </>
    ),
    tag: "Immutable · Earner-held · Portable",
  },
];

export default function V2PillarsSection() {
  return (
    <section id="protocol" className="flex min-h-screen flex-col justify-center border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-[96px]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Kicker tone="muted">What Andamio Issuer does</Kicker>

            <h2 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1] tracking-[-0.04em] text-foreground sm:text-[3.5rem] lg:text-[4rem]">
              <span className="block">Issue</span>
              <span className="block">Verify</span>
              <span className="block text-primary">Own</span>
            </h2>

            <p className="mt-9 max-w-md text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground">
              Three things the Issuer product does today: issue credentials from
              the tools you already use, let anyone verify them as a public read,
              and put them in the hands of the people who earned them — where they
              keep working after you issue them.
            </p>
          </div>

          <dl className="flex flex-col">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="grid grid-cols-[56px_1fr] items-baseline gap-8 border-t border-border py-10 first:border-t-0 first:pt-0"
              >
                <dt className="font-display text-[1.75rem] font-semibold tabular-nums text-primary/70">
                  {pillar.number}
                </dt>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-base leading-relaxed tracking-[-0.005em] text-muted-foreground">
                    {pillar.description}
                  </p>
                  <span className="mt-5 inline-block text-[13px] font-medium text-muted-foreground">
                    {pillar.tag}
                  </span>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
