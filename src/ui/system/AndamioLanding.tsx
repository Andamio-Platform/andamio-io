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
  products,
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
  Kicker,
  Display,
  Button,
  Stitch,
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
      <Section id="top" bordered={false} screen>
        {/* Hero exception: no header rule — the headline leads (see brand
            guide §7 "Section header rule"). Other sections keep kicker · rule. */}
        <div className="pt-16 sm:pt-24">
          <Kicker>Andamio / Credentialing</Kicker>
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
            <Button variant="chip" href="#how-it-works">{hero.ctaEyebrow}</Button>
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label} <span aria-hidden>→</span>
            </Button>
            <Button variant="outline" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label} <span aria-hidden>→</span>
            </Button>
          </Stitch>
        </div>
      </Section>

      {/* ── Problem ─────────────────────────────────────────────── */}
      <Section id="problem" bordered={false} screen>
        <div className="grid grid-cols-12 gap-y-10 py-24 sm:py-32">
          <div className="col-span-12 lg:col-span-4 lg:pr-10">
            <Kicker>{problem.kicker}</Kicker>
            <Display as="h2" size="lg" className="mt-5" style={{ lineHeight: 0.95 }}>
              {problem.heading}
            </Display>
          </div>
          <p className="col-span-12 self-end text-xl leading-snug tracking-[-0.015em] lg:col-span-7 lg:col-start-6" style={{ color: "rgb(var(--sys-ink-rgb) / 0.7)" }}>
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

      {/* ── Badge builder / demo — the live "build a credential" widget.
             Flows directly into "Which one is for you?". ────────────────── */}
      <Section id="how-it-works" bordered={false} screen>
        {/* No section header rule here — the card carries its own title + live
            pulse, so the section is just the box. */}
        {/* The demo is the design's "specimen under glass": a deliberately LIGHT
            plate in both themes (sys-light island re-pins the palette), so it
            reads as an object on the page rather than a half-themed widget. */}
        <div className="sys-light pb-12 pt-10 sm:pb-16 sm:pt-14">
          <BadgeBuilder
            title={demo.title}
            note={demo.note}
            liveLabel={demo.liveLabel}
          />
        </div>
      </Section>

      {/* ── Which one is for you? — the two products, side by side ─── */}
      <Section id="products" bordered={false} screen>
        {/* Two products · one foundation — the map before the deep-dive.
            Issuer and API are INDEPENDENT products on a shared foundation;
            this contrast states that once, side-by-side. */}
        <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
          <Display as="h2" size="lg" className="max-w-4xl" style={{ lineHeight: 1.14 }}>
            {products.heading}:
            <br />
            <span style={{ color: color.orange }}>{products.items[0].name}</span>
            {" and "}
            <span style={{ color: color.orange }}>{products.items[1].name}</span>
          </Display>
          <p className="mt-8 text-xl leading-snug sm:text-2xl" style={muted}>
            {products.subheading}
          </p>
          <div className="mt-16 grid grid-cols-1 gap-y-12 border-t pt-12 md:grid-cols-2 md:gap-y-0" style={{ borderColor: color.rule }}>
            {products.items.map((p, i) => (
              <div
                key={p.name}
                className="md:px-12 md:first:pl-0 md:last:pr-0"
                style={i === 1 ? { borderLeft: `1px solid ${color.cell}` } : undefined}
              >
                <p
                  className="text-[12px] uppercase tracking-[0.14em]"
                  style={{ ...mono, color: color.inkFaint }}
                >
                  {p.mode}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                  {p.name}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={muted}>
                  {p.blurb}
                </p>
                <a
                  href={p.href}
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:opacity-60"
                  style={mono}
                >
                  <span className="h-2 w-2" style={{ background: color.ink }} />
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
          <p
            className="mt-12 text-[13px] leading-relaxed"
            style={{ ...mono, color: color.inkFaint }}
          >
            {products.foundationNote}
          </p>
        </div>
      </Section>

      {/* ── Issuer ──────────────────────────────────────────────── */}
      <Section id="issuer" bordered={false} screen>
        <div id="issuer-detail" className="grid scroll-mt-24 grid-cols-12 gap-y-8 border-t pt-14 pb-24 sm:pb-32" style={{ borderColor: color.rule }}>
          <div className="col-span-12 lg:col-span-7">
            <Kicker>{issuer.productLabel}</Kicker>
            <Display as="h2" size="xl" className="mt-5">
              {issuer.title}
            </Display>
          </div>
          <p className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}>
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
              key={d.heading}
              className="col-span-12 py-9 sm:col-span-6 sm:px-7 lg:col-span-4"
              style={{ borderTop: i > 0 ? `1px solid ${color.cell}` : undefined }}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="text-[12px] uppercase tracking-[0.14em] tabular-nums"
                  style={{ ...mono, color: color.inkFaint }}
                >
                  {NUMS[i]}
                </span>
                <span className="h-px flex-1 translate-y-[-4px]" style={{ background: color.cell }} />
              </div>
              <h3 className="mt-5 text-2xl font-semibold leading-none tracking-[-0.03em]">
                {d.heading}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={muted}>
                {d.text}
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

      {/* ── API / Architecture ──────────────────────────────────── */}
      <Section id="andamio-api" bordered={false} screen>
        <div className="grid grid-cols-12 gap-y-8 py-24 sm:py-32">
          <div className="col-span-12 lg:col-span-7">
            <Kicker>{api.zoneLabel}</Kicker>
            <Display as="h2" size="xl" className="mt-5">
              {api.zoneTitle}
            </Display>
          </div>
          <p className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}>
            {api.zoneBlurb}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-x-10 gap-y-12 border-t pt-12" style={{ borderColor: color.rule }}>
          {/* Left — what you can build */}
          <div className="col-span-12 lg:col-span-5 lg:pr-6">
            <Kicker>{api.kicker}</Kicker>
            <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              {api.heading}
            </h3>
            <p className="mt-6 text-[15px] leading-relaxed" style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}>
              {api.lead}
            </p>

            {/* Capability cards — hairline 2×2 */}
            <div className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-2" style={{ background: color.cell }}>
              {api.capabilities.map((c) => (
                <div key={c.verb} className="p-5" style={{ background: color.paper }}>
                  <p className="text-[15px] font-semibold tracking-[-0.02em]">{c.verb}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed" style={muted}>
                    {c.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:opacity-60"
                style={mono}
              >
                <span className="h-2 w-2" style={{ background: color.ink }} />
                {api.apiRefCta}
              </a>
              <a
                href={api.galleryHref}
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:opacity-60"
                style={{ ...mono, color: color.inkMuted }}
              >
                <span className="h-2 w-2" style={{ background: color.inkFaint }} />
                {api.galleryCta}
              </a>
            </div>
          </div>

          {/* Right — proof: a real call + the resource surface */}
          <div className="col-span-12 lg:col-span-7">
            <div className="border" style={{ borderColor: color.rule }}>
              <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: color.cell }}>
                <span className="h-2 w-2" style={{ background: color.ink }} />
                <span className="text-[11px] uppercase tracking-[0.16em]" style={{ ...mono, color: color.inkFaint }}>
                  {api.snippet.label}
                </span>
              </div>
              <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed" style={mono}>
                <code>{api.snippet.request}</code>
              </pre>
              <pre className="overflow-x-auto border-t px-4 py-4 text-[12px] leading-relaxed" style={{ ...mono, borderColor: color.cell, color: color.inkMuted }}>
                <code>{api.snippet.response}</code>
              </pre>
            </div>

            {/* Resource surface — projects is first-class */}
            <p className="mt-8 text-[11px] uppercase tracking-[0.16em]" style={{ ...mono, color: color.inkFaint }}>
              {api.resourcesLabel}
            </p>
            <dl className="mt-3 border-t" style={{ borderColor: color.cell }}>
              {api.resources.map((r) => (
                <div
                  key={r.name}
                  className="flex items-baseline justify-between gap-6 border-t py-3 first:border-t-0"
                  style={{ borderColor: color.cell }}
                >
                  <dt className="text-[14px] font-semibold tracking-[-0.02em]">{r.name}</dt>
                  <dd className="text-right text-[12px]" style={{ ...mono, color: color.inkMuted }}>
                    {r.ops}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[12px]" style={{ ...mono, color: color.inkFaint }}>
              {api.authNote}
            </p>
          </div>
        </div>
      </Section>

      {/* ── Ecosystem ───────────────────────────────────────────── */}
      <Section id="ecosystem" bordered={false} screen>
        <div className="py-24 sm:py-32">
          {/* Heading */}
          <Kicker>{ecosystem.kicker}</Kicker>
          <Display as="h2" size="lg" className="mt-6 max-w-4xl" style={{ lineHeight: 1.12 }}>
            {ecosystem.lead}
          </Display>

          {/* Three cards — Portable · Agent ready · Community — each with its CTA */}
          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 border-t pt-12 sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: color.rule }}>
            {ecosystem.items.map((it) => (
              <div key={it.title} className="flex flex-col">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em]">
                  {it.title}
                </p>
                <p className="mt-6 text-[15px] leading-relaxed" style={muted}>
                  {it.body}
                </p>
                <div className="mt-auto pt-10">
                  <Button
                    variant={it.cta.variant}
                    href={"href" in it.cta ? it.cta.href : undefined}
                  >
                    {it.cta.label}
                    {it.cta.variant !== "disabled" && <span aria-hidden> →</span>}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Closing ─────────────────────────────────────────────── */}
      <Section id="closing" bordered={false} screen>
        <div className="grid grid-cols-12 py-24 sm:py-32">
          <div className="col-span-12 lg:col-span-9">
            <Kicker>{closing.eyebrow}</Kicker>
            <Display as="h2" size="xl" className="mt-6">
              {closing.headlineLine1}
              <br />
              {closing.headlineLine2}
            </Display>
            <p className="mt-8 max-w-lg text-lg leading-relaxed" style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}>
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
