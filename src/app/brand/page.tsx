"use client";

/**
 * /brand — the human-readable Andamio Brand Guide, rendered on the Warm Index
 * design system itself (the page is its own proof). Canon lives in
 * docs/design-system/andamio-brand-guide.md and src/ui/system/tokens.ts; this
 * page renders it. Self-styled light, so the segment's dark ThemeProvider
 * layout (kept for /brand/flyer + /brand/developers) doesn't affect it.
 */

import { useState } from "react";
import { nav, footer as footerData, CREDENTIAL_BADGE_SRC, hero } from "~/ui/explore/content";
import { color, font, typeScale, space } from "~/ui/system/tokens";
import {
  Page,
  Section,
  SectionHead,
  Kicker,
  Display,
  Button,
  Hairline,
  SpecimenReveal,
  Footer,
  type RailItem,
} from "~/ui/system/kit";

const mono = { fontFamily: font.mono };
const muted = { color: color.inkMuted };

const rail: RailItem[] = [
  { id: "overview", label: "Overview" },
  { id: "logo", label: "Logo" },
  { id: "color", label: "Color" },
  { id: "discipline", label: "Accent discipline" },
  { id: "type", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "motion", label: "Motion" },
  { id: "voice", label: "Voice" },
  { id: "components", label: "Components" },
  { id: "access", label: "Accessibility" },
  { id: "assets", label: "Assets" },
];

const neutrals = [
  ["paper", "#FFFFFF", "Background"],
  ["ink", "#0A0A0A", "Primary text · rules"],
  ["inkMuted", "rgba(10,10,10,0.60)", "Body text"],
  ["inkFaint", "rgba(10,10,10,0.45)", "Tertiary labels"],
  ["inkGhost", "rgba(10,10,10,0.30)", "Faint meta"],
  ["inkWatermark", "rgba(10,10,10,0.10)", "Oversized numerals"],
  ["cell", "rgba(10,10,10,0.15)", "Inner dividers · edges"],
  ["grid", "rgba(10,10,10,0.05)", "Structural grid"],
] as const;

const accents = [
  ["orange", "#FF6B35", "Brand signal — sparing. Mark · the one primary CTA · live pulse · VERIFIED."],
  ["blue", "#2F6BFF", "Wayfinding + data only — links, nav-active, the rail. Never a fill."],
  ["coralTint", "rgba(255,107,74,0.055)", "Credential-plate background tint only. Never type."],
] as const;

const states = [
  ["error", "#EC2929", "#FFFFFF", "Errors · destructive confirm"],
  ["success", "#008149", "#FFFFFF", "Success · completion"],
  ["warning", "#ED990E", "#0A0A0A", "Caution (ink foreground)"],
  ["info", "#0F74C5", "#FFFFFF", "Neutral information"],
] as const;

const scale: [keyof typeof typeScale, string][] = [
  ["hero", "Marketing hero"],
  ["xl", "Section titles"],
  ["lg", "Sub-heads"],
  ["md", "Card titles"],
  ["sm", "Leads"],
];

const spaceRoles: [string, string, string][] = [
  ["sectionY", "py-16 sm:py-24", "Section content rhythm"],
  ["headerTop", "pt-16 sm:pt-24", "Page-header top"],
  ["cardPad", "p-6", "Card / panel interior"],
  ["gapTight", "gap-2", "Label ↔ value · icon ↔ text"],
  ["gap", "gap-4", "Default flex / grid gap"],
  ["gapRow", "gap-y-10", "Between grid rows"],
  ["rhythmTight", "mt-3", "Closely-related elements"],
  ["rhythm", "mt-6", "Heading → body"],
  ["rhythmGroup", "mt-12", "Block → block"],
];

/* ── small helpers ─────────────────────────────────────────────────── */
function CopyHex({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1100);
      }}
      className="text-[11px] uppercase tracking-[0.1em] tabular-nums transition-colors hover:text-black"
      style={{ ...mono, color: copied ? color.blue : color.inkFaint }}
      title="Copy"
    >
      {copied ? "copied ✓" : value}
    </button>
  );
}

function Swatch({
  name,
  value,
  role,
  fg,
}: {
  name: string;
  value: string;
  role: string;
  fg?: string;
}) {
  return (
    <div style={{ border: `1px solid ${color.cell}` }}>
      <div className="flex h-24 items-end p-3" style={{ background: value }}>
        {fg && (
          <span className="text-lg font-semibold" style={{ color: fg }}>
            Aa
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] font-semibold tracking-[-0.01em]">{name}</span>
          <CopyHex value={value} />
        </div>
        <p className="mt-1.5 text-[13px] leading-snug" style={muted}>
          {role}
        </p>
      </div>
    </div>
  );
}

function Rule({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 py-3" style={{ borderTop: `1px solid ${color.cell}` }}>
      <span
        aria-hidden
        className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-[11px] font-bold"
        style={{ color: ok ? color.blue : color.orange }}
      >
        {ok ? "✓" : "✕"}
      </span>
      <span className="text-[14px] leading-relaxed" style={muted}>
        {children}
      </span>
    </li>
  );
}

export default function BrandPage() {
  return (
    <Page nav={{ items: nav.items, cta: nav.cta }} sections={rail}>
      {/* ── Overview ───────────────────────────────────────────── */}
      <Section id="overview" bordered={false}>
        <div className="flex items-center gap-4 pt-16 sm:pt-24">
          <Kicker>Brand Guide</Kicker>
          <Hairline />
          <span className="text-[11px] uppercase tracking-[0.16em]" style={{ ...mono, color: color.inkGhost }}>
            v1.0 · locked
          </span>
        </div>

        <Display as="h1" size="xl" className="mt-10 max-w-[18ch]">
          Andamio brand guidelines
        </Display>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed" style={muted}>
          How Andamio looks and sounds. These values are canonical — the
          marketing site and the app both build from them.
        </p>

        <div className="mt-10 grid gap-px sm:grid-cols-3" style={{ background: color.cell }}>
          {[
            ["Restraint", "Orange marks one thing per view — the primary action or a verified state. Nothing else."],
            ["Ink on paper", "Near-black on white carries the page. Blue is for links and wayfinding only."],
            ["Deliberate motion", "Credentials resolve with a physical reveal, not a fade."],
          ].map(([h, b]) => (
            <div key={h} className="p-6" style={{ background: color.paper }}>
              <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{h}</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={muted}>
                {b}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Logo ───────────────────────────────────────────────── */}
      <Section id="logo">
        <SectionHead kicker="Logo" />
        <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-4 lg:pr-10">
            <Display as="h2" size="md">
              Mark + logotype
            </Display>
            <p className="mt-6 text-[15px] leading-relaxed" style={muted}>
              Primary lockup: the mark with the ANDAMIO wordmark. The mark uses
              the brand orange <code style={mono}>#FF6B35</code>, so the logo and
              UI accent always match. Leave clear space of at least the
              mark&apos;s height around it.
            </p>
            <ul className="mt-6">
              <Rule ok>Use the lockup in nav (~22px) and footer (~30px).</Rule>
              <Rule ok>On dark surfaces, use the dark / orange-bg variant.</Rule>
              <Rule ok={false}>Don&apos;t recolor, stretch, or add effects.</Rule>
              <Rule ok={false}>Don&apos;t split mark from wordmark in primary placements.</Rule>
            </ul>
          </div>
          <div className="col-span-12 grid gap-px sm:grid-cols-2 lg:col-span-8" style={{ background: color.cell }}>
            <div className="flex items-center justify-center p-10" style={{ background: color.paper }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-with-typography.svg" alt="Andamio" className="h-auto w-[220px]" />
            </div>
            <div className="flex items-center justify-center p-10" style={{ background: color.ink }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-with-typography-dark.svg" alt="Andamio (dark)" className="h-auto w-[220px]" />
            </div>
            <div className="flex items-center justify-center p-10 sm:col-span-2" style={{ background: color.paper }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-with-typography-stacked.svg" alt="Andamio (stacked)" className="h-auto w-[150px]" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Color ──────────────────────────────────────────────── */}
      <Section id="color">
        <SectionHead kicker="Color" />
        <div className="py-16 sm:py-24">
          <Display as="h2" size="md">
            One ink, one paper, three accents, four states.
          </Display>

          <h3 className="mt-12 text-[12px] font-semibold uppercase tracking-[0.14em]" style={mono}>
            Neutrals
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {neutrals.map(([n, v, r]) => (
              <Swatch key={n} name={n} value={v} role={r} />
            ))}
          </div>

          <h3 className="mt-12 text-[12px] font-semibold uppercase tracking-[0.14em]" style={mono}>
            Accents
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {accents.map(([n, v, r]) => (
              <Swatch key={n} name={n} value={v} role={r} fg={n === "blue" ? "#FFFFFF" : undefined} />
            ))}
          </div>

          <h3 className="mt-12 text-[12px] font-semibold uppercase tracking-[0.14em]" style={mono}>
            Semantic states <span style={{ color: color.inkFaint }}>· coexist with accents, never override them</span>
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {states.map(([n, v, fg, r]) => (
              <Swatch key={n} name={n} value={v} role={r} fg={fg} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Accent discipline ──────────────────────────────────── */}
      <Section id="discipline">
        <SectionHead kicker="Accent discipline" />
        <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-5 lg:pr-12">
            <Display as="h2" size="md">
              Where each accent is allowed.
            </Display>
            <p className="mt-6 text-[15px] leading-relaxed" style={muted}>
              Orange marks one action or state per view; blue is for links and
              wayfinding. Used sparingly, the accents stay meaningful.
            </p>
            <ul className="mt-6">
              <Rule ok>Orange: the mark, the one primary CTA, live, verified.</Rule>
              <Rule ok>Blue: links, nav-active, the rail, data — only.</Rule>
              <Rule ok={false}>Never orange headings, body, or a second CTA.</Rule>
              <Rule ok={false}>Never blue as a button fill (the shadcn `secondary` trap).</Rule>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="grid gap-px sm:grid-cols-2" style={{ background: color.cell }}>
              <div className="p-6" style={{ background: color.paper }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ ...mono, color: color.blue }}>
                  Do
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button variant="primary">Get started →</Button>
                  <Button variant="outline">Learn more</Button>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed">
                  Verifiable credentials,{" "}
                  <a href="#" className="font-medium" style={{ color: color.blue }}>
                    on Cardano
                  </a>
                  . One orange action; blue is the link.
                </p>
              </div>
              <div className="p-6" style={{ background: color.paper }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ ...mono, color: color.orange }}>
                  Don&apos;t
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button variant="primary">Get started →</Button>
                  <span
                    className="inline-flex items-center px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white"
                    style={{ background: color.blue }}
                  >
                    Sign up
                  </span>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed" style={{ color: color.orange }}>
                  Orange headlines &amp; two CTAs — the brand signal goes mute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Typography ─────────────────────────────────────────── */}
      <Section id="type">
        <SectionHead kicker="Typography" />
        <div className="py-16 sm:py-24">
          <Display as="h2" size="md">
            Two typefaces: Inter and JetBrains Mono.
          </Display>

          <div className="mt-12 grid grid-cols-12 gap-y-10">
            <div className="col-span-12 lg:col-span-7 lg:pr-12">
              {scale.map(([k, desc]) => (
                <div key={k} className="py-4" style={{ borderTop: `1px solid ${color.cell}` }}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkFaint }}>
                      {k}
                    </span>
                    <span className="text-[11px] tabular-nums" style={{ ...mono, color: color.inkGhost }}>
                      {typeScale[k]}
                    </span>
                  </div>
                  <div
                    className="mt-2 font-semibold"
                    style={{ fontFamily: font.sans, fontSize: typeScale[k], letterSpacing: "-0.045em", lineHeight: 0.95 }}
                  >
                    {desc}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="p-6" style={{ border: `1px solid ${color.cell}` }}>
                <p className="text-[11px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkFaint }}>
                  Inter — sans
                </p>
                <p className="mt-3 text-5xl font-semibold tracking-[-0.045em]" style={{ fontFamily: font.sans }}>
                  Aa Bb Cc
                </p>
                <p className="mt-1 text-[13px]" style={muted}>
                  Weights 400 · 500 · 600. Display at 600, tracking −0.045em.
                </p>
                <Hairline strong={false} />
                <p className="mt-6 text-[11px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkFaint }}>
                  JetBrains Mono — labels &amp; data
                </p>
                <p className="mt-3 text-3xl font-semibold" style={mono}>
                  Aa 0123 — //
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em]" style={{ ...mono, color: color.inkMuted }}>
                  Kicker · 11px · 0.18em · never orange
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Spacing ────────────────────────────────────────────── */}
      <Section id="spacing">
        <SectionHead kicker="Spacing" />
        <div className="py-16 sm:py-24">
          <Display as="h2" size="md">
            A 4px scale, used through roles.
          </Display>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed" style={muted}>
            Every margin, padding, and gap is a step on the scale, applied through
            a named role. Same role, same step — on both surfaces.
          </p>

          <div className="mt-12 grid grid-cols-12 gap-y-10">
            <div className="col-span-12 lg:col-span-5 lg:pr-12">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={mono}>
                Step scale · px
              </h3>
              <div className="mt-6">
                {Object.entries(space.scale).map(([name, px]) => (
                  <div key={name} className="flex items-center gap-4 py-3" style={{ borderTop: `1px solid ${color.cell}` }}>
                    <span className="w-10 text-[12px]" style={{ ...mono, color: color.inkFaint }}>
                      {name}
                    </span>
                    <span className="w-8 text-right text-[12px] tabular-nums" style={{ ...mono, color: color.inkGhost }}>
                      {px}
                    </span>
                    <span className="h-3 shrink-0" style={{ width: px, background: color.ink }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={mono}>
                Roles
              </h3>
              <div className="mt-6">
                {spaceRoles.map(([role, cls, usage]) => (
                  <div
                    key={role}
                    className="grid grid-cols-12 items-baseline gap-3 py-3"
                    style={{ borderTop: `1px solid ${color.cell}` }}
                  >
                    <span className="col-span-12 text-[13px] font-semibold tracking-[-0.01em] sm:col-span-4">
                      {role}
                    </span>
                    <span className="col-span-6 text-[12px] sm:col-span-4" style={{ ...mono, color: color.blue }}>
                      {cls}
                    </span>
                    <span className="col-span-6 text-[13px] sm:col-span-4" style={muted}>
                      {usage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Motion ─────────────────────────────────────────────── */}
      <Section id="motion">
        <SectionHead kicker="Motion" live liveLabel="Live" />
        <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-4 lg:pr-10">
            <Display as="h2" size="md">
              Credentials resolve with motion.
            </Display>
            <p className="mt-6 text-[15px] leading-relaxed" style={muted}>
              The signature gesture: a credential is withheld, then revealed by a
              deliberate, physical motion. Scroll the frame to see it. Reuse the{" "}
              <em>feel</em> — not the frame — for mint and verify moments in the app.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <SpecimenReveal src={CREDENTIAL_BADGE_SRC} alt={hero.badgeAlt} caption={hero.badgeCaption} />
          </div>
        </div>
      </Section>

      {/* ── Voice ──────────────────────────────────────────────── */}
      <Section id="voice">
        <SectionHead kicker="Voice" />
        <div className="py-16 sm:py-24">
          <Display as="h2" size="md" className="max-w-[20ch]">
            Confident, plain, human.
          </Display>
          <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: color.cell }}>
            {[
              ["The promise", "Verifiable credentials that keep working after you issue them — a credentialing company that happens to use blockchain."],
              ["Hero by surface", "Marketing leads with the issuer; the app leads with the learner. One hero per surface, never mixed."],
              ["Restraint", "Say the one important thing and stop. No hype, no blockchain-maximalism."],
            ].map(([h, b]) => (
              <div key={h} className="p-6" style={{ background: color.paper }}>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{h}</h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={muted}>
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Components ─────────────────────────────────────────── */}
      <Section id="components">
        <SectionHead kicker="Components" />
        <div className="py-16 sm:py-24">
          <Display as="h2" size="md">
            One primary action per view.
          </Display>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="ink">Ink</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="chip">Chip</Button>
            <Button variant="disabled">Disabled</Button>
          </div>
          <p className="mt-6 max-w-2xl text-[14px] leading-relaxed" style={muted}>
            One <strong>primary</strong> (orange) action per view; everything else
            is ink, outline, or ghost. Blue is never a fill. Section-header rules
            carry no trailing text. Build a shared <code style={mono}>PageHeader</code>
            {" "}before broad use.
          </p>
        </div>
      </Section>

      {/* ── Accessibility ──────────────────────────────────────── */}
      <Section id="access">
        <SectionHead kicker="Accessibility" />
        <div className="py-16 sm:py-24">
          <Display as="h2" size="md">
            Color contrast.
          </Display>
          <ul className="mt-8 max-w-3xl">
            <Rule ok>Ink on paper ≈ 20:1. Blue links ≈ 4.5:1 — passes AA for body.</Rule>
            <Rule ok={false}>Orange on white ≈ 3:1 — fails AA for small text. Use it as a fill with large bold labels, never small text.</Rule>
            <Rule ok={false}>Warning amber needs an ink foreground, not white.</Rule>
            <Rule ok>Never encode meaning in color alone — pair with an icon or label.</Rule>
          </ul>
        </div>
      </Section>

      {/* ── Assets ─────────────────────────────────────────────── */}
      <Section id="assets" bordered={false}>
        <SectionHead kicker="Assets" />
        <div className="py-16 sm:py-24">
          <Display as="h2" size="md">
            Downloads &amp; references.
          </Display>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="primary" href="/logo-with-typography.svg">
              Logo (light) ↓
            </Button>
            <Button variant="outline" href="/logo-with-typography-dark.svg">
              Logo (dark) ↓
            </Button>
            <Button variant="outline" href="/logo-with-typography-stacked.svg">
              Stacked ↓
            </Button>
            <Button variant="ink" href="/explore/system">
              Living style guide →
            </Button>
          </div>
          <p className="mt-6 max-w-2xl text-[13px] leading-relaxed" style={muted}>
            Machine-readable tokens: <code style={mono}>src/ui/system/tokens.ts</code>.
            Full written canon &amp; conformance checklist:{" "}
            <code style={mono}>docs/design-system/andamio-brand-guide.md</code>.
          </p>
        </div>
      </Section>

      <Footer
        tagline={footerData.tagline}
        meta={footerData.meta}
        copyright={footerData.copyright}
        columns={footerData.columns}
        backHref="/"
        backLabel="← Back to home"
        caption="Brand Guide"
      />
    </Page>
  );
}
