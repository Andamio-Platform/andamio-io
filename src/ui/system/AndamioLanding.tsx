"use client";

/**
 * AndamioLanding — the chosen landing page (iteration 22), rebuilt entirely
 * from the design system in ./kit.tsx. Nothing here styles raw markup beyond
 * layout; every visual decision lives in the kit + tokens. This file is the
 * proof the system composes a real page, and the basis for the Round 3 final.
 *
 * SECTION ORDER — essentials only (James, 2026-07-02: "if I scroll the
 * landing page, I only see what's essential"). The story lives in the /story
 * flow ("Show me"); the scroll is the simple overview hitting the TWO PERSONAS
 * — Andamio Issuers and Andamio Developers — plus reach and the close. The
 * pattern and problem sections folded into the flow (issuer chapters 1 + 3):
 *   Hero       → the artifact + manifesto + "Show me" (→ /story)
 *   Issuer     → persona one (permanent · useful · yours · proof)
 *   Developers → persona two, a compact CTA (→ /developers)
 *   Ecosystem  → the reach (portable · agent ready · your data · community)
 *   Closing    → transformation + the walkthrough CTA
 */

import React from "react";
import {
  nav,
  hero,
  developersCta,
  issuer,
  ecosystem,
  closing,
  footer,
  EXTERNAL_LINKS,
  CREDENTIAL_BADGE_SRC,
} from "~/ui/explore/content";
import { color, font } from "./tokens";
import {
  Page,
  Section,
  Display,
  Button,
  ButtonRow,
  Footer,
  CardRow,
  ArtifactPlate,
} from "./kit";

const pageFooter = (
  <Footer
    tagline={footer.tagline}
    meta={footer.meta}
    copyright={footer.copyright}
    columns={footer.columns}
  />
);

const muted = { color: color.inkMuted };

export default function AndamioLanding() {
  return (
    <Page nav={{ items: nav.items, cta: nav.cta, secondaryCta: nav.secondaryCta }} footer={pageFooter}>
      {/* ── 1 · Hero — the artifact + the manifesto + ONE door (v5, 2026-07-02).
             The badge is the subject, the manifesto breaks the fourth wall,
             and a single "Show me" CTA navigates to /show-me — the locked
             full-screen flow where the visitor picks their door. The scroll
             story below remains the no-click path. */}
      <Section id="top" bordered={false} screen>
        {/* Two-column hero (rail removed, full container width): text column
            left, the artifact plate right, tops flush — the badge's plate
            starts at the H1's first line. */}
        <div className="grid grid-cols-12 items-start gap-y-12 pb-10 pt-8 sm:pt-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-6">
            <Display as="h1" size="xl">
              {hero.headlineLead}{" "}
              <span style={{ color: color.orange }}>{hero.headlineAccent}</span>
            </Display>

            <div className="mt-8 max-w-[58ch] space-y-4">
              {hero.manifesto.map((p) => (
                <p key={p} className="text-lg leading-relaxed sm:text-xl" style={muted}>
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <Button variant="primary" href={hero.showMeCta.href}>
                {hero.showMeCta.label} <span aria-hidden>→</span>
              </Button>
            </div>
          </div>

          {/* The subject itself — a real credential badge as a museum figure.
              Height budget keeps the plate inside the fold on short screens. */}
          <div className="col-span-12 lg:col-span-6">
            <ArtifactPlate
              src={CREDENTIAL_BADGE_SRC}
              alt={hero.badgeAlt}
              caption={hero.badgeCaption}
              figLabel="fig. 1"
              imgStyle={{ maxHeight: "min(calc(100svh - 26rem), 44rem)" }}
            />
          </div>
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

        {/* The four-pronged array, compressed to a single hairline row — the
            deep card treatment now lives on /issuer. */}
        <CardRow
          items={issuer.decisions.map((d) => ({ heading: d.heading, body: d.text }))}
          size="sm"
          cols={4}
        />

        <div className="border-t py-10" style={{ borderColor: color.rule }}>
          <ButtonRow>
            <Button variant="ink" href="/issuer">
              {issuer.learnMoreCta} <span aria-hidden>→</span>
            </Button>
            <Button variant="outline" href={EXTERNAL_LINKS.walkthroughMailto}>
              {issuer.walkthroughCta}
            </Button>
          </ButtonRow>
        </div>
      </Section>

      {/* ── Persona two — Andamio Developers. A compact CTA mirroring the
             Issuer teaser's shape (title + lead left, body right, button row);
             replaces the retired "one foundation, two products" section. ── */}
      <Section id="developers" bordered={false} screen>
        <div className="grid grid-cols-12 gap-y-8 border-t pt-14 pb-10" style={{ borderColor: color.rule }}>
          <div className="col-span-12 lg:col-span-7">
            <Display as="h2" size="xl">
              {developersCta.title}
            </Display>
            <p className="mt-3 text-xl leading-snug tracking-[-0.01em] sm:text-2xl" style={{ color: color.inkMuted }}>
              {developersCta.lead}
            </p>
          </div>
          <p className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}>
            {developersCta.body}
          </p>
        </div>

        <div className="border-t py-10" style={{ borderColor: color.rule }}>
          <ButtonRow>
            {developersCta.ctas.map((c) => (
              <Button key={c.label} variant={c.variant} href={c.href}>
                {c.label} <span aria-hidden>→</span>
              </Button>
            ))}
          </ButtonRow>
        </div>
      </Section>

      {/* ── Ecosystem ───────────────────────────────────────────── */}
      <Section id="ecosystem" bordered={false} screen>
        <div className="py-24 sm:py-32">
          {/* Heading */}
          <Display as="h2" size="lg" className="max-w-4xl" style={{ lineHeight: 1.12 }}>
            {ecosystem.lead}
          </Display>

          {/* Four cards — Portable · Agent ready · Your data · Community — each with its CTA */}
          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: color.rule }}>
            {ecosystem.items.map((it) => (
              <div key={it.title} className="flex flex-col">
                <p className="text-[14px] font-semibold tracking-[-0.01em]">
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

      {/* ── Success — transformation + the walkthrough CTA. Two columns on
             wide screens (heading left, body + button right); the two heading
             sentences get breathing room between them (James, 2026-07-02). ── */}
      <Section id="closing" bordered={false} screen>
        <div className="grid grid-cols-12 gap-y-12 py-24 sm:py-32 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <Display as="h2" size="xl">
              <span className="block">{closing.headlineLine1}</span>
              <span className="mt-6 block sm:mt-8">{closing.headlineLine2}</span>
            </Display>
          </div>
          <div className="col-span-12 self-end lg:col-span-5">
            <div className="space-y-4">
              {closing.body.map((p) => (
                <p key={p} className="text-lg leading-relaxed" style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10">
              <Button variant="ink" href={EXTERNAL_LINKS.discord}>
                {closing.cta} <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
