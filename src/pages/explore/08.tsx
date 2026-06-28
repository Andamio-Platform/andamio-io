import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
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
  CREDENTIAL_BADGE_SRC,
  EXTERNAL_LINKS,
} from "~/ui/explore/content";

/**
 * Iteration 08 — "Whitepaper Document".
 *
 * Reads like an authoritative typeset specification. White paper, Fraunces
 * serif body set to a comfortable measure, JetBrains Mono for section marks
 * (§01, §02 …), figure plates ("Fig 1."), and metadata. Near-zero color —
 * warm ink black plus a single restrained academic-blue accent reserved for
 * links and marks. Numbered sections, a margin-note gutter, justified prose,
 * and the six design decisions set as numbered clauses. Authority through
 * typographic precision, not decoration.
 */

const PAPER = "#FFFFFF";
const INK = "#1A1813";
const ACCENT = "#2A3F7E"; // single restrained academic-blue, links + marks only

const serif = "'Fraunces', 'Instrument Serif', Georgia, serif";
const mono = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

/* ── Margin-noted section frame ──────────────────────────────── */
function Section({
  id,
  index,
  label,
  children,
  topRule = true,
}: {
  id?: string;
  index: string;
  label: string;
  children: ReactNode;
  topRule?: boolean;
}) {
  return (
    <section
      id={id}
      className={topRule ? "border-t border-black/15" : undefined}
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[10rem_minmax(0,42rem)]">
          <aside className="lg:pt-1 lg:text-right">
            <div
              className="text-sm font-medium tracking-tight"
              style={{ fontFamily: mono, color: ACCENT }}
            >
              §{index}
            </div>
            <div
              className="mt-2 text-[11px] uppercase leading-relaxed tracking-[0.18em] text-black/45"
              style={{ fontFamily: mono }}
            >
              {label}
            </div>
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

const proseLink =
  "underline decoration-[1.5px] underline-offset-[3px] transition-colors hover:decoration-2";

export default function Explore08() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: PAPER, color: INK }}
    >
      <Head>
        <title>08 · Whitepaper Document — Andamio</title>
      </Head>

      {/* ── Running head / nav ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-black/15 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-baseline gap-3">
            <span
              className="text-lg tracking-tight"
              style={{ fontFamily: serif }}
            >
              {nav.brand}
            </span>
            <span
              className="hidden text-[10px] uppercase tracking-[0.22em] text-black/40 sm:inline"
              style={{ fontFamily: mono }}
            >
              Technical Note
            </span>
          </div>
          <nav
            className="hidden items-center gap-5 lg:flex"
            style={{ fontFamily: mono }}
          >
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[12px] tracking-tight text-black/55 transition-colors hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="border border-black/80 px-3.5 py-1.5 text-[12px] tracking-tight transition-colors hover:bg-black hover:text-white"
            style={{ fontFamily: mono }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Title page / hero ──────────────────────────────────── */}
      <section className="border-b border-black/15">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-black/45"
            style={{ fontFamily: mono }}
          >
            <span style={{ color: ACCENT }}>Andamio Working Paper</span>
            <span aria-hidden>·</span>
            <span>No. 01</span>
            <span aria-hidden>·</span>
            <span>June 2026</span>
            <span aria-hidden>·</span>
            <span>v1</span>
          </div>

          <h1
            className="mt-8 max-w-3xl text-[clamp(2.5rem,6.5vw,5rem)] font-light leading-[1.02] tracking-[-0.02em]"
            style={{ fontFamily: serif }}
          >
            {hero.headlineLead}{" "}
            <em
              className="italic underline decoration-[2.5px] underline-offset-[6px]"
              style={{ color: ACCENT, textDecorationColor: ACCENT }}
            >
              {hero.headlineAccent}
            </em>
          </h1>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.2em] text-black/45"
                style={{ fontFamily: mono }}
              >
                {hero.ctaEyebrow}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={hero.primaryCta.href}
                  className="px-5 py-2.5 text-[14px] tracking-tight text-white transition-opacity hover:opacity-90"
                  style={{ fontFamily: mono, background: INK }}
                >
                  {hero.primaryCta.label} →
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="border border-black/40 px-5 py-2.5 text-[14px] tracking-tight transition-colors hover:border-black"
                  style={{ fontFamily: mono }}
                >
                  {hero.secondaryCta.label} →
                </a>
              </div>
            </div>

            {/* Figure 1 — credential plate */}
            <figure className="border border-black/20 p-5">
              <div className="border border-black/10 bg-[#FCFBF8] p-6">
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={420}
                  height={420}
                  className="mx-auto w-full max-w-[16rem]"
                />
              </div>
              <figcaption className="mt-4 flex gap-3">
                <span
                  className="shrink-0 text-[11px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: mono, color: ACCENT }}
                >
                  Fig 1.
                </span>
                <span
                  className="text-[13px] italic leading-relaxed text-black/60"
                  style={{ fontFamily: serif }}
                >
                  {hero.badgeCaption}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── §01 Problem ────────────────────────────────────────── */}
      <Section index="01" label={problem.kicker} topRule={false}>
        <h2
          className="text-3xl font-normal leading-[1.1] tracking-[-0.01em] sm:text-4xl"
          style={{ fontFamily: serif }}
        >
          {problem.heading}
        </h2>
        <p
          className="mt-6 max-w-prose text-[1.0625rem] leading-[1.8] text-black/75 [hyphens:auto] sm:[text-align:justify]"
          style={{ fontFamily: serif }}
        >
          {problem.intro}
        </p>
        <ol className="mt-12 space-y-10">
          {problem.items.map((p, i) => (
            <li key={p.headline} className="border-t border-black/15 pt-5">
              <div className="flex gap-5">
                <span
                  className="shrink-0 pt-1 text-[13px] tabular-nums"
                  style={{ fontFamily: mono, color: ACCENT }}
                >
                  1.{i + 1}
                </span>
                <div>
                  <h3
                    className="text-xl leading-snug tracking-[-0.005em]"
                    style={{ fontFamily: serif }}
                  >
                    {p.headline}
                  </h3>
                  <p
                    className="mt-3 max-w-prose text-[1.0625rem] leading-[1.8] text-black/70 [hyphens:auto] sm:[text-align:justify]"
                    style={{ fontFamily: serif }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── §02 Demo / specimen plate ──────────────────────────── */}
      <Section id="how-it-works" index="02" label={demo.kicker}>
        <div className="flex items-center gap-3">
          <h2
            className="text-3xl font-normal leading-[1.1] tracking-[-0.01em] sm:text-4xl"
            style={{ fontFamily: serif }}
          >
            {demo.title}
          </h2>
        </div>

        <figure className="mt-8 border border-black/20 p-6 sm:p-8">
          <div
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]"
            style={{ fontFamily: mono }}
          >
            <span className="text-black/45">Fig 2. — Specimen</span>
            <span
              className="inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px]"
              style={{ color: ACCENT, borderColor: ACCENT }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: ACCENT }}
              />
              {demo.liveLabel}
            </span>
          </div>

          <div className="mt-6 grid items-center gap-8 sm:grid-cols-[1fr_minmax(0,15rem)]">
            <p
              className="text-[1.0625rem] leading-[1.85] text-black/75 [hyphens:auto] sm:[text-align:justify]"
              style={{ fontFamily: serif }}
            >
              {demo.note}
            </p>
            <div className="border border-black/10 bg-[#FCFBF8] p-5">
              <img
                src={CREDENTIAL_BADGE_SRC}
                alt={hero.badgeAlt}
                width={360}
                height={360}
                className="mx-auto w-full max-w-[12rem]"
              />
            </div>
          </div>

          <figcaption className="mt-6 border-t border-black/10 pt-4">
            <a
              href="#issuer"
              className={`text-[14px] ${proseLink}`}
              style={{ fontFamily: serif, color: ACCENT }}
            >
              {demo.inspirationCta} →
            </a>
          </figcaption>
        </figure>
      </Section>

      {/* ── §03 Issuer ─────────────────────────────────────────── */}
      <Section id="issuer" index="03" label={issuer.productLabel}>
        <h2
          className="text-4xl font-light leading-[1.0] tracking-[-0.02em] sm:text-6xl"
          style={{ fontFamily: serif }}
        >
          {issuer.title}
        </h2>
        <p
          className="mt-6 max-w-prose text-[1.0625rem] leading-[1.85] text-black/75 [hyphens:auto] sm:[text-align:justify]"
          style={{ fontFamily: serif }}
        >
          {issuer.intro}
        </p>

        <p
          className="mt-12 border-t border-black/15 pt-6 text-xl leading-snug tracking-[-0.005em] sm:text-2xl"
          style={{ fontFamily: serif }}
        >
          {issuer.decisionsHeading}
        </p>

        <ol className="mt-8 divide-y divide-black/12 border-y border-black/12">
          {issuer.decisions.map((d, i) => (
            <li key={d.title} className="py-6">
              <div className="grid gap-x-6 gap-y-2 sm:grid-cols-[4rem_minmax(0,1fr)]">
                <span
                  className="text-[13px] tabular-nums text-black/45"
                  style={{ fontFamily: mono }}
                >
                  § 3.{i + 1}
                </span>
                <div>
                  <h3
                    className="text-xl leading-snug tracking-[-0.005em]"
                    style={{ fontFamily: serif }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="mt-2 max-w-prose text-[15px] leading-[1.75] text-black/70 [hyphens:auto] sm:[text-align:justify]"
                    style={{ fontFamily: serif }}
                  >
                    {d.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span
            className="cursor-not-allowed border border-dashed border-black/25 px-5 py-2.5 text-[14px] text-black/40"
            style={{ fontFamily: mono }}
            aria-disabled="true"
          >
            {issuer.reportCta}
          </span>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="px-5 py-2.5 text-[14px] tracking-tight text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: mono, background: INK }}
          >
            {issuer.walkthroughCta} →
          </a>
        </div>
      </Section>

      {/* ── §04 Ecosystem ──────────────────────────────────────── */}
      <Section index="04" label={ecosystem.kicker}>
        <p
          className="max-w-prose text-2xl font-light leading-[1.3] tracking-[-0.01em] sm:text-3xl"
          style={{ fontFamily: serif }}
        >
          {ecosystem.lead}
        </p>
        <dl className="mt-10 grid gap-x-10 gap-y-8 border-t border-black/15 pt-8 sm:grid-cols-2">
          {ecosystem.items.map((it, i) => (
            <div key={it.title}>
              <dt className="flex items-baseline gap-3">
                <span
                  className="text-[12px] tabular-nums text-black/40"
                  style={{ fontFamily: mono }}
                >
                  4.{i + 1}
                </span>
                <span
                  className="text-lg tracking-[-0.005em]"
                  style={{ fontFamily: serif }}
                >
                  {it.title}
                </span>
              </dt>
              <dd
                className="mt-2 text-[15px] leading-[1.75] text-black/70 [hyphens:auto] sm:[text-align:justify]"
                style={{ fontFamily: serif }}
              >
                {it.body}
              </dd>
            </div>
          ))}
        </dl>

        {/* footnote */}
        <div className="mt-12 border-t border-black/15 pt-4">
          <p
            className="flex gap-2 text-[12px] leading-relaxed text-black/45"
            style={{ fontFamily: mono }}
          >
            <span style={{ color: ACCENT }}>†</span>
            <span>{ecosystem.footnote}</span>
          </p>
        </div>
      </Section>

      {/* ── §05 API ────────────────────────────────────────────── */}
      <Section id="andamio-api" index="05" label={api.zoneLabel}>
        <h2
          className="text-4xl font-light leading-[1.0] tracking-[-0.02em] sm:text-6xl"
          style={{ fontFamily: serif }}
        >
          {api.zoneTitle}
        </h2>
        <p
          className="mt-6 max-w-prose text-[1.0625rem] leading-[1.85] text-black/75 [hyphens:auto] sm:[text-align:justify]"
          style={{ fontFamily: serif }}
        >
          {api.zoneBlurb}
        </p>

        <h3
          className="mt-12 border-t border-black/15 pt-6 text-2xl leading-snug tracking-[-0.01em] sm:text-3xl"
          style={{ fontFamily: serif }}
        >
          <span
            className="mr-3 align-middle text-[13px] tracking-normal text-black/40"
            style={{ fontFamily: mono }}
          >
            §5.1
          </span>
          {api.heading}
        </h3>
        <p
          className="mt-5 max-w-prose text-[1.0625rem] leading-[1.8] text-black/75 [hyphens:auto] sm:[text-align:justify]"
          style={{ fontFamily: serif }}
        >
          {api.body1}
        </p>
        <p
          className="mt-4 max-w-prose text-[15px] leading-[1.8] text-black/65 [hyphens:auto] sm:[text-align:justify]"
          style={{ fontFamily: serif }}
        >
          {api.body2}
        </p>
        <a
          href={EXTERNAL_LINKS.apiReference}
          className={`mt-6 inline-block text-[14px] ${proseLink}`}
          style={{ fontFamily: serif, color: ACCENT }}
        >
          {api.apiRefCta} →
        </a>

        {/* Stack — specification table */}
        <div className="mt-12">
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-black/45"
            style={{ fontFamily: mono }}
          >
            Table 1. — Protocol stack
          </p>
          <ol className="mt-4 border-t border-black/20">
            {api.stack.map((layer, i) => {
              const emph = layer.emphasis;
              return (
                <li
                  key={layer.name}
                  className="border-b border-black/15"
                  style={
                    emph
                      ? {
                          background: "rgba(42,63,126,0.05)",
                          borderLeft: `3px solid ${ACCENT}`,
                        }
                      : { borderLeft: "3px solid transparent" }
                  }
                >
                  <div className="grid gap-x-5 gap-y-1 px-4 py-5 sm:grid-cols-[5rem_minmax(0,1fr)]">
                    <div
                      className="text-[12px] uppercase tracking-[0.12em]"
                      style={{
                        fontFamily: mono,
                        color: emph ? ACCENT : "rgba(0,0,0,0.4)",
                      }}
                    >
                      <div>L{i + 1}</div>
                      <div className="mt-1">{layer.labelKicker}</div>
                    </div>
                    <div>
                      <p
                        className="text-lg tracking-[-0.005em]"
                        style={{
                          fontFamily: serif,
                          color: emph ? ACCENT : INK,
                          fontWeight: emph ? 600 : 400,
                        }}
                      >
                        {layer.name}
                      </p>
                      <p
                        className="mt-1.5 text-[14px] leading-[1.7] text-black/65"
                        style={{ fontFamily: serif }}
                      >
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* ── §06 Closing ────────────────────────────────────────── */}
      <Section index="06" label={closing.eyebrow}>
        <div className="border border-black/25 p-8 sm:p-12">
          <h2
            className="text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl"
            style={{ fontFamily: serif }}
          >
            {closing.headlineLine1}
            <br />
            <span style={{ color: ACCENT }}>{closing.headlineLine2}</span>
          </h2>
          <p
            className="mt-6 max-w-prose text-[1.0625rem] leading-[1.85] text-black/70 [hyphens:auto] sm:[text-align:justify]"
            style={{ fontFamily: serif }}
          >
            {closing.body}
          </p>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="mt-8 inline-block px-6 py-3 text-[14px] tracking-tight text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: mono, background: INK }}
          >
            {closing.cta} →
          </a>
        </div>
      </Section>

      {/* ── Footer / colophon ──────────────────────────────────── */}
      <footer className="border-t-2 border-black/80">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div className="max-w-xs">
              <span className="text-xl" style={{ fontFamily: serif }}>
                {nav.brand}
              </span>
              <p
                className="mt-3 text-[14px] leading-[1.7] text-black/60"
                style={{ fontFamily: serif }}
              >
                {footer.tagline}
              </p>
              <p
                className="mt-5 text-[11px] uppercase tracking-[0.14em] text-black/45"
                style={{ fontFamily: mono, color: ACCENT }}
              >
                {footer.meta}
              </p>
              <p
                className="mt-3 text-[11px] tracking-tight text-black/40"
                style={{ fontFamily: mono }}
              >
                {footer.copyright}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {Object.entries(footer.columns).map(([key, links]) => (
                <div key={key}>
                  <h3
                    className="mb-4 text-[11px] uppercase tracking-[0.16em] text-black/50"
                    style={{ fontFamily: mono }}
                  >
                    {key}
                  </h3>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-[13px] text-black/65 transition-colors hover:text-black hover:underline hover:underline-offset-2"
                          style={{ fontFamily: serif }}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-black/15">
          <div className="mx-auto max-w-5xl px-6 py-5">
            <Link
              href="/explore"
              className="text-[12px] text-black/45 transition-colors hover:text-black"
              style={{ fontFamily: mono }}
            >
              ← Back to all iterations
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
