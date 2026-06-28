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
 * Iteration 04 — "Soft Warm SaaS".
 *
 * The un-intimidating face of a blockchain product. Cream canvas, generously
 * rounded cards with soft diffuse shadows, Bricolage Grotesque headings over
 * Inter body. A warm coral accent with peach + sage tint blocks. Pill buttons,
 * gentle gradients, and lots of air. Self-contained palette — never touches the
 * app's dark global theme.
 */

const CREAM = "#FFFDF8";
const INK = "#2B2622";
const CORAL = "#FF6B4A";
const CORAL_DEEP = "#E8512F";
const PEACH = "#FFF1EA";
const SAGE = "#EAF1EA";
const SAGE_DEEP = "#3F6B53";

const heading = "'Bricolage Grotesque', 'Space Grotesk', sans-serif";
const body = "'Inter', system-ui, sans-serif";

const softShadow = "0 24px 60px -28px rgba(80,55,40,0.28)";
const cardShadow = "0 18px 44px -26px rgba(80,55,40,0.22)";

export default function Explore04() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: CREAM, color: INK, fontFamily: body }}
    >
      <Head>
        <title>04 · Soft Warm SaaS — Andamio</title>
      </Head>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#EFE7DC] bg-[#FFFDF8]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
            style={{ fontFamily: heading }}
          >
            <span
              className="inline-block h-7 w-7 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DEEP})` }}
            />
            {nav.brand}
          </span>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#7A6F65] transition-colors hover:text-[#2B2622]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(255,107,74,0.8)] transition-transform hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DEEP})` }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 80% 0%, #FFE7DC 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 10% 20%, #EAF1EA 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border border-[#FFD9CB] bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-[#C24426]"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} />
                {hero.ctaEyebrow}
              </span>
              <h1
                className="mt-6 text-[clamp(2.75rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
                style={{ fontFamily: heading }}
              >
                {hero.headlineLead}{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(120deg, ${CORAL}, ${CORAL_DEEP})`,
                  }}
                >
                  {hero.headlineAccent}
                </span>
              </h1>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={hero.primaryCta.href}
                  className="rounded-full px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(255,107,74,0.85)] transition-transform hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DEEP})` }}
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="rounded-full border border-[#E6DCCF] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#2B2622] transition-colors hover:border-[#FFB59E] hover:text-[#C24426]"
                >
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>
            <figure
              className="mx-auto w-full max-w-md rounded-[2rem] border border-white bg-white/80 p-8 backdrop-blur"
              style={{ boxShadow: softShadow }}
            >
              <div
                className="rounded-[1.5rem] p-6"
                style={{ background: `linear-gradient(160deg, ${PEACH}, ${SAGE})` }}
              >
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={512}
                  height={512}
                  className="mx-auto w-full max-w-xs"
                />
              </div>
              <figcaption className="mt-5 text-center text-[13px] leading-relaxed text-[#7A6F65]">
                {hero.badgeCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C24426]">
            {problem.kicker}
          </p>
          <h2
            className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl"
            style={{ fontFamily: heading }}
          >
            {problem.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#6E645A]">
            {problem.intro}
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {problem.items.map((p, i) => (
            <div
              key={p.headline}
              className="rounded-3xl border border-[#F0E8DC] bg-white p-8 transition-transform hover:-translate-y-1"
              style={{ boxShadow: cardShadow }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-bold text-white"
                style={{
                  fontFamily: heading,
                  background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DEEP})`,
                }}
              >
                {i + 1}
              </span>
              <h3
                className="mt-5 text-xl font-bold leading-snug tracking-[-0.01em]"
                style={{ fontFamily: heading }}
              >
                {p.headline}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6E645A]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Demo (framed specimen) ──────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-12">
        <div
          className="overflow-hidden rounded-[2.5rem] border border-[#F0E8DC] bg-white"
          style={{ boxShadow: softShadow }}
        >
          <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
            <div className="p-10 sm:p-14">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C24426]">
                  {demo.kicker}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF1EA] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: SAGE_DEEP }}
                >
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ background: SAGE_DEEP }}
                  />
                  {demo.liveLabel}
                </span>
              </div>
              <h2
                className="mt-6 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl"
                style={{ fontFamily: heading }}
              >
                {demo.title}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#6E645A]">
                {demo.note}
              </p>
              <p className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#C24426]">
                {demo.inspirationCta}
                <span aria-hidden>→</span>
              </p>
            </div>
            <div
              className="flex items-center justify-center p-10 sm:p-14"
              style={{ background: `linear-gradient(160deg, ${PEACH} 0%, ${SAGE} 100%)` }}
            >
              <div
                className="rounded-[1.75rem] border border-white bg-white/70 p-8 backdrop-blur"
                style={{ boxShadow: cardShadow }}
              >
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={360}
                  height={360}
                  className="mx-auto w-full max-w-[16rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Issuer ──────────────────────────────────────────── */}
      <section id="issuer" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C24426]">
              {issuer.productLabel}
            </p>
            <h2
              className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl"
              style={{ fontFamily: heading }}
            >
              {issuer.title}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-[#6E645A]">{issuer.intro}</p>
        </div>

        <h3
          className="mt-16 max-w-2xl text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl"
          style={{ fontFamily: heading }}
        >
          {issuer.decisionsHeading}
        </h3>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {issuer.decisions.map((d, i) => (
            <div
              key={d.title}
              className="rounded-3xl border border-[#F0E8DC] bg-white p-7 transition-transform hover:-translate-y-1"
              style={{ boxShadow: cardShadow }}
            >
              <span
                className="text-sm font-bold tabular-nums"
                style={{ fontFamily: heading, color: CORAL }}
              >
                0{i + 1}
              </span>
              <h4
                className="mt-3 text-lg font-bold leading-snug tracking-[-0.01em]"
                style={{ fontFamily: heading }}
              >
                {d.title}
              </h4>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#6E645A]">
                {d.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span
            className="cursor-not-allowed rounded-full border border-[#E6DCCF] px-6 py-3.5 text-[15px] font-semibold text-[#B6ABA0]"
            aria-disabled="true"
          >
            {issuer.reportCta}
          </span>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="rounded-full px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(255,107,74,0.85)] transition-transform hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DEEP})` }}
          >
            {issuer.walkthroughCta}
          </a>
        </div>
      </section>

      {/* ── Ecosystem ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div
          className="rounded-[2.5rem] border border-[#E5EDE5] p-10 sm:p-14"
          style={{ background: `linear-gradient(150deg, ${SAGE} 0%, #FBFAF4 70%)` }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: SAGE_DEEP }}>
            {ecosystem.kicker}
          </p>
          <p
            className="mt-5 max-w-3xl text-2xl font-bold leading-[1.2] tracking-[-0.01em] sm:text-3xl"
            style={{ fontFamily: heading }}
          >
            {ecosystem.lead}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {ecosystem.items.map((it) => (
              <div
                key={it.title}
                className="rounded-3xl border border-white bg-white/70 p-7 backdrop-blur"
                style={{ boxShadow: cardShadow }}
              >
                <h3
                  className="text-lg font-bold tracking-[-0.01em]"
                  style={{ fontFamily: heading }}
                >
                  {it.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#6E645A]">
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-xs text-[#8A8076]">{ecosystem.footnote}</p>
        </div>
      </section>

      {/* ── API / Architecture ──────────────────────────────── */}
      <section id="andamio-api" className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-[2rem] border border-[#FFE0D2] bg-[#FFF7F2] px-7 py-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C24426]">
            {api.zoneLabel}
          </p>
          <h2
            className="mt-3 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl"
            style={{ fontFamily: heading }}
          >
            {api.zoneTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#6E645A]">
            {api.zoneBlurb}
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C24426]">
              {api.kicker}
            </p>
            <h3
              className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl"
              style={{ fontFamily: heading }}
            >
              {api.heading}
            </h3>
            <p className="mt-6 text-[16px] leading-relaxed text-[#6E645A]">
              {api.body1}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#7A6F65]">
              {api.body2}
            </p>
            <a
              href={EXTERNAL_LINKS.apiReference}
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C24426] transition-colors hover:text-[#E8512F]"
            >
              {api.apiRefCta}
              <span aria-hidden>→</span>
            </a>
          </div>
          <div className="flex flex-col gap-3">
            {api.stack.map((layer) => (
              <div
                key={layer.name}
                className="rounded-3xl border p-6 transition-transform hover:-translate-y-0.5"
                style={
                  layer.emphasis
                    ? {
                        background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DEEP})`,
                        color: "#fff",
                        borderColor: "transparent",
                        boxShadow: "0 20px 44px -18px rgba(255,107,74,0.6)",
                      }
                    : {
                        background: "#fff",
                        borderColor: "#F0E8DC",
                        boxShadow: cardShadow,
                      }
                }
              >
                <p
                  className={`text-[12px] font-bold uppercase tracking-[0.14em] ${
                    layer.emphasis ? "text-white/85" : "text-[#B6ABA0]"
                  }`}
                >
                  {layer.labelKicker}
                </p>
                <p
                  className="mt-1.5 text-lg font-bold tracking-[-0.01em]"
                  style={{ fontFamily: heading }}
                >
                  {layer.name}
                </p>
                <p
                  className={`mt-2 text-[14px] leading-relaxed ${
                    layer.emphasis ? "text-white/90" : "text-[#6E645A]"
                  }`}
                >
                  {layer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-8 py-20 text-center sm:px-12"
          style={{
            background: `linear-gradient(140deg, ${CORAL} 0%, ${CORAL_DEEP} 100%)`,
            boxShadow: "0 30px 70px -30px rgba(232,81,47,0.55)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 80% 10%, rgba(255,255,255,0.5) 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            <p className="text-sm font-semibold text-white/80">{closing.eyebrow}</p>
            <h2
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl"
              style={{ fontFamily: heading }}
            >
              {closing.headlineLine1}
              <br />
              <span className="text-white/85">{closing.headlineLine2}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              {closing.body}
            </p>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="mt-9 inline-block rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-[#C24426] shadow-[0_16px_36px_-14px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5"
            >
              {closing.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="mx-auto max-w-6xl px-6 pb-12 pt-16">
        <div className="flex flex-col gap-12 border-t border-[#EFE7DC] pt-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <span
              className="flex items-center gap-2 text-lg font-bold"
              style={{ fontFamily: heading }}
            >
              <span
                className="inline-block h-6 w-6 rounded-lg"
                style={{ background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DEEP})` }}
              />
              {nav.brand}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-[#7A6F65]">
              {footer.tagline}
            </p>
            <p className="mt-5 text-[13px] font-medium text-[#9A9086]">{footer.meta}</p>
            <p className="mt-2 text-[13px] text-[#B6ABA0]">{footer.copyright}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footer.columns).map(([key, links]) => (
              <div key={key}>
                <h3 className="mb-4 text-[13px] font-bold text-[#2B2622]">{key}</h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-[#7A6F65] transition-colors hover:text-[#C24426]"
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
        <div className="mt-10 border-t border-[#EFE7DC] pt-6 text-center">
          <Link
            href="/explore"
            className="text-xs font-medium text-[#9A9086] transition-colors hover:text-[#C24426]"
          >
            ← Back to all iterations
          </Link>
        </div>
      </footer>
    </div>
  );
}
