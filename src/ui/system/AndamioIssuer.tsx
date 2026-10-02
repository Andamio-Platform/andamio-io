"use client";

/**
 * AndamioIssuer — the /issuer product page.
 *
 * SECTION ORDER:
 *   Hero        → title, transformation lead, intro
 *   How it works → the organization lifecycle (OrbitSteps) driving the
 *                  Define · Review · Issue · Verify builder panes
 *   Controls    → what your organization controls (Readout)
 *   Principles  → Permanent · Useful · Yours · Proof
 *   Adoption    → invisible vs visible blockchain
 *   Closing     → walkthrough CTA band
 */

import React, { useState } from "react";
import {
  nav,
  demo,
  plan,
  issuer,
  storyFork,
  footer,
  lifecycles,
  adoptionModes,
  issuerControls,
  EXTERNAL_LINKS,
} from "~/ui/explore/content";
import { color, font } from "./tokens";
import {
  Page,
  Section,
  Display,
  Button,
  ButtonRow,
  Footer,
  PageTrail,
} from "./kit";
import HowItWorks from "./HowItWorks";
import { ArcHeading, CtaBand, OrbitSteps, Readout } from "./instrument";
import { AdoptionModes } from "./AdoptionModes";

const muted = { color: color.inkMuted };
const mono = { fontFamily: font.mono };
const SECTION_COUNT = 4;

const pageFooter = (
  <Footer
    tagline={footer.tagline}
    meta={footer.meta}
    copyright={footer.copyright}
    columns={footer.columns}
    backHref="/#issuer"
    backLabel="← Andamio overview"
  />
);

export default function AndamioIssuer() {
  const [step, setStep] = useState(0);
  const org = lifecycles.organization;

  return (
    <Page
      nav={{ items: nav.items, secondaryCta: nav.secondaryCta }}
      footer={pageFooter}
    >
      <Section id="top" bordered={false}>
        <div className="grid gap-8 pb-12 pt-16 sm:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <PageTrail
              className="mb-8"
              back={{ href: "/#issuer", label: issuer.page.overviewCta }}
            />
            <Display as="h1" size="xl" className="mt-8 max-w-[16ch]">
              {issuer.title}
            </Display>
            <p
              className="mt-5 text-2xl leading-snug tracking-[-0.01em] sm:text-3xl"
              style={muted}
            >
              {issuer.lead}
            </p>
          </div>
          <div className="self-end lg:col-span-5 lg:pl-8">
            <p className="text-lg leading-relaxed" style={muted}>
              {issuer.intro}
            </p>
            <div className="mt-8">
              <ButtonRow>
                <Button variant="primary" href="#builder">
                  Try the builder <span aria-hidden>↓</span>
                </Button>
                <Button
                  variant="outline"
                  href={EXTERNAL_LINKS.walkthroughMailto}
                >
                  {issuer.walkthroughCta}
                </Button>
              </ButtonRow>
            </div>
          </div>
        </div>
      </Section>

      <Section id="how-it-works" bordered={false}>
        <div
          className="border-t pb-16 pt-14"
          style={{ borderColor: color.rule }}
        >
          <ArcHeading
            index={1}
            total={SECTION_COUNT}
            kicker={org.audience}
            title={plan.heading}
          />
          <p
            className="mb-10 mt-4 max-w-2xl text-lg leading-relaxed"
            style={muted}
          >
            {issuer.page.demoLead}
          </p>
          <OrbitSteps
            label="Organization lifecycle"
            steps={org.steps}
            active={step}
            onActiveChange={setStep}
            className="mb-12"
          />
          <HowItWorks
            heading=""
            steps={plan.steps}
            demo={demo}
            active={step}
            onActiveChange={setStep}
          />
        </div>
      </Section>

      <Section id="controls" bordered={false}>
        <div
          className="grid gap-10 border-t py-16 lg:grid-cols-12"
          style={{ borderColor: color.rule }}
        >
          <div className="lg:col-span-5">
            <ArcHeading
              index={2}
              total={SECTION_COUNT}
              kicker="Ownership"
              title={issuerControls.title}
            />
            <p className="mt-4 text-[15px] leading-relaxed" style={muted}>
              {issuerControls.lead}
            </p>
          </div>
          <div className="lg:col-span-7">
            <Readout title="Issuer controls" rows={issuerControls.rows} />
          </div>
        </div>
      </Section>

      <Section id="decisions" bordered={false}>
        <div className="border-t pt-14" style={{ borderColor: color.rule }}>
          <ArcHeading
            index={3}
            total={SECTION_COUNT}
            kicker="Principles"
            title={issuer.decisionsHeading}
          />
        </div>
        <ol className="mt-10 space-y-6 pb-16">
          {storyFork.curious.assumptions.map((a, i) => (
            <li key={a.term} className="flex gap-6">
              <span
                className="pt-1.5 text-[12px] tabular-nums tracking-[0.1em]"
                style={{ ...mono, color: color.inkFaint }}
              >
                {`0${i + 1}`}
              </span>
              <p className="text-lg leading-relaxed sm:text-xl" style={muted}>
                {a.before}{" "}
                <strong className="font-semibold" style={{ color: color.ink }}>
                  {a.term}
                </strong>
                {a.after}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="adoption" bordered={false}>
        <div className="border-t py-16" style={{ borderColor: color.rule }}>
          <ArcHeading
            index={4}
            total={SECTION_COUNT}
            kicker="Adoption"
            title={adoptionModes.lead}
          />
          <div className="mt-10">
            <AdoptionModes data={adoptionModes} />
          </div>
        </div>
      </Section>

      <CtaBand
        id="closing"
        title="Ready to own the credentials you issue?"
        body="Twenty minutes: we scope a pilot on one of your programs. No slides."
        primary={{
          label: issuer.walkthroughCta,
          href: EXTERNAL_LINKS.walkthroughMailto,
        }}
        secondary={{ label: "Start issuing", href: EXTERNAL_LINKS.issuerApp }}
      />
    </Page>
  );
}
