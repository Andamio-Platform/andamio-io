"use client";

/**
 * AndamioLanding — credential-first funnel homepage (Concept A).
 * Hero theater → proof rail → problem → issuer → developers → ecosystem →
 * closing. Copy lives in ~/ui/explore/content.
 */

import React, { useEffect } from "react";
import { track } from "~/lib/analytics";
import CredentialTheater from "./CredentialTheater";
import {
  nav,
  developersCta,
  issuer,
  ecosystem,
  closing,
  footer,
  EXTERNAL_LINKS,
  ordinaryFail,
  howTeaser,
  proofRail,
  audit,
  problemCompare,
  adoptionModes,
  partnerQuote,
} from "~/ui/explore/content";
import { color, font } from "./tokens";
import { Page, Section, Button, ButtonRow, Footer } from "./kit";
import {
  ArcHeading,
  CtaBand,
  LogoRail,
  MiniBadge,
  ProofCard,
  Readout,
} from "./instrument";
import { AdoptionModes } from "./AdoptionModes";

const pageFooter = (
  <Footer
    tagline={footer.tagline}
    meta={footer.meta}
    copyright={footer.copyright}
    columns={footer.columns}
  />
);

const muted = { color: color.inkMuted };
const SECTION_COUNT = 4;

/** Pause the hero badge when the tab is hidden. */
function useVisibilityPause() {
  useEffect(() => {
    const sync = () => {
      document.documentElement.classList.toggle(
        "is-page-hidden",
        document.visibilityState === "hidden",
      );
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
}

/** A flat drawing of the PDF certificate everyone already has. */
function PdfCertificate() {
  return (
    <div
      aria-hidden
      className="relative mx-auto flex aspect-[1.414/1] w-full max-w-[300px] flex-col items-center justify-center border-[6px] border-double p-5 text-center"
      style={{ background: "rgb(var(--sys-ink-rgb) / 0.9)", borderColor: "rgb(11 18 27 / 0.35)", color: color.onInk }}
    >
      <p className="text-[9px] uppercase tracking-[0.3em] opacity-60">Certificate</p>
      <p className="mt-1 text-[15px] font-semibold tracking-[-0.01em]">of Completion</p>
      <div className="mt-3 h-px w-3/4 opacity-30" style={{ background: color.onInk }} />
      <p className="mt-3 text-[10px] opacity-60">This certifies that</p>
      <p className="text-[12px] font-semibold">Jordan Smith</p>
      <div className="mt-4 flex w-full items-end justify-between px-2 text-[8px] opacity-50">
        <span className="border-t px-2 pt-1" style={{ borderColor: color.onInk }}>signature</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: color.onInk }}>seal</span>
      </div>
    </div>
  );
}

export default function AndamioLanding() {
  useVisibilityPause();

  return (
    <Page
      nav={{ items: nav.items, cta: nav.cta, secondaryCta: nav.secondaryCta }}
      footer={pageFooter}
    >
      {/* Hero — the credential itself */}
      <Section id="top" bordered={false} screen>
        <CredentialTheater />
      </Section>

      {/* Proof rail — partners in production + the audit */}
      <Section id="proof" bordered={false}>
        <div className="grid gap-6 border-t py-12 lg:grid-cols-[1fr_320px]" style={{ borderColor: color.rule }}>
          <div>
            <p className="mb-4 text-[12px]" style={{ fontFamily: font.mono, color: color.inkFaint }}>
              In production with
            </p>
            <LogoRail logos={proofRail} />
          </div>
          <ProofCard
            kicker={audit.kicker}
            title={audit.title}
            footer={audit.footer}
            href={audit.href}
          >
            {audit.body}
          </ProofCard>
        </div>
      </Section>

      {/* 01 · Problem — a PDF next to a credential, field by field */}
      <Section id="problem" bordered={false}>
        <div className="border-t py-16 sm:py-24" style={{ borderColor: color.rule }}>
          <ArcHeading index={1} total={SECTION_COUNT} kicker="The problem" title={ordinaryFail.title} />
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed" style={muted}>
            {ordinaryFail.lead}
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              { side: problemCompare.pdf, art: <PdfCertificate /> },
              {
                side: problemCompare.badge,
                art: <MiniBadge size={200} className="mx-auto" label="The Andamio credential shown in the hero" />,
              },
            ].map(({ side, art }) => (
              <ProofCard key={side.label} bodyClassName="p-0">
                <p
                  className="px-6 pt-5 text-[11px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: font.mono, color: color.inkFaint }}
                >
                  {side.label}
                </p>
                <div className="flex min-h-[250px] items-center justify-center px-6 py-8">{art}</div>
                <Readout rows={side.rows} className="border-x-0 border-b-0" />
              </ProofCard>
            ))}
          </div>
        </div>
      </Section>

      {/* 02 · Issuer — properties, adoption modes, the path to /issuer */}
      <Section id="issuer" bordered={false}>
        <div
          id="issuer-detail"
          className="grid scroll-mt-24 gap-8 border-t pb-12 pt-16 lg:grid-cols-12"
          style={{ borderColor: color.rule }}
        >
          <div className="lg:col-span-7">
            <ArcHeading index={2} total={SECTION_COUNT} kicker={issuer.lead} title={issuer.title} />
          </div>
          <p className="self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={muted}>
            {issuer.intro}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {issuer.decisions.map((d, i) => (
            <ProofCard
              key={d.heading}
              kicker={`Property ${String(i + 1).padStart(2, "0")}`}
              title={d.heading}
            >
              {d.text}
            </ProofCard>
          ))}
        </div>

        <div className="mt-16">
          <AdoptionModes data={adoptionModes} />
        </div>

        <div className="mt-12 border-t py-10" style={{ borderColor: color.rule }}>
          <p className="mb-6 max-w-[60ch] text-[15px] leading-relaxed" style={muted}>
            {howTeaser.body}
          </p>
          <ButtonRow>
            <Button variant="primary" href={howTeaser.cta.href} onClick={() => track("look-inside")}>
              {howTeaser.cta.label} <span aria-hidden>→</span>
            </Button>
            <Button variant="outline" href={EXTERNAL_LINKS.walkthroughMailto}>
              {issuer.walkthroughCta}
            </Button>
          </ButtonRow>
        </div>
      </Section>

      {/* 03 · Developers — secondary depth */}
      <Section id="developers" bordered={false}>
        <div className="grid gap-8 border-t pb-12 pt-16 lg:grid-cols-12" style={{ borderColor: color.rule }}>
          <div className="lg:col-span-7">
            <ArcHeading index={3} total={SECTION_COUNT} kicker={developersCta.lead} title={developersCta.title} />
          </div>
          <p className="self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={muted}>
            {developersCta.body}
          </p>
        </div>
        <div className="grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <ProofCard kicker="API" title="Build on Andamio" footer="REST · X-API-Key" href="/developers">
            Courses, projects and credentials as endpoints. Transactions come back ready to sign.
          </ProofCard>
          <ProofCard kicker="Docs" title="Guides and protocol" footer="docs.andamio.io" href={EXTERNAL_LINKS.docs}>
            How the protocol works, from Access Tokens to claims.
          </ProofCard>
          <ProofCard kicker="CLI" title="Andamio CLI" footer="open source · GitHub" href="/cli">
            Drive the protocol from your terminal and scripts.
          </ProofCard>
          <ProofCard kicker="Bot" title="Discord bot" footer="open source · GitHub" href="/bot">
            Give Discord roles to people who hold a credential.
          </ProofCard>
        </div>
      </Section>

      {/* 04 · Ecosystem */}
      <Section id="ecosystem" bordered={false}>
        <div className="border-t py-16 sm:py-24" style={{ borderColor: color.rule }}>
          <ArcHeading index={4} total={SECTION_COUNT} kicker="Ecosystem" title={ecosystem.lead} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.items.map((it) => (
              <ProofCard
                key={it.title}
                title={it.title}
                href={"cta" in it ? it.cta.href : undefined}
                footer={
                  "cta" in it ? (
                    <span style={{ color: color.cyan }}>{it.cta.label} →</span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color.inkFaint }} />
                      {it.status}
                    </span>
                  )
                }
              >
                {it.body}
              </ProofCard>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        id="closing"
        title={
          <>
            {closing.headlineLine1} <span style={{ color: color.inkMuted }}>{closing.headlineLine2}</span>
          </>
        }
        body={closing.body[0]}
        primary={{ label: issuer.walkthroughCta, href: EXTERNAL_LINKS.walkthroughMailto }}
        secondary={{ label: closing.cta, href: EXTERNAL_LINKS.discord }}
        quote={partnerQuote}
      />
    </Page>
  );
}
