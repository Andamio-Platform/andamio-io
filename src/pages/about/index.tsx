import React from "react";
import Image from "next/image";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData, audit } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";
import { CtaBand, ProofCard, Readout } from "~/ui/system/instrument";
import { EXTERNAL_LINKS } from "~/lib/external-links";

// Everyone here is a co-founder — no per-person role labels (the section
// heading carries it), just a one-liner on what each person works across.
const TEAM = [
  {
    name: "James Dunseith",
    focus: "Learning design, developer experience, strategy",
    image: "/images/team/james.webp",
  },
  {
    name: "Yoram Ben Zvi",
    focus: "Business models, partnerships, sustainability",
    image: "/images/team/yoram.jpeg",
  },
  {
    name: "Adrian Hüetter",
    focus: "Plutus, protocol design, open source",
    image: "/images/team/adrian.webp",
  },
  {
    name: "HongJing (Jingles) K",
    focus: "Full-stack, analytics, user experience",
    image: "/images/team/jingles.webp",
  },
  {
    name: "Nelson Kshetrimayum",
    focus: "Full-stack, Cardano integration",
    image: "/images/team/nelson.webp",
  },
  {
    name: "Nori Nishigaya",
    focus: "DevOps, governance, systems architecture",
    image: "/images/team/nori.jpeg",
  },
  {
    name: "Sebastian Pabon",
    focus: "Education, facilitation, open source",
    image: "/images/team/sebastian.png",
  },
];

// Mirrors the "Founding & Vision" and "Catalyst Proposals" history in
// src/roadmap.ts plus public partner facts; no unreleased milestones.
const TIMELINE: { when: string; what: string; href?: string }[] = [
  {
    when: "2023",
    what: "Andamio is founded by Catalyst veterans, Gimbalabs contributors and Cardano builders.",
  },
  {
    when: "2023 Q4",
    what: "Catalyst Fund 10: the core smart contracts for skill acquisition and contribution tracking.",
    href: "https://www.lidonation.com/en/proposals/daos-3-smart-contracts-for-skill-acquisition-and-contribution-tracking-f10",
  },
  {
    when: "2024 Q2",
    what: "Catalyst Fund 11: open-source Cardano Go libraries and the first Andamio CLI.",
    href: "https://www.lidonation.com/en/proposals/open-source-cardano-go-libraries-docs-andamio-cli-f11",
  },
  {
    when: "2025",
    what: "Catalyst Fund 12: sidechain concept and self-sovereign on-chain identity research.",
  },
  {
    when: "2025 Q3",
    what: "Catalyst Fund 13: the Andamio SDK, and fan engagement infrastructure with FC Barcelona.",
    href: "https://www.lidonation.com/en/proposals/fc-barcelona-fan-engagement-infrastructure-cardano-f13",
  },
  { when: "2025 Q4", what: "The Andamio API goes live on Cardano mainnet." },
  {
    when: "Dec 2025",
    what: "TxPipe completes the audit of the protocol V2 contracts.",
    href: audit.href,
  },
  {
    when: "2026",
    what: "API 2.x, the rebuilt app and the first Pioneers developer cohort.",
  },
  {
    when: "Sep 2026",
    what: "FC Barcelona launches Barça Fan Lab, built with Andamio on Cardano.",
    href: "/use-cases/BarcaFanLab",
  },
];

const CONTACT = [
  {
    k: "email",
    v: "hello@andamio.io",
    href: "mailto:hello@andamio.io",
    copy: "hello@andamio.io",
  },
  { k: "discord", v: "Andamio Discord", href: EXTERNAL_LINKS.discord },
  { k: "x", v: "@Andamio_teams", href: EXTERNAL_LINKS.twitter },
  { k: "linkedin", v: "andamio-teams", href: EXTERNAL_LINKS.linkedin },
  {
    k: "walkthrough",
    v: "Book a 20-minute walkthrough",
    href: EXTERNAL_LINKS.walkthroughMailto,
  },
];

export default function AboutPage() {
  return (
    <>
      <Metatags
        title="About"
        description="Andamio is a credentialing company on Cardano: the team, the history from Project Catalyst to mainnet, the TxPipe audit, and how to reach us."
      />

      <Page nav={{ items: nav.items, cta: nav.cta }}>
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>About</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              About Andamio
            </Display>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              A credentialing company that happens to use blockchain.
            </p>
          </div>
        </Section>

        <Section id="technology">
          <div className="py-16 sm:py-20">
            <p
              className="max-w-3xl text-xl leading-relaxed tracking-[-0.01em]"
              style={{ color: color.inkMuted }}
            >
              Andamio gives organizations the infrastructure to issue
              credentials, gate content and manage contributions, all anchored
              on Cardano. Recipients own their credentials, developers integrate
              over a REST API, and each organization decides how visible the
              blockchain is to its people.
            </p>
            <a
              href={EXTERNAL_LINKS.papersHub}
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] hover:underline"
              style={{ color: color.cyan }}
            >
              Read the papers →
            </a>
          </div>
        </Section>

        <Section id="timeline">
          <div className="py-16 sm:py-20">
            <Kicker>Timeline</Kicker>
            <Display as="h2" size="md" className="mt-5">
              From Catalyst to mainnet
            </Display>
            <ol
              className="mt-10 max-w-3xl border-l"
              style={{ borderColor: color.cell }}
            >
              {TIMELINE.map((t) => (
                <li
                  key={t.when + t.what}
                  className="relative pb-8 pl-8 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border"
                    style={{ borderColor: color.cyan, background: color.paper }}
                  />
                  <p
                    className="text-[12px] tabular-nums"
                    style={{ fontFamily: font.mono, color: color.inkFaint }}
                  >
                    {t.when}
                  </p>
                  <p
                    className="mt-1 text-[16px] leading-relaxed"
                    style={{ color: color.ink }}
                  >
                    {t.what}{" "}
                    {t.href ? (
                      <a
                        href={t.href}
                        className="text-[14px] underline-offset-4 hover:underline"
                        style={{ color: color.cyan }}
                        {...(t.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        Source →
                      </a>
                    ) : null}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="audit">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <Kicker>Security</Kicker>
              <Display as="h2" size="md" className="mt-5">
                Audited contracts
              </Display>
            </div>
            <ProofCard
              kicker={audit.kicker}
              title={audit.title}
              footer={audit.footer}
              href={audit.href}
              external
            >
              {audit.body}
            </ProofCard>
          </div>
        </Section>

        <Section id="team">
          <div className="py-16 sm:py-20">
            <Kicker>Team</Kicker>
            <Display as="h2" size="md" className="mt-5">
              Andamio founding team
            </Display>
            <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="flex items-start gap-4 border p-6"
                  style={{ background: color.paper, borderColor: color.cell }}
                >
                  <div
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full"
                    style={{ background: color.cell }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-[-0.01em]">
                      {member.name}
                    </h3>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: color.inkMuted }}
                    >
                      {member.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="contact">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Kicker>Contact</Kicker>
              <Display as="h2" size="md" className="mt-5">
                Talk to the team
              </Display>
              <p
                className="mt-5 max-w-md text-[16px] leading-relaxed"
                style={{ color: color.inkMuted }}
              >
                Questions about a program, a partnership or building on the
                protocol. We&apos;re also always looking for builders.
              </p>
            </div>
            <Readout title="Channels" rows={CONTACT} />
          </div>
        </Section>

        <CtaBand
          title="See it with your own program."
          body="A 20-minute walkthrough of issuing, reviewing and verifying credentials for your people."
          primary={{
            label: "Book a walkthrough",
            href: EXTERNAL_LINKS.walkthroughMailto,
          }}
          secondary={{ label: "View use cases", href: "/use-cases" }}
        />

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="About"
        />
      </Page>
    </>
  );
}
