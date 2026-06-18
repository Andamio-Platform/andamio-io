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
    title: "Issue.",
    description: (
      <>
        Define what a credential means and what it takes to earn one. Issue
        through the REST API from inside your existing workflows — no new
        interface for your team to learn, no blockchain to operate, no
        wallets to onboard. Permissionless.
      </>
    ),
    tag: "REST · Webhook · SDK",
  },
  {
    number: "02",
    title: "Verify.",
    description: (
      <>
        Any credential, from any issuer, in real time. Your compliance team,
        your partners, and your customers check the same on-chain record.
        Verification is a public read — no phone calls, no PDFs, no
        proprietary API to the issuing vendor.
      </>
    ),
    tag: "Public read · On-chain",
  },
  {
    number: "03",
    title: "Compose.",
    description: (
      <>
        Use credentials to gate content, partner tiers, and pricing —{" "}
        <em className="not-italic text-foreground">including</em> credentials
        your organization didn’t issue. Chain them as prerequisites for new
        credentials. The protocol enforces the rule across issuers. No
        data-sharing agreements, no API handshake.
      </>
    ),
    tag: "Gate · Prerequisite · Cross-issuer",
  },
];

export default function V2PillarsSection() {
  return (
    <section id="protocol" className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-[96px]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Kicker tone="muted">What the protocol does</Kicker>

            <h2 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1] tracking-[-0.04em] text-foreground sm:text-[3.5rem] lg:text-[4rem]">
              <span className="block">Issue.</span>
              <span className="block">Verify.</span>
              <span className="block text-primary">Compose.</span>
            </h2>

            <p className="mt-9 max-w-md text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground">
              Three moves. The third used to be &ldquo;Gate&rdquo; — we
              changed it, because a credential that{" "}
              <em className="not-italic text-foreground">only</em> gates is
              still a local move. Compose covers both: gate content, and
              chain into somebody else&rsquo;s program.
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
