"use client";

/**
 * AndamioPricing — the /pricing page. Two DISTINCT products in two sections
 * (P-015: a tier name means different things per product, so each section is
 * clearly labelled by product + audience):
 *   For organizations → Andamio Issuer (annual, sales-led) — P-015 numbers
 *   For developers     → Andamio API (monthly, self-serve) — mirrors billing.ts
 *
 * Built from the ./kit design system.
 */

import React from "react";
import { nav, pricing, footer, EXTERNAL_LINKS } from "~/ui/explore/content";
import { color, font } from "./tokens";
import { Page, Section, Display, Button, Footer, SectionIntro, TierCard, Kicker } from "./kit";

const mono = { fontFamily: font.mono };
const muted = { color: color.inkMuted };

const pageFooter = (
  <Footer
    tagline={footer.tagline}
    meta={footer.meta}
    copyright={footer.copyright}
    columns={footer.columns}
    backHref="/"
    backLabel="← Back to Andamio"
  />
);

export default function AndamioPricing() {
  return (
    <Page nav={{ items: nav.items, cta: nav.cta, secondaryCta: nav.secondaryCta }} footer={pageFooter}>
      {/* ── Hero — set the two-products frame up front. ─────────────────── */}
      <Section id="top" bordered={false}>
        <div className="pb-16 pt-16 sm:pb-24 sm:pt-24">
          <Kicker>{pricing.hero.kicker}</Kicker>
          <Display as="h1" size="xl" className="mt-6 max-w-[18ch]">
            {pricing.hero.headline}
          </Display>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed" style={{ color: "rgb(var(--sys-ink-rgb) / 0.7)" }}>
            {pricing.hero.sub}
          </p>
        </div>
      </Section>

      {/* ── For organizations — Andamio Issuer (annual, sales-led). ─────── */}
      <Section id="issuer" bordered={false}>
        <div className="border-t pt-14 pb-20" style={{ borderColor: color.rule }}>
          <SectionIntro
            eyebrow={pricing.issuer.audience}
            title={pricing.issuer.title}
            lead={pricing.issuer.lead}
          />

          {/* Metering explainer — the three levers. */}
          <div className="mt-10 border-t pt-8" style={{ borderColor: color.rule }}>
            <h3 className="text-lg font-semibold tracking-[-0.02em]">{pricing.issuer.meteringHeading}</h3>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {pricing.issuer.levers.map((l) => (
                <div key={l.name}>
                  <p className="text-[14px] font-semibold tracking-[-0.01em]">{l.name}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed" style={muted}>{l.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed" style={{ color: color.inkFaint }}>
              {pricing.issuer.meteringNote}
            </p>
          </div>

          {/* Tier cards. */}
          <div className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-5" style={{ background: color.cell }}>
            {pricing.issuer.tiers.map((t) => (
              <TierCard
                key={t.name}
                name={t.name}
                price={t.price}
                priceNote={t.priceNote}
                dim={"muted" in t && t.muted}
              >
                <dl className="space-y-2.5 text-[13px]">
                  {[["Users", t.users], ["Badges", t.badges], ["Courses", t.courses]].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3">
                      <dt style={{ color: color.inkFaint }}>{k}</dt>
                      <dd className="tabular-nums font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </TierCard>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[13px] leading-relaxed" style={muted}>
            {pricing.issuer.footnote}
          </p>
          <div className="mt-8">
            <Button variant="ink" href={EXTERNAL_LINKS.walkthroughMailto}>
              {pricing.issuer.cta.label} <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </Section>

      {/* ── For developers — Andamio API (monthly, self-serve). ─────────── */}
      <Section id="api" bordered={false}>
        <div className="border-t pt-14 pb-20" style={{ borderColor: color.rule }}>
          <SectionIntro
            eyebrow={pricing.api.audience}
            title={pricing.api.title}
            lead={pricing.api.lead}
          />

          <div className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: color.cell }}>
            {pricing.api.tiers.map((t) => (
              <TierCard
                key={t.name}
                name={t.name}
                price={t.price}
                priceNote={t.priceNote}
                dim={"muted" in t && t.muted}
              >
                <p className="text-[13px] leading-relaxed" style={muted}>{t.limits}</p>
              </TierCard>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[13px] leading-relaxed" style={muted}>
            {pricing.api.footnote}
          </p>
          <div className="mt-8">
            <Button variant="outline" href={EXTERNAL_LINKS.app}>
              {pricing.api.cta.label} <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </Section>
    </Page>
  );
}
