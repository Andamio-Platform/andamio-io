"use client";

/**
 * AndamioDevelopers — the /developers page ("Build on Andamio"), distilled from
 * the Building on Andamio paper. The landing retires its "Andamio API" deep-dive
 * into a CTA that funnels here; this page carries the depth.
 *
 * SECTION ORDER:
 *   Hero    → Build on Andamio + the two-sentence value prop
 *   In practice → capabilities + a real call + the resource surface (reuses `api`)
 *   Paths   → create your own · build on existing work
 *   Resources → the link surface + docs CTA
 *
 * Composed from the ./kit design system (SectionIntro, CardRow, Button, …).
 */

import React from "react";
import {
  nav,
  developers,
  api,
  footer,
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
  SectionIntro,
  Kicker,
} from "./kit";
import { Stagger, StaggerItem } from "./motion";
import { ProofCard } from "./instrument";

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

export default function AndamioDevelopers() {
  return (
    <Page
      nav={{ items: nav.items, cta: nav.cta, secondaryCta: nav.secondaryCta }}
      footer={pageFooter}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section id="top" bordered={false}>
        <div className="pt-16 sm:pt-24">
          <Kicker>{developers.hero.eyebrow}</Kicker>
          <Display as="h1" size="xl" className="mt-6 max-w-[15ch]">
            {developers.hero.headline}
          </Display>
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgb(var(--sys-ink-rgb) / 0.7)" }}
          >
            {developers.hero.sub}
          </p>
          <div className="mb-16 mt-12 sm:mb-24">
            <ButtonRow>
              <Button variant="ink" href={developers.hero.primaryCta.href}>
                {developers.hero.primaryCta.label} <span aria-hidden>→</span>
              </Button>
              <Button
                variant="outline"
                href={developers.hero.secondaryCta.href}
              >
                {developers.hero.secondaryCta.label} <span aria-hidden>→</span>
              </Button>
            </ButtonRow>
          </div>
        </div>
      </Section>

      {/* Levels + Loop sections removed 2026-07-02 (James: stale) — content
          retained in git; the pattern now lives in the /show-me flow. */}

      {/* ── In practice — capabilities + a real call + the resource surface.
             Reuses the `api` content that used to live on the landing. ─────── */}
      <Section id="in-practice" bordered={false}>
        <div
          className="grid grid-cols-12 gap-y-12 border-t pb-16 pt-14 lg:gap-x-10"
          style={{ borderColor: color.rule }}
        >
          {/* Left — what you can do */}
          <div className="col-span-12 lg:col-span-5 lg:pr-6">
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              {api.heading}
            </h3>
            <p
              className="mt-6 text-[15px] leading-relaxed"
              style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}
            >
              {api.lead}
            </p>
            <div
              className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ background: color.cell }}
            >
              {api.capabilities.map((c) => (
                <div
                  key={c.verb}
                  className="p-5"
                  style={{ background: color.paper }}
                >
                  <p className="text-[15px] font-semibold tracking-[-0.02em]">
                    {c.verb}
                  </p>
                  <p
                    className="mt-1.5 text-[13px] leading-relaxed"
                    style={muted}
                  >
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:opacity-60"
              >
                <span className="h-2 w-2" style={{ background: color.ink }} />
                {api.apiRefCta}
              </a>
            </div>
          </div>

          {/* Right — a real call + the resource surface */}
          <div className="col-span-12 lg:col-span-7">
            <div className="border" style={{ borderColor: color.rule }}>
              <div
                className="flex items-center gap-2 border-b px-4 py-2.5"
                style={{ borderColor: color.cell }}
              >
                <span className="h-2 w-2" style={{ background: color.ink }} />
                <span
                  className="text-[12px] font-medium tracking-[-0.01em]"
                  style={{ color: color.inkFaint }}
                >
                  {api.snippet.label}
                </span>
              </div>
              <pre
                className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed"
                style={mono}
              >
                <code>{api.snippet.request}</code>
              </pre>
              <pre
                className="overflow-x-auto border-t px-4 py-4 text-[12px] leading-relaxed"
                style={{
                  ...mono,
                  borderColor: color.cell,
                  color: color.inkMuted,
                }}
              >
                <code>{api.snippet.response}</code>
              </pre>
            </div>
            <p
              className="mt-8 text-[12px] font-medium tracking-[-0.01em]"
              style={{ color: color.inkFaint }}
            >
              {api.resourcesLabel}
            </p>
            <dl className="mt-3 border-t" style={{ borderColor: color.cell }}>
              {api.resources.map((r) => (
                <div
                  key={r.name}
                  className="flex items-baseline justify-between gap-6 border-t py-3 first:border-t-0"
                  style={{ borderColor: color.cell }}
                >
                  <dt className="text-[14px] font-semibold tracking-[-0.02em]">
                    {r.name}
                  </dt>
                  <dd
                    className="text-right text-[12px]"
                    style={{ ...mono, color: color.inkMuted }}
                  >
                    {r.ops}
                  </dd>
                </div>
              ))}
            </dl>
            <p
              className="mt-4 text-[12px]"
              style={{ ...mono, color: color.inkFaint }}
            >
              {api.authNote}
            </p>
          </div>
        </div>
      </Section>

      {/* ── Verify: the two real calls as a terminal ─────────────────────── */}
      <Section id="verify" bordered={false}>
        <div
          className="border-t pb-16 pt-14"
          style={{ borderColor: color.rule }}
        >
          <SectionIntro title={api.verify.heading} lead={api.verify.lead} />
          <ProofCard
            className="mt-8"
            bodyClassName="p-0"
            footer={api.verify.note}
          >
            <div
              className="flex items-center gap-2 border-b px-5 py-2.5"
              style={{ borderColor: color.cell }}
            >
              <span className="h-2 w-2" style={{ background: color.cyan }} />
              <span
                className="text-[12px]"
                style={{ ...mono, color: color.inkFaint }}
              >
                terminal · api.andamio.io
              </span>
            </div>
            {api.verify.steps.map((s, i) => (
              <div
                key={s.label}
                className={i ? "border-t" : ""}
                style={{ borderColor: color.cell }}
              >
                <p
                  className="px-5 pt-4 text-[11px] uppercase tracking-[0.16em]"
                  style={{ ...mono, color: color.cyan }}
                >
                  {s.label}
                </p>
                <pre
                  className="overflow-x-auto px-5 py-3 text-[12.5px] leading-relaxed"
                  style={mono}
                >
                  <code>
                    <span aria-hidden style={{ color: color.inkFaint }}>
                      ${" "}
                    </span>
                    {s.request}
                  </code>
                </pre>
                <pre
                  className="overflow-x-auto px-5 pb-5 text-[12px] leading-relaxed"
                  style={{ ...mono, color: color.inkMuted }}
                >
                  <code>{s.response}</code>
                </pre>
              </div>
            ))}
          </ProofCard>
        </div>
      </Section>

      {/* ── Two ways to build ────────────────────────────────────────────── */}
      <Section id="paths" bordered={false}>
        <div
          className="border-t pb-16 pt-14"
          style={{ borderColor: color.rule }}
        >
          <SectionIntro title={developers.paths.heading} />
          <Stagger
            className="mt-8 grid grid-cols-1 gap-px md:grid-cols-2"
            style={{ background: color.cell }}
          >
            {developers.paths.items.map((p) => (
              <StaggerItem
                key={p.name}
                className="flex flex-col p-8"
                style={{ background: color.paper }}
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em]">
                  {p.name}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={muted}>
                  {p.body}
                </p>
                <a
                  href={p.href}
                  className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:opacity-60"
                >
                  <span className="h-2 w-2" style={{ background: color.ink }} />
                  {p.cta}
                </a>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Agent note */}
          <div
            className="mt-12 border-t pt-8"
            style={{ borderColor: color.rule }}
          >
            <h3 className="text-lg font-semibold tracking-[-0.02em]">
              {developers.agent.heading}
            </h3>
            <p
              className="mt-3 max-w-2xl text-[15px] leading-relaxed"
              style={muted}
            >
              {developers.agent.body}
            </p>
          </div>
        </div>
      </Section>

      {/* ── Resources ────────────────────────────────────────────────────── */}
      <Section id="resources" bordered={false}>
        <div
          className="border-t pb-20 pt-14"
          style={{ borderColor: color.rule }}
        >
          <SectionIntro title={developers.resourcesHeading} />
          <Stagger
            className="mt-8 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
            style={{ background: color.cell }}
          >
            {developers.resources.map((r) => (
              <StaggerItem key={r.name}>
                <a
                  href={r.href}
                  className="flex flex-col p-5 transition-colors hover:opacity-70"
                  style={{ background: color.paper }}
                >
                  <span className="text-[14px] font-semibold tracking-[-0.01em]">
                    {r.name}
                  </span>
                  <span className="mt-1 text-[12px] leading-snug" style={muted}>
                    {r.desc}
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10">
            <Button variant="ink" href={developers.cta.href}>
              {developers.cta.label} <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </Section>
    </Page>
  );
}
