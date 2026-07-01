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
import { Page, Section, Display, Button, Footer } from "./kit";

const mono = { fontFamily: font.mono };
const muted = { color: color.inkMuted };

/* A single pricing card — shared shape for both products. */
function TierCard({
  name,
  price,
  priceNote,
  recommended,
  dim,
  children,
}: {
  name: string;
  price: string;
  priceNote?: string;
  recommended?: boolean;
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col p-6"
      style={{
        border: `1px solid ${recommended ? color.ink : color.cell}`,
        background: recommended ? "rgb(var(--sys-ink-rgb) / 0.03)" : undefined,
      }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={mono}>
          {name}
        </span>
        {recommended && (
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ ...mono, color: color.orange }}
          >
            Recommended
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span
          className="text-3xl font-semibold tracking-[-0.03em] tabular-nums"
          style={{ color: dim ? color.inkMuted : color.ink }}
        >
          {price}
        </span>
        {priceNote && (
          <span className="text-[13px]" style={{ ...mono, color: color.inkFaint }}>
            {priceNote}
          </span>
        )}
      </div>
      <div className="mt-5 border-t pt-5" style={{ borderColor: color.cell }}>
        {children}
      </div>
    </div>
  );
}

export default function AndamioPricing() {
  return (
    <Page nav={{ items: nav.items, cta: nav.cta }} sections={null}>
      {/* ── Hero — set the two-products frame up front. ─────────────────── */}
      <Section id="top" bordered={false}>
        <div className="pt-16 sm:pt-24">
          <p className="text-[11px] uppercase tracking-[0.18em]" style={{ ...mono, color: color.inkMuted }}>
            {pricing.hero.kicker}
          </p>
          <Display as="h1" size="hero" className="mt-6 max-w-[18ch]">
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
          <p className="text-[12px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkFaint }}>
            {pricing.issuer.audience}
          </p>
          <Display as="h2" size="xl" className="mt-3">
            {pricing.issuer.title}
          </Display>
          <p className="mt-3 text-lg leading-snug" style={muted}>
            {pricing.issuer.lead}
          </p>

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
                recommended={"recommended" in t && t.recommended}
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
          <p className="text-[12px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkFaint }}>
            {pricing.api.audience}
          </p>
          <Display as="h2" size="xl" className="mt-3">
            {pricing.api.title}
          </Display>
          <p className="mt-3 text-lg leading-snug" style={muted}>
            {pricing.api.lead}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: color.cell }}>
            {pricing.api.tiers.map((t) => (
              <TierCard
                key={t.name}
                name={t.name}
                price={t.price}
                priceNote={t.priceNote}
                recommended={"recommended" in t && t.recommended}
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

      <Footer
        tagline={footer.tagline}
        meta={footer.meta}
        copyright={footer.copyright}
        columns={footer.columns}
        backHref="/"
        backLabel="← Back to Andamio"
      />
    </Page>
  );
}
