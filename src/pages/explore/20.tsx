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
 * Iteration 20 — "Tri-tone".
 *
 * The balanced three-color reference. 11 (faint fixed grid + generous vertical
 * rhythm), 12 (refined semibold-Inter type, -0.045em tracking, 0.92 leading)
 * and 15 (fixed floating right-side rail) contribute equally — and each theme
 * color carries exactly one disciplined job:
 *
 *   CORAL  #FF6B4A — display accent. Only the accent WORD inside headings.
 *   BLUE   #2F6BFF — all data + structure. Rail, links, section marks,
 *                    metadata, the emphasized API layer.
 *   ORANGE #FF6B35 — reserved STRICTLY for the credential's verified/live
 *                    moments: the live pulse, the VERIFIED stamp, the on-chain
 *                    badge, the rail's status readout. Nothing else.
 *
 * Spine kept: full-bleed type hero with the badge withheld, then a
 * scroll-driven sideways reveal into a museum specimen ("Specimen 001 /
 * On-chain"), which doubles as the how-it-works demo.
 */

const PAPER = "#FFFFFF";
const INK = "#0B0B0C";
const CORAL = "#FF6B4A"; // display accent
const BLUE = "#2F6BFF"; // data / structure
const ORANGE = "#FF6B35"; // verified / live only

const SANS = "'Inter', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const NUMS = ["01", "02", "03", "04", "05", "06"];

/** Section index that the floating right rail renders as a mini outline. */
const SECTIONS: { id: string; num: string; label: string }[] = [
  { id: "top", num: "00", label: "Hero" },
  { id: "how-it-works", num: "01", label: "How it works" },
  { id: "problem", num: "02", label: "The problem" },
  { id: "issuer", num: "03", label: "Issuer" },
  { id: "ecosystem", num: "04", label: "Ecosystem" },
  { id: "andamio-api", num: "05", label: "API" },
];

export default function Explore20() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  // Slides in from the RIGHT; deterministic at progress=0 for SSR/client match.
  const badgeX = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const frameWidth = useTransform(scrollYProgress, [0, 1], ["44%", "100%"]);
  const stampOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);

  // Lightweight scroll-spy for the wayfinding rail. Deterministic initial.
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: SANS }}
    >
      <Head>
        <title>20 · Tri-tone — Andamio</title>
        <meta
          name="description"
          content="Andamio — a disciplined three-color system: coral display, blue data, orange reserved for the verified credential."
        />
      </Head>

      {/* ── 11's faint fixed 12-column rule field ─────────────── */}
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

      {/* ── 15's fixed floating right rail, carrying 12's bookmark FUNCTION ── */}
      <aside
        className="pointer-events-none fixed right-0 top-0 z-30 hidden h-screen w-[212px] flex-col justify-between py-24 xl:flex"
        style={{
          borderLeft: `1px solid ${BLUE}1f`,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Section index (mini table-of-contents) */}
        <nav className="pl-6 pr-5">
          <div
            className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
            style={{ fontFamily: MONO, color: "rgba(11,11,12,0.45)" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: BLUE }}
            />
            index
          </div>
          <ul className="space-y-2.5">
            {SECTIONS.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="pointer-events-auto flex items-baseline gap-2.5 transition-colors"
                    style={{ fontFamily: MONO }}
                  >
                    <span
                      className="text-[10px] tabular-nums"
                      style={{ color: on ? BLUE : "rgba(11,11,12,0.3)" }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="text-[11px] tracking-[0.02em] transition-colors"
                      style={{
                        color: on ? INK : "rgba(11,11,12,0.42)",
                        fontWeight: on ? 600 : 400,
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto h-px transition-all"
                      style={{
                        width: on ? 18 : 6,
                        background: on ? BLUE : "rgba(11,11,12,0.18)",
                        transform: "translateY(-3px)",
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Two live readouts — orange only, the credential's verified state */}
        <div className="pl-6 pr-5">
          <div
            className="mb-3 h-px w-full"
            style={{ background: "rgba(11,11,12,0.1)" }}
          />
          <div className="space-y-2.5" style={{ fontFamily: MONO }}>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-[9px] uppercase tracking-[0.16em]"
                style={{ color: "rgba(11,11,12,0.38)" }}
              >
                status
              </span>
              <span
                className="flex items-center gap-2 text-[12px] tracking-[0.04em]"
                style={{ color: ORANGE }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: ORANGE }}
                />
                VERIFIED
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-[9px] uppercase tracking-[0.16em]"
                style={{ color: "rgba(11,11,12,0.38)" }}
              >
                registry
              </span>
              <span
                className="text-[12px] tabular-nums"
                style={{ color: "rgba(11,11,12,0.7)" }}
              >
                on-chain · mainnet
              </span>
            </div>
          </div>
          <div
            className="mt-5 text-[9px] uppercase tracking-[0.18em]"
            style={{ fontFamily: MONO, color: "rgba(11,11,12,0.3)" }}
          >
            andamio · tri-tone
          </div>
        </div>
      </aside>

      <div className="relative z-10 xl:pr-[212px]">
        {/* ── Nav ─────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur"
          style={{
            borderBottom: `1px solid ${INK}`,
            background: "rgba(255,255,255,0.95)",
          }}
        >
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3.5 sm:px-10">
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
                className="ml-1 hidden text-[10px] tracking-[0.16em] sm:inline"
                style={{ fontFamily: MONO, color: "rgba(11,11,12,0.4)" }}
              >
                TRI-TONE
              </span>
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[12px] tracking-[0.02em] transition-colors"
                  style={{ color: "rgba(11,11,12,0.6)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(11,11,12,0.6)")
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={nav.cta.href}
              className="border px-4 py-2 text-[12px] font-medium tracking-[0.02em] transition-colors"
              style={{ borderColor: INK, background: INK, color: PAPER }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = BLUE;
                e.currentTarget.style.borderColor = BLUE;
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

        {/* ── Hero (full-bleed type, NO badge) ────────────────── */}
        <section id="top" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="pb-16 pt-16 sm:pt-24 lg:pb-24">
              <div className="flex items-center gap-4">
                <span
                  className="text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: BLUE, fontFamily: MONO }}
                >
                  Andamio / Credentialing
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: INK }}
                />
                <span
                  className="hidden text-[11px] uppercase tracking-[0.16em] sm:inline"
                  style={{ color: "rgba(11,11,12,0.4)", fontFamily: MONO }}
                >
                  No. 20 — Tri-tone
                </span>
              </div>

              <h1 className="mt-10 max-w-[15ch] text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                {hero.headlineLead}{" "}
                <span style={{ color: CORAL }}>{hero.headlineAccent}</span>
              </h1>

              {/* CTA cluster */}
              <div
                className="mt-14 flex flex-wrap items-stretch border"
                style={{ borderColor: INK }}
              >
                <span
                  className="flex items-center border-b px-5 py-3 text-[10px] uppercase tracking-[0.18em] sm:border-b-0 sm:border-r"
                  style={{
                    borderColor: INK,
                    color: "rgba(11,11,12,0.5)",
                    fontFamily: MONO,
                  }}
                >
                  {hero.ctaEyebrow}
                </span>
                <a
                  href={hero.primaryCta.href}
                  className="flex flex-1 items-center justify-center gap-3 border-b px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors sm:flex-none sm:border-b-0 sm:border-r"
                  style={{ borderColor: INK, background: INK, color: PAPER }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BLUE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = INK;
                  }}
                >
                  {hero.primaryCta.label}
                  <span style={{ fontFamily: MONO }}>→</span>
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="flex flex-1 items-center justify-center gap-3 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors sm:flex-none"
                  style={{ color: INK }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = INK;
                    e.currentTarget.style.color = PAPER;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = INK;
                  }}
                >
                  {hero.secondaryCta.label}
                  <span style={{ fontFamily: MONO }}>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Badge reveal / specimen + demo (id="how-it-works") ─ */}
        <section
          ref={revealRef}
          id="how-it-works"
          style={{ borderBottom: `1px solid ${INK}` }}
        >
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="flex flex-wrap items-center gap-4 pt-16 sm:pt-24">
              <span
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ color: BLUE, fontFamily: MONO }}
              >
                {demo.kicker}
              </span>
              {/* LIVE — orange, a verified/live moment */}
              <span
                className="inline-flex items-center gap-2 border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]"
                style={{ borderColor: ORANGE, color: ORANGE, fontFamily: MONO }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: ORANGE }}
                />
                {demo.liveLabel}
              </span>
              <span className="h-px flex-1" style={{ background: INK }} />
              <span
                className="hidden text-[11px] uppercase tracking-[0.16em] tabular-nums sm:inline"
                style={{ color: "rgba(11,11,12,0.4)", fontFamily: MONO }}
              >
                Specimen 001
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-10 py-12 sm:py-16">
              {/* left: demo copy */}
              <div className="col-span-12 lg:col-span-5 lg:pr-12">
                <span
                  className="block text-[7rem] font-semibold leading-[0.8] tracking-[-0.05em] tabular-nums sm:text-[9rem]"
                  style={{ color: BLUE }}
                >
                  01
                </span>
                <h2 className="mt-6 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.0] tracking-[-0.035em]">
                  {demo.title}
                </h2>
                <p
                  className="mt-6 max-w-md text-[15px] leading-relaxed"
                  style={{ color: "rgba(11,11,12,0.62)" }}
                >
                  {demo.note}
                </p>

                {/* mono read-out block — structural, blue keys */}
                <dl
                  className="mt-8 max-w-md border-t text-[12px]"
                  style={{
                    borderColor: "rgba(11,11,12,0.14)",
                    fontFamily: MONO,
                  }}
                >
                  {[
                    ["format", "SVG · machine-readable"],
                    ["registry", "On-chain · Cardano"],
                    ["status", "Verifiable"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b py-2.5"
                      style={{ borderColor: "rgba(11,11,12,0.14)" }}
                    >
                      <dt
                        className="uppercase tracking-[0.12em]"
                        style={{ color: BLUE }}
                      >
                        {k}
                      </dt>
                      <dd style={{ color: INK }}>{v}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#issuer"
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors"
                  style={{ color: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-[1px]"
                    style={{ background: BLUE }}
                  />
                  {demo.inspirationCta}
                </a>
              </div>

              {/* right: specimen cell — badge slides in from the RIGHT */}
              <div className="col-span-12 lg:col-span-7">
                <motion.div
                  style={{ width: frameWidth }}
                  className="ml-auto border"
                >
                  <div
                    className="ml-auto border"
                    style={{ borderColor: INK }}
                  >
                    {/* corner labels */}
                    <div
                      className="flex items-center justify-between border-b"
                      style={{ borderColor: INK }}
                    >
                      <span
                        className="px-4 py-2 text-[10px] uppercase tracking-[0.14em]"
                        style={{ color: BLUE, fontFamily: MONO }}
                      >
                        Specimen 001
                      </span>
                      {/* on-chain badge — orange, a verified/live moment */}
                      <span
                        className="border-l px-4 py-2 text-[10px] uppercase tracking-[0.14em]"
                        style={{
                          borderColor: INK,
                          color: ORANGE,
                          fontFamily: MONO,
                        }}
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
                          className="w-full max-w-[340px]"
                        />
                      </motion.div>

                      {/* VERIFIED stamp — orange, appears as the badge settles */}
                      <motion.span
                        aria-hidden
                        style={{ opacity: stampOpacity, borderColor: ORANGE, color: ORANGE, fontFamily: MONO }}
                        className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]"
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ background: ORANGE }}
                        />
                        Verified
                      </motion.span>
                    </div>

                    {/* caption + bottom labels */}
                    <figcaption style={{ borderTop: `1px solid ${INK}` }}>
                      <p
                        className="px-4 py-4 text-[13px] leading-relaxed"
                        style={{ color: "rgba(11,11,12,0.6)" }}
                      >
                        {hero.badgeCaption}
                      </p>
                      <div
                        className="flex items-center justify-between"
                        style={{ borderTop: "1px solid rgba(11,11,12,0.15)" }}
                      >
                        <span
                          className="px-4 py-2 text-[10px] uppercase tracking-[0.14em] tabular-nums"
                          style={{
                            color: "rgba(11,11,12,0.4)",
                            fontFamily: MONO,
                          }}
                        >
                          SVG · Cardano mainnet
                        </span>
                        <span
                          className="border-l px-4 py-2 text-[10px] uppercase tracking-[0.14em]"
                          style={{
                            borderColor: "rgba(11,11,12,0.15)",
                            color: "rgba(11,11,12,0.4)",
                            fontFamily: MONO,
                          }}
                        >
                          Fig. 001
                        </span>
                      </div>
                    </figcaption>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────── */}
        <section id="problem" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: BLUE, fontFamily: MONO }}
                >
                  {problem.kicker}
                </p>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                  {problem.heading}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-xl leading-snug tracking-[-0.015em] lg:col-span-7 lg:col-start-6"
                style={{ color: "rgba(11,11,12,0.68)" }}
              >
                {problem.intro}
              </p>
            </div>

            <div
              className="grid grid-cols-12"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              {problem.items.map((p, i) => (
                <div
                  key={p.headline}
                  className="col-span-12 py-10 sm:col-span-4 lg:py-12"
                  style={{
                    borderTop:
                      i > 0 ? "1px solid rgba(11,11,12,0.15)" : undefined,
                    borderLeft:
                      i > 0 ? "1px solid rgba(11,11,12,0.15)" : undefined,
                    paddingLeft: i > 0 ? undefined : undefined,
                  }}
                >
                  <div className="sm:px-8">
                    <span
                      className="block text-6xl font-semibold leading-none tracking-[-0.05em] tabular-nums"
                      style={{ color: BLUE }}
                    >
                      {NUMS[i]}
                    </span>
                    <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.03em]">
                      {p.headline}
                    </h3>
                    <p
                      className="mt-3 max-w-sm text-[14px] leading-relaxed"
                      style={{ color: "rgba(11,11,12,0.6)" }}
                    >
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Issuer ──────────────────────────────────────────── */}
        <section id="issuer" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: BLUE, fontFamily: MONO }}
                >
                  {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
                  {issuer.title}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8"
                style={{ color: "rgba(11,11,12,0.66)" }}
              >
                {issuer.intro}
              </p>
            </div>

            <div className="pt-8" style={{ borderTop: `1px solid ${INK}` }}>
              <span className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                {issuer.decisionsHeading}
              </span>
            </div>

            <div
              className="mt-10 grid grid-cols-12"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              {issuer.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className="col-span-12 py-9 sm:col-span-6 sm:px-7 lg:col-span-4"
                  style={{
                    borderTop:
                      i > 0 ? "1px solid rgba(11,11,12,0.15)" : undefined,
                    borderLeft:
                      i % 3 !== 0 ? "1px solid rgba(11,11,12,0.15)" : undefined,
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-[13px] uppercase tracking-[0.14em] tabular-nums"
                      style={{ color: BLUE, fontFamily: MONO }}
                    >
                      D-{NUMS[i]}
                    </span>
                    <span
                      className="h-px flex-1 translate-y-[-3px]"
                      style={{ background: "rgba(11,11,12,0.15)" }}
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.03em]">
                    {d.title}
                  </h3>
                  <p
                    className="mt-3 text-[14px] leading-relaxed"
                    style={{ color: "rgba(11,11,12,0.6)" }}
                  >
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap items-stretch py-10"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              <span
                aria-disabled="true"
                className="flex cursor-not-allowed items-center border px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em]"
                style={{
                  borderColor: "rgba(11,11,12,0.25)",
                  color: "rgba(11,11,12,0.35)",
                }}
              >
                {issuer.reportCta}
                <span
                  className="ml-3 text-[10px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: MONO }}
                >
                  soon
                </span>
              </span>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="-ml-px flex items-center border px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors"
                style={{ borderColor: INK, background: INK, color: PAPER }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = BLUE;
                  e.currentTarget.style.borderColor = BLUE;
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
        <section id="ecosystem" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: BLUE, fontFamily: MONO }}
                >
                  {ecosystem.kicker}
                </p>
                <p className="mt-6 text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
                  {ecosystem.lead}
                </p>
              </div>
              <div
                className="col-span-12 grid grid-cols-1 self-end sm:grid-cols-2 lg:col-span-7"
                style={{ borderTop: `1px solid ${INK}` }}
              >
                {ecosystem.items.map((it, i) => (
                  <div
                    key={it.title}
                    className="py-8 sm:px-7"
                    style={{
                      borderTop:
                        i === 1
                          ? "1px solid rgba(11,11,12,0.15)"
                          : undefined,
                    }}
                  >
                    <p className="flex items-baseline gap-2 text-[15px] font-semibold tracking-[-0.01em]">
                      <span
                        className="text-[12px] tabular-nums"
                        style={{ color: BLUE, fontFamily: MONO }}
                      >
                        {NUMS[i]}
                      </span>
                      {it.title}
                    </p>
                    <p
                      className="mt-3 text-[14px] leading-relaxed"
                      style={{ color: "rgba(11,11,12,0.6)" }}
                    >
                      {it.body}
                    </p>
                  </div>
                ))}
                <p
                  className="col-span-1 py-4 text-[11px] uppercase tracking-[0.12em] sm:col-span-2 sm:px-7"
                  style={{
                    fontFamily: MONO,
                    borderTop: "1px solid rgba(11,11,12,0.15)",
                    color: "rgba(11,11,12,0.42)",
                  }}
                >
                  {ecosystem.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── API / Architecture ──────────────────────────────── */}
        <section id="andamio-api" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            {/* zone header */}
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: BLUE, fontFamily: MONO }}
                >
                  {api.zoneLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
                  {api.zoneTitle}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8"
                style={{ color: "rgba(11,11,12,0.66)" }}
              >
                {api.zoneBlurb}
              </p>
            </div>

            <div
              className="grid grid-cols-12"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              {/* prose */}
              <div
                className="col-span-12 py-12 lg:col-span-5 lg:pr-12"
                style={{ borderRight: "1px solid rgba(11,11,12,0.15)" }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: BLUE, fontFamily: MONO }}
                >
                  {api.kicker}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
                  {api.heading}
                </h3>
                <p
                  className="mt-6 text-[15px] leading-relaxed"
                  style={{ color: "rgba(11,11,12,0.68)" }}
                >
                  {api.body1}
                </p>
                <p
                  className="mt-4 text-[14px] leading-relaxed"
                  style={{ color: "rgba(11,11,12,0.55)" }}
                >
                  {api.body2}
                </p>
                <a
                  href={EXTERNAL_LINKS.apiReference}
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors"
                  style={{ color: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-[1px]"
                    style={{ background: BLUE }}
                  />
                  {api.apiRefCta}
                </a>
              </div>

              {/* stack — emphasized layer is BLUE (data/structure) */}
              <div className="col-span-12 lg:col-span-7">
                {api.stack.map((layer, i) => (
                  <div
                    key={layer.name}
                    className="grid grid-cols-12 items-baseline gap-4 py-7 lg:px-10"
                    style={{
                      borderTop:
                        i > 0 ? "1px solid rgba(11,11,12,0.15)" : undefined,
                      background: layer.emphasis ? BLUE : undefined,
                      color: layer.emphasis ? "#fff" : undefined,
                    }}
                  >
                    <div className="col-span-12 sm:col-span-4">
                      <span
                        className="text-[11px] uppercase tracking-[0.12em]"
                        style={{
                          fontFamily: MONO,
                          color: layer.emphasis
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(11,11,12,0.42)",
                        }}
                      >
                        L{i} · {layer.labelKicker}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-8">
                      <p className="text-lg font-semibold leading-tight tracking-[-0.03em]">
                        {layer.name}
                      </p>
                      <p
                        className="mt-1.5 text-[14px] leading-relaxed"
                        style={{
                          color: layer.emphasis
                            ? "rgba(255,255,255,0.92)"
                            : "rgba(11,11,12,0.55)",
                        }}
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
        <section style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-8">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: BLUE, fontFamily: MONO }}
                >
                  {closing.eyebrow}
                </p>
                <h2 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {closing.headlineLine1}
                  <br />
                  <span style={{ color: CORAL }}>{closing.headlineLine2}</span>
                </h2>
                <p
                  className="mt-8 max-w-lg text-lg leading-relaxed"
                  style={{ color: "rgba(11,11,12,0.66)" }}
                >
                  {closing.body}
                </p>
                <a
                  href={EXTERNAL_LINKS.walkthroughMailto}
                  className="mt-10 inline-flex items-center gap-3 border px-7 py-4 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors"
                  style={{ borderColor: INK, background: INK, color: PAPER }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BLUE;
                    e.currentTarget.style.borderColor = BLUE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = INK;
                    e.currentTarget.style.borderColor = INK;
                  }}
                >
                  {closing.cta}
                  <span style={{ fontFamily: MONO }}>→</span>
                </a>
              </div>
              <div className="col-span-12 mt-12 flex items-end justify-end lg:col-span-4 lg:mt-0">
                <span
                  className="text-[8rem] font-semibold leading-none tracking-[-0.06em] tabular-nums sm:text-[11rem]"
                  style={{ color: "rgba(11,11,12,0.08)" }}
                >
                  20
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
                <p
                  className="mt-4 max-w-xs text-[13px] leading-relaxed"
                  style={{ color: "rgba(11,11,12,0.55)" }}
                >
                  {footer.tagline}
                </p>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.1em]"
                  style={{ fontFamily: MONO, color: "rgba(11,11,12,0.45)" }}
                >
                  {footer.meta}
                </p>
                <p
                  className="mt-2 text-[11px] tabular-nums"
                  style={{ fontFamily: MONO, color: "rgba(11,11,12,0.4)" }}
                >
                  {footer.copyright}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
                {Object.entries(footer.columns).map(([key, links]) => (
                  <div key={key}>
                    <h3
                      className="mb-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ borderBottom: `1px solid ${INK}` }}
                    >
                      {key}
                    </h3>
                    <ul className="space-y-2.5">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-[13px] transition-colors"
                            style={{ color: "rgba(11,11,12,0.6)" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = BLUE)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color =
                                "rgba(11,11,12,0.6)")
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
            <div
              className="flex items-center justify-between py-5"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              <Link
                href="/explore"
                className="text-[12px] font-medium uppercase tracking-[0.1em] transition-colors"
                style={{ color: "rgba(11,11,12,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(11,11,12,0.5)")
                }
              >
                ← Back to all iterations
              </Link>
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ fontFamily: MONO, color: "rgba(11,11,12,0.35)" }}
              >
                Iteration 20 · Tri-tone
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
