"use client";

import React from "react";
import { Kicker } from "./_ui";
import { buildBadgeSvg, buildBadgeParams, PALETTES, withInterior, type InteriorStyle } from "./badge";

/* Live "build a credential" demo. The visitor types a course name, a module
 * name, and a list of SLTs, picks a palette, and toggles light/dark interior;
 * the Proof Rings badge renders live in the browser via the framework-free
 * generator in ./badge. Illustrative preview only — inputs are hashed into the
 * rings (the teaching moment), never a real issued credential. */

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
  "w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-[12px] font-medium text-muted-foreground">
      {children}
    </label>
  );
}

export default function BadgeBuilderDemo() {
  // Unique, SVG-id-safe suffix per instance so multiple inline badges never collide.
  const idSuffix = React.useId().replace(/:/g, "");

  const [courseName, setCourseName] = React.useState(SAMPLE.courseName);
  const [moduleName, setModuleName] = React.useState(SAMPLE.moduleName);
  const [slts, setSlts] = React.useState<string[]>(SAMPLE.slts);
  const [paletteIndex, setPaletteIndex] = React.useState(0);
  const [interior, setInterior] = React.useState<InteriorStyle>("light");
  const [svg, setSvg] = React.useState("");

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
    }, 150);
    return () => window.clearTimeout(t);
  }, [courseName, moduleName, slts, paletteIndex, interior, idSuffix]);

  const updateSlt = (i: number, value: string) =>
    setSlts((prev) => prev.map((s, j) => (j === i ? value : s)));
  const addSlt = () => setSlts((prev) => [...prev, ""]);
  const removeSlt = (i: number) => setSlts((prev) => prev.filter((_, j) => j !== i));

  return (
    <div className="mt-2 mx-auto w-full max-w-6xl rounded-lg border border-border bg-card/40 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Kicker>Build a credential</Kicker>
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
          Live preview
        </span>
      </div>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_2fr]">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="bb-course">Course name</FieldLabel>
            <input
              id="bb-course"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className={inputClass}
              placeholder="e.g. Cardano Developer Path"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="bb-module">Credential / module name</FieldLabel>
            <input
              id="bb-module"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className={inputClass}
              placeholder="e.g. Smart Contracts with Aiken"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-muted-foreground">
              Student learning targets
            </span>
            <div className="flex flex-col gap-2">
              {slts.map((slt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <label htmlFor={`bb-slt-${i}`} className="sr-only">
                    Learning target {i + 1}
                  </label>
                  <input
                    id={`bb-slt-${i}`}
                    value={slt}
                    onChange={(e) => updateSlt(i, e.target.value)}
                    className={inputClass}
                    placeholder={`I can…`}
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
              className="self-start rounded-md px-1 text-[13px] font-medium text-primary transition-colors hover:text-primary/80"
            >
              + Add a learning target
            </button>
          </div>

          {/* Palette picker */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-muted-foreground">Color</span>
            <div className="flex flex-wrap gap-2">
              {PALETTES.map((p, i) => {
                const active = i === paletteIndex;
                return (
                  <button
                    key={p.slug ?? p.name}
                    type="button"
                    onClick={() => setPaletteIndex(i)}
                    aria-pressed={active}
                    title={p.name}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border transition-transform ${
                      active ? "border-foreground/60 scale-110" : "border-border hover:scale-105"
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
            <span className="text-[12px] font-medium text-muted-foreground">Interior</span>
            <div className="inline-flex w-fit rounded-md border border-border p-0.5">
              {(["light", "inverted"] as const).map((style) => {
                const active = interior === style;
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setInterior(style)}
                    aria-pressed={active}
                    className={`rounded px-3 py-1.5 text-[13px] font-medium capitalize transition-colors ${
                      active ? "bg-foreground/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {style === "light" ? "Light" : "Inverted"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-full max-w-[680px] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
            // SVG is generated by our own code from escaped inputs (see badge-generator esc()).
            // The generated SVG carries width/height="1024"; the child-svg utilities above
            // scale it to the container (CSS width overrides the attribute) so it can't overflow.
            dangerouslySetInnerHTML={{ __html: svg }}
            role="img"
            aria-label={`Preview badge for ${moduleName || "your credential"}`}
          />
          <p className="text-center text-[12px] leading-relaxed text-muted-foreground">
            An illustrative preview — your inputs become the two rings. Not a real issued credential.
          </p>
        </div>
      </div>
    </div>
  );
}
