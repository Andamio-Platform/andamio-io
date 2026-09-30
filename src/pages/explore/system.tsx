"use client";

import Head from "next/head";
import Link from "next/link";
import {
  color,
  font,
  display,
  typeScale,
  layout,
  accentPolicy,
  motion as motionTok,
  SECTIONS,
} from "~/ui/system/tokens";
import {
  Kicker,
  Button,
  ButtonRow,
  DataList,
  StackLayers,
  NumberWatermark,
  Display,
} from "~/ui/system/kit";
import { InstrumentSpecimens } from "~/ui/system/instrument/Specimens";
import { hero } from "~/ui/explore/content";
import { MiniBadge } from "~/ui/system/instrument";

/**
 * Living style guide for the Andamio Landing design system.
 * Renders the real tokens + components so the system is inspectable, not just
 * described. See it composed into the full page at / (the live landing).
 */

const SANS = font.sans;
const MONO = font.mono;

function Block({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t py-16" style={{ borderColor: color.rule }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-baseline gap-4">
          <span className="text-sm tabular-nums" style={{ fontFamily: MONO, color: color.inkGhost }}>
            {n}
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

const swatches: { name: string; value: string; role: string }[] = [
  { name: "paper", value: color.paper, role: "Page background" },
  { name: "ink", value: color.ink, role: "Primary text · solid rules" },
  { name: "inkMuted", value: color.inkMuted, role: "Body / secondary text" },
  { name: "inkFaint", value: color.inkFaint, role: "Labels, meta" },
  { name: "inkGhost", value: color.inkGhost, role: "Faintest text" },
  { name: "rule", value: color.rule, role: "Section dividers" },
  { name: "cell", value: color.cell, role: "Sub-dividers" },
  { name: "grid", value: color.grid, role: "Faint 12-col field" },
  { name: "orange", value: color.orange, role: "Acts: one primary CTA per view" },
  { name: "surface", value: color.surface, role: "Raised navy: cards, readouts" },
  { name: "cyan", value: color.cyan, role: "Explains: links, data, focus" },
  { name: "coralTint", value: color.coralTint, role: "Specimen plate tint" },
];

const principles = [
  "Type is Inter semibold (600) for display — tight tracking, ~0.92 leading. JetBrains Mono only for labels, numbers, and readouts. Never a serif.",
  "Color comes from the Proof Ring badge: deep navy page, raised navy surfaces, cream text. Cyan explains (links, data, focus); orange acts (one primary action per view, live states).",
  "Every mark encodes something real: ticks count, arcs trace a lifecycle, corner ticks frame evidence. No gradient text, no glass cards, no three-icon grids.",
  "Structure: a faint fixed 12-column grid, a 1320px measure, generous vertical rhythm with full-width ink hairline rules.",
  "The lead / hero section carries no bottom rule — it flows into the first section's header, never closing with a heavy divider.",
  "Section-header rules carry no trailing meta text. The rule runs clean to the edge of the measure — no faint labels floating on it.",
  "The hero is full-bleed type with the credential withheld; it is revealed by a sideways scroll into a museum-specimen frame.",
  "Wayfinding is an editorial margin rail — a progress annotation, not app furniture.",
];

export default function SystemPage() {
  return (
    <div className="min-h-screen" style={{ background: color.paper, color: color.ink, fontFamily: SANS }}>
      <Head>
        <title>Design System — Andamio Landing</title>
      </Head>

      {/* header */}
      <header className="mx-auto max-w-5xl px-6 pb-10 pt-20">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5" style={{ background: color.orange }} />
          <span className="text-[17px] font-semibold tracking-[-0.04em]">Andamio</span>
          <span className="text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: color.inkGhost }}>
            Design System
          </span>
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          The Proof instrument system
        </h1>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: color.inkMuted }}>
          The tokens and components behind the chosen landing direction. Every
          piece below is the real, live thing — not a screenshot.{" "}
          <Link href="/" className="font-medium underline-offset-2 hover:underline" style={{ color: color.cyan }}>
            See it composed into the full page →
          </Link>
        </p>
      </header>

      {/* principles */}
      <Block n="00" title="Principles">
        <ol className="space-y-3">
          {principles.map((p, i) => (
            <li key={i} className="grid grid-cols-[28px_1fr] gap-3 text-[15px] leading-relaxed">
              <span className="tabular-nums" style={{ fontFamily: MONO, color: color.cyan }}>
                0{i + 1}
              </span>
              <span style={{ color: color.inkMuted }}>{p}</span>
            </li>
          ))}
        </ol>
      </Block>

      {/* color */}
      <Block n="01" title="Color">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {swatches.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-lg border" style={{ borderColor: color.cell }}>
              <div className="h-16 border-b" style={{ background: s.value, borderColor: color.cell }} />
              <div className="px-3 py-2.5">
                <p className="text-[13px] font-semibold">{s.name}</p>
                <p className="text-[11px] tabular-nums" style={{ fontFamily: MONO, color: color.inkGhost }}>
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug" style={{ color: color.inkFaint }}>
                  {s.role}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-3 border-t pt-6" style={{ borderColor: color.cell }}>
          {(
            [
              ["Orange", accentPolicy.orange, color.orange],
              ["Cyan", accentPolicy.cyan, color.cyan],
              ["Coral", accentPolicy.coral, color.orange],
            ] as const
          ).map(([k, v, c]) => (
            <p key={k} className="grid grid-cols-[88px_1fr] gap-3 text-[13px] leading-relaxed">
              <span className="flex items-center gap-2 font-semibold">
                <span className="inline-block h-2.5 w-2.5" style={{ background: c }} />
                {k}
              </span>
              <span style={{ color: color.inkMuted }}>{v}</span>
            </p>
          ))}
        </div>
      </Block>

      {/* type */}
      <Block n="02" title="Typography">
        <p className="text-[13px]" style={{ color: color.inkMuted }}>
          Display: Inter {display.weight}, tracking {display.tracking}, leading {display.leading}. Labels: JetBrains Mono.
        </p>
        <div className="mt-8 space-y-6">
          {(Object.keys(typeScale) as (keyof typeof typeScale)[]).map((k) => (
            <div key={k} className="border-t pt-5" style={{ borderColor: color.cell }}>
              <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: color.inkGhost }}>
                {k} · {typeScale[k]}
              </span>
              <Display size={k} className="mt-2">
                Badges are due for an <span style={{ color: color.orange }}>upgrade</span>
              </Display>
            </div>
          ))}
          <div className="border-t pt-5" style={{ borderColor: color.cell }}>
            <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: color.inkGhost }}>
              kicker · sentence case, orange tile, never all-caps
            </span>
            <div className="mt-3">
              <Kicker>The problem with badges</Kicker>
            </div>
          </div>
        </div>
      </Block>

      {/* buttons */}
      <Block n="03" title="Buttons">
        <ButtonRow>
          <Button variant="chip">Learn how</Button>
          <Button variant="primary" href="#">Primary CTA →</Button>
          <Button variant="outline" href="#">Secondary →</Button>
        </ButtonRow>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="ink" href="#">Ink</Button>
          <Button variant="disabled">Disabled soon</Button>
        </div>
      </Block>

      {/* wayfinding rail (static sample) */}
      <Block n="04" title="Editorial rail (wayfinding)">
        <p className="text-[13px]" style={{ color: color.inkMuted }}>
          Fixed in the right margin on xl+, de-chromed (no panel). Active section: ink-bold label + a longer blue tick. Sample states:
        </p>
        <nav className="mt-6 flex w-[220px] flex-col items-end gap-3.5" style={{ fontFamily: MONO }}>
          {SECTIONS.slice(0, 5).map((s, i) => {
            const isActive = i === 1;
            return (
              <span key={s.id} className="flex items-center gap-3">
                <span
                  className="text-[10px] tracking-[0.06em]"
                  style={{ color: isActive ? color.ink : color.inkGhost, fontWeight: isActive ? 600 : 400 }}
                >
                  {s.label}
                </span>
                <span
                  className="inline-block h-px"
                  style={{ width: isActive ? 24 : 8, background: isActive ? color.cyan : "rgba(10,10,10,0.22)" }}
                />
              </span>
            );
          })}
        </nav>
      </Block>

      {/* specimen + data + stack */}
      <Block n="05" title="Specimen reveal">
        <p className="text-[13px]" style={{ color: color.inkMuted }}>
          The signature interaction. The credential slides in sideways on scroll into a museum-specimen frame. Scroll to animate.
        </p>
        <div className="mt-8 max-w-xl">
          <MiniBadge size={220} label={hero.badgeAlt} />
        </div>
      </Block>

      <Block n="06" title="Data readout & stack layers">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: color.inkGhost }}>
              DataList
            </span>
            <div className="mt-3">
              <DataList rows={[["format", "SVG · machine-readable"], ["registry", "On-chain · Cardano"], ["status", "Verifiable"]]} />
            </div>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: color.inkGhost }}>
              StackLayers (emphasis layer in ink + orange tick)
            </span>
            <div className="mt-3 border" style={{ borderColor: color.cell }}>
              <StackLayers
                layers={[
                  { labelKicker: "Your surface", name: "What you already run", description: "Your LMS, CRM, or app. Stays where it is.", emphasis: false },
                  { labelKicker: "Integration", name: "Andamio API", description: "REST endpoints — issue, verify, gate.", emphasis: true },
                  { labelKicker: "Settlement", name: "Cardano mainnet", description: "Audited contracts. Permanent.", emphasis: false },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: color.inkGhost }}>
            NumberWatermark
          </span>
          <NumberWatermark>01</NumberWatermark>
        </div>
      </Block>

      {/* layout + motion */}
      <Block n="07" title="Layout & motion">
        <dl className="grid gap-x-8 gap-y-3 text-[14px] sm:grid-cols-2" style={{ color: color.inkMuted }}>
          {[
            ["Measure", `${layout.maxWidth}px`],
            ["Columns", `${layout.columns} (faint grid)`],
            ["Container padding", layout.padX],
            ["Section rhythm", layout.padY],
            ["Reveal — badge X", motionTok.badgeX.join(" → ")],
            ["Reveal — frame width", motionTok.frameWidth.join(" → ")],
            ["Reveal — offset", motionTok.revealOffset.join(" / ")],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b py-2" style={{ borderColor: color.cell }}>
              <dt style={{ fontFamily: MONO, color: color.inkFaint }}>{k}</dt>
              <dd className="text-right" style={{ fontFamily: MONO, color: color.ink }}>{v}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block n="08" title="Instrument kit">
        <InstrumentSpecimens />
      </Block>

      <footer className="border-t py-10 text-center" style={{ borderColor: color.rule }}>
        <Link href="/explore" className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ fontFamily: MONO, color: color.inkFaint }}>
          ← Back to all iterations
        </Link>
      </footer>
    </div>
  );
}
