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
import {
  Page,
  Section,
  Display,
  Button,
  Footer,
  SectionIntro,
  Kicker,
} from "./kit";
import { Stagger, StaggerItem } from "./motion";
import { ProofCard } from "./instrument";

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

function PriceCard({
  name,
  price,
  priceNote,
  dim = false,
  children,
}: {
  name: string;
  price: string;
  priceNote?: string;
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <ProofCard kicker={name} className={`w-full ${dim ? "opacity-60" : ""}`}>
      <p className="-mt-1 flex items-baseline gap-1.5">
        <span className="text-[26px] font-semibold tabular-nums tracking-[-0.03em]" style={{ color: color.ink }}>
          {price}
        </span>
        {priceNote ? (
          <span className="text-[12px]" style={{ fontFamily: font.mono, color: color.inkFaint }}>
            {priceNote}
          </span>
        ) : null}
      </p>
      <div className="mt-5 border-t pt-4" style={{ borderColor: color.cell }}>
        {children}
      </div>
    </ProofCard>
  );
}

export default function AndamioPricing() {
  return (
    <Page
      nav={{ items: nav.items, cta: nav.cta, secondaryCta: nav.secondaryCta }}
      footer={pageFooter}
    >
      {/* ── Hero — set the two-products frame up front. ─────────────────── */}
      <Section id="top" bordered={false}>
        <div className="pb-16 pt-16 sm:pb-24 sm:pt-24">
          <Kicker>{pricing.hero.kicker}</Kicker>
          <Display as="h1" size="xl" className="mt-6 max-w-[18ch]">
            {pricing.hero.headline}
          </Display>
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgb(var(--sys-ink-rgb) / 0.7)" }}
          >
            {pricing.hero.sub}
          </p>
        </div>
      </Section>

      {/* ── For organizations — Andamio Issuer (annual, sales-led). ─────── */}
      <Section id="issuer" bordered={false}>
        <div
          className="border-t pb-20 pt-14"
          style={{ borderColor: color.rule }}
        >
          <SectionIntro
            eyebrow={pricing.issuer.audience}
            title={pricing.issuer.title}
            lead={pricing.issuer.lead}
          />

          {/* Metering explainer — the three levers. */}
          <div
            className="mt-10 border-t pt-8"
            style={{ borderColor: color.rule }}
          >
            <h3 className="text-lg font-semibold tracking-[-0.02em]">
              {pricing.issuer.meteringHeading}
            </h3>
            <Stagger className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {pricing.issuer.levers.map((l) => (
                <StaggerItem key={l.name}>
                  <p className="text-[14px] font-semibold tracking-[-0.01em]">
                    {l.name}
                  </p>
                  <p
                    className="mt-1.5 text-[13px] leading-relaxed"
                    style={muted}
                  >
                    {l.text}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
            <p
              className="mt-6 max-w-2xl text-[13px] leading-relaxed"
              style={{ color: color.inkFaint }}
            >
              {pricing.issuer.meteringNote}
            </p>
          </div>

          {/* Tier cards. */}
          <Stagger
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {pricing.issuer.tiers.map((t) => (
              <StaggerItem key={t.name} className="flex">
              <PriceCard
                name={t.name}
                price={t.price}
                priceNote={t.priceNote}
                dim={"muted" in t && t.muted}
              >
                <dl className="space-y-2.5 text-[13px]">
                  {[
                    ["Users", t.users],
                    ["Badges", t.badges],
                    ["Courses", t.courses],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <dt style={{ color: color.inkFaint }}>{k}</dt>
                      <dd className="font-medium tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </PriceCard>
              </StaggerItem>
            ))}
          </Stagger>

          <p
            className="mt-8 max-w-3xl text-[13px] leading-relaxed"
            style={muted}
          >
            {pricing.issuer.footnote}
          </p>
          <div className="mt-8">
            <Button variant="primary" href={EXTERNAL_LINKS.walkthroughMailto}>
              {pricing.issuer.cta.label} <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </Section>

      {/* ── For developers — Andamio API (monthly, self-serve). ─────────── */}
      <Section id="api" bordered={false}>
        <div
          className="border-t pb-20 pt-14"
          style={{ borderColor: color.rule }}
        >
          <SectionIntro
            eyebrow={pricing.api.audience}
            title={pricing.api.title}
            lead={pricing.api.lead}
          />

          <Stagger
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pricing.api.tiers.map((t) => (
              <StaggerItem key={t.name} className="flex">
              <PriceCard
                name={t.name}
                price={t.price}
                priceNote={t.priceNote}
                dim={"muted" in t && t.muted}
              >
                <p className="text-[13px] leading-relaxed" style={muted}>
                  {t.limits}
                </p>
              </PriceCard>
              </StaggerItem>
            ))}
          </Stagger>

          <p
            className="mt-8 max-w-3xl text-[13px] leading-relaxed"
            style={muted}
          >
            {pricing.api.footnote}
          </p>
          <div className="mt-8">
            <Button variant="outline" href={EXTERNAL_LINKS.app}>
              {pricing.api.cta.label} <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </Section>

      {/* ── FAQ (also emitted as FAQPage JSON-LD by the page). ───────────── */}
      <Section id="faq" bordered={false}>
        <div className="border-t pb-20 pt-14" style={{ borderColor: color.rule }}>
          <SectionIntro title="Questions" />
          <div className="mt-8 max-w-3xl border-t" style={{ borderColor: color.cell }}>
            {pricing.faq.map((f) => (
              <details key={f.q} className="group border-b py-5" style={{ borderColor: color.cell }}>
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[16px] font-semibold tracking-[-0.01em] focus:outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span aria-hidden className="shrink-0 text-[14px] transition-transform group-open:rotate-45" style={{ color: color.cyan }}>
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={muted}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </Page>
  );
}
