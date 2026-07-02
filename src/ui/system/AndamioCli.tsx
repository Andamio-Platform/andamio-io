"use client";

/**
 * AndamioCli — the /cli product page. Grounded in the andamio-cli README:
 * the terminal interface to the protocol (tx lifecycle, authoring, wallet auth).
 * Composed from the ./kit design system.
 */

import React from "react";
import { nav, cli, footer } from "~/ui/explore/content";
import { color, font } from "./tokens";
import { Page, Section, Display, Button, Stitch, Footer, SectionIntro, CardRow } from "./kit";

const mono = { fontFamily: font.mono };
const muted = { color: color.inkMuted };

const pageFooter = (
  <Footer
    tagline={footer.tagline}
    meta={footer.meta}
    copyright={footer.copyright}
    columns={footer.columns}
    backHref="/developers"
    backLabel="← Build on Andamio"
  />
);

export default function AndamioCli() {
  return (
    <Page nav={{ items: nav.items, cta: nav.cta, secondaryCta: nav.secondaryCta }} sections={null} footer={pageFooter}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section id="top" bordered={false}>
        <div className="pt-16 sm:pt-24">
          <p className="text-[11px] uppercase tracking-[0.18em]" style={{ ...mono, color: color.inkMuted }}>
            {cli.hero.eyebrow}
          </p>
          <Display as="h1" size="xl" className="mt-6 max-w-[15ch]">
            {cli.hero.headline}
          </Display>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed" style={{ color: "rgb(var(--sys-ink-rgb) / 0.7)" }}>
            {cli.hero.sub}
          </p>
          <div className="mb-16 mt-12 sm:mb-24">
            <Stitch>
              <Button variant="ink" href={cli.hero.primaryCta.href}>
                {cli.hero.primaryCta.label} <span aria-hidden>→</span>
              </Button>
              <Button variant="outline" href={cli.hero.secondaryCta.href}>
                {cli.hero.secondaryCta.label} <span aria-hidden>→</span>
              </Button>
            </Stitch>
          </div>
        </div>
      </Section>

      {/* ── Install ──────────────────────────────────────────────────────── */}
      <Section id="install" bordered={false}>
        <div className="border-t pt-14 pb-16" style={{ borderColor: color.rule }}>
          <SectionIntro title={cli.install.heading} lead={cli.install.note} />
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {cli.install.snippets.map((s) => (
              <div key={s.label} className="border" style={{ borderColor: color.rule }}>
                <div className="border-b px-4 py-2.5" style={{ borderColor: color.cell }}>
                  <span className="text-[11px] uppercase tracking-[0.16em]" style={{ ...mono, color: color.inkFaint }}>
                    {s.label}
                  </span>
                </div>
                <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed" style={mono}>
                  <code>{s.code}</code>
                </pre>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px]" style={{ ...mono, color: color.inkFaint }}>
            <span style={{ color: color.inkMuted }}>Verify:</span> {cli.install.verify}
          </p>
        </div>
      </Section>

      {/* ── What it does ─────────────────────────────────────────────────── */}
      <Section id="does" bordered={false}>
        <div className="border-t pt-14 pb-16" style={{ borderColor: color.rule }}>
          <SectionIntro title={cli.does.heading} />
          <div className="mt-8">
            <CardRow items={cli.does.items} size="md" numbered />
          </div>
          <div className="mt-12 border-t pt-8" style={{ borderColor: color.rule }}>
            <p className="max-w-2xl text-[15px] leading-relaxed" style={muted}>
              {cli.agentNote}
            </p>
            <div className="mt-8">
              <Button variant="ink" href={cli.cta.href}>
                {cli.cta.label} <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
