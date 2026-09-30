"use client";

/**
 * AndamioIssuer — the /issuer product page. The dedicated Issuer funnel that
 * the landing (story-first) sends people onward to. Carries the full Issuer
 * messaging + the how-it-works demo, both moved off the landing on 2026-07-01
 * so the landing can stay the story and this page can go deep.
 *
 * SECTION ORDER:
 *   Hero      → the product: title + transformation lead + the guide's intro
 *   Decisions → "A new kind of credential" (Permanent · Useful · Yours · Proof)
 *   How it works → the three steps as clickable tabs (Define · Issue · Verify)
 *   Closing   → the walkthrough CTA
 *
 * Built entirely from the ./kit design system; no raw styling beyond layout.
 */

import React from "react";
import Link from "next/link";
import {
  nav,
  demo,
  plan,
  issuer,
  storyFork,
  footer,
  EXTERNAL_LINKS,
} from "~/ui/explore/content";
import { color, font } from "./tokens";
import { Page, Section, Display, Button, ButtonRow, Footer } from "./kit";
import HowItWorks from "./HowItWorks";
import { ClaimFence } from "./ClaimFence";

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
    <Page
      nav={{ items: nav.items, cta: nav.cta, secondaryCta: nav.secondaryCta }}
      footer={pageFooter}
    >
      {/* ── Hero — the product. Back-link to the overview keeps the funnel
             two-way; the title + transformation lead + guide intro set it up. */}
      <Section id="top" bordered={false} screen>
        <div className="pt-16 sm:pt-24">
          <Link
            href="/#issuer"
            className="inline-flex items-center text-[13px] font-medium tracking-[-0.01em] transition-colors hover:[color:var(--sys-ink)]"
            style={{ color: color.inkMuted }}
          >
            {issuer.page.overviewCta}
          </Link>
          <Display as="h1" size="xl" className="mt-8 max-w-[16ch]">
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
            <ButtonRow>
              <Button variant="ink" href={EXTERNAL_LINKS.walkthroughMailto}>
                {issuer.walkthroughCta} <span aria-hidden>→</span>
              </Button>
              <Button variant="disabled">
                {issuer.reportCta}{" "}
                <span className="text-[10px]" style={mono}>
                  soon
                </span>
              </Button>
            </ButtonRow>
            <div className="mt-4">
              <ClaimFence>
                Walkthrough mailto expresses intent — it is not a confirmed
                booking.
              </ClaimFence>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Solution — the four assumptions as full sentences (Permanent ·
             Useful · Yours · Proof). The old card row read as deprecated
             (James, 2026-07-02): same cards as the landing teaser, old idiom.
             Now the numbered-list treatment, single-sourced from the story
             flow's assumptions — one place to sculpt the canon. ── */}
      <Section id="decisions" bordered={false}>
        <div className="border-t pt-14" style={{ borderColor: color.rule }}>
          <span className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {issuer.decisionsHeading}
          </span>
        </div>

        <ol className="mt-10 space-y-6 pb-8">
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

      {/* ── How it works — the three-tab demo (moved here off the landing). ── */}
      <Section id="how-it-works" bordered={false}>
        <div
          className="border-t pb-16 pt-14"
          style={{ borderColor: color.rule }}
        >
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
            <p
              className="mt-8 max-w-lg text-lg leading-relaxed"
              style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}
            >
              Twenty minutes, we&apos;ll scope a pilot on one of your programs.
              No slides.
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
