"use client";

/**
 * AndamioIssuer — the /issuer product page. The dedicated Issuer funnel that
 * the landing (story-first) sends people onward to. Carries the full Issuer
 * messaging + the how-it-works demo, both moved off the landing on 2026-07-01
 * so the landing can stay the story and this page can go deep.
 *
 * SECTION ORDER:
 *   Hero      → the product: title + transformation lead + the guide's intro
 *   Decisions → "A new kind of credential" (Permanent · Useful · Yours)
 *   How it works → the three steps as clickable tabs (Define · Issue · Verify)
 *   Closing   → the walkthrough CTA
 *
 * Built entirely from the ./kit design system; no raw styling beyond layout.
 */

import React from "react";
import { nav, demo, plan, issuer, footer, EXTERNAL_LINKS } from "~/ui/explore/content";
import { color, font } from "./tokens";
import { Page, Section, Display, Button, Stitch, Footer, CardRow } from "./kit";
import HowItWorks from "./HowItWorks";

const muted = { color: color.inkMuted };
const mono = { fontFamily: font.mono };

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
  return (
    // No editorial rail — this is a focused funnel page, not the indexed story.
    <Page nav={{ items: nav.items, cta: nav.cta }} sections={null} footer={pageFooter}>
      {/* ── Hero — the product. Back-link to the overview keeps the funnel
             two-way; the title + transformation lead + guide intro set it up. */}
      <Section id="top" bordered={false} screen>
        <div className="pt-16 sm:pt-24">
          <a
            href="/#issuer"
            className="inline-flex items-center text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:[color:var(--sys-ink)]"
            style={{ ...mono, color: color.inkFaint }}
          >
            {issuer.page.overviewCta}
          </a>
          <Display as="h1" size="hero" className="mt-8 max-w-[16ch]">
            {issuer.title}
          </Display>
          <p
            className="mt-5 text-2xl leading-snug tracking-[-0.01em] sm:text-3xl"
            style={{ color: color.orange }}
          >
            {issuer.lead}
          </p>
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgb(var(--sys-ink-rgb) / 0.7)" }}
          >
            {issuer.intro}
          </p>
          <div className="mb-16 mt-12 sm:mb-24">
            <Stitch>
              <Button variant="ink" href={EXTERNAL_LINKS.walkthroughMailto}>
                {issuer.walkthroughCta} <span aria-hidden>→</span>
              </Button>
              <Button variant="disabled">
                {issuer.reportCta} <span className="text-[10px]" style={mono}>soon</span>
              </Button>
            </Stitch>
          </div>
        </div>
      </Section>

      {/* ── Solution — the three-pronged array (Permanent · Useful · Yours). ── */}
      <Section id="decisions" bordered={false}>
        <div className="border-t pt-14" style={{ borderColor: color.rule }}>
          <span className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {issuer.decisionsHeading}
          </span>
        </div>

        <div className="mt-10 pb-8">
          <CardRow
            items={issuer.decisions.map((d) => ({ heading: d.heading, body: d.text }))}
            size="md"
            numbered
          />
        </div>
      </Section>

      {/* ── How it works — the three-tab demo (moved here off the landing). ── */}
      <Section id="how-it-works" bordered={false}>
        <div className="border-t pb-16 pt-14" style={{ borderColor: color.rule }}>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed" style={muted}>
            {issuer.page.demoLead}
          </p>
          <HowItWorks heading={plan.heading} steps={plan.steps} demo={demo} />
        </div>
      </Section>

      {/* ── Closing — the walkthrough CTA. ──────────────────────────────── */}
      <Section id="closing" bordered={false} screen>
        <div className="grid grid-cols-12 py-24 sm:py-32">
          <div className="col-span-12 lg:col-span-9">
            <Display as="h2" size="xl">
              Ready to own the credentials you issue?
            </Display>
            <p className="mt-8 max-w-lg text-lg leading-relaxed" style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}>
              Twenty minutes, we&apos;ll scope a pilot on one of your programs. No slides.
            </p>
            <div className="mt-10">
              <Button variant="ink" href={EXTERNAL_LINKS.walkthroughMailto}>
                {issuer.walkthroughCta} <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
