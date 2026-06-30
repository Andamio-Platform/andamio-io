"use client";

/**
 * BadgeBuilder — the interactive "build a credential" demo, rebuilt in the
 * Warm Index design language (kit.tsx + tokens.ts). It reuses the framework-free
 * Proof Rings core verbatim from ~/ui/landing/V2Landing/badge; only the UI is
 * re-skinned to the system (ink hairlines, mono micro-labels, the coral specimen
 * plate, blue as the data/linking accent, orange reserved for the live pulse).
 *
 * Two wired zones: a control CONSOLE (inputs) and the SPECIMEN (the live badge).
 * Focusing an input lights the ring it controls, so input → ring reads as one
 * connected machine. Illustrative only — inputs are hashed into the rings, never
 * a real issued credential; a credential's address is <course_id>.<slt_hash>.
 */

import React from "react";
import {
  buildBadgeSvg,
  buildBadgeParams,
  PALETTES,
  withInterior,
  type InteriorStyle,
} from "~/ui/landing/V2Landing/badge";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import * as Dialog from "@radix-ui/react-dialog";
import { ZoomIn } from "lucide-react";
import {
  OUTER_RING,
  INNER_RING,
  SHIFT,
  LEFT_WITH,
} from "~/ui/landing/V2Landing/annotation-data";
import { color, font } from "./tokens";

type ActiveZone = "identity" | "targets" | null;

const SAMPLE: { courseName: string; moduleName: string; slts: string[] } = {
  courseName: "Bike Repair Basics",
  moduleName: "Fix a Flat Tire",
  slts: ["I can remove a wheel", "I can patch an inner tube"],
};

const mono = { fontFamily: font.mono };
const sans = { fontFamily: font.sans };

/* Square, hairline input. Blue inset on focus = the system's data/linking accent. */
const inputCls =
  "w-full border bg-white px-3 py-1.5 text-[14px] transition-shadow placeholder:text-black/30 focus:outline-none focus:[box-shadow:inset_0_0_0_1.5px_#2F6BFF]";
const inputStyle: React.CSSProperties = { borderColor: color.cell, color: color.ink, ...sans };

/* These are plain content fields, not credentials. Tell the browser and the
   major password managers (1Password, LastPass, Dashlane) to keep their hands
   off so they don't offer to fill / save Course Name & co. */
const noAutofill = {
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "off",
  spellCheck: false,
  "data-1p-ignore": "true",
  "data-lpignore": "true",
  "data-form-type": "other",
  "data-bwignore": "true",
} as const;

/* Instrument-panel micro-label: mono, uppercase, tracked out. Lit → blue. */
function MicroLabel({
  children,
  on = false,
  className = "",
  as: As = "span",
  htmlFor,
}: {
  children: React.ReactNode;
  on?: boolean;
  className?: string;
  as?: "span" | "label";
  htmlFor?: string;
}) {
  const style: React.CSSProperties = {
    ...mono,
    color: on ? color.blue : color.inkFaint,
  };
  const cls = `text-[10px] font-medium uppercase tracking-[0.16em] transition-colors ${className}`;
  return As === "label" ? (
    <label htmlFor={htmlFor} className={cls} style={style}>
      {children}
    </label>
  ) : (
    <span className={cls} style={style}>
      {children}
    </span>
  );
}

/* Info circle: a compact label + "i" that opens its explanation. */
function InfoChip({ label, body }: { label: string; body: string }) {
  return (
    <Popover>
      <PopoverTrigger
        className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors hover:bg-black/[0.03] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_#2F6BFF]"
        style={{ ...mono, borderColor: color.rule, color: color.ink }}
      >
        {label}
        <span
          aria-hidden
          className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border text-[9px]"
          style={{ borderColor: color.cell, color: color.inkFaint }}
        >
          i
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-72 overflow-hidden rounded-none border p-0 shadow-[0_18px_44px_-20px_rgba(0,0,0,0.45)]"
        style={{ borderColor: color.rule, background: color.paper }}
      >
        {/* Mono kicker header + hairline, then body — matches the section's
            editorial idiom (square card, ink rule, system type). */}
        <div className="border-b px-3.5 py-2" style={{ borderColor: color.cell }}>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ ...mono, color: color.inkFaint }}
          >
            {label}
          </span>
        </div>
        <p
          className="px-3.5 py-3 text-[13px] leading-relaxed"
          style={{ ...sans, color: color.inkMuted }}
        >
          {body}
        </p>
      </PopoverContent>
    </Popover>
  );
}

export interface BadgeBuilderProps {
  className?: string;
  /** Headline rendered inside the frame header (the section's title lives here). */
  title?: string;
  /** Short supporting line under the title. */
  note?: string;
  /** Label beside the live pulse. */
  liveLabel?: string;
}

export default function BadgeBuilder({
  className = "",
  title = "Build a credential badge",
  note,
  liveLabel = "Live preview",
}: BadgeBuilderProps = {}) {
  // Unique, SVG-id-safe suffix per instance so inline badges never collide.
  const idSuffix = React.useId().replace(/:/g, "");

  const [courseName, setCourseName] = React.useState(SAMPLE.courseName);
  const [moduleName, setModuleName] = React.useState(SAMPLE.moduleName);
  const [slts, setSlts] = React.useState<string[]>(SAMPLE.slts);
  const [paletteIndex, setPaletteIndex] = React.useState(0);
  const [interior, setInterior] = React.useState<InteriorStyle>("light");
  const [svg, setSvg] = React.useState("");
  // A second copy of the badge for the zoom modal, built with a distinct
  // id-suffix so its SVG element ids never collide with the inline badge.
  const [modalSvg, setModalSvg] = React.useState("");
  const [scanKey, setScanKey] = React.useState(0);

  // Which ring the visitor is editing — drives the linked highlight across the
  // console label and the specimen ring.
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
  React.useEffect(
    () => () => {
      if (clearTimer.current) window.clearTimeout(clearTimer.current);
    },
    [],
  );

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
      setModalSvg(buildBadgeSvg(params, palette, { idSuffix: `${idSuffix}z` }));
      setScanKey((k) => k + 1);
    }, 150);
    return () => window.clearTimeout(t);
  }, [courseName, moduleName, slts, paletteIndex, interior, idSuffix]);

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
    <figure
      className={`m-0 border ${className}`}
      style={{ borderColor: color.rule, background: color.paper }}
    >
      {/* ── Frame header: the section title lives here (inside the box) +
             a live pulse. This keeps the whole section to one viewport. ──── */}
      <div
        className="flex items-start justify-between gap-4 border-b px-4 py-3"
        style={{ borderColor: color.rule }}
      >
        <div className="min-w-0">
          <h2
            className="text-[19px] leading-tight sm:text-[22px]"
            style={{ ...sans, fontWeight: 600, letterSpacing: "-0.02em", color: color.ink }}
          >
            {title}
          </h2>
          {note && (
            <p className="mt-0.5 text-[12px] leading-snug" style={{ color: color.inkMuted }}>
              {note}
            </p>
          )}
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: color.inkFaint, ...mono }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: color.orange }} />
          {liveLabel}
        </span>
      </div>

      {/* ── Body: console · specimen ──────────────────────────────── */}
      <div className="grid grid-cols-12">
        {/* Console — inputs */}
        <div
          className="col-span-12 flex flex-col gap-2.5 p-3.5 sm:p-4 lg:col-span-5 lg:border-r"
          style={{ borderColor: color.cell }}
        >
          <div className="flex flex-col gap-1">
            <MicroLabel as="label" htmlFor="bb-course" on={active === "identity"}>
              Course name
            </MicroLabel>
            <input
              id="bb-course"
              {...noAutofill}
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              onFocus={() => focusZone("identity")}
              onBlur={blurZone}
              className={inputCls}
              style={inputStyle}
              placeholder="e.g. Bike Repair Basics"
            />
            {/* What a course is + the ownership rule, in one quiet line. */}
            <p className="mt-0.5 text-[11px] leading-snug" style={{ color: color.inkMuted }}>
              A course is yours — only its owner can issue credentials on it.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <MicroLabel as="label" htmlFor="bb-module" on={active === "identity"}>
              Credential name
            </MicroLabel>
            <input
              id="bb-module"
              {...noAutofill}
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              onFocus={() => focusZone("identity")}
              onBlur={blurZone}
              className={inputCls}
              style={inputStyle}
              placeholder="e.g. Fix a Flat Tire"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <MicroLabel on={active === "targets"}>Learning targets</MicroLabel>
              <span className="text-[10px] tabular-nums" style={{ ...mono, color: color.inkFaint }}>
                {slts.length.toString().padStart(2, "0")}
              </span>
            </div>
            <div
              className="flex max-h-[34vh] flex-col gap-1 overflow-y-auto border p-1 [scrollbar-width:thin]"
              style={{ borderColor: color.cell, background: "rgba(10,10,10,0.015)" }}
            >
              {slts.map((slt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <label htmlFor={`bb-slt-${i}`} className="sr-only">
                    Learning target {i + 1}
                  </label>
                  <input
                    id={`bb-slt-${i}`}
                    {...noAutofill}
                    value={slt}
                    onChange={(e) => updateSlt(i, e.target.value)}
                    onFocus={() => focusZone("targets")}
                    onBlur={blurZone}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="I can…"
                  />
                  <button
                    type="button"
                    onClick={() => removeSlt(i)}
                    aria-label={`Remove learning target ${i + 1}`}
                    className="shrink-0 border px-2.5 py-2 text-[13px] transition-colors hover:bg-black/[0.04]"
                    style={{ borderColor: color.cell, color: color.inkFaint }}
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
              className="self-start text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors hover:opacity-70"
              style={{ ...mono, color: color.blue }}
            >
              + Add a learning target
            </button>
          </div>

          {/* Palette + interior */}
          <div className="flex flex-wrap items-end gap-x-8 gap-y-3.5">
            <div className="flex flex-col gap-1">
              <MicroLabel>Color</MicroLabel>
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
                      className="flex h-7 w-7 items-center justify-center border transition-transform hover:scale-105"
                      style={{
                        borderColor: selected ? color.ink : color.cell,
                        transform: selected ? "scale(1.1)" : undefined,
                      }}
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

            <div className="flex flex-col gap-1">
              <MicroLabel>Interior</MicroLabel>
              <div className="inline-flex w-fit border p-0.5" style={{ borderColor: color.cell }}>
                {(["light", "inverted"] as const).map((style) => {
                  const selected = interior === style;
                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setInterior(style)}
                      aria-pressed={selected}
                      className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] capitalize transition-colors"
                      style={{
                        ...mono,
                        background: selected ? "rgba(10,10,10,0.06)" : "transparent",
                        color: selected ? color.ink : color.inkFaint,
                      }}
                    >
                      {style === "light" ? "Light" : "Inverted"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Specimen — the live badge. It carries the course_id + slt_hash inside
            its own ring artwork, so it does the heavy lifting; nothing is echoed
            (or concatenated) below it. */}
        <div
          className="col-span-12 flex flex-col items-center justify-center p-4 sm:p-5 lg:col-span-7"
          style={{ background: color.coralTint }}
        >
          {/* No tall min-height — the specimen column stretches to match the
              console, and the badge sizes to fill it. So the section height is
              driven by the console and stays within one viewport. */}
          <div className="relative flex min-h-[300px] w-full flex-1 items-center justify-center [container-type:size]">
            {/* Faint tick-grid backdrop — echoes the badge's own ring marks. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle,rgba(10,10,10,0.5)_1px,transparent_1px)] [background-size:22px_22px]"
            />
            {/* Cool ambient halo that rises while an input is focused (blue = data link). */}
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 [background:radial-gradient(circle_at_center,rgba(47,107,255,0.10),transparent_62%)] ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* The badge is a zoom trigger — click opens it large for close
                inspection (radix Dialog: Esc / click-outside / focus trap). */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  aria-label="Zoom in on the badge"
                  className="group relative block aspect-square w-[min(100cqw,100cqh,640px)] cursor-zoom-in rounded-full focus:outline-none focus-visible:[box-shadow:0_0_0_3px_rgba(47,107,255,0.55)]"
                >
                  <div className="relative aspect-square h-full w-full overflow-hidden rounded-full ring-1 ring-black/10 shadow-[0_18px_44px_-22px_rgba(0,0,0,0.4)]">
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
                    {/* Linked ring highlights (blue): outer = course identity, inner = targets.
                        Soft, blurred halos — no crisp line, so they read as a glow over the
                        band rather than a second hairline competing with the badge artwork. */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-[3%] rounded-full blur-[3px] ring-[5px] ring-[#2F6BFF]/40 shadow-[0_0_28px_4px_rgba(47,107,255,0.45)] transition-opacity duration-300 ${
                        active === "identity" ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-[7%] rounded-full blur-[3px] ring-[5px] ring-[#2F6BFF]/40 shadow-[0_0_28px_4px_rgba(47,107,255,0.45)] transition-opacity duration-300 ${
                        active === "targets" ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                  {/* hover / focus affordance — overlaid, no layout impact */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-[7%] left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 border bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{ ...mono, borderColor: color.rule, color: color.ink }}
                  >
                    <ZoomIn className="h-3 w-3" /> Zoom in
                  </span>
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
                <Dialog.Content
                  aria-describedby={undefined}
                  className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,760px)] -translate-x-1/2 -translate-y-1/2 border outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]"
                  style={{ borderColor: color.rule, background: color.paper }}
                >
                  <div
                    className="flex items-center justify-between gap-4 border-b px-4 py-2.5"
                    style={{ borderColor: color.rule }}
                  >
                    <Dialog.Title className="truncate text-[11px] font-semibold uppercase tracking-[0.14em]" style={mono}>
                      {courseName || "Course"} · {moduleName || "Credential"}
                    </Dialog.Title>
                    <Dialog.Close
                      aria-label="Close"
                      className="shrink-0 border px-2.5 py-1 text-[13px] leading-none transition-colors hover:bg-black/[0.04] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_#2F6BFF]"
                      style={{ borderColor: color.cell, color: color.inkFaint }}
                    >
                      ✕
                    </Dialog.Close>
                  </div>
                  <div className="flex items-center justify-center p-6 sm:p-10" style={{ background: color.coralTint }}>
                    <div className="relative aspect-square w-[min(78vh,82vw,560px)]">
                      <div className="relative aspect-square h-full w-full overflow-hidden rounded-full ring-1 ring-black/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
                        <div
                          className="absolute inset-[-1%] [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
                          dangerouslySetInnerHTML={{ __html: modalSvg }}
                          role="img"
                          aria-label={`Badge for ${moduleName || "your credential"}`}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="border-t px-4 py-2.5 text-[11px]" style={{ borderColor: color.cell, color: color.inkMuted }}>
                    The rings encode the{" "}
                    <span style={{ ...mono, color: color.ink }}>course_id</span> and{" "}
                    <span style={{ ...mono, color: color.ink }}>slt_hash</span>. Press{" "}
                    <span style={mono}>Esc</span> or click outside to close.
                  </p>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>

      {/* ── Frame footer: info circles + address footnote on one row ─── */}
      <figcaption
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t px-4 py-2.5"
        style={{ borderColor: color.rule }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <InfoChip label="Course identity" body={OUTER_RING.body} />
          <InfoChip label="Learning targets" body={INNER_RING.body} />
          <InfoChip label="What changes" body={SHIFT.body} />
          <InfoChip label="What you keep" body={LEFT_WITH.body} />
        </div>
        <p className="text-[11px]" style={{ color: color.inkMuted }}>
          Identified by{" "}
          <span className="whitespace-nowrap" style={{ ...mono, color: color.ink }}>
            &lt;course_id&gt;.&lt;slt_hash&gt;
          </span>
          <span style={{ color: color.inkGhost }}> · illustrative only</span>
        </p>
      </figcaption>
    </figure>
  );
}
