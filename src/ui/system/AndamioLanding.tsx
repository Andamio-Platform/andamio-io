"use client";

/**
 * AndamioLanding — the chosen landing page (iteration 22), rebuilt entirely
 * from the design system in ./kit.tsx. Nothing here styles raw markup beyond
 * layout; every visual decision lives in the kit + tokens. This file is the
 * proof the system composes a real page, and the basis for the Round 3 final.
 */

import React from "react";
import {
  nav,
  hero,
  problem,
  demo,
  issuer,
  ecosystem,
  api,
  closing,
  footer,
  EXTERNAL_LINKS,
} from "~/ui/explore/content";
import { color, font } from "./tokens";
import {
  Page,
  Section,
  SectionHead,
  Kicker,
  Display,
  Button,
  Stitch,
  StackLayers,
  NumberWatermark,
  Footer,
} from "./kit";
import BadgeBuilder from "./BadgeBuilder";

const NUMS = ["01", "02", "03", "04", "05", "06"];
const muted = { color: color.inkMuted };
const mono = { fontFamily: font.mono };

export default function AndamioLanding() {
  return (
    <Page nav={{ items: nav.items, cta: nav.cta }}>
      {/* ── Hero — full-bleed type, badge withheld. Lead section carries no
             bottom rule: it flows into the first section's header. ────────── */}
      <Section id="top" bordered={false}>
        {/* Header rule: kicker · rule — no trailing meta (system rule). */}
        <div className="flex items-center gap-4 pt-16 sm:pt-24">
          <Kicker>Andamio / Credentialing</Kicker>
          <span className="h-px flex-1" style={{ background: color.rule }} />
        </div>

        <Display as="h1" size="hero" className="mt-12 max-w-[15ch]">
          {hero.headlineLead}{" "}
          <span style={{ color: color.orange }}>{hero.headlineAccent}</span>
        </Display>

        <p
          className="mt-8 max-w-[34ch] text-xl leading-relaxed sm:text-2xl"
          style={muted}
        >
          {hero.subhead}
        </p>

        <div className="mb-16 mt-12 sm:mb-24">
          <Stitch>
            <Button variant="chip">{hero.ctaEyebrow}</Button>
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label} <span aria-hidden>→</span>
            </Button>
            <Button variant="outline" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label} <span aria-hidden>→</span>
            </Button>
          </Stitch>
        </div>
      </Section>

      {/* ── Badge builder / demo — the live "build a credential" widget ── */}
      <Section id="how-it-works">
        <SectionHead kicker={demo.kicker} live liveLabel={demo.liveLabel} />
        <div className="py-14 sm:py-20">
          <div className="grid grid-cols-12 gap-y-6">
            <div className="col-span-12 lg:col-span-7 lg:pr-12">
              <NumberWatermark>01</NumberWatermark>
              <Display as="h2" size="md" className="mt-6" style={{ lineHeight: 1 }}>
                {demo.title}
              </Display>
            </div>
            <div className="col-span-12 self-end lg:col-span-5">
              <p className="max-w-md text-[15px] leading-relaxed" style={muted}>
                {demo.note}
              </p>
              <a
                href="#issuer"
                className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:opacity-60"
                style={mono}
              >
                <span className="h-2 w-2" style={{ background: color.ink }} />
                {demo.inspirationCta}
              </a>
            </div>
          </div>
          <BadgeBuilder className="mt-12" />
        </div>
      </Section>

      {/* ── Problem ─────────────────────────────────────────────── */}
      <Section id="problem">
        <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-4 lg:pr-10">
            <Kicker>{problem.kicker}</Kicker>
            <Display as="h2" size="lg" className="mt-5" style={{ lineHeight: 0.95 }}>
              {problem.heading}
            </Display>
          </div>
          <p className="col-span-12 self-end text-xl leading-snug tracking-[-0.015em] lg:col-span-7 lg:col-start-6" style={{ color: "rgba(10,10,10,0.7)" }}>
            {problem.intro}
          </p>
        </div>
        <div className="grid grid-cols-12 border-t" style={{ borderColor: color.rule }}>
          {problem.items.map((p, i) => (
            <div
              key={p.headline}
              className="col-span-12 py-10 sm:col-span-4 lg:py-12"
              style={{
                borderTop: i > 0 ? `1px solid ${color.cell}` : undefined,
                paddingLeft: i > 0 ? undefined : 0,
              }}
            >
              <span
                className="block text-6xl font-semibold leading-none tracking-[-0.05em] tabular-nums"
                style={{ color: color.inkWatermark }}
              >
                {NUMS[i]}
              </span>
              <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.03em]">
                {p.headline}
              </h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed" style={muted}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Issuer ──────────────────────────────────────────────── */}
      <Section id="issuer">
        <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-7">
            <Kicker>{issuer.productLabel}</Kicker>
            <Display as="h2" size="xl" className="mt-5">
              {issuer.title}
            </Display>
          </div>
          <p className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={{ color: "rgba(10,10,10,0.65)" }}>
            {issuer.intro}
          </p>
        </div>

        <div className="border-t pt-8" style={{ borderColor: color.rule }}>
          <span className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {issuer.decisionsHeading}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-12 border-t" style={{ borderColor: color.rule }}>
          {issuer.decisions.map((d, i) => (
            <div
              key={d.title}
              className="col-span-12 py-9 sm:col-span-6 sm:px-7 lg:col-span-4"
              style={{ borderTop: i > 0 ? `1px solid ${color.cell}` : undefined }}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="text-[12px] uppercase tracking-[0.14em] tabular-nums"
                  style={{ ...mono, color: color.inkFaint }}
                >
                  D-{NUMS[i]}
                </span>
                <span className="h-px flex-1 translate-y-[-4px]" style={{ background: color.cell }} />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.03em]">
                {d.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed" style={muted}>
                {d.body}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t py-10" style={{ borderColor: color.rule }}>
          <Stitch>
            <Button variant="disabled">
              {issuer.reportCta} <span className="text-[10px]" style={mono}>soon</span>
            </Button>
            <Button variant="ink" href={EXTERNAL_LINKS.walkthroughMailto}>
              {issuer.walkthroughCta}
            </Button>
          </Stitch>
        </div>
      </Section>

      {/* ── Ecosystem ───────────────────────────────────────────── */}
      <Section id="ecosystem">
        <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-5 lg:pr-10">
            <Kicker>{ecosystem.kicker}</Kicker>
            <Display as="p" size="sm" className="mt-6" style={{ lineHeight: 1.05 }}>
              {ecosystem.lead}
            </Display>
          </div>
          <div className="col-span-12 grid grid-cols-1 self-end border-t sm:grid-cols-2 lg:col-span-7" style={{ borderColor: color.rule }}>
            {ecosystem.items.map((it, i) => (
              <div
                key={it.title}
                className="py-8"
                style={i === 1 ? { borderTop: `1px solid ${color.cell}` } : undefined}
              >
                <p className="flex items-baseline gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]">
                  <span className="text-[12px] tabular-nums" style={{ ...mono, color: color.inkFaint }}>
                    {NUMS[i]}
                  </span>
                  {it.title}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed" style={muted}>
                  {it.body}
                </p>
              </div>
            ))}
            <p
              className="col-span-1 border-t py-4 text-[12px] tabular-nums sm:col-span-2"
              style={{ ...mono, color: color.inkGhost, borderColor: color.cell }}
            >
              {ecosystem.footnote}
            </p>
          </div>
        </div>
      </Section>

      {/* ── API / Architecture ──────────────────────────────────── */}
      <Section id="andamio-api">
        <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-7">
            <Kicker>{api.zoneLabel}</Kicker>
            <Display as="h2" size="xl" className="mt-5">
              {api.zoneTitle}
            </Display>
          </div>
          <p className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={{ color: "rgba(10,10,10,0.65)" }}>
            {api.zoneBlurb}
          </p>
        </div>

        <div className="grid grid-cols-12 border-t" style={{ borderColor: color.rule }}>
          <div className="col-span-12 py-12 lg:col-span-5 lg:pr-12" style={{ borderRight: `0` }}>
            <Kicker>{api.kicker}</Kicker>
            <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              {api.heading}
            </h3>
            <p className="mt-6 text-[15px] leading-relaxed" style={{ color: "rgba(10,10,10,0.65)" }}>
              {api.body1}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed" style={muted}>
              {api.body2}
            </p>
            <a
              href={EXTERNAL_LINKS.apiReference}
              className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:opacity-60"
              style={mono}
            >
              <span className="h-2 w-2" style={{ background: color.ink }} />
              {api.apiRefCta}
            </a>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <StackLayers layers={api.stack} />
          </div>
        </div>
      </Section>

      {/* ── Closing ─────────────────────────────────────────────── */}
      <Section id="closing">
        <div className="grid grid-cols-12 py-20 sm:py-28">
          <div className="col-span-12 lg:col-span-9">
            <Kicker>{closing.eyebrow}</Kicker>
            <Display as="h2" size="xl" className="mt-6">
              {closing.headlineLine1}
              <br />
              {closing.headlineLine2}
            </Display>
            <p className="mt-8 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(10,10,10,0.65)" }}>
              {closing.body}
            </p>
            <div className="mt-10">
              <Button variant="ink" href={EXTERNAL_LINKS.walkthroughMailto}>
                {closing.cta} <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Footer
        tagline={footer.tagline}
        meta={footer.meta}
        copyright={footer.copyright}
        columns={footer.columns}
      />
    </Page>
  );
}
