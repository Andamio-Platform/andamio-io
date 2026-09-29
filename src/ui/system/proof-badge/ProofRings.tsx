import React, { memo, useMemo } from "react";
import {
  arcPath,
  CENTER,
  DASH_SPANS,
  FIELD_ARCS,
  hueAt,
  MARKERS,
  PHRASE_FONT,
  PHRASE_SLOTS,
  polar,
  RING,
  type FieldArc,
  type HueBand,
} from "./geometry";

/** color-mix between the ring's cyan and orange variables. */
function mix(w: number, hot = false): string {
  const pct = Math.round(w * 100);
  return hot
    ? `color-mix(in srgb, var(--pb-orange-hot) ${pct}%, var(--pb-cyan-hot))`
    : `color-mix(in srgb, var(--pb-orange) ${pct}%, var(--pb-cyan))`;
}

function bandMix(w: number): string {
  return `color-mix(in srgb, var(--pb-band-warm) ${Math.round(w * 100)}%, var(--pb-band-cool))`;
}

/** Conic gradient following a sampled hue band (0deg = +x, clockwise). */
function conic(band: HueBand, color: (w: number) => string): string {
  const stops: string[] = [];
  for (let deg = 0; deg <= 360; deg += 5)
    stops.push(`${color(hueAt(band, deg))} ${deg}deg`);
  return `conic-gradient(from 90deg, ${stops.join(", ")})`;
}

/** Radial mask that keeps only the annulus r0..r1 (badge px). */
function annulus(r0: number, r1: number, soft = 0.6): string {
  const p = (r: number) => `${((r / CENTER) * 100).toFixed(3)}%`;
  return `radial-gradient(circle closest-side at 50% 50%, transparent ${p(r0 - soft)}, #000 ${p(r0 + soft)}, #000 ${p(r1 - soft)}, transparent ${p(r1 + soft)})`;
}

function Annulus({
  r0,
  r1,
  background,
  className = "",
}: {
  r0: number;
  r1: number;
  background: string;
  className?: string;
}) {
  const mask = annulus(r0, r1);
  return (
    <div
      className={`pb-fill ${className}`}
      style={{ background, maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

/** Deterministic PRNG so server and client render identical ticks. */
function prng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function RingBArt() {
  const dashes = useMemo(() => {
    const out: React.ReactNode[] = [];
    const { track, dash, dashPitchDeg } = RING.b;
    for (const [from, to] of DASH_SPANS) {
      for (let deg = from; deg <= to; deg += dashPitchDeg) {
        const { x, y } = polar(track, deg);
        const w = hueAt("dashes", deg);
        out.push(
          <rect
            key={`d${deg.toFixed(1)}`}
            x={-dash / 2}
            y={-dash / 2}
            width={dash}
            height={dash}
            rx={1}
            transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${deg.toFixed(1)})`}
            style={{ fill: mix(w) }}
          />,
        );
      }
    }
    const bd = RING.b.bottomDashes;
    for (let deg = bd.from; deg <= bd.to; deg += bd.pitchDeg) {
      const { x, y } = polar(RING.b.track - 7, deg);
      out.push(
        <rect
          key={`bd${deg.toFixed(1)}`}
          x={-bd.h / 2}
          y={-bd.w / 2}
          width={bd.h}
          height={bd.w}
          transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${deg.toFixed(1)})`}
          style={{ fill: mix(1) }}
        />,
      );
    }
    // Slot separators: a short bar either side of each phrase slot.
    for (const { angle, arc } of PHRASE_SLOTS) {
      for (const side of [-1, 1]) {
        const deg = angle + side * (arc / 2 + 2.5);
        const a = polar(RING.b.track - 9, deg);
        const b = polar(RING.b.track + 9, deg);
        out.push(
          <line
            key={`sep${angle}${side}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            strokeWidth={1.6}
            style={{ stroke: mix(hueAt("edgeOuter", deg)), opacity: 0.8 }}
          />,
        );
      }
    }
    return out;
  }, []);

  return (
    <svg className="pb-svg" viewBox="0 0 1024 1024" aria-hidden>
      <g>{dashes}</g>
    </svg>
  );
}

const PHRASE_HOLD_S = 6;

/**
 * Five slots on ring B; each cycles its share of the phrase list with one
 * shared opacity keyframe (see .pb-phrase). Pure CSS, no timers.
 */
function RingPhrases({ phrases }: { phrases: readonly string[] }) {
  const slots = PHRASE_SLOTS.length;
  const perSlot = Math.max(1, Math.ceil(phrases.length / slots));
  const cycle = perSlot * PHRASE_HOLD_S;
  const baseline = (flip: boolean) =>
    flip ? RING.b.track + 5.5 : RING.b.track - 5.5;

  // Each phrase is its own small layer so its fade composites instead of
  // repainting the whole rotating ring.
  return (
    <div
      className="pb-phrases"
      style={{ ["--pb-phrase-cycle" as string]: `${cycle}s` }}
    >
      {PHRASE_SLOTS.map(({ angle, flip, arc }, s) => {
        const d = arcPath(
          baseline(flip),
          angle - arc / 2,
          angle + arc / 2,
          flip,
        );
        const box = arcBox(RING.b.track, angle - arc / 2, angle + arc / 2, 16);
        return Array.from({ length: perSlot }, (_, j) => {
          const text = phrases[(s + j * slots) % phrases.length] ?? "";
          // Leave a little slack so trailing glyphs never fall off the path.
          const room = (arc / 360) * 2 * Math.PI * baseline(flip) * 0.96;
          const perGlyph = text.length * PHRASE_FONT.advanceEm;
          const size = Math.max(
            PHRASE_FONT.minSize,
            Math.min(PHRASE_FONT.size, room / perGlyph),
          );
          const squeeze = perGlyph * size > room ? room : undefined;
          const delay = j * PHRASE_HOLD_S - 1 - s * 1.2;
          const id = `pb-slot-${s}-${j}`;
          return (
            <div
              key={id}
              className={j === 0 ? "pb-phrase pb-phrase-first" : "pb-phrase"}
              style={{ ...boxStyle(box), animationDelay: `${delay}s` }}
            >
              <svg viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`} aria-hidden>
                <path id={id} d={d} fill="none" />
                <text
                  style={{ fill: mix(hueAt("dashes", angle)), fontSize: size }}
                  textLength={squeeze}
                  lengthAdjust={squeeze ? "spacingAndGlyphs" : undefined}
                >
                  <textPath
                    href={`#${id}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {text}
                  </textPath>
                </text>
              </svg>
            </div>
          );
        });
      })}
    </div>
  );
}

type Box = { x: number; y: number; w: number; h: number };

/** Bounding box of an annular arc around `r`, padded by `pad` (badge px). */
function arcBox(r: number, from: number, to: number, pad: number): Box {
  const pts: Array<{ x: number; y: number }> = [];
  for (let deg = from; deg <= to; deg += 2) {
    pts.push(polar(r - pad, deg), polar(r + pad, deg));
  }
  pts.push(polar(r - pad, to), polar(r + pad, to));
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const x = Math.floor(Math.min(...xs));
  const y = Math.floor(Math.min(...ys));
  return {
    x,
    y,
    w: Math.ceil(Math.max(...xs)) - x,
    h: Math.ceil(Math.max(...ys)) - y,
  };
}

function boxStyle({ x, y, w, h }: Box): React.CSSProperties {
  const pct = (v: number) => `${(v / 1024) * 100}%`;
  return { left: pct(x), top: pct(y), width: pct(w), height: pct(h) };
}

function RingAArt() {
  const ticks = useMemo(() => {
    const rnd = prng(0x0a1d);
    const out: React.ReactNode[] = [];
    for (let deg = 0; deg < 360; deg += RING.a.tickPitchDeg) {
      const roll = rnd();
      if (roll < 0.22) continue;
      const hot = roll > 0.9;
      const size = hot ? 8.5 : 4 + rnd() * 3.5;
      const { x, y } = polar(RING.a.ticks, deg);
      out.push(
        <rect
          key={deg}
          x={-size / 2}
          y={-size / 2}
          width={size}
          height={size}
          transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${deg})`}
          style={{
            fill: mix(hueAt("ticks", deg), hot),
            opacity: hot ? 1 : 0.45 + rnd() * 0.5,
          }}
        />,
      );
    }
    return out;
  }, []);

  return (
    <svg className="pb-svg" viewBox="0 0 1024 1024" aria-hidden>
      <g>{ticks}</g>
    </svg>
  );
}

const RING_B_EDGE = conic("edgeOuter", (w) => mix(w));
const RING_B_EDGE_IN = conic("edgeInner", (w) => mix(w));
const RING_B_BAND = conic("dashes", bandMix);
const RING_A_BAND = conic("ticks", bandMix);
const RING_A_LINE = conic("ticks", (w) => mix(w));
const RING_A_RIM = conic("rim", (w) => mix(w, true));
const RING_A_GLOW = conic("rim", (w) => mix(w));

/** Ring B: inner phrase/dash band. Counter-clockwise. */
export const RingB = memo(function RingB({
  phrases,
}: {
  phrases: readonly string[] | null;
}) {
  const b = RING.b;
  return (
    <div className="pb-layer pb-ring pb-ring-b">
      <Annulus r0={b.band.from} r1={b.band.to} background={RING_B_BAND} />
      <div className="pb-glow pb-glow-b">
        <Annulus
          r0={b.outer - 1.5}
          r1={b.outer + 1.5}
          background={RING_B_EDGE}
        />
      </div>
      <Annulus
        r0={b.inner - 0.8}
        r1={b.inner + 0.8}
        background={RING_B_EDGE_IN}
      />
      <Annulus r0={b.outer - 1} r1={b.outer + 1} background={RING_B_EDGE} />
      <RingBArt />
      {phrases && <RingPhrases phrases={phrases} />}
    </div>
  );
});

/** Ring A: outer tick track and bright rim. Clockwise. */
export const RingA = memo(function RingA() {
  const a = RING.a;
  return (
    <div className="pb-layer pb-ring pb-ring-a">
      <Annulus
        r0={a.band.from}
        r1={a.band.to}
        background={`radial-gradient(circle closest-side, transparent 91.4%, rgb(255 255 255 / 0.06) 96.5%, transparent 98%), ${RING_A_BAND}`}
      />
      <Annulus
        r0={a.innerLine - 0.6}
        r1={a.innerLine + 0.6}
        background={RING_A_LINE}
        className="pb-faint"
      />
      <div className="pb-glow pb-glow-a">
        <Annulus r0={a.rim - 5} r1={a.rim + 5} background={RING_A_GLOW} />
      </div>
      <Annulus r0={a.rim - 1.4} r1={a.rim + 1.4} background={RING_A_RIM} />
      <RingAArt />
    </div>
  );
});

/** A short bright arc sweeping the tick track, independent of the spin. */
export function TickScan() {
  const a = RING.a;
  const bg =
    "conic-gradient(from 90deg, transparent 0deg, transparent 336deg, color-mix(in srgb, var(--pb-cyan-hot) 55%, transparent) 356deg, var(--pb-cyan-hot) 359deg, transparent 360deg)";
  return (
    <div className="pb-layer pb-scan" aria-hidden>
      <Annulus r0={a.ticks - 7} r1={a.ticks + 7} background={bg} />
    </div>
  );
}

/** One fixed marker in its own small layer, so its blink composites. */
function Marker({
  side,
  box,
  children,
}: {
  side: string;
  box: Box;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`pb-marker pb-marker-${side}`}
      style={boxStyle(box)}
      aria-hidden
    >
      <svg viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}>
        <defs>
          <filter
            id={`pb-glow-${side}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        {children}
      </svg>
    </div>
  );
}

/** Triangles and side markers (fixed), plus field-linked highlight arcs. */
export function RingFixtures() {
  const t = MARKERS.top;
  const b = MARKERS.bottom;
  return (
    <>
      <svg className="pb-svg pb-layer" viewBox="0 0 1024 1024" aria-hidden>
        {(Object.keys(FIELD_ARCS) as FieldArc[]).map((key) => {
          const { from, to } = FIELD_ARCS[key];
          return (
            <g key={key} className={`pb-arc pb-arc-${key}`}>
              <path
                d={arcPath(RING.b.track, from, to)}
                strokeWidth={RING.b.band.to - RING.b.band.from}
                className="pb-arc-fill"
              />
              <path
                d={arcPath(RING.b.outer, from, to)}
                strokeWidth={3}
                className="pb-arc-edge"
              />
              <path
                d={arcPath(RING.b.inner, from, to)}
                strokeWidth={2}
                className="pb-arc-edge"
              />
            </g>
          );
        })}
      </svg>
      <Marker side="top" box={{ x: 462, y: 0, w: 100, h: 66 }}>
        <polygon
          points={t.points}
          filter="url(#pb-glow-top)"
          className="pb-marker-glow"
        />
        <polygon points={t.points} className="pb-marker-fill" />
        <rect
          x={t.bar.x}
          y={t.bar.y}
          width={t.bar.w}
          height={t.bar.h}
          className="pb-marker-fill"
        />
      </Marker>
      <Marker side="bottom" box={{ x: 476, y: 968, w: 66, h: 56 }}>
        <polygon
          points={b.points}
          filter="url(#pb-glow-bottom)"
          className="pb-marker-glow"
        />
        <polygon points={b.points} className="pb-marker-fill" />
      </Marker>
      {(["left", "right"] as const).map((side) => {
        const m = MARKERS[side];
        return (
          <Marker
            key={side}
            side={side}
            box={{ x: m.x - 12, y: m.y - 12, w: m.w + 24, h: m.h + 24 }}
          >
            <rect
              x={m.x - 3}
              y={m.y - 3}
              width={m.w + 6}
              height={m.h + 6}
              rx={3}
              filter={`url(#pb-glow-${side})`}
              className="pb-marker-glow"
            />
            <rect
              x={m.x}
              y={m.y}
              width={m.w}
              height={m.h}
              rx={1.5}
              className="pb-marker-fill"
            />
          </Marker>
        );
      })}
    </>
  );
}

/** Slow-drifting motes in the dark corners, outside the rim. */
export const Particles = memo(function Particles() {
  const dots = useMemo(() => {
    const rnd = prng(0x51ab);
    const out: Array<{
      x: number;
      y: number;
      r: number;
      warm: boolean;
      d: number;
      k: number;
    }> = [];
    while (out.length < 24) {
      const x = rnd() * 1024;
      const y = rnd() * 1024;
      if (Math.hypot(x - CENTER, y - CENTER) < 512) continue;
      out.push({
        x,
        y,
        r: 1.2 + rnd() * 3.2,
        warm: x > CENTER ? rnd() > 0.3 : rnd() > 0.8,
        d: 20 + rnd() * 20,
        k: out.length,
      });
    }
    return out;
  }, []);
  return (
    <div className="pb-layer pb-particles" aria-hidden>
      {dots.map((p) => (
        <span
          key={p.k}
          className={`pb-mote ${p.k % 2 ? "pb-mote-alt" : ""}`}
          style={{
            ...boxStyle({ x: p.x - p.r, y: p.y - p.r, w: p.r * 2, h: p.r * 2 }),
            background: p.warm ? "var(--pb-orange)" : "var(--pb-cyan)",
            opacity: 0.25 + (p.r / 4.4) * 0.45,
            animationDuration: `${p.d.toFixed(1)}s`,
            animationDelay: `${(-p.k * 1.7).toFixed(1)}s`,
          }}
        />
      ))}
    </div>
  );
});
