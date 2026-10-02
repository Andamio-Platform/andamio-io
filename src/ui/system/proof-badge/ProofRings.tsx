import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  arcPath,
  CENTER,
  hueAt,
  MARKERS,
  PHRASE_FONT,
  PHRASE_SLOTS,
  polar,
  RING,
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

/** Valid bytes of a hex string. A non-hex pair is skipped, never invented. */
function hexBytes(hex: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i + 1 < hex.length; i += 2) {
    const pair = hex.slice(i, i + 2);
    if (!/^[0-9a-fA-F]{2}$/.test(pair)) continue;
    bytes.push(parseInt(pair, 16));
  }
  return bytes;
}

/** True when `deg` falls inside a showcase phrase window. */
function inPhraseSlot(deg: number): boolean {
  const norm = ((deg % 360) + 360) % 360;
  return PHRASE_SLOTS.some(({ angle, arc }) => {
    const delta = Math.abs(((norm - angle + 540) % 360) - 180);
    return delta < arc / 2 + 2;
  });
}

/**
 * Decode-parity bars (badge-generator ringTicks): 8 radial bars per byte,
 * tall when the bit is 1, short when it is 0. The first bit of each byte
 * is slightly taller. Encoding starts at the top and reads clockwise.
 * `span` places each bar; the default centers it on `radius`.
 */
function binaryBars(
  hex: string,
  radius: number,
  band: HueBand,
  span: (deg: number, len: number) => { innerR: number; outerR: number } = (
    _deg,
    len,
  ) => ({
    innerR: radius - len / 2,
    outerR: radius + len / 2,
  }),
): React.ReactNode[] {
  const bytes = hexBytes(hex);
  if (bytes.length === 0) return [];
  const group = 360 / bytes.length;
  const lead = (group - 8) / 2;
  const out: React.ReactNode[] = [];
  bytes.forEach((value, index) => {
    const start = -90 + index * group;
    for (let bit = 0; bit < 8; bit++) {
      const on = ((value >> (7 - bit)) & 1) === 1;
      const head = bit === 0;
      const deg = start + lead + (bit + 0.5);
      const len = on ? (head ? 16 : 12) : head ? 7 : 4.5;
      const { innerR, outerR } = span(deg, len);
      const inner = polar(innerR, deg);
      const outer = polar(outerR, deg);
      const width = on ? (head ? 2.6 : 2) : 1.5;
      const colored = `color-mix(in srgb, white ${on ? 14 : 22}%, ${mix(1 - hueAt(band, deg), on && head)})`;
      out.push(
        <g key={`${index}-${bit}`}>
          <line
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="#f7f8f8"
            strokeWidth={width + 0.7}
            strokeLinecap="butt"
            opacity={1}
          />
          <line
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            strokeWidth={width}
            strokeLinecap="butt"
            style={{
              stroke: colored,
              opacity: on ? 1 : 0.72,
            }}
          />
        </g>,
      );
    }
  });
  return out;
}

function RingBArt({ hash, lanes }: { hash: string; lanes: boolean }) {
  const marks = useMemo(() => {
    // Phrase windows stay a clear lane. Without phrases, the hash fills the ring.
    const out: React.ReactNode[] = lanes
      ? binaryBars(hash, RING.b.track, "dashes", (deg, len) => {
          if (!inPhraseSlot(deg)) {
            return {
              innerR: RING.b.track - len / 2,
              outerR: RING.b.track + len / 2,
            };
          }
          const outerR = RING.b.outer - 0.5;
          return { innerR: outerR - Math.min(len, 4.5), outerR };
        })
      : binaryBars(hash, RING.b.track, "dashes");
    if (!lanes) return out;
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
  }, [hash, lanes]);

  return (
    <svg className="pb-svg" viewBox="0 0 1024 1024" aria-hidden>
      <g>{marks}</g>
    </svg>
  );
}

const PHRASE_HOLD_S = 6;

/** CSS rotate degrees (clockwise). `none` is rest, which matches the slot flips. */
function ringRotation(el: Element): number {
  const transform = getComputedStyle(el).transform;
  if (!transform || transform === "none") return 0;
  const match = /matrix(?:3d)?\(([^)]+)\)/.exec(transform);
  const captured = match?.[1];
  if (!captured) return 0;
  const parts = captured.split(",");
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
  return (Math.atan2(b, a) * 180) / Math.PI;
}

/** Lower half of the badge: SVG angle 0 is right, 90 is down. */
function inLowerHalf(deg: number): boolean {
  const n = ((deg % 360) + 360) % 360;
  return n > 0 && n < 180;
}

/**
 * Five slots on ring B; each cycles its share of the phrase list with one
 * shared opacity keyframe (see .pb-phrase). The slots ride the spinning ring.
 * Each phrase flips when its on-screen angle enters the lower half, so the
 * letters stay readable for the whole turn.
 */
function RingPhrases({ phrases }: { phrases: readonly string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const flipsRef = useRef(PHRASE_SLOTS.map((slot) => slot.flip));
  const [flips, setFlips] = useState(() =>
    PHRASE_SLOTS.map((slot) => slot.flip),
  );
  useEffect(() => {
    const ring = rootRef.current?.parentElement;
    if (!ring) return;
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const badge = ring.closest(".pb-root");
      if (!badge?.classList.contains("pb-live")) return;
      if (badge.hasAttribute("data-offscreen")) return;
      const rotation = ringRotation(ring);
      let changed = false;
      const next = PHRASE_SLOTS.map((slot, i) => {
        const flip = inLowerHalf(slot.angle + rotation);
        if (flip !== flipsRef.current[i]) changed = true;
        return flip;
      });
      if (!changed) return;
      flipsRef.current = next;
      setFlips(next);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  const slots = PHRASE_SLOTS.length;
  const perSlot = Math.max(1, Math.ceil(phrases.length / slots));
  const cycle = perSlot * PHRASE_HOLD_S;
  const baseline = (flip: boolean) =>
    flip ? RING.b.track + 5.5 : RING.b.track - 5.5;

  // Each phrase is its own small layer so its fade composites instead of
  // repainting the whole rotating ring.
  return (
    <div
      ref={rootRef}
      className="pb-phrases"
      style={{ ["--pb-phrase-cycle" as string]: `${cycle}s` }}
    >
      {PHRASE_SLOTS.map(({ angle, arc }, s) => {
        const flip = flips[s] ?? false;
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

function RingAArt({ courseId }: { courseId: string }) {
  const ticks = useMemo(
    () => binaryBars(courseId, RING.a.ticks, "ticks"),
    [courseId],
  );

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
  hash,
}: {
  phrases: readonly string[] | null;
  /** SLT hash hex. Its bits are the inner-ring bars. */
  hash: string;
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
      <RingBArt hash={hash} lanes={phrases != null} />
      {phrases && <RingPhrases phrases={phrases} />}
    </div>
  );
});

/** Ring A: outer tick track and bright rim. Clockwise. */
export const RingA = memo(function RingA({ courseId }: { courseId: string }) {
  const a = RING.a;
  return (
    <div className="pb-layer pb-ring pb-ring-a">
      <Annulus
        r0={a.band.from}
        r1={a.band.to}
        background={`radial-gradient(circle closest-side, transparent 93%, rgb(255 255 255 / 0.06) 98.4%, transparent 99.8%), ${RING_A_BAND}`}
      />
      <Annulus
        r0={a.innerLine - 0.6}
        r1={a.innerLine + 0.6}
        background={RING_A_LINE}
        className="pb-faint"
      />
      <div className="pb-glow pb-glow-a">
        <Annulus r0={a.rim - 1} r1={a.rim + 2} background={RING_A_GLOW} />
      </div>
      <Annulus r0={a.rim - 0.9} r1={a.rim + 0.9} background={RING_A_RIM} />
      <RingAArt courseId={courseId} />
    </div>
  );
});

/** Panel centres (badge px) that the highlight connectors start from. */
const HL_TARGETS = {
  a: { panel: { x: 363, y: 791 }, r0: RING.a.band.from, r1: RING.a.band.to },
  b: { panel: { x: 667, y: 791 }, r0: RING.b.band.from, r1: RING.b.band.to },
} as const;

const HL_PULSE =
  "conic-gradient(from 90deg, transparent 0deg, transparent 300deg, color-mix(in srgb, var(--pb-cyan-hot) 45%, transparent) 352deg, var(--pb-cyan-hot) 359deg, transparent 360deg)";

function RingHighlight({ ring }: { ring: "a" | "b" }) {
  const t = HL_TARGETS[ring];
  const deg =
    (Math.atan2(t.panel.y - CENTER, t.panel.x - CENTER) * 180) / Math.PI;
  const from = polar(346, deg);
  const to = polar(t.r0 - 2, deg);
  return (
    <div className={`pb-layer pb-hl pb-hl-${ring}`} aria-hidden>
      <Annulus
        r0={t.r0}
        r1={t.r1}
        background="color-mix(in srgb, var(--pb-cyan) 12%, transparent)"
      />
      <Annulus r0={t.r0 - 1} r1={t.r0 + 1} background="var(--pb-cyan-hot)" />
      <Annulus r0={t.r1 - 1} r1={t.r1 + 1} background="var(--pb-cyan-hot)" />
      <div className="pb-layer pb-hl-pulse">
        <Annulus r0={t.r0} r1={t.r1} background={HL_PULSE} />
      </div>
      <svg className="pb-svg" viewBox="0 0 1024 1024">
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          className="pb-hl-link"
        />
        <circle cx={to.x} cy={to.y} r={4} className="pb-hl-dot" />
      </svg>
    </div>
  );
}

/** Static focus layers: one per ring, shown by `data-hl` on `.pb-root`. */
export function RingHighlights() {
  return (
    <>
      <RingHighlight ring="b" />
      <RingHighlight ring="a" />
    </>
  );
}

/** A short bright arc on each ring, independent of the spin. */
export function TickScan() {
  const a = RING.a;
  const b = RING.b;
  const bg =
    "conic-gradient(from 90deg, transparent 0deg, transparent 336deg, color-mix(in srgb, var(--pb-cyan-hot) 55%, transparent) 356deg, var(--pb-cyan-hot) 359deg, transparent 360deg)";
  // Mirrored so the bright tip leads while this dash travels counter-clockwise.
  const bgCcw =
    "conic-gradient(from 90deg, transparent 0deg, var(--pb-cyan-hot) 1deg, color-mix(in srgb, var(--pb-cyan-hot) 55%, transparent) 4deg, transparent 24deg, transparent 360deg)";
  return (
    <>
      <div className="pb-layer pb-scan" aria-hidden>
        <Annulus r0={a.ticks - 7} r1={a.ticks + 7} background={bg} />
      </div>
      <div className="pb-layer pb-scan pb-scan-b" aria-hidden>
        <Annulus r0={b.track - 7} r1={b.track + 7} background={bgCcw} />
      </div>
    </>
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

/** Triangles and side markers. They stay fixed; face fields do not light them. */
export function RingFixtures() {
  const t = MARKERS.top;
  const b = MARKERS.bottom;
  return (
    <>
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
