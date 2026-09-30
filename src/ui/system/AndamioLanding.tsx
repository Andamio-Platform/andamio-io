"use client";

/**
 * AndamioLanding — credential-first funnel homepage.
 * Interactive Proof Rings theater + no-click scroll path that teaches
 * differentiation without hard-sell. Canonical kit + content only.
 */

import React, { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
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
  hero,
  CREDENTIAL_BADGE_SRC,
} from "~/ui/explore/content";
import { color } from "./tokens";
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
import { Stagger, StaggerItem } from "./motion";

const CredentialTheater = dynamic(() => import("./CredentialTheater"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-12 items-start gap-y-10 pb-10 pt-6 sm:pt-10 lg:gap-x-12">
      <div className="col-span-12 lg:col-span-5 lg:pt-4">
        <Display as="h1" size="xl">
          {hero.headlineLead}{" "}
          <span style={{ color: color.orange }}>{hero.headlineAccent}</span>
        </Display>
        <p
          className="mt-6 max-w-[42ch] text-lg leading-relaxed sm:text-xl"
          style={{ color: color.inkMuted }}
        >
          {hero.supportLine}
        </p>
        <div className="mt-10">
          <Button variant="primary" href={hero.showMeCta.href}>
            {hero.showMeCta.label} <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7">
        <ArtifactPlate
          src={CREDENTIAL_BADGE_SRC}
          alt={hero.badgeAlt}
          caption={hero.badgeCaption}
          figLabel="fig. 1"
          imgStyle={{ maxHeight: "min(calc(100svh - 26rem), 28rem)" }}
        />
      </div>
    </div>
  ),
});

const pageFooter = (
  <Footer
    tagline={footer.tagline}
    meta={footer.meta}
    copyright={footer.copyright}
    columns={footer.columns}
  />
);

const muted = { color: color.inkMuted };

/** Pause ambient / badge wheels when the tab is hidden. */
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

export default function AndamioLanding() {
  useVisibilityPause();

  return (
    <Page
      nav={{ items: nav.items, cta: nav.cta, secondaryCta: nav.secondaryCta }}
      footer={pageFooter}
    >
      {/* 1 · Product presence — interactive credential (deferred client chunk) */}
      <Section id="top" bordered={false} screen>
        <Suspense fallback={null}>
          <CredentialTheater />
        </Suspense>
      </Section>

      {/* 2 · Why ordinary badges fail — felt, not attack ads */}
      <Section id="problem" bordered={false}>
        <div
          className="border-t py-16 sm:py-24"
          style={{ borderColor: color.rule }}
        >
          <Display as="h2" size="lg" className="max-w-3xl">
            {ordinaryFail.title}
          </Display>
          <p
            className="mt-4 max-w-[52ch] text-lg leading-relaxed"
            style={muted}
          >
            {ordinaryFail.lead}
          </p>
          <Stagger
            className="mt-12 grid grid-cols-1 gap-10 border-t pt-10 sm:grid-cols-3"
            style={{ borderColor: color.rule }}
          >
            {ordinaryFail.items.map((it) => (
              <StaggerItem key={it.heading}>
                <p className="text-[14px] font-semibold tracking-[-0.01em]">
                  {it.heading}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed" style={muted}>
                  {it.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 3 · Four properties — tied to the credential */}
      <Section id="issuer" bordered={false}>
        <div
          id="issuer-detail"
          className="grid scroll-mt-24 grid-cols-12 gap-y-8 border-t pb-12 pt-14"
          style={{ borderColor: color.rule }}
        >
          <div className="col-span-12 lg:col-span-7">
            <Display as="h2" size="xl">
              {issuer.title}
            </Display>
            <p
              className="mt-3 text-xl leading-snug tracking-[-0.01em] sm:text-2xl"
              style={{ color: color.inkMuted }}
            >
              {issuer.lead}
            </p>
          </div>
          <p
            className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8"
            style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}
          >
            {issuer.intro}
          </p>
        </div>

        <CardRow
          items={issuer.decisions.map((d) => ({
            heading: d.heading,
            body: d.text,
          }))}
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

      {/* 4 · How path teaser */}
      <Section id="how" bordered={false}>
        <div
          className="grid grid-cols-12 gap-y-8 border-t py-16 sm:py-20"
          style={{ borderColor: color.rule }}
        >
          <div className="col-span-12 lg:col-span-7">
            <Display as="h2" size="lg">
              {howTeaser.title}
            </Display>
            <p
              className="mt-4 max-w-[52ch] text-lg leading-relaxed"
              style={muted}
            >
              {howTeaser.body}
            </p>
          </div>
          <div className="col-span-12 self-end lg:col-span-5 lg:pl-8">
            <Button variant="primary" href={howTeaser.cta.href}>
              {howTeaser.cta.label} <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </Section>

      {/* 5 · Developers — secondary depth */}
      <Section id="developers" bordered={false}>
        <div
          className="grid grid-cols-12 gap-y-8 border-t pb-10 pt-14"
          style={{ borderColor: color.rule }}
        >
          <div className="col-span-12 lg:col-span-7">
            <Display as="h2" size="xl">
              {developersCta.title}
            </Display>
            <p
              className="mt-3 text-xl leading-snug tracking-[-0.01em] sm:text-2xl"
              style={{ color: color.inkMuted }}
            >
              {developersCta.lead}
            </p>
          </div>
          <p
            className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8"
            style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}
          >
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

      {/* 6 · Ecosystem honesty */}
      <Section id="ecosystem" bordered={false}>
        <div className="py-20 sm:py-28">
          <Display
            as="h2"
            size="lg"
            className="max-w-4xl"
            style={{ lineHeight: 1.12 }}
          >
            {ecosystem.lead}
          </Display>

          <Stagger
            className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4"
            style={{ borderColor: color.rule }}
          >
            {ecosystem.items.map((it) => (
              <StaggerItem key={it.title} className="flex flex-col">
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
                    {it.cta.variant !== "disabled" && (
                      <span aria-hidden> →</span>
                    )}
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 7 · Close — walkthrough primary */}
      <Section id="closing" bordered={false}>
        <div className="grid grid-cols-12 gap-y-12 py-20 sm:py-28 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <Display as="h2" size="xl">
              <span className="block">{closing.headlineLine1}</span>
              <span className="mt-6 block sm:mt-8">
                {closing.headlineLine2}
              </span>
            </Display>
          </div>
          <div className="col-span-12 self-end lg:col-span-5">
            <div className="space-y-4">
              {closing.body.map((p) => (
                <p
                  key={p}
                  className="text-lg leading-relaxed"
                  style={{ color: "rgb(var(--sys-ink-rgb) / 0.65)" }}
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10">
              <ButtonRow>
                <Button
                  variant="primary"
                  href={EXTERNAL_LINKS.walkthroughMailto}
                >
                  {issuer.walkthroughCta} <span aria-hidden>→</span>
                </Button>
                <Button variant="outline" href={EXTERNAL_LINKS.discord}>
                  {closing.cta} <span aria-hidden>→</span>
                </Button>
              </ButtonRow>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
