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
 * Iteration 06 — "Swiss Grid".
 *
 * Swiss / International Typographic Style. Pure white field, a visible strict
 * 12-column grid, Helvetica-lineage sans (Inter) with tight negative tracking,
 * hard left alignment and baseline discipline. One red accent (#E5322D). 1px
 * black rules structure every section; oversized tabular numerals mark them.
 * No shadows, no rounding — restraint as sophistication.
 */

const PAPER = "#FFFFFF";
const INK = "#111111";
const RED = "#E5322D";

const sans =
  "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif";

// section marker numerals, padded
const NUMS = ["01", "02", "03", "04", "05", "06"];

export default function Explore06() {
  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: sans }}
    >
      <Head>
        <title>06 · Swiss Grid — Andamio</title>
      </Head>

      {/* ── Column-grid overlay (the visible 12-col field) ──── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden justify-center md:flex"
      >
        <div className="grid h-full w-full max-w-[1280px] grid-cols-12 border-r border-black/[0.045] px-6 sm:px-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-black/[0.045]" />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* ── Nav ───────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-[#111] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3 sm:px-10">
            <a
              href="#top"
              className="flex items-baseline gap-2 text-lg font-bold tracking-[-0.04em]"
            >
              <span
                className="inline-block h-3 w-3 translate-y-[1px]"
                style={{ background: RED }}
              />
              {nav.brand}
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[12px] font-medium uppercase tracking-[0.08em] text-black/60 transition-colors hover:text-[#E5322D]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={nav.cta.href}
              className="border border-[#111] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#E5322D] hover:border-[#E5322D]"
              style={{ background: INK }}
            >
              {nav.cta.label}
            </a>
          </div>
        </header>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section id="top" className="border-b border-[#111]">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12">
              {/* left: headline block */}
              <div className="col-span-12 border-black/15 pb-12 pt-16 lg:col-span-8 lg:border-r lg:pr-12 lg:pt-24">
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: RED }}>
                    Andamio / Credentialing
                  </span>
                  <span className="h-px flex-1 bg-[#111]" />
                </div>
                <h1 className="mt-10 text-[clamp(3rem,8.5vw,7rem)] font-bold leading-[0.92] tracking-[-0.045em]">
                  {hero.headlineLead}{" "}
                  <span style={{ color: RED }}>{hero.headlineAccent}</span>
                </h1>
                <div className="mt-12 flex flex-wrap items-stretch gap-0 border border-[#111]">
                  <span className="flex items-center border-r border-[#111] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-black/50">
                    {hero.ctaEyebrow}
                  </span>
                  <a
                    href={hero.primaryCta.href}
                    className="flex items-center border-r border-[#111] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#E5322D]"
                    style={{ background: INK }}
                  >
                    {hero.primaryCta.label}
                  </a>
                  <a
                    href={hero.secondaryCta.href}
                    className="flex items-center px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#111] hover:text-white"
                  >
                    {hero.secondaryCta.label}
                  </a>
                </div>
              </div>

              {/* right: badge specimen */}
              <figure className="col-span-12 flex flex-col border-t border-black/15 lg:col-span-4 lg:border-t-0">
                <div className="flex items-center justify-between border-b border-black/15 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/40">
                    Fig. 01 — Specimen
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-black/40">
                    SVG · ON-CHAIN
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-center py-10">
                  <img
                    src={CREDENTIAL_BADGE_SRC}
                    alt={hero.badgeAlt}
                    width={360}
                    height={360}
                    className="w-full max-w-[300px]"
                  />
                </div>
                <figcaption className="border-t border-black/15 py-4 text-[12px] leading-relaxed text-black/55">
                  {hero.badgeCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── Problem ───────────────────────────────────────── */}
        <section className="border-b border-[#111]">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>
                  {problem.kicker}
                </p>
                <h2 className="mt-5 text-4xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-5xl">
                  {problem.heading}
                </h2>
              </div>
              <p className="col-span-12 self-end text-xl leading-snug tracking-[-0.01em] text-black/70 lg:col-span-7 lg:col-start-6">
                {problem.intro}
              </p>
            </div>

            <div className="grid grid-cols-12 border-t border-[#111]">
              {problem.items.map((p, i) => (
                <div
                  key={p.headline}
                  className="col-span-12 border-black/15 py-10 sm:col-span-4 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8 lg:py-12 [&:not(:first-child)]:border-t [&:not(:first-child)]:pt-10 sm:[&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:pt-12"
                >
                  <span className="block text-6xl font-bold tabular-nums leading-none tracking-[-0.04em]" style={{ color: RED }}>
                    {NUMS[i]}
                  </span>
                  <h3 className="mt-6 text-xl font-bold leading-tight tracking-[-0.02em]">
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

        {/* ── Demo (framed specimen) ────────────────────────── */}
        <section id="how-it-works" className="border-b border-[#111]">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="py-16 sm:py-24">
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>
                  {demo.kicker}
                </span>
                <span className="inline-flex items-center gap-2 border border-[#111] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                  <span className="h-1.5 w-1.5 animate-pulse" style={{ background: RED }} />
                  {demo.liveLabel}
                </span>
                <span className="h-px flex-1 bg-[#111]" />
              </div>

              <div className="mt-10 grid grid-cols-12 border border-[#111]">
                <div className="col-span-12 border-black/15 p-8 sm:p-10 lg:col-span-7 lg:border-r">
                  <h2 className="text-3xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[2.75rem]">
                    {demo.title}
                  </h2>
                  <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/60">
                    {demo.note}
                  </p>
                  <a
                    href={demo.inspirationCta ? "#issuer" : "#issuer"}
                    className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-[#E5322D]"
                  >
                    <span className="h-2 w-2" style={{ background: RED }} />
                    {demo.inspirationCta}
                  </a>
                </div>
                <div className="col-span-12 flex flex-col border-t border-black/15 lg:col-span-5 lg:border-t-0">
                  <span className="border-b border-black/15 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-black/40">
                    Output
                  </span>
                  <div className="flex flex-1 items-center justify-center bg-[#FAFAFA] p-8">
                    <img
                      src={CREDENTIAL_BADGE_SRC}
                      alt={hero.badgeAlt}
                      width={300}
                      height={300}
                      className="w-full max-w-[240px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Issuer ────────────────────────────────────────── */}
        <section id="issuer" className="border-b border-[#111]">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>
                  {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-6xl font-bold leading-[0.9] tracking-[-0.045em] sm:text-8xl">
                  {issuer.title}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-black/65 lg:col-span-5 lg:pl-8">
                {issuer.intro}
              </p>
            </div>

            <div className="flex items-center gap-5 border-t border-[#111] pt-8">
              <span className="text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
                {issuer.decisionsHeading}
              </span>
            </div>

            {/* precise numbered grid */}
            <div className="mt-10 grid grid-cols-12 border-t border-[#111]">
              {issuer.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className="col-span-12 border-black/15 py-9 sm:col-span-6 sm:px-7 lg:col-span-4 [&:not(:nth-child(-n+1))]:border-t sm:[&:not(:nth-child(-n+2))]:border-t lg:[&:not(:nth-child(-n+3))]:border-t sm:[&:nth-child(even)]:border-l lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n)]:border-l"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold tabular-nums leading-none tracking-[-0.04em]" style={{ color: RED }}>
                      {NUMS[i]}
                    </span>
                    <span className="h-px flex-1 translate-y-[-6px] bg-black/15" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-snug tracking-[-0.02em]">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-stretch gap-0 border-t border-[#111] py-10">
              <span
                aria-disabled
                className="flex cursor-not-allowed items-center border border-black/25 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-black/35"
              >
                {issuer.reportCta}
              </span>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="-ml-px flex items-center border border-[#111] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#E5322D] hover:border-[#E5322D]"
                style={{ background: INK }}
              >
                {issuer.walkthroughCta}
              </a>
            </div>
          </div>
        </section>

        {/* ── Ecosystem ─────────────────────────────────────── */}
        <section className="border-b border-[#111]">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>
                  {ecosystem.kicker}
                </p>
                <p className="mt-6 text-3xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-4xl">
                  {ecosystem.lead}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-1 self-end border-t border-[#111] sm:grid-cols-2 lg:col-span-7">
                {ecosystem.items.map((it, i) => (
                  <div
                    key={it.title}
                    className={`py-8 ${i === 1 ? "border-t border-black/15 sm:border-l sm:border-t-0 sm:pl-7 pt-8" : ""}`}
                  >
                    <p className="text-[13px] font-bold uppercase tracking-[0.1em]">
                      <span className="mr-2 tabular-nums" style={{ color: RED }}>
                        {NUMS[i]}
                      </span>
                      {it.title}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                      {it.body}
                    </p>
                  </div>
                ))}
                <p className="col-span-1 border-t border-black/15 py-4 text-[12px] tabular-nums text-black/40 sm:col-span-2">
                  {ecosystem.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── API / Architecture ────────────────────────────── */}
        <section id="andamio-api" className="border-b border-[#111]">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>
                  {api.zoneLabel}
                </p>
                <h2 className="mt-5 text-6xl font-bold leading-[0.9] tracking-[-0.045em] sm:text-8xl">
                  {api.zoneTitle}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-black/65 lg:col-span-5 lg:pl-8">
                {api.zoneBlurb}
              </p>
            </div>

            <div className="grid grid-cols-12 border-t border-[#111]">
              {/* left: prose */}
              <div className="col-span-12 border-black/15 py-12 lg:col-span-5 lg:border-r lg:pr-12">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-black/40">
                  {api.kicker}
                </p>
                <h3 className="mt-4 text-3xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-4xl">
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
                  className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-[#E5322D]"
                >
                  <span className="h-2 w-2" style={{ background: RED }} />
                  {api.apiRefCta}
                </a>
              </div>

              {/* right: stack */}
              <div className="col-span-12 lg:col-span-7">
                {api.stack.map((layer, i) => (
                  <div
                    key={layer.name}
                    className={`grid grid-cols-12 items-baseline gap-4 px-0 py-7 lg:px-10 ${
                      i > 0 ? "border-t border-black/15" : ""
                    }`}
                    style={
                      layer.emphasis
                        ? { background: RED, color: "#fff" }
                        : undefined
                    }
                  >
                    <div className="col-span-12 sm:col-span-3 lg:col-span-3">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                          layer.emphasis ? "text-white/80" : "text-black/40"
                        }`}
                      >
                        {layer.labelKicker}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-9 lg:col-span-9 px-0 sm:px-0">
                      <p className="text-lg font-bold leading-tight tracking-[-0.02em]">
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

        {/* ── Closing ───────────────────────────────────────── */}
        <section className="border-b border-[#111]">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>
                  {closing.eyebrow}
                </p>
                <h2 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.045em]">
                  {closing.headlineLine1}
                  <br />
                  <span style={{ color: RED }}>{closing.headlineLine2}</span>
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-black/65">
                  {closing.body}
                </p>
                <a
                  href={EXTERNAL_LINKS.walkthroughMailto}
                  className="mt-10 inline-flex items-center border border-[#111] px-7 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#E5322D] hover:border-[#E5322D]"
                  style={{ background: INK }}
                >
                  {closing.cta}
                </a>
              </div>
              <div className="col-span-12 mt-12 flex items-end justify-end lg:col-span-4 lg:mt-0">
                <span className="font-bold tabular-nums leading-none tracking-[-0.05em] text-black/10 text-[8rem] sm:text-[11rem]">
                  06
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer>
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-14">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <span className="flex items-baseline gap-2 text-lg font-bold tracking-[-0.04em]">
                  <span className="inline-block h-3 w-3 translate-y-[1px]" style={{ background: RED }} />
                  {nav.brand}
                </span>
                <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-black/55">
                  {footer.tagline}
                </p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-black/45">
                  {footer.meta}
                </p>
                <p className="mt-2 font-mono text-[11px] tabular-nums text-black/40">
                  {footer.copyright}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
                {Object.entries(footer.columns).map(([key, links]) => (
                  <div key={key}>
                    <h3 className="mb-4 border-b border-[#111] pb-2 text-[11px] font-bold uppercase tracking-[0.12em]">
                      {key}
                    </h3>
                    <ul className="space-y-2.5">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-[13px] text-black/60 transition-colors hover:text-[#E5322D]"
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
            <div className="flex items-center justify-between border-t border-[#111] py-5">
              <Link
                href="/explore"
                className="text-[12px] font-bold uppercase tracking-[0.1em] text-black/50 transition-colors hover:text-[#E5322D]"
              >
                ← Back to all iterations
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-black/35">
                Iteration 06 · Swiss Grid
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
