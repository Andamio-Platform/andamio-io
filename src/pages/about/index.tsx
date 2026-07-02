import React from "react";
import Image from "next/image";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Button, Footer } from "~/ui/system/kit";
import { EXTERNAL_LINKS } from "~/lib/external-links";

// Everyone here is a co-founder — no per-person role labels (the section
// heading carries it), just a one-liner on what each person works across.
const teamMembers = [
  { name: "James Dunseith", focus: "Learning design, developer experience, strategy", image: "/images/team/james.webp" },
  { name: "Yoram Ben Zvi", focus: "Business models, partnerships, sustainability", image: "/images/team/yoram.jpeg" },
  { name: "Adrian Hüetter", focus: "Plutus, protocol design, open source", image: "/images/team/adrian.webp" },
  { name: "HongJing (Jingles) K", focus: "Full-stack, analytics, user experience", image: "/images/team/jingles.webp" },
  { name: "Nelson Kshetrimayum", focus: "Full-stack, Cardano integration", image: "/images/team/nelson.webp" },
  { name: "M. Ali Modiri", focus: "Plutus, security, CIP authorship", image: "/images/team/mix.webp" },
  { name: "Nori Nishigaya", focus: "DevOps, governance, systems architecture", image: "/images/team/nori.jpeg" },
  { name: "Sebastian Pabon", focus: "Education, facilitation, open source", image: "/images/team/sebastian.png" },
];

export default function AboutPage() {
  return (
    <>
      <Metatags
        title="About"
        description="An open protocol for interoperable credentials, built on Cardano."
      />

      <Page nav={{ items: nav.items, cta: nav.cta }}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>About</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              About Andamio
            </Display>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: color.inkMuted }}>
              An open protocol for interoperable credentials, built on Cardano.
            </p>
          </div>
        </Section>

        {/* Mission */}
        <Section id="technology">
          <div className="py-16 sm:py-20">
            <p className="max-w-3xl text-xl leading-relaxed tracking-[-0.01em]" style={{ color: "rgba(10,10,10,0.7)" }}>
              Andamio gives organizations the infrastructure to issue credentials, gate content,
              and manage contributions — all anchored on-chain. Recipients own their credentials.
              Developers integrate via REST API. The blockchain is invisible to end users.
            </p>
            <a
              href={EXTERNAL_LINKS.papersHub}
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:underline"
              style={{ color: color.blue }}
            >
              Read the papers →
            </a>
          </div>
        </Section>

        {/* Team */}
        <Section id="team">
          <div className="py-16 sm:py-20">
            <Kicker>Team</Kicker>
            <Display as="h2" size="md" className="mt-5">
              Andamio founding team
            </Display>

            <div
              className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4"
              style={{ background: color.cell }}
            >
              {teamMembers.map((member) => (
                <div key={member.name} className="flex items-start gap-4 p-6" style={{ background: color.paper }}>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full" style={{ background: color.cell }}>
                    {member.image && (
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-[-0.01em]">{member.name}</h3>
                    <p className="mt-1 text-sm" style={{ color: color.inkMuted }}>
                      {member.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Join */}
            <div
              className="mt-8 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center"
              style={{ border: `1px solid ${color.cell}` }}
            >
              <div>
                <h3 className="font-semibold">Work with us</h3>
                <p className="text-sm" style={{ color: color.inkMuted }}>
                  We&apos;re always looking for builders.
                </p>
              </div>
              <Button variant="outline" href="mailto:hello@andamio.io">
                Get in Touch →
              </Button>
            </div>
          </div>
        </Section>

        {/* Bottom CTA */}
        <Section bordered={false}>
          <div className="flex flex-wrap items-center gap-3 py-16">
            <Button variant="primary" href={EXTERNAL_LINKS.docs}>
              Read the Docs →
            </Button>
            <Button variant="outline" href="/use-cases">
              View Use Cases
            </Button>
          </div>
        </Section>

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
