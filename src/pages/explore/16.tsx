"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
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
 * Iteration 16 — "Coral Index". Round-3 convergence on 11 + 12 + 15.
 *
 * Donor 11 DOMINATES: the faint fixed 12-column grid field, the full-bleed type
 * hero with the badge WITHHELD, and the generous horizontal-rule vertical rhythm
 * are the star — the cleanest, most timeless of the five. The headline TYPE is
 * lifted from 12 (Inter semibold 600, tracking ~-0.045em, leading ~0.92), never
 * 11's heavier black slab. The wayfinding RAIL takes 15's right-side floating
 * placement but 12's bookmark FUNCTION: a fixed mini section index pinned right,
 * mono labels in cool-blue, the current area subtly emphasized, hidden below xl.
 *
 * 3-color theme (ink/paper neutrals aside):
 *  · CORAL  #FF6B4A — primary: the "upgrade" word, section numerals, emphasis.
 *  · BLUE   #2F6BFF — secondary: the right rail, links, the emphasized API layer.
 *  · ORANGE #FF6B35 — the sparing spark, used on ONLY the LIVE pulse dot and the
 *    "VERIFIED" stamp on the reveal. Nowhere else.
 *
 * Signature spine: badge withheld from hero; in id="how-it-works" the credential
 * slides in sideways from the right into a museum-specimen frame as you scroll.
 */

const PAPER = "#FFFFFF";
const INK = "#0A0A0A";
const CORAL = "#FF6B4A"; // primary accent
const BLUE = "#2F6BFF"; // secondary — rail, links, emphasized API layer
const ORANGE = "#FF6B35"; // sparing spark — live dot + VERIFIED stamp ONLY

const sans = "'Inter', system-ui, -apple-system, sans-serif";
const mono =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const NUMS = ["01", "02", "03", "04", "05", "06"];

/** The page's sections — the right rail's mini outline / table of contents. */
const SECTIONS = [
  { id: "top", num: "00", label: "Index" },
  { id: "how-it-works", num: "01", label: "How it works" },
  { id: "problem", num: "02", label: "Problem" },
  { id: "issuer", num: "03", label: "Issuer" },
  { id: "ecosystem", num: "04", label: "Ecosystem" },
  { id: "andamio-api", num: "05", label: "API" },
] as const;

export default function Explore16() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  // Slides in from the RIGHT; deterministic at progress=0 for SSR/client match.
  const badgeX = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const frameWidth = useTransform(scrollYProgress, [0, 1], ["44%", "100%"]);
  const stampOpacity = useTransform(scrollYProgress, [0.55, 0.92], [0, 1]);

  // Active-section wayfinding for the rail. Deterministic initial value (the
  // first section) keeps SSR/client markup identical; the observer refines it.
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: sans }}
    >
      <Head>
        <title>16 · Coral Index — Andamio</title>
        <meta
          name="description"
          content="Andamio — verifiable credentials, indexed on a clean Swiss grid."
        />
      </Head>

      {/* ── Donor 11: fixed faint 12-column rule field ────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden justify-center md:flex"
      >
        <div className="grid h-full w-full max-w-[1320px] grid-cols-12 border-r border-black/[0.05] px-6 sm:px-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-black/[0.05]" />
          ))}
        </div>
      </div>

      {/* ── Donor 15 placement + Donor 12 function: floating right ─
            section-index rail. Clickable wayfinding; hidden below xl. ─ */}
      <aside
        className="fixed right-0 top-0 z-30 hidden h-screen w-[210px] flex-col justify-between py-24 pr-5 xl:flex"
        style={{
          borderLeft: `1px solid ${INK}1f`,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(2px)",
        }}
      >
        <nav className="pl-5" aria-label="Section index">
          <div
            className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
            style={{ fontFamily: mono, color: "rgba(10,10,10,0.4)" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: BLUE }}
            />
            contents
          </div>
          <ol className="space-y-3.5">
            {SECTIONS.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex items-baseline gap-3 transition-colors"
                    style={{ fontFamily: mono }}
                  >
                    <span
                      className="text-[10px] tabular-nums transition-colors"
                      style={{ color: on ? CORAL : "rgba(10,10,10,0.32)" }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="text-[11px] tracking-[0.04em] transition-colors"
                      style={{
                        color: on ? BLUE : "rgba(10,10,10,0.5)",
                        fontWeight: on ? 600 : 400,
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      aria-hidden
                      className="h-px flex-1 self-center transition-colors"
                      style={{ background: on ? BLUE : "transparent" }}
                    />
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* one live readout — wayfinding stays the core job */}
        <div
          className="pl-5 text-[9px] uppercase tracking-[0.18em]"
          style={{ fontFamily: mono, color: "rgba(10,10,10,0.34)" }}
        >
          <div className="flex items-center justify-between">
            <span>network</span>
            <span style={{ color: BLUE }}>mainnet</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span>registry</span>
            <span style={{ color: BLUE }}>on-chain</span>
          </div>
          <div className="mt-4" style={{ color: "rgba(10,10,10,0.3)" }}>
            andamio · index v16
          </div>
        </div>
      </aside>

      <div className="relative z-10 xl:pr-[210px]">
        {/* ── Nav ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-[#0A0A0A] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3 sm:px-10">
            <a
              href="#top"
              className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.04em]"
            >
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 translate-y-[1px] rounded-[1px]"
                style={{ background: CORAL }}
              />
              {nav.brand}
              <span
                className="ml-1 hidden text-[10px] uppercase tracking-[0.16em] sm:inline"
                style={{ fontFamily: mono, color: "rgba(10,10,10,0.4)" }}
              >
                index
              </span>
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[12px] tracking-[0.02em] transition-colors"
                  style={{ color: "rgba(10,10,10,0.6)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(10,10,10,0.6)")
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={nav.cta.href}
              className="border border-[#0A0A0A] px-4 py-2 text-[12px] font-medium tracking-[0.02em] text-white transition-colors"
              style={{ background: INK }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = CORAL;
                e.currentTarget.style.borderColor = CORAL;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = INK;
                e.currentTarget.style.borderColor = INK;
              }}
            >
              {nav.cta.label}
            </a>
          </div>
        </header>

        {/* ── Hero (full-bleed type, NO badge) — 11's spine, 12's cut ─ */}
        <section id="top" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="flex items-center gap-4 pt-7">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: CORAL, fontFamily: mono }}
              >
                Andamio / Credentialing
              </span>
              <span className="h-px flex-1 bg-[#0A0A0A]" />
              <span
                className="hidden text-[11px] uppercase tracking-[0.16em] text-black/35 tabular-nums sm:inline"
                style={{ fontFamily: mono }}
              >
                No. 16 — Coral Index
              </span>
            </div>

            <div className="pb-16 pt-12 sm:pt-20 lg:pb-28">
              <h1 className="max-w-[15ch] text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                {hero.headlineLead}{" "}
                <span style={{ color: CORAL }}>{hero.headlineAccent}</span>
              </h1>

              {/* CTA cluster only */}
              <div className="mt-14 flex flex-wrap items-stretch border border-[#0A0A0A]">
                <span
                  className="flex items-center border-b border-[#0A0A0A] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50 sm:border-b-0 sm:border-r"
                  style={{ fontFamily: mono }}
                >
                  {hero.ctaEyebrow}
                </span>
                <a
                  href={hero.primaryCta.href}
                  className="flex flex-1 items-center justify-center border-b border-[#0A0A0A] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-white transition-colors sm:flex-none sm:border-b-0 sm:border-r"
                  style={{ background: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = CORAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="flex flex-1 items-center justify-center px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors sm:flex-none"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BLUE;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = INK;
                  }}
                >
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Badge reveal / specimen + demo (id="how-it-works") ─ */}
        <section
          ref={revealRef}
          id="how-it-works"
          className="border-b border-[#0A0A0A]"
        >
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="flex items-center gap-4 pt-16 sm:pt-24">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: CORAL, fontFamily: mono }}
              >
                {demo.kicker}
              </span>
              {/* ORANGE spark #1 — the LIVE pulse dot */}
              <span
                className="inline-flex items-center gap-2 border border-[#0A0A0A] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ fontFamily: mono }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: ORANGE }}
                />
                {demo.liveLabel}
              </span>
              <span className="h-px flex-1 bg-[#0A0A0A]" />
              <span
                className="hidden text-[11px] uppercase tracking-[0.16em] text-black/35 tabular-nums sm:inline"
                style={{ fontFamily: mono }}
              >
                Specimen 001
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-10 py-12 sm:py-16">
              {/* left: demo copy, snapped hard-left */}
              <div className="col-span-12 lg:col-span-5 lg:pr-12">
                <span
                  className="block text-[7rem] font-semibold leading-[0.8] tracking-[-0.05em] tabular-nums sm:text-[9rem]"
                  style={{ color: CORAL }}
                >
                  01
                </span>
                <h2 className="mt-6 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.0] tracking-[-0.035em]">
                  {demo.title}
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/60">
                  {demo.note}
                </p>

                {/* mono read-out block — derived hashes read out beside it */}
                <dl
                  className="mt-8 max-w-md border-t border-black/15 text-[12px]"
                  style={{ fontFamily: mono }}
                >
                  {[
                    ["format", "SVG · machine-readable"],
                    ["registry", "On-chain · Cardano"],
                    ["status", "Verifiable"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-black/15 py-2.5"
                    >
                      <dt className="uppercase tracking-[0.12em] text-black/40">
                        {k}
                      </dt>
                      <dd style={{ color: INK }}>{v}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#issuer"
                  className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.01em] transition-colors"
                  style={{ color: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-[1px]"
                    style={{ background: CORAL }}
                  />
                  {demo.inspirationCta}
                </a>
              </div>

              {/* right: grid-anchored specimen — badge slides in from RIGHT */}
              <div className="col-span-12 lg:col-span-7">
                <motion.div
                  style={{ width: frameWidth }}
                  className="relative ml-auto border border-[#0A0A0A]"
                >
                  {/* top corner labels */}
                  <div className="flex items-center justify-between border-b border-[#0A0A0A]">
                    <span
                      className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: CORAL, fontFamily: mono }}
                    >
                      Specimen 001
                    </span>
                    <span
                      className="border-l border-[#0A0A0A] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: BLUE, fontFamily: mono }}
                    >
                      On-chain
                    </span>
                  </div>

                  {/* specimen body */}
                  <div className="relative overflow-hidden">
                    <motion.div
                      style={{ x: badgeX, opacity: badgeOpacity }}
                      className="flex items-center justify-center px-8 py-12 sm:px-12 sm:py-16"
                    >
                      <img
                        src={CREDENTIAL_BADGE_SRC}
                        alt={hero.badgeAlt}
                        width={520}
                        height={520}
                        className="w-full max-w-[360px]"
                      />
                    </motion.div>

                    {/* ORANGE spark #2 — the VERIFIED stamp on the reveal */}
                    <motion.span
                      aria-hidden
                      style={{ opacity: stampOpacity, color: ORANGE }}
                      className="pointer-events-none absolute bottom-5 right-5 -rotate-[8deg] border-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em]"
                    >
                      Verified
                    </motion.span>
                  </div>

                  {/* caption + bottom corner labels */}
                  <figcaption className="border-t border-[#0A0A0A]">
                    <p className="px-4 py-4 text-[13px] leading-relaxed text-black/60">
                      {hero.badgeCaption}
                    </p>
                    <div className="flex items-center justify-between border-t border-black/15">
                      <span
                        className="px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-black/40 tabular-nums"
                        style={{ fontFamily: mono }}
                      >
                        SVG · Cardano mainnet
                      </span>
                      <span
                        className="border-l border-black/15 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-black/40"
                        style={{ fontFamily: mono }}
                      >
                        Fig. 001
                      </span>
                    </div>
                  </figcaption>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────── */}
        <section id="problem" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {problem.kicker}
                </p>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
                  {problem.heading}
                </h2>
              </div>
              <p className="col-span-12 self-end text-xl leading-snug tracking-[-0.012em] text-black/70 lg:col-span-7 lg:col-start-6">
                {problem.intro}
              </p>
            </div>

            <div className="grid grid-cols-12 border-t border-[#0A0A0A]">
              {problem.items.map((p, i) => (
                <div
                  key={p.headline}
                  className="col-span-12 py-10 sm:col-span-4 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-black/15 sm:[&:not(:first-child)]:pl-8 lg:py-12 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-black/15 [&:not(:first-child)]:pt-10 sm:[&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:pt-12"
                >
                  <span
                    className="block text-6xl font-semibold leading-none tracking-[-0.045em] tabular-nums"
                    style={{ color: CORAL }}
                  >
                    {NUMS[i]}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.025em]">
                    {p.headline}
                  </h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-black/60">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Issuer ──────────────────────────────────────────── */}
        <section id="issuer" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {issuer.title}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-black/65 lg:col-span-5 lg:pl-8">
                {issuer.intro}
              </p>
            </div>

            <div className="border-t border-[#0A0A0A] pt-8">
              <span className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                {issuer.decisionsHeading}
              </span>
            </div>

            <div className="mt-10 grid grid-cols-12 border-t border-[#0A0A0A]">
              {issuer.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className="col-span-12 py-9 sm:col-span-6 sm:px-7 lg:col-span-4 [&:not(:nth-child(-n+1))]:border-t [&:not(:nth-child(-n+1))]:border-black/15 sm:[&:not(:nth-child(-n+2))]:border-t lg:[&:not(:nth-child(-n+3))]:border-t sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-black/15 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n)]:border-l lg:[&:nth-child(3n+2)]:border-black/15 lg:[&:nth-child(3n)]:border-black/15"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-4xl font-semibold leading-none tracking-[-0.045em] tabular-nums"
                      style={{ color: CORAL }}
                    >
                      {NUMS[i]}
                    </span>
                    <span className="h-px flex-1 translate-y-[-6px] bg-black/15" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.025em]">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-stretch border-t border-[#0A0A0A] py-10">
              <span
                aria-disabled="true"
                className="flex cursor-not-allowed items-center border border-black/25 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-black/35"
                style={{ fontFamily: mono }}
              >
                {issuer.reportCta}
                <span className="ml-3 text-[10px] tracking-[0.14em]">soon</span>
              </span>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="-ml-px flex items-center border border-[#0A0A0A] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-white transition-colors"
                style={{ background: INK }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = CORAL;
                  e.currentTarget.style.borderColor = CORAL;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = INK;
                  e.currentTarget.style.borderColor = INK;
                }}
              >
                {issuer.walkthroughCta}
              </a>
            </div>
          </div>
        </section>

        {/* ── Ecosystem ───────────────────────────────────────── */}
        <section id="ecosystem" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {ecosystem.kicker}
                </p>
                <p className="mt-6 text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
                  {ecosystem.lead}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-1 self-end border-t border-[#0A0A0A] sm:grid-cols-2 lg:col-span-7">
                {ecosystem.items.map((it, i) => (
                  <div
                    key={it.title}
                    className={`py-8 ${
                      i === 1
                        ? "border-t border-black/15 pt-8 sm:border-l sm:border-t-0 sm:pl-7"
                        : ""
                    }`}
                  >
                    <p className="text-[13px] font-semibold uppercase tracking-[0.08em]">
                      <span
                        className="mr-2 tabular-nums"
                        style={{ color: CORAL }}
                      >
                        {NUMS[i]}
                      </span>
                      {it.title}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                      {it.body}
                    </p>
                  </div>
                ))}
                <p
                  className="col-span-1 border-t border-black/15 py-4 text-[12px] text-black/40 tabular-nums sm:col-span-2"
                  style={{ fontFamily: mono }}
                >
                  {ecosystem.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── API / Architecture ──────────────────────────────── */}
        <section id="andamio-api" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {api.zoneLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {api.zoneTitle}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-black/65 lg:col-span-5 lg:pl-8">
                {api.zoneBlurb}
              </p>
            </div>

            <div className="grid grid-cols-12 border-t border-[#0A0A0A]">
              <div className="col-span-12 py-12 lg:col-span-5 lg:border-r lg:border-black/15 lg:pr-12">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40"
                  style={{ fontFamily: mono }}
                >
                  {api.kicker}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
                  {api.heading}
                </h3>
                <p className="mt-6 text-[15px] leading-relaxed text-black/65">
                  {api.body1}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-black/55">
                  {api.body2}
                </p>
                <a
                  href={EXTERNAL_LINKS.apiReference}
                  className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.01em] transition-colors"
                  style={{ color: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-[1px]"
                    style={{ background: CORAL }}
                  />
                  {api.apiRefCta}
                </a>
              </div>

              <div className="col-span-12 lg:col-span-7">
                {api.stack.map((layer, i) => (
                  <div
                    key={layer.name}
                    className={`grid grid-cols-12 items-baseline gap-4 py-7 lg:px-10 ${
                      i > 0 ? "border-t border-black/15" : ""
                    }`}
                    style={
                      layer.emphasis
                        ? { background: BLUE, color: "#fff" }
                        : undefined
                    }
                  >
                    <div className="col-span-12 sm:col-span-3">
                      <span
                        className={`text-[11px] uppercase tracking-[0.12em] ${
                          layer.emphasis ? "text-white/85" : "text-black/40"
                        }`}
                        style={{ fontFamily: mono }}
                      >
                        {layer.labelKicker}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-9">
                      <p className="text-lg font-semibold leading-tight tracking-[-0.025em]">
                        {layer.name}
                      </p>
                      <p
                        className={`mt-1.5 text-[14px] leading-relaxed ${
                          layer.emphasis ? "text-white/90" : "text-black/55"
                        }`}
                      >
                        {layer.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing ─────────────────────────────────────────── */}
        <section className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-8">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {closing.eyebrow}
                </p>
                <h2 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {closing.headlineLine1}
                  <br />
                  <span style={{ color: CORAL }}>{closing.headlineLine2}</span>
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-black/65">
                  {closing.body}
                </p>
                <a
                  href={EXTERNAL_LINKS.walkthroughMailto}
                  className="mt-10 inline-flex items-center border border-[#0A0A0A] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.08em] text-white transition-colors"
                  style={{ background: INK }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = CORAL;
                    e.currentTarget.style.borderColor = CORAL;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = INK;
                    e.currentTarget.style.borderColor = INK;
                  }}
                >
                  {closing.cta}
                </a>
              </div>
              <div className="col-span-12 mt-12 flex items-end justify-end lg:col-span-4 lg:mt-0">
                <span className="text-[8rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-black/10 sm:text-[11rem]">
                  16
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer>
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-14">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <span className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.04em]">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 translate-y-[1px] rounded-[1px]"
                    style={{ background: CORAL }}
                  />
                  {nav.brand}
                </span>
                <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-black/55">
                  {footer.tagline}
                </p>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.1em] text-black/45"
                  style={{ fontFamily: mono }}
                >
                  {footer.meta}
                </p>
                <p
                  className="mt-2 text-[11px] text-black/40 tabular-nums"
                  style={{ fontFamily: mono }}
                >
                  {footer.copyright}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
                {Object.entries(footer.columns).map(([key, links]) => (
                  <div key={key}>
                    <h3
                      className="mb-4 border-b border-[#0A0A0A] pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ fontFamily: mono }}
                    >
                      {key}
                    </h3>
                    <ul className="space-y-2.5">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-[13px] text-black/60 transition-colors"
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = BLUE)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "")
                            }
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
            <div className="flex items-center justify-between border-t border-[#0A0A0A] py-5">
              <Link
                href="/explore"
                className="text-[12px] font-medium uppercase tracking-[0.1em] text-black/50 transition-colors"
                style={{ fontFamily: mono }}
                onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(10,10,10,0.5)")
                }
              >
                ← Back to all iterations
              </Link>
              <span
                className="text-[11px] uppercase tracking-[0.12em] text-black/35"
                style={{ fontFamily: mono }}
              >
                Iteration 16 · Coral Index
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
