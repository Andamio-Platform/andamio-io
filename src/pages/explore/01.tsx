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
 * Iteration 01 — "Editorial Light".
 *
 * Pure light. Ink on warm paper, a serif display face (Fraunces), and the
 * restraint of a printed essay. Color is almost absent: one rust accent, the
 * rest is type and rule. The reference template for the /explore set — fully
 * self-contained, sets its own palette, pulls every word from content.ts.
 */

const PAPER = "#FBFAF7";
const INK = "#1A1815";
const RUST = "#B4451F";

const serif = "'Fraunces', Georgia, serif";

export default function Explore01() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: PAPER, color: INK }}
    >
      <Head>
        <title>01 · Editorial Light — Andamio</title>
      </Head>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FBFAF7]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span
            className="text-xl font-semibold tracking-tight"
            style={{ fontFamily: serif }}
          >
            {nav.brand}
          </span>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-black/60 transition-colors hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: INK }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1
              className="text-[clamp(2.75rem,6vw,5.5rem)] font-light leading-[1.02] tracking-[-0.02em]"
              style={{ fontFamily: serif }}
            >
              {hero.headlineLead}{" "}
              <em className="italic" style={{ color: RUST }}>
                {hero.headlineAccent}
              </em>
            </h1>
            <p className="mt-10 text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              {hero.ctaEyebrow}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={hero.primaryCta.href}
                className="rounded-full px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: RUST }}
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="rounded-full border border-black/20 px-6 py-3 text-[15px] font-medium transition-colors hover:border-black/50"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-md">
            <img
              src={CREDENTIAL_BADGE_SRC}
              alt={hero.badgeAlt}
              width={512}
              height={512}
              className="w-full"
            />
            <figcaption className="mt-4 text-center text-[13px] italic text-black/50">
              {hero.badgeCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────── */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            {problem.kicker}
          </p>
          <h2
            className="mt-5 max-w-3xl text-4xl font-light leading-[1.05] tracking-[-0.015em] sm:text-6xl"
            style={{ fontFamily: serif }}
          >
            {problem.heading}
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-black/60">
            {problem.intro}
          </p>
          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            {problem.items.map((p, i) => (
              <div key={p.headline} className="border-t-2 border-black/80 pt-6">
                <span
                  className="text-2xl tabular-nums"
                  style={{ fontFamily: serif, color: RUST }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="mt-4 text-2xl leading-snug"
                  style={{ fontFamily: serif }}
                >
                  {p.headline}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/60">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo (framed specimen) ──────────────────────────── */}
      <section id="how-it-works" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="rounded-2xl border border-black/15 bg-white p-8 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.4)] sm:p-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/40">
                {demo.kicker}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-current/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider" style={{ color: RUST }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: RUST }} />
                {demo.liveLabel}
              </span>
            </div>
            <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <h2
                  className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl"
                  style={{ fontFamily: serif }}
                >
                  {demo.title}
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-black/55">
                  {demo.note}
                </p>
                <p className="mt-6 text-[15px] font-medium" style={{ color: RUST }}>
                  {demo.inspirationCta} →
                </p>
              </div>
              <img
                src={CREDENTIAL_BADGE_SRC}
                alt={hero.badgeAlt}
                width={420}
                height={420}
                className="mx-auto w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Issuer ──────────────────────────────────────────── */}
      <section id="issuer" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            {issuer.productLabel}
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2
              className="text-6xl font-light leading-[0.95] tracking-[-0.02em] sm:text-8xl"
              style={{ fontFamily: serif }}
            >
              {issuer.title}
            </h2>
            <p className="max-w-xl text-xl leading-relaxed text-black/60">
              {issuer.intro}
            </p>
          </div>

          <p
            className="mt-16 text-2xl sm:text-3xl"
            style={{ fontFamily: serif }}
          >
            {issuer.decisionsHeading}
          </p>
          <dl className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {issuer.decisions.map((d, i) => (
              <div key={d.title} className="border-t border-black/20 pt-6">
                <span
                  className="text-lg tabular-nums"
                  style={{ fontFamily: serif, color: RUST }}
                >
                  0{i + 1}
                </span>
                <dt
                  className="mt-3 text-xl leading-snug"
                  style={{ fontFamily: serif }}
                >
                  {d.title}
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-black/60">
                  {d.body}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-black/10 pt-8">
            <span className="cursor-not-allowed rounded-full border border-black/20 px-6 py-3 text-[15px] font-medium text-black/40">
              {issuer.reportCta}
            </span>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="rounded-full px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: RUST }}
            >
              {issuer.walkthroughCta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Ecosystem ───────────────────────────────────────── */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            {ecosystem.kicker}
          </p>
          <p
            className="mt-6 max-w-2xl text-3xl font-light leading-[1.2] tracking-[-0.01em] sm:text-4xl"
            style={{ fontFamily: serif }}
          >
            {ecosystem.lead}
          </p>
          <div className="mt-12 grid gap-10 border-t border-black/15 pt-8 sm:grid-cols-2">
            {ecosystem.items.map((it) => (
              <div key={it.title}>
                <p className="text-[15px] font-semibold">{it.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-black/60">
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-black/40">{ecosystem.footnote}</p>
        </div>
      </section>

      {/* ── API / Architecture ──────────────────────────────── */}
      <section id="andamio-api" className="border-t border-black/10 bg-[#F3F1EB]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            {api.zoneLabel}
          </p>
          <h2
            className="mt-4 text-6xl font-light leading-[0.95] tracking-[-0.02em] sm:text-8xl"
            style={{ fontFamily: serif }}
          >
            {api.zoneTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-black/60">
            {api.zoneBlurb}
          </p>

          <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
                {api.kicker}
              </p>
              <h3
                className="mt-4 text-4xl font-light leading-tight tracking-[-0.02em] sm:text-5xl"
                style={{ fontFamily: serif }}
              >
                {api.heading}
              </h3>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-black/60">
                {api.body1}
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-black/55">
                {api.body2}
              </p>
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="mt-7 inline-block text-sm font-medium"
                style={{ color: RUST }}
              >
                {api.apiRefCta} →
              </a>
            </div>
            <div className="overflow-hidden rounded-xl border border-black/15 bg-white">
              {api.stack.map((layer, i) => (
                <div
                  key={layer.name}
                  className={i > 0 ? "border-t border-black/10" : ""}
                  style={layer.emphasis ? { background: RUST, color: "#fff" } : undefined}
                >
                  <div className="px-7 py-6">
                    <p
                      className={`text-[13px] font-semibold ${layer.emphasis ? "text-white/80" : "text-black/40"}`}
                    >
                      {layer.labelKicker}
                    </p>
                    <p
                      className="mt-1.5 text-lg"
                      style={{ fontFamily: serif }}
                    >
                      {layer.name}
                    </p>
                    <p
                      className={`mt-2 text-[14px] leading-relaxed ${layer.emphasis ? "text-white/85" : "text-black/55"}`}
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
      <section
        className="border-t border-black/10 text-white"
        style={{ background: INK }}
      >
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <p className="text-sm font-medium" style={{ color: RUST }}>
            {closing.eyebrow}
          </p>
          <h2
            className="mt-6 text-5xl font-light leading-tight tracking-[-0.02em] sm:text-6xl"
            style={{ fontFamily: serif }}
          >
            {closing.headlineLine1}
            <br />
            <span style={{ color: RUST }}>{closing.headlineLine2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            {closing.body}
          </p>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="mt-10 inline-block rounded-full px-7 py-3.5 text-[15px] font-medium text-white"
            style={{ background: RUST }}
          >
            {closing.cta}
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="text-white/70" style={{ background: INK }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 border-t border-white/10 px-6 py-14 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <span className="text-lg text-white" style={{ fontFamily: serif }}>
              {nav.brand}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {footer.tagline}
            </p>
            <p className="mt-5 text-[13px] text-white/40">{footer.meta}</p>
            <p className="mt-3 text-[13px] text-white/35">{footer.copyright}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footer.columns).map(([key, links]) => (
              <div key={key}>
                <h3 className="mb-4 text-[13px] font-semibold text-white/80">
                  {key}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
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
        <div className="border-t border-white/10 py-5 text-center">
          <Link href="/explore" className="text-xs text-white/40 hover:text-white/70">
            ← Back to all iterations
          </Link>
        </div>
      </footer>
    </div>
  );
}
