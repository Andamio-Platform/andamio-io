import React from "react";
import Link from "next/link";
import Metatags from "~/components/site/metatags";
import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "~/ui/system/motion/variants";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";

const useCases = [
  {
    title: "Intersect — Maintainer Retainer Program",
    description:
      "Governance treasury and contributor tracking for Cardano's open source ecosystem. Credential-gated onboarding, milestone-based payments, full on-chain accountability.",
    href: "/use-cases/Intersect",
    domain: "Governance",
  },
  {
    title: "Toha Network — Nature Regeneration",
    description:
      "Nature regeneration financing with verifiable credentials. Contributors earn MAHI tokens for verified environmental actions — no wallets required.",
    href: "/use-cases/Toha",
    domain: "Nature Finance",
  },
  {
    title: "Syngenta — Certified Field Experts",
    description:
      "Agricultural supply chain credentials at enterprise scale. Train 1,000 agri-entrepreneurs, reach 100,000 smallholder farmers.",
    href: "/use-cases/Syngenta",
    domain: "Agriculture",
  },
  {
    title: "Decentralized Innovation Fund",
    description:
      "Certify reviewers, build their reputation, and ensure high-quality assessments within your community.",
    href: "/use-cases/CatalystReviewers",
    domain: "Innovation",
  },
  {
    title: "Decentralized Innovation",
    description:
      "Certify reviewers, build their reputation, and ensure high-quality assessments.",
    href: "/use-cases/DecentralizedInnovation",
    domain: "Innovation",
  },
  {
    title: "Fan Engagement",
    description:
      "Empower contributors to promote your sports team on social media, build fan loyalty, and grow your audience.",
    href: "/use-cases/FanEngagement",
    domain: "Sports & Media",
  },
  {
    title: "Lead Generation",
    description:
      "Connect with certified lead generators to drive your business growth.",
    href: "/use-cases/LeadGenerator",
    domain: "Business Development",
  },
];

const containerVariants = staggerContainer;
const cardVariants = staggerItem;

export default function UseCasesIndex() {
  return (
    <>
      <Metatags
        title="Use Cases"
        description="Explore how organizations use Andamio to manage credentials, coordinate contributors, and scale impact."
      />

      <Page nav={{ items: nav.items, cta: nav.cta }}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>Use Cases</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              Use Cases
            </Display>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed" style={{ color: color.inkMuted }}>
              Explore how organizations use Andamio to manage credentials, coordinate
              contributors, and scale impact.
            </p>
          </div>
        </Section>

        {/* Grid */}
        <Section bordered={false}>
          <div className="py-16 sm:py-20">
            <motion.div
              className="grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ background: color.cell }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {useCases.map((uc) => (
                <motion.div key={uc.href} variants={cardVariants} style={{ background: color.paper }}>
                  <Link
                    href={uc.href}
                    className="group block h-full p-6 transition-colors hover:bg-[rgba(10,10,10,0.02)] sm:p-8"
                  >
                    <span
                      className="text-[12px] font-medium tracking-[-0.01em]"
                      style={{ color: color.inkMuted }}
                    >
                      {uc.domain}
                    </span>
                    <h2
                      className="mb-2 mt-3 text-xl font-semibold tracking-[-0.02em] transition-colors"
                      style={{ color: color.ink }}
                    >
                      {uc.title}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: color.inkMuted }}>
                      {uc.description}
                    </p>
                    <span
                      className="mt-4 inline-block text-[13px] font-semibold tracking-[-0.01em] opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: color.blue }}
                    >
                      View →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Use Cases"
        />
      </Page>
    </>
  );
}
