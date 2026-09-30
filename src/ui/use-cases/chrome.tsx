"use client";

/**
 * Use-Cases — local chrome for the "Warm Index" system.
 * =================================================================
 * Wraps the shared system kit (Page · Section · Kicker · Display ·
 * Footer) into the repeating shapes used across the /use-cases route:
 * a page layout, the three-up "cycle" grid, a stat grid, and the
 * click-to-zoom flywheel figure. Reads only ./system/tokens — no
 * global theme classes.
 */

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";

/* ── Page layout ─────────────────────────────────────────────────────── */
export function UseCaseLayout({
  kicker = "Use Case",
  title,
  description,
  caption = "Use Cases",
  children,
}: {
  kicker?: string;
  title: string;
  description?: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{`${title} — Andamio`}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <Page nav={{ items: nav.items, cta: nav.cta }}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>{kicker}</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              {title}
            </Display>
            {description && (
              <p
                className="mt-5 max-w-3xl text-lg leading-relaxed"
                style={{ color: color.inkMuted }}
              >
                {description}
              </p>
            )}
          </div>
        </Section>

        {children}

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption={caption}
        />
      </Page>
    </>
  );
}

/* ── Cycle grid (three-up flywheel stages) ──────────────────────────── */
export interface CycleStep {
  label: string;
  content: string;
}
export interface Cycle {
  title: string;
  icon: React.ElementType;
  description: string;
  steps: CycleStep[];
}

export function CycleGrid({ cycles }: { cycles: Cycle[] }) {
  return (
    <Section>
      <div className="py-16 sm:py-20">
        <div className="grid gap-px md:grid-cols-3" style={{ background: color.cell }}>
          {cycles.map((cycle, index) => {
            const Icon = cycle.icon;
            return (
              <div key={index} className="p-6 sm:p-8" style={{ background: color.paper }}>
                <h2
                  className="mb-4 flex items-center gap-2.5 text-2xl font-semibold tracking-[-0.02em]"
                  style={{ color: color.ink, fontFamily: font.sans }}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" /> {cycle.title}
                </h2>
                <p className="mb-5 text-sm leading-relaxed" style={{ color: color.inkMuted }}>
                  {cycle.description}
                </p>
                <ul className="space-y-3">
                  {cycle.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="flex items-start gap-2.5">
                      <CheckBadgeIcon
                        className="h-5 w-5 flex-shrink-0"
                        style={{ color: color.cyan }}
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-relaxed" style={{ color: color.inkMuted }}>
                        <span className="font-semibold" style={{ color: color.ink }}>
                          {step.label}
                        </span>{" "}
                        {step.content}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ── Stat grid (metrics / results) ──────────────────────────────────── */
export interface Stat {
  value: string;
  label: string;
}

export function StatGrid({
  heading,
  stats,
  gridCls = "sm:grid-cols-3",
}: {
  heading: string;
  stats: Stat[];
  gridCls?: string;
}) {
  return (
    <Section>
      <div className="py-16 sm:py-20">
        <Display as="h3" size="sm" className="text-center">
          {heading}
        </Display>
        <div
          className={`mx-auto mt-10 grid max-w-3xl gap-px ${gridCls}`}
          style={{ background: color.cell }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 text-center" style={{ background: color.paper }}>
              <p
                className="text-3xl font-semibold tabular-nums tracking-[-0.03em]"
                style={{ color: color.ink, fontFamily: font.sans }}
              >
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm" style={{ color: color.inkMuted }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Flywheel figure (click to zoom) ────────────────────────────────── */
export function Flywheel({
  src,
  alt,
  heading,
  description,
  zoomAlt,
}: {
  src: string;
  alt: string;
  heading: string;
  description: string;
  zoomAlt?: string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <Section>
      <div className="py-16 text-center sm:py-24">
        <Display as="h3" size="sm" className="mx-auto">
          {heading}
        </Display>
        <p
          className="mx-auto mb-12 mt-4 max-w-2xl text-base leading-relaxed"
          style={{ color: color.inkMuted }}
        >
          {description}
        </p>
        <div className="flex w-full items-center justify-center">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={800}
            className="w-3/4 max-w-xs cursor-pointer transition-opacity hover:opacity-90 sm:max-w-md md:max-w-lg lg:max-w-xl"
            onClick={() => setIsFullscreen(true)}
          />
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
          onClick={() => setIsFullscreen(false)}
        >
          <Image
            src={src}
            alt={zoomAlt ?? alt}
            width={1000}
            height={1000}
            className="max-h-full max-w-full bg-white"
          />
        </div>
      )}
    </Section>
  );
}
