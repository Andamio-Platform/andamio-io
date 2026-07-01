"use client";

/**
 * AndamioLanding — the chosen landing page (iteration 22), rebuilt entirely
 * from the design system in ./kit.tsx. Nothing here styles raw markup beyond
 * layout; every visual decision lives in the kit + tokens. This file is the
 * proof the system composes a real page, and the basis for the Round 3 final.
 *
 * SECTION ORDER — the StoryBrand arc, sequenced to Sebastian's ecosystem-notes
 * flow (concern → insight → impact → solution). Issuer is the hero throughout:
 *   Hero     → Character
 *   Problem  → Concern + insight (rental · picture · claim), closing on the
 *              Impact/stakes line — so impact lands before the solution
 *   Issuer   → Guide + Solution (permanent · useful · yours)
 *   How it works → the three steps are clickable tabs cycling three mini-demos
 *                  (Define builder · Issue mock · Verify mock)
 *   Products / API / Ecosystem → the secondary builder movement
 *   Closing  → Success (transformation + the walkthrough CTA)
 */

import React from "react";
import {
  nav,
  hero,
  problem,
  products,
  issuer,
  ecosystem,
  stakes,
  closing,
  footer,
  EXTERNAL_LINKS,
} from "~/ui/explore/content";
import { color, font } from "./tokens";
import {
  Page,
  Section,
  Display,
  Button,
  Stitch,
  Footer,
  CardRow,
} from "./kit";

const pageFooter = (
  <Footer
    tagline={footer.tagline}
    meta={footer.meta}
    copyright={footer.copyright}
    columns={footer.columns}
  />
);

const NUMS = ["01", "02", "03", "04", "05", "06"];
const muted = { color: color.inkMuted };
const mono = { fontFamily: font.mono };

export default function AndamioLanding() {
  return (
    <Page nav={{ items: nav.items, cta: nav.cta }} footer={pageFooter}>
      {/* ── 1 · Character — Hero. Full-bleed type, badge withheld. Lead section
             carries no bottom rule: it flows into the first section's header. */}
      <Section id="top" bordered={false} screen>
        {/* Eyebrows removed across the page (team feedback): the headline leads. */}
        <Display as="h1" size="hero" className="max-w-[15ch] pt-16 sm:pt-24">
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
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label} <span aria-hidden>→</span>
            </Button>
            <Button variant="outline" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label} <span aria-hidden>→</span>
            </Button>
          </Stitch>
        </div>
      </Section>

      {/* ── 2 · Problem (Concern + insight) — closes on the Stakes/Impact line,
             smaller type, so the impact lands right after the concern and
             before the solution. Padding tightened to hold one screen. ─────── */}
      <Section id="problem" bordered={false} screen>
        <div className="grid grid-cols-12 gap-y-6 py-14 sm:py-20">
          <div className="col-span-12 lg:col-span-4 lg:pr-10">
            <Display as="h2" size="lg" style={{ lineHeight: 0.95 }}>
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
              className="col-span-12 py-8 sm:col-span-4 lg:py-10"
              style={{
                borderTop: i > 0 ? `1px solid ${color.cell}` : undefined,
                paddingLeft: i > 0 ? undefined : 0,
              }}
            >
              <span
                className="block text-5xl font-semibold leading-none tracking-[-0.05em] tabular-nums"
                style={{ color: color.inkWatermark }}
              >
                {NUMS[i]}
              </span>
              <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.03em]">
                {p.headline}
              </h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed" style={muted}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
        {/* Stakes / Impact — the section's quiet closing line (smaller type). */}
        <div className="border-t pt-7" style={{ borderColor: color.rule }}>
          <p className="max-w-3xl text-lg font-medium leading-snug tracking-[-0.01em] sm:text-xl" style={{ color: color.inkMuted }}>
            {stakes.line}
          </p>
        </div>
      </Section>

      {/* ── Guide + Solution — the Issuer TEASER. The full product page (deep
             messaging + the how-it-works demo) lives at /issuer; the landing
             stays the story and funnels onward. The three decisions stay here
             as a one-line array so the payoff still lands before the funnel. ── */}
      <Section id="issuer" bordered={false} screen>
        <div id="issuer-detail" className="grid scroll-mt-24 grid-cols-12 gap-y-8 border-t pt-14 pb-16 sm:pb-20" style={{ borderColor: color.rule }}>
          <div className="col-span-12 lg:col-span-7">
            <Display as="h2" size="xl">
              {issuer.title}
            </Display>
            <p className="mt-3 text-xl leading-snug tracking-[-0.01em] sm:text-2xl" style={{ color: color.inkMuted }}>
              {issuer.lead}
            </p>
          </div>
          <p className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}>
            {issuer.intro}
          </p>
        </div>

        {/* The three-pronged array, compressed to a single hairline row — the
            deep card treatment now lives on /issuer. */}
        <CardRow
          items={issuer.decisions.map((d) => ({ heading: d.heading, body: d.text }))}
          size="sm"
        />

        <div className="border-t py-10" style={{ borderColor: color.rule }}>
          <Stitch>
            <Button variant="ink" href="/issuer">
              {issuer.learnMoreCta} <span aria-hidden>→</span>
            </Button>
            <Button variant="outline" href={EXTERNAL_LINKS.walkthroughMailto}>
              {issuer.walkthroughCta}
            </Button>
          </Stitch>
        </div>
      </Section>

      {/* ── Secondary movement — the builder story. Two products on one
             foundation, then the API deep-dive, then the ecosystem reach. ───── */}
      <Section id="products" bordered={false} screen>
        <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
          <p className="mb-5 text-lg font-medium tracking-[-0.01em] sm:text-xl" style={{ color: color.inkMuted }}>
            {products.lead}
          </p>
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

      {/* ── Ecosystem ───────────────────────────────────────────── */}
      <Section id="ecosystem" bordered={false} screen>
        <div className="py-24 sm:py-32">
          {/* Heading */}
          <Display as="h2" size="lg" className="max-w-4xl" style={{ lineHeight: 1.12 }}>
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

      {/* ── Success — transformation + the walkthrough CTA ───────── */}
      <Section id="closing" bordered={false} screen>
        <div className="grid grid-cols-12 py-24 sm:py-32">
          <div className="col-span-12 lg:col-span-9">
            <Display as="h2" size="xl">
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
    </Page>
  );
}
