"use client";

import React from "react";
import { buildBadgeSvg, buildBadgeParams, PALETTES, withInterior, type InteriorStyle } from "./badge";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { OUTER_RING, INNER_RING, SHIFT, LEFT_WITH } from "./annotation-data";

/* The "build a credential" demo — two wired zones: a control CONSOLE (inputs)
 * and the SPECIMEN, the live Proof Rings badge from ./badge. Focusing an input
 * lights the ring it controls, so input → ring reads as one connected machine.
 * The badge itself carries the derived course_id and slt_hash; the explanations
 * live as info circles beneath it. Illustrative only — inputs are hashed into
 * the rings, never a real issued credential, and the two hashes are NEVER
 * concatenated: a credential's address is the notation <course_id>.<slt_hash>. */

type ActiveZone = "identity" | "targets" | null;

const SAMPLE: { courseName: string; moduleName: string; slts: string[] } = {
  courseName: "Cardano Developer Path",
  moduleName: "Smart Contracts with Aiken",
  slts: [
    "I can write a validator in Aiken",
    "I can test an on-chain contract",
    "I can deploy to preprod",
  ],
};

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-[14px] text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Instrument-panel micro-label: mono, uppercase, tracked out.
const microLabel =
  "font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors";
// Lit version, shown when the zone this label belongs to is focused.
const labelCls = (on: boolean) => `${microLabel} ${on ? "!text-primary" : ""}`;

/* An info circle: a compact label + "i" that opens its explanation. Replaces the
   old readout cards — the explanations now ride alongside the badge. */
function InfoChip({ label, body }: { label: string; body: string }) {
  return (
    <Popover>
      <PopoverTrigger className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[12px] font-medium text-foreground transition-colors hover:border-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        {label}
        <span
          aria-hidden
          className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border text-[9px] text-muted-foreground"
        >
          i
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="demo-light max-w-xs bg-popover text-[13px] leading-relaxed text-popover-foreground"
      >
        {body}
      </PopoverContent>
    </Popover>
  );
}

export interface BadgeBuilderDemoProps {
  /** Optional: also receive the derived ring hashes on each render. */
  onDerived?: (d: { courseId: string; sltHash: string }) => void;
  /** Extra classes for the root flex container. */
  className?: string;
}

export default function BadgeBuilderDemo({ onDerived, className = "" }: BadgeBuilderDemoProps = {}) {
  // Unique, SVG-id-safe suffix per instance so multiple inline badges never collide.
  const idSuffix = React.useId().replace(/:/g, "");

  const [courseName, setCourseName] = React.useState(SAMPLE.courseName);
  const [moduleName, setModuleName] = React.useState(SAMPLE.moduleName);
  const [slts, setSlts] = React.useState<string[]>(SAMPLE.slts);
  const [paletteIndex, setPaletteIndex] = React.useState(0);
  const [interior, setInterior] = React.useState<InteriorStyle>("light");
  const [svg, setSvg] = React.useState("");
  // Bumped each time a new badge paints, to re-trigger the one-shot scan sweep.
  const [scanKey, setScanKey] = React.useState(0);

  // Which ring the visitor is currently editing — drives the linked highlight
  // across console label and specimen ring.
  const [active, setActive] = React.useState<ActiveZone>(null);
  const clearTimer = React.useRef<number | null>(null);
  const focusZone = (z: ActiveZone) => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    setActive(z);
  };
  const blurZone = () => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    clearTimer.current = window.setTimeout(() => setActive(null), 450);
  };
  React.useEffect(() => () => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
  }, []);

  // Debounced, latest-wins render: hashing is async (Web Crypto), so guard
  // against an in-flight result painting over a newer one.
  const reqRef = React.useRef(0);
  React.useEffect(() => {
    const myReq = ++reqRef.current;
    const t = window.setTimeout(async () => {
      const params = await buildBadgeParams({ courseName, moduleName, slts });
      if (myReq !== reqRef.current) return; // a newer change superseded this one
      const palette = withInterior(PALETTES[paletteIndex] ?? PALETTES[0]!, interior);
      setSvg(buildBadgeSvg(params, palette, { idSuffix }));
      setScanKey((k) => k + 1);
      onDerived?.({ courseId: params.courseId, sltHash: params.sltHash });
    }, 150);
    return () => window.clearTimeout(t);
  }, [courseName, moduleName, slts, paletteIndex, interior, idSuffix, onDerived]);

  const updateSlt = (i: number, value: string) =>
    setSlts((prev) => prev.map((s, j) => (j === i ? value : s)));
  const addSlt = () => {
    focusZone("targets");
    setSlts((prev) => [...prev, ""]);
  };
  const removeSlt = (i: number) => {
    focusZone("targets");
    setSlts((prev) => prev.filter((_, j) => j !== i));
  };

  return (
    <div
      className={`flex min-h-0 flex-col gap-6 lg:h-full lg:flex-row lg:gap-8 ${className}`}
    >
      {/* ── Console — inputs ─────────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted p-4 lg:w-[400px] lg:shrink-0 lg:self-center lg:p-5 xl:w-[460px]">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bb-course" className={labelCls(active === "identity")}>
            Course name
          </label>
          <input
            id="bb-course"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            onFocus={() => focusZone("identity")}
            onBlur={blurZone}
            className={inputClass}
            placeholder="e.g. Cardano Developer Path"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="bb-module" className={labelCls(active === "identity")}>
            Credential / module name
          </label>
          <input
            id="bb-module"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            onFocus={() => focusZone("identity")}
            onBlur={blurZone}
            className={inputClass}
            placeholder="e.g. Smart Contracts with Aiken"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className={labelCls(active === "targets")}>Learning targets</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {slts.length.toString().padStart(2, "0")}
            </span>
          </div>
          {/* Every target shows at natural height — no scroll for realistic
              counts. The generous cap only engages for a very long list, where
              it (not the page) becomes the single scroll region. */}
          <div className="flex flex-col gap-2 overflow-y-auto rounded-lg border border-border/60 bg-background/40 p-2 max-h-[42vh] lg:max-h-[46vh] [scrollbar-width:thin]">
            {slts.map((slt, i) => (
              <div key={i} className="flex items-center gap-2">
                <label htmlFor={`bb-slt-${i}`} className="sr-only">
                  Learning target {i + 1}
                </label>
                <input
                  id={`bb-slt-${i}`}
                  value={slt}
                  onChange={(e) => updateSlt(i, e.target.value)}
                  onFocus={() => focusZone("targets")}
                  onBlur={blurZone}
                  className={inputClass}
                  placeholder="I can…"
                />
                <button
                  type="button"
                  onClick={() => removeSlt(i)}
                  aria-label={`Remove learning target ${i + 1}`}
                  className="shrink-0 rounded-md border border-border px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSlt}
            onFocus={() => focusZone("targets")}
            onBlur={blurZone}
            className="self-start rounded-md px-1 text-[13px] font-medium text-primary transition-colors hover:text-primary/80"
          >
            + Add a learning target
          </button>
        </div>

        {/* Palette picker */}
        <div className="flex flex-col gap-1.5">
          <span className={microLabel}>Color</span>
          <div className="flex flex-wrap gap-2">
            {PALETTES.map((p, i) => {
              const selected = i === paletteIndex;
              return (
                <button
                  key={p.slug ?? p.name}
                  type="button"
                  onClick={() => setPaletteIndex(i)}
                  aria-pressed={selected}
                  title={p.name}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border transition-transform ${
                    selected ? "scale-110 border-foreground/60" : "border-border hover:scale-105"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${p.prim} 0 50%, ${p.sec} 50% 100%)` }}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Interior toggle */}
        <div className="flex flex-col gap-1.5">
          <span className={microLabel}>Interior</span>
          <div className="inline-flex w-fit rounded-md border border-border p-0.5">
            {(["light", "inverted"] as const).map((style) => {
              const selected = interior === style;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => setInterior(style)}
                  aria-pressed={selected}
                  className={`rounded px-3 py-1.5 text-[13px] font-medium capitalize transition-colors ${
                    selected ? "bg-foreground/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {style === "light" ? "Light" : "Inverted"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Specimen — the live badge + embedded info circles ────── */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5">
        {/* Badge stage (fills the height left above the caption) */}
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center p-2 [container-type:size] lg:p-4">
          {/* Faint tick-grid backdrop — echoes the badge's own ring marks. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:22px_22px]"
          />
          {/* Warm ambient glow that rises while an input is focused. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 [background:radial-gradient(circle_at_center,rgba(255,107,53,0.12),transparent_62%)] ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* The badge fills the circle behind one clean hairline (no glass
              bezel). Sized to the largest square that fits the stage — min of
              column width / height — capped, so it never overflows. */}
          <div className="relative aspect-square w-[min(100cqw,100cqh,560px)]">
            <div className="relative aspect-square h-full w-full overflow-hidden rounded-full ring-1 ring-black/10 shadow-[0_18px_44px_-22px_rgba(0,0,0,0.4)]">
              {/* the live badge (slight overscan brings its edge to ~1px inside) */}
              <div
                className="absolute inset-[-1%] [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: svg }}
                role="img"
                aria-label={`Preview badge for ${moduleName || "your credential"}`}
              />
              {/* one-shot scan line on each re-render */}
              <div
                key={scanKey}
                aria-hidden
                className="assay-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.14),transparent)]"
              />
              {/* Linked ring highlights on the badge's actual tick bands: outer
                  ticks R472 ≈ inset 3%, inner ticks R440 ≈ inset 7%. Outer =
                  course identity; inner = learning targets. */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[3%] rounded-full ring-2 ring-primary/90 shadow-[0_0_26px_3px_rgba(255,107,53,0.55)] transition-opacity duration-300 ${
                  active === "identity" ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[7%] rounded-full ring-2 ring-primary/90 shadow-[0_0_26px_3px_rgba(255,107,53,0.55)] transition-opacity duration-300 ${
                  active === "targets" ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Caption — info circles + the credential-address footnote. */}
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <InfoChip label="Course identity" body={OUTER_RING.body} />
            <InfoChip label="Learning targets" body={INNER_RING.body} />
            <InfoChip label="What changes" body={SHIFT.body} />
            <InfoChip label="What you keep" body={LEFT_WITH.body} />
          </div>
          <p className="max-w-md text-center text-[11px] leading-relaxed text-muted-foreground">
            Every credential is uniquely identified by{" "}
            <span className="whitespace-nowrap font-mono text-foreground">
              &lt;course_id&gt;.&lt;slt_hash&gt;
            </span>
            <span className="mt-0.5 block text-muted-foreground/80">
              Illustrative — not a real issued credential.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
