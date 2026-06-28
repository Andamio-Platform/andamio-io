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
 * Iteration 03 — "Brutalist Contrast".
 *
 * Neo-brutalist. Oversized Archivo Black headlines that nearly bleed off the
 * edge, 3px hard black borders, zero border-radius, exposed grid lines, and
 * sections that FLIP between solid black and solid white full-bleed bands.
 * One acid accent (electric yellow). Offset hard drop-shadows, no blur.
 * Fully self-contained — sets its own palette, never touches global theme.
 */

const PAPER = "#FFFFFF";
const INK = "#0A0A0A";
const ACID = "#E8FF00";

const display =
  "'Archivo Black', 'Archivo', system-ui, sans-serif";
const grotesk = "'Space Grotesk', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

// Hard offset shadow helpers (no blur)
const shadowOnLight = { boxShadow: "8px 8px 0 0 #0A0A0A" };
const shadowAcid = { boxShadow: "8px 8px 0 0 #E8FF00" };
const shadowOnDark = { boxShadow: "8px 8px 0 0 #FFFFFF" };

export default function Explore03() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: grotesk }}
    >
      <Head>
        <title>03 · Brutalist Contrast — Andamio</title>
      </Head>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{ background: PAPER, borderBottom: `3px solid ${INK}` }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <span
            className="text-2xl uppercase tracking-tight"
            style={{ fontFamily: display }}
          >
            {nav.brand}
          </span>
          <nav className="hidden items-center lg:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1 text-[13px] font-bold uppercase tracking-wide transition-colors"
                style={{ fontFamily: mono }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = ACID;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="text-[13px] font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            style={{
              fontFamily: mono,
              background: INK,
              color: PAPER,
              border: `3px solid ${INK}`,
              padding: "8px 16px",
            }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero (white band) ───────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: PAPER, borderBottom: `3px solid ${INK}` }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:py-24">
          <div>
            <p
              className="mb-6 inline-block text-[12px] font-bold uppercase tracking-[0.25em]"
              style={{
                fontFamily: mono,
                background: ACID,
                border: `3px solid ${INK}`,
                padding: "4px 12px",
              }}
            >
              {hero.ctaEyebrow}
            </p>
            <h1
              className="uppercase leading-[0.86] tracking-[-0.02em]"
              style={{
                fontFamily: display,
                fontSize: "clamp(3rem,9vw,8rem)",
              }}
            >
              {hero.headlineLead}{" "}
              <span
                style={{
                  background: ACID,
                  padding: "0 0.1em",
                  boxDecorationBreak: "clone",
                  WebkitBoxDecorationBreak: "clone",
                }}
              >
                {hero.headlineAccent}
              </span>
            </h1>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={hero.primaryCta.href}
                className="text-[14px] font-bold uppercase tracking-wide transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{
                  fontFamily: mono,
                  background: INK,
                  color: PAPER,
                  border: `3px solid ${INK}`,
                  padding: "14px 24px",
                  ...shadowAcid,
                }}
              >
                {hero.primaryCta.label} →
              </a>
              <a
                href={hero.secondaryCta.href}
                className="text-[14px] font-bold uppercase tracking-wide transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{
                  fontFamily: mono,
                  background: PAPER,
                  color: INK,
                  border: `3px solid ${INK}`,
                  padding: "14px 24px",
                  ...shadowOnLight,
                }}
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          {/* Badge in a museum-label box */}
          <figure
            className="mx-auto w-full max-w-sm"
            style={{ border: `3px solid ${INK}`, background: PAPER, ...shadowOnLight }}
          >
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ background: INK, color: PAPER }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: mono }}
              >
                Specimen 001
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: mono, color: ACID }}
              >
                On-chain
              </span>
            </div>
            <div className="p-8">
              <img
                src={CREDENTIAL_BADGE_SRC}
                alt={hero.badgeAlt}
                width={420}
                height={420}
                className="mx-auto w-full"
              />
            </div>
            <figcaption
              className="px-4 py-3 text-[12px] leading-snug"
              style={{ borderTop: `3px solid ${INK}`, fontFamily: mono }}
            >
              {hero.badgeCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Problem (BLACK band) ────────────────────────────── */}
      <section style={{ background: INK, color: PAPER }}>
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p
            className="text-[12px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: mono, color: ACID }}
          >
            {problem.kicker}
          </p>
          <h2
            className="mt-5 max-w-4xl uppercase leading-[0.9] tracking-[-0.02em]"
            style={{ fontFamily: display, fontSize: "clamp(2.5rem,6vw,5rem)" }}
          >
            {problem.heading}
          </h2>
          <p
            className="mt-6 max-w-2xl text-xl leading-relaxed"
            style={{ color: "#D4D4D4" }}
          >
            {problem.intro}
          </p>

          <div className="mt-14 grid gap-0 md:grid-cols-3">
            {problem.items.map((p, i) => (
              <div
                key={p.headline}
                className="p-7"
                style={{
                  border: `3px solid ${PAPER}`,
                  // collapse internal borders so the grid lines stay exposed but single-weight
                  marginLeft: i === 0 ? 0 : "-3px",
                  marginTop: "-3px",
                }}
              >
                <span
                  className="block text-5xl tabular-nums"
                  style={{ fontFamily: display, color: ACID }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="mt-4 text-2xl uppercase leading-[0.95]"
                  style={{ fontFamily: display }}
                >
                  {p.headline}
                </h3>
                <p
                  className="mt-4 text-[15px] leading-relaxed"
                  style={{ color: "#B4B4B4" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo / framed specimen (white band) ─────────────── */}
      <section
        id="how-it-works"
        style={{ background: PAPER, color: INK, borderTop: `3px solid ${INK}` }}
      >
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span
              className="text-[12px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: mono }}
            >
              {demo.kicker}
            </span>
            <span
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{
                fontFamily: mono,
                background: ACID,
                border: `3px solid ${INK}`,
                padding: "4px 10px",
              }}
            >
              <span
                className="h-2 w-2 animate-pulse"
                style={{ background: INK }}
              />
              {demo.liveLabel}
            </span>
          </div>

          <div
            className="grid items-stretch gap-0 lg:grid-cols-2"
            style={{ border: `3px solid ${INK}`, ...shadowOnLight }}
          >
            <div className="p-8 lg:p-12">
              <h2
                className="uppercase leading-[0.9] tracking-[-0.01em]"
                style={{ fontFamily: display, fontSize: "clamp(2rem,4vw,3.25rem)" }}
              >
                {demo.title}
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-black/70">
                {demo.note}
              </p>
              <p
                className="mt-8 inline-block text-[14px] font-bold uppercase tracking-wide"
                style={{
                  fontFamily: mono,
                  borderBottom: `3px solid ${INK}`,
                  paddingBottom: "2px",
                }}
              >
                {demo.inspirationCta} →
              </p>
            </div>

            {/* Museum-label specimen box */}
            <div
              className="flex flex-col"
              style={{ borderLeft: `3px solid ${INK}`, background: ACID }}
            >
              <div
                className="px-4 py-2"
                style={{ borderBottom: `3px solid ${INK}` }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.25em]"
                  style={{ fontFamily: mono }}
                >
                  Live specimen · derived hashes →
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center p-10">
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={360}
                  height={360}
                  className="w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Issuer (BLACK band) ─────────────────────────────── */}
      <section
        id="issuer"
        style={{ background: INK, color: PAPER, borderTop: `3px solid ${INK}` }}
      >
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p
            className="inline-block text-[12px] font-bold uppercase tracking-[0.25em]"
            style={{
              fontFamily: mono,
              background: ACID,
              color: INK,
              padding: "4px 12px",
            }}
          >
            {issuer.productLabel}
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2
              className="uppercase leading-[0.82] tracking-[-0.02em]"
              style={{ fontFamily: display, fontSize: "clamp(3rem,8vw,7rem)" }}
            >
              {issuer.title}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed" style={{ color: "#C4C4C4" }}>
              {issuer.intro}
            </p>
          </div>

          <p
            className="mt-16 max-w-3xl text-2xl uppercase leading-[1.05] sm:text-4xl"
            style={{ fontFamily: display }}
          >
            {issuer.decisionsHeading}
          </p>

          <div className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {issuer.decisions.map((d, i) => (
              <div
                key={d.title}
                className="p-7"
                style={{
                  border: `3px solid ${PAPER}`,
                  marginTop: "-3px",
                  marginLeft: "-3px",
                }}
              >
                <span
                  className="text-3xl tabular-nums"
                  style={{ fontFamily: mono, color: ACID }}
                >
                  [0{i + 1}]
                </span>
                <h3
                  className="mt-3 text-xl uppercase leading-[0.98]"
                  style={{ fontFamily: display }}
                >
                  {d.title}
                </h3>
                <p
                  className="mt-3 text-[14px] leading-relaxed"
                  style={{ color: "#ABABAB" }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <span
              className="cursor-not-allowed text-[14px] font-bold uppercase tracking-wide opacity-40"
              style={{
                fontFamily: mono,
                border: `3px solid ${PAPER}`,
                padding: "14px 24px",
              }}
              aria-disabled="true"
            >
              {issuer.reportCta}
            </span>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="text-[14px] font-bold uppercase tracking-wide transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{
                fontFamily: mono,
                background: ACID,
                color: INK,
                border: `3px solid ${ACID}`,
                padding: "14px 24px",
                ...shadowOnDark,
              }}
            >
              {issuer.walkthroughCta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── Ecosystem (ACID band) ───────────────────────────── */}
      <section
        style={{ background: ACID, color: INK, borderTop: `3px solid ${INK}` }}
      >
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p
            className="text-[12px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: mono }}
          >
            {ecosystem.kicker}
          </p>
          <p
            className="mt-6 max-w-4xl uppercase leading-[0.95] tracking-[-0.01em]"
            style={{ fontFamily: display, fontSize: "clamp(1.75rem,4vw,3rem)" }}
          >
            {ecosystem.lead}
          </p>
          <div className="mt-12 grid gap-0 sm:grid-cols-2">
            {ecosystem.items.map((it, i) => (
              <div
                key={it.title}
                className="p-7"
                style={{
                  border: `3px solid ${INK}`,
                  marginLeft: i === 0 ? 0 : "-3px",
                  background: PAPER,
                }}
              >
                <p
                  className="text-xl uppercase"
                  style={{ fontFamily: display }}
                >
                  {it.title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-black/70">
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mt-6 text-[12px] font-bold uppercase tracking-wider"
            style={{ fontFamily: mono }}
          >
            {ecosystem.footnote}
          </p>
        </div>
      </section>

      {/* ── API / Architecture (white band) ─────────────────── */}
      <section
        id="andamio-api"
        style={{ background: PAPER, color: INK, borderTop: `3px solid ${INK}` }}
      >
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p
            className="inline-block text-[12px] font-bold uppercase tracking-[0.25em]"
            style={{
              fontFamily: mono,
              background: INK,
              color: PAPER,
              padding: "4px 12px",
            }}
          >
            {api.zoneLabel}
          </p>
          <h2
            className="mt-6 uppercase leading-[0.82] tracking-[-0.02em]"
            style={{ fontFamily: display, fontSize: "clamp(3rem,8vw,7rem)" }}
          >
            {api.zoneTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/70">
            {api.zoneBlurb}
          </p>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p
                className="text-[12px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: mono }}
              >
                {api.kicker}
              </p>
              <h3
                className="mt-4 uppercase leading-[0.9] tracking-[-0.01em]"
                style={{ fontFamily: display, fontSize: "clamp(2rem,4vw,3.5rem)" }}
              >
                {api.heading}
              </h3>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-black/70">
                {api.body1}
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-black/60">
                {api.body2}
              </p>
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="mt-8 inline-block text-[14px] font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                style={{
                  fontFamily: mono,
                  background: ACID,
                  border: `3px solid ${INK}`,
                  padding: "12px 20px",
                  ...shadowOnLight,
                }}
              >
                {api.apiRefCta} →
              </a>
            </div>

            {/* Stack — exposed grid, emphasis layer flips to acid */}
            <div style={{ border: `3px solid ${INK}`, ...shadowOnLight }}>
              {api.stack.map((layer, i) => (
                <div
                  key={layer.name}
                  className="px-7 py-6"
                  style={{
                    borderTop: i > 0 ? `3px solid ${INK}` : undefined,
                    background: layer.emphasis ? ACID : PAPER,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/60"
                      style={{ fontFamily: mono }}
                    >
                      {layer.labelKicker}
                    </p>
                    {layer.emphasis && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{
                          fontFamily: mono,
                          background: INK,
                          color: ACID,
                          padding: "2px 8px",
                        }}
                      >
                        You build here
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-2 text-2xl uppercase leading-none"
                    style={{ fontFamily: display }}
                  >
                    {layer.name}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-black/70">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing (BLACK band) ────────────────────────────── */}
      <section
        style={{ background: INK, color: PAPER, borderTop: `3px solid ${INK}` }}
      >
        <div className="mx-auto max-w-5xl px-5 py-28 text-center">
          <p
            className="inline-block text-[12px] font-bold uppercase tracking-[0.25em]"
            style={{
              fontFamily: mono,
              background: ACID,
              color: INK,
              padding: "4px 12px",
            }}
          >
            {closing.eyebrow}
          </p>
          <h2
            className="mt-8 uppercase leading-[0.85] tracking-[-0.02em]"
            style={{ fontFamily: display, fontSize: "clamp(2.75rem,7vw,6rem)" }}
          >
            {closing.headlineLine1}
            <br />
            <span style={{ background: ACID, color: INK, padding: "0 0.1em" }}>
              {closing.headlineLine2}
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed" style={{ color: "#C4C4C4" }}>
            {closing.body}
          </p>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="mt-10 inline-block text-[15px] font-bold uppercase tracking-wide transition-transform hover:-translate-x-1 hover:-translate-y-1"
            style={{
              fontFamily: mono,
              background: ACID,
              color: INK,
              border: `3px solid ${ACID}`,
              padding: "16px 28px",
              ...shadowOnDark,
            }}
          >
            {closing.cta} →
          </a>
        </div>
      </section>

      {/* ── Footer (white band) ─────────────────────────────── */}
      <footer
        style={{ background: PAPER, color: INK, borderTop: `3px solid ${INK}` }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_2fr]">
          <div className="max-w-xs">
            <span className="text-2xl uppercase" style={{ fontFamily: display }}>
              {nav.brand}
            </span>
            <p className="mt-4 text-[14px] leading-relaxed text-black/65">
              {footer.tagline}
            </p>
            <p
              className="mt-5 inline-block text-[11px] font-bold uppercase tracking-wide"
              style={{
                fontFamily: mono,
                background: ACID,
                border: `3px solid ${INK}`,
                padding: "4px 10px",
              }}
            >
              {footer.meta}
            </p>
            <p className="mt-4 text-[12px] text-black/50" style={{ fontFamily: mono }}>
              {footer.copyright}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footer.columns).map(([key, links]) => (
              <div key={key}>
                <h3
                  className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em]"
                  style={{ fontFamily: mono, borderBottom: `3px solid ${INK}`, paddingBottom: "6px" }}
                >
                  {key}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[14px] text-black/70 transition-colors"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = ACID;
                          e.currentTarget.style.color = INK;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(0,0,0,0.7)";
                        }}
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
        <div style={{ borderTop: `3px solid ${INK}` }}>
          <div className="mx-auto max-w-7xl px-5 py-5">
            <Link
              href="/explore"
              className="text-[12px] font-bold uppercase tracking-wide"
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
