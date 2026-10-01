"use client";

/**
 * Use cases — the page layout and the one detail template every case uses:
 * header with the partner's MiniBadge, challenge / approach, the OrbitSteps
 * cycle, an outcomes Readout (each row labeled result, target or fact), an
 * optional quote, and the closing CtaBand.
 */

import React from "react";
import Metatags from "~/components/site/metatags";
import Image from "next/image";
import Link from "next/link";
import { nav, footer as footerData } from "~/ui/explore/content";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { color, font } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";
import {
  CtaBand,
  MiniBadge,
  OrbitSteps,
  Readout,
} from "~/ui/system/instrument";
import { type CaseStudy, type OutcomeKind } from "./cases";

export function UseCaseLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Metatags title={title} description={description} />

      <Page nav={{ items: nav.items }}>
        {children}
        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/use-cases"
          backLabel="← All use cases"
          caption="Use cases"
        />
      </Page>
    </>
  );
}

const KIND_LABEL: Record<OutcomeKind, string> = {
  result: "result",
  target: "target",
  fact: "public fact",
};

function Prose({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: readonly string[];
}) {
  return (
    <div>
      <p
        className="text-[11px] uppercase tracking-[0.18em]"
        style={{ color: color.inkFaint, fontFamily: font.mono }}
      >
        {title}
      </p>
      <div className="mt-4 space-y-4">
        {paragraphs.map((p) => (
          <p
            key={p}
            className="text-[16px] leading-relaxed"
            style={{ color: color.inkMuted }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export function CaseDetail({ study }: { study: CaseStudy }) {
  return (
    <UseCaseLayout title={study.title} description={study.summary}>
      <Section bordered={false}>
        <div className="grid gap-10 pb-14 pt-16 sm:pt-24 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Kicker>
              {study.sector} · {study.partner}
            </Kicker>
            <Display as="h1" size="lg" className="mt-5">
              {study.title}
            </Display>
            <p
              className="mt-5 max-w-3xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              {study.summary}
            </p>
            {study.adoption ? (
              <p
                className="mt-5 text-[13px]"
                style={{ fontFamily: font.mono, color: color.cyan }}
              >
                {study.adoption === "invisible"
                  ? "Invisible blockchain"
                  : "Visible blockchain"}
              </p>
            ) : null}
          </div>
          <MiniBadge
            brand={study.partner}
            course={study.badgeCourse}
            mark={study.logo}
            theme={study.theme}
            size={220}
            label={`Sample credential: ${study.partner} ${study.badgeCourse}`}
            className="mx-auto"
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 py-16 sm:py-20 md:grid-cols-2">
          <Prose title="The challenge" paragraphs={study.challenge} />
          <Prose title="How Andamio fits" paragraphs={study.approach} />
        </div>
      </Section>

      <Section>
        <div className="py-16 sm:py-20">
          <Display as="h2" size="sm">
            {study.cycleLabel}
          </Display>
          <OrbitSteps
            steps={study.cycle}
            label={study.cycleLabel}
            className="mt-8"
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Readout
              title="Outcomes"
              rows={study.outcomes.map((o) => ({
                k: o.k,
                v: o.v,
                note: KIND_LABEL[o.kind],
              }))}
            />
            {study.outcomesNote ? (
              <p className="mt-4 text-[13px]" style={{ color: color.inkFaint }}>
                {study.outcomesNote}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-6">
            {study.logo ? (
              <Image
                src={study.logo}
                alt={`${study.partner} logo`}
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-contain"
              />
            ) : null}
            {study.links?.length ? (
              <ul className="space-y-2">
                {study.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] underline-offset-4 hover:underline"
                      style={{ color: color.cyan }}
                    >
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Run a program like this."
        body="A 20-minute walkthrough of how credentials, escrow and review would work for your people."
        primary={{
          label: "Book a walkthrough",
          href: EXTERNAL_LINKS.walkthroughMailto,
        }}
        secondary={{ label: "All use cases", href: "/use-cases" }}
        quote={study.quote}
      />
    </UseCaseLayout>
  );
}

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/use-cases/${study.slug}`}
      className="group flex h-full flex-col border p-6 transition-colors hover:bg-white/[0.03] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_var(--sys-cyan)]"
      style={{ background: color.paper, borderColor: color.cell }}
    >
      <MiniBadge
        brand={study.partner}
        course={study.badgeCourse}
        mark={study.logo}
        theme={study.theme}
        size={140}
        label={`Sample credential: ${study.partner} ${study.badgeCourse}`}
        className="mx-auto"
      />
      <p
        className="mt-6 text-[11px] uppercase tracking-[0.18em]"
        style={{ color: color.inkFaint, fontFamily: font.mono }}
      >
        {study.sector}
      </p>
      <h2
        className="mt-2 text-xl font-semibold tracking-[-0.02em]"
        style={{ color: color.ink }}
      >
        {study.title}
      </h2>
      <p
        className="mt-3 flex-1 text-sm leading-relaxed"
        style={{ color: color.inkMuted }}
      >
        {study.summary}
      </p>
      <span className="mt-5 text-sm font-medium" style={{ color: color.cyan }}>
        Read the case →
      </span>
    </Link>
  );
}
