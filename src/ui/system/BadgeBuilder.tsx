"use client";

/**
 * BadgeBuilder — the interactive "build a credential" demo on the live
 * ProofRingBadge.
 *
 * Two wired zones: a control CONSOLE (inputs) and the SPECIMEN (the live badge).
 * Focusing an input lights the ring it controls, so input → ring reads as one
 * connected machine. Illustrative only — inputs are hashed into the rings, never
 * a real issued credential; a credential's address is <course_id>.<slt_hash>.
 */

import React from "react";
import { credentialFromBuilder, ProofRingBadge } from "./proof-badge";
import {
  buildBadgeParams,
  type BadgeParams,
} from "./proof-badge/builder-params";
import type { FieldArc } from "./proof-badge/geometry";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import * as Dialog from "@radix-ui/react-dialog";
import { ZoomIn } from "lucide-react";
import {
  OUTER_RING,
  INNER_RING,
  SHIFT,
  LEFT_WITH,
} from "./proof-badge/field-notes";
import { color, font } from "./tokens";

type ActiveZone =
  | "identity"
  | "targets"
  | "earner"
  | "did"
  | "issued"
  | "skills"
  | "courseId"
  | "sltHash"
  | null;

const ZONE_ARC: Partial<Record<Exclude<ActiveZone, null>, FieldArc>> = {
  identity: "courseId",
  targets: "hash",
  did: "did",
  courseId: "courseId",
  sltHash: "hash",
};

/**
 * The demo's starting point is the REAL "Getting Started with Andamio"
 * credential — the same badge presented on the landing hero (fig. 1). Pristine
 * inputs render the real on-chain identity (courseId/sltHash below, mainnet);
 * the first edit flips the badge to a derived preview, so "your inputs become
 * the rings" stays honest. Starting SLT lines are editable display copy only —
 * the pristine rings come from the real hashes, never from hashing these lines.
 */
export const GETTING_STARTED = {
  courseName: "Getting Started with Andamio",
  moduleName: "Mint Access Token and Commit to Assignment",
  slts: ["I can mint my Access Token", "I can commit to an assignment"],
  params: {
    courseTitle: "Getting Started with Andamio",
    moduleTitle: "Mint Access Token and Commit to Assignment",
    // Real on-chain hashes (mainnet). Face shorts derive from these; clipboard uses full hex.
    courseId: "ab5d9217bbbac409ffbe7c8c65d9b358932245079a7f8547a28bc755",
    sltHash: "1b37e6b411bc614e9da67943124219053eafa717793e5424f4a33765e42328a3",
    network: "mainnet",
    // Fictional but wired display fields (not on-chain for this demo specimen).
    earnerName: "Jordan Smith",
    did: "did:andamio:8f3a7c1e",
    issuedAt: "2025-06-03T10:30:00Z",
    skills: [
      { id: "s1", label: "Access Token" },
      { id: "s2", label: "Commit" },
      { id: "s3", label: "Evidence" },
      { id: "s4", label: "Review" },
    ],
    verifyUrl: "https://credentials.andamio.io/verify/demo/getting-started",
  } satisfies BadgeParams,
  /** Pine Gold — the palette the real badge was generated with. */
  paletteIndex: 3,
} as const;

const SAMPLE: {
  courseName: string;
  moduleName: string;
  slts: readonly string[];
} = GETTING_STARTED;

function credentialFromBadge(
  params: BadgeParams,
  face: {
    earnerName?: string;
    did?: string;
    issuedAt?: string;
    skills?: string[];
  },
) {
  return credentialFromBuilder({
    course: params.courseTitle,
    module: params.moduleTitle,
    courseId: params.courseId,
    sltHash: params.sltHash,
    network: params.network,
    earnerName: face.earnerName ?? params.earnerName,
    issuerDid: face.did ?? params.did,
    issuedAt: face.issuedAt ?? params.issuedAt,
    skills: face.skills ?? params.skills?.map((s) => s.label),
    verifyUrl: params.verifyUrl,
  });
}

const mono = { fontFamily: font.mono };
const sans = { fontFamily: font.sans };

/* Square, hairline input. Blue inset on focus = the system's data/linking accent. */
const inputCls =
  "w-full border px-3 py-1.5 text-[14px] transition-shadow placeholder:text-black/30 focus:outline-none focus:[box-shadow:inset_0_0_0_1.5px_#2F6BFF]";
const inputStyle: React.CSSProperties = {
  borderColor: color.cell,
  color: color.ink,
  background: color.paper,
  ...sans,
};

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

/* Instrument-panel micro-label: sentence case, body sans. Lit → blue. */
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
    color: on ? color.blue : color.inkFaint,
  };
  const cls = `text-[11px] font-medium tracking-[-0.01em] transition-colors ${className}`;
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
        className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-[12px] font-medium tracking-[-0.01em] transition-colors hover:bg-black/[0.03] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_#2F6BFF]"
        style={{ borderColor: color.rule, color: color.ink }}
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
        {/* Kicker header + hairline, then body — matches the section's
            editorial idiom (square card, ink rule, system type). */}
        <div
          className="border-b px-3.5 py-2"
          style={{ borderColor: color.cell }}
        >
          <span
            className="text-[11px] font-semibold tracking-[-0.01em]"
            style={{ color: color.inkFaint }}
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

/* The card's info footer — ring-anatomy chips + the address footnote. Shared by
   the standalone builder (chrome) and the how-it-works tabs, so every card has
   the same footer. */
export function BadgeInfoFooter({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t px-4 py-2.5 ${className}`}
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
        <span
          className="whitespace-nowrap"
          style={{ ...mono, color: color.ink }}
        >
          &lt;course_id&gt;.&lt;slt_hash&gt;
        </span>
        <span style={{ color: color.inkGhost }}> · illustrative only</span>
      </p>
    </div>
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
  /** When false, render bare: no outer border, no header (the host supplies the
   *  card + header). Used when the builder is one tab inside a shared card. */
  chrome?: boolean;
}

export default function BadgeBuilder({
  className = "",
  title = "Build a credential badge",
  note,
  liveLabel = "Live preview",
  chrome = true,
}: BadgeBuilderProps = {}) {
  const [courseName, setCourseName] = React.useState(SAMPLE.courseName);
  const [moduleName, setModuleName] = React.useState(SAMPLE.moduleName);
  const [slts, setSlts] = React.useState<string[]>([...SAMPLE.slts]);
  const [earnerName, setEarnerName] = React.useState(
    GETTING_STARTED.params.earnerName ?? "Jordan Smith",
  );
  const [did, setDid] = React.useState(
    GETTING_STARTED.params.did ?? "did:andamio:8f3a7c1e9b2d4a60",
  );
  const [issuedAt, setIssuedAt] = React.useState(
    GETTING_STARTED.params.issuedAt ?? "2025-06-03T10:30:00Z",
  );
  const [skillLabels, setSkillLabels] = React.useState(
    (GETTING_STARTED.params.skills ?? []).map((s) => s.label).join(", "),
  );
  const [credential, setCredential] = React.useState(() =>
    credentialFromBadge(GETTING_STARTED.params, {
      earnerName: GETTING_STARTED.params.earnerName,
      did: GETTING_STARTED.params.did,
      issuedAt: GETTING_STARTED.params.issuedAt,
      skills: (GETTING_STARTED.params.skills ?? []).map((s) => s.label),
    }),
  );

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
      // Pristine course/module/SLTs = real Getting Started hashes (mainnet).
      // Face fields (earner, DID, …) always overlay from the console.
      const pristine =
        courseName === GETTING_STARTED.courseName &&
        moduleName === GETTING_STARTED.moduleName &&
        slts.length === GETTING_STARTED.slts.length &&
        slts.every((s, i) => s === GETTING_STARTED.slts[i]);
      const base = pristine
        ? GETTING_STARTED.params
        : await buildBadgeParams({ courseName, moduleName, slts });
      if (myReq !== reqRef.current) return;
      const skills = skillLabels
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 4)
        .map((label, i) => ({ id: `s${i + 1}`, label }));
      const params: BadgeParams = {
        ...base,
        earnerName: earnerName.trim() || base.earnerName,
        did: did.trim() || base.did,
        issuedAt: issuedAt.trim() || base.issuedAt,
        skills: skills.length ? skills : base.skills,
      };
      setCredential(
        credentialFromBadge(params, {
          earnerName: params.earnerName,
          did: params.did,
          issuedAt: params.issuedAt,
          skills: params.skills?.map((s) => s.label),
        }),
      );
    }, 150);
    return () => window.clearTimeout(t);
  }, [courseName, moduleName, slts, earnerName, did, issuedAt, skillLabels]);

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
      className={chrome ? `m-0 border ${className}` : `m-0 ${className}`}
      style={
        chrome
          ? { borderColor: color.rule, background: color.paper }
          : undefined
      }
    >
      {/* ── Frame header: the section title lives here (inside the box) + a live
             pulse. Omitted when chrome=false — the host card provides it. ──── */}
      {chrome && (
        <div
          className="flex items-start justify-between gap-4 border-b px-4 py-3"
          style={{ borderColor: color.rule }}
        >
          <div className="min-w-0">
            <h2
              className="text-[19px] leading-tight sm:text-[22px]"
              style={{
                ...sans,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: color.ink,
              }}
            >
              {title}
            </h2>
            {note && (
              <p
                className="mt-0.5 text-[12px] leading-snug"
                style={{ color: color.inkMuted }}
              >
                {note}
              </p>
            )}
          </div>
          <span
            className="inline-flex shrink-0 items-center gap-2 pt-1 text-[11px] font-semibold tracking-[-0.01em]"
            style={{ color: color.inkFaint }}
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: color.orange }}
            />
            {liveLabel}
          </span>
        </div>
      )}

      {/* ── Body: console · specimen ──────────────────────────────── */}
      <div className="grid grid-cols-12">
        {/* Console — inputs */}
        <div
          className="col-span-12 flex flex-col gap-2.5 p-3.5 sm:p-4 lg:col-span-6 lg:border-r"
          style={{ borderColor: color.cell }}
        >
          <div className="flex flex-col gap-1">
            <MicroLabel
              as="label"
              htmlFor="bb-course"
              on={active === "identity"}
            >
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
            <p
              className="mt-0.5 text-[11px] leading-snug"
              style={{ color: color.inkMuted }}
            >
              A course is yours — only its owner can issue credentials on it.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <MicroLabel
              as="label"
              htmlFor="bb-module"
              on={active === "identity"}
            >
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
              <MicroLabel on={active === "targets"}>
                Learning targets
              </MicroLabel>
              <span
                className="text-[10px] tabular-nums"
                style={{ ...mono, color: color.inkFaint }}
              >
                {slts.length.toString().padStart(2, "0")}
              </span>
            </div>
            <div
              className="flex max-h-[34vh] flex-col gap-1 overflow-y-auto border p-1 [scrollbar-width:thin]"
              style={{
                borderColor: color.cell,
                background: "rgba(10,10,10,0.015)",
              }}
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
              className="self-start text-[12px] font-semibold tracking-[-0.01em] transition-colors hover:opacity-70"
              style={{ color: color.blue }}
            >
              + Add a learning target
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <MicroLabel as="label" htmlFor="bb-earner" on={active === "earner"}>
              Earner
            </MicroLabel>
            <input
              id="bb-earner"
              {...noAutofill}
              value={earnerName}
              onChange={(e) => setEarnerName(e.target.value)}
              onFocus={() => focusZone("earner")}
              onBlur={blurZone}
              className={inputCls}
              style={inputStyle}
              placeholder="e.g. Jordan Smith"
            />
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <MicroLabel as="label" htmlFor="bb-did" on={active === "did"}>
                DID
              </MicroLabel>
              <input
                id="bb-did"
                {...noAutofill}
                value={did}
                onChange={(e) => setDid(e.target.value)}
                onFocus={() => focusZone("did")}
                onBlur={blurZone}
                className={inputCls}
                style={{ ...inputStyle, ...mono, fontSize: 12 }}
                placeholder="did:andamio:…"
              />
            </div>
            <div className="flex flex-col gap-1">
              <MicroLabel
                as="label"
                htmlFor="bb-issued"
                on={active === "issued"}
              >
                Issued
              </MicroLabel>
              <input
                id="bb-issued"
                {...noAutofill}
                value={issuedAt}
                onChange={(e) => setIssuedAt(e.target.value)}
                onFocus={() => focusZone("issued")}
                onBlur={blurZone}
                className={inputCls}
                style={{ ...inputStyle, ...mono, fontSize: 12 }}
                placeholder="2025-06-03T10:30:00Z"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <MicroLabel as="label" htmlFor="bb-skills" on={active === "skills"}>
              Skills
            </MicroLabel>
            <input
              id="bb-skills"
              {...noAutofill}
              value={skillLabels}
              onChange={(e) => setSkillLabels(e.target.value)}
              onFocus={() => focusZone("skills")}
              onBlur={blurZone}
              className={inputCls}
              style={inputStyle}
              placeholder="Access Token, Commit, Evidence, Review"
            />
            <p
              className="mt-0.5 text-[11px] leading-snug"
              style={{ color: color.inkMuted }}
            >
              Up to four labels, comma-separated. Marks on the face stay
              generic.
            </p>
          </div>
        </div>

        {/* Specimen — the live badge. It carries the course_id + slt_hash inside
            its own ring artwork, so it does the heavy lifting; nothing is echoed
            (or concatenated) below it. */}
        <div className="col-span-12 flex flex-col items-center justify-center p-4 sm:p-5 lg:col-span-6">
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

            <div className="relative aspect-square w-[min(100cqw,100cqh,340px)]">
              <ProofRingBadge
                credential={credential}
                highlight={active ? (ZONE_ARC[active] ?? null) : null}
                showcasePhrases={false}
                intro={false}
                className="h-full w-full drop-shadow-[0_18px_44px_rgba(0,0,0,0.28)]"
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[3%] rounded-full shadow-[0_0_28px_4px_rgba(47,107,255,0.45)] ring-[5px] ring-[#2F6BFF]/40 blur-[3px] transition-opacity duration-300 ${
                  active === "identity" ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[7%] rounded-full shadow-[0_0_28px_4px_rgba(47,107,255,0.45)] ring-[5px] ring-[#2F6BFF]/40 blur-[3px] transition-opacity duration-300 ${
                  active === "targets" ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
            <Dialog.Root>
              <Dialog.Trigger
                type="button"
                className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 border bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-[-0.01em] backdrop-blur focus:outline-none focus-visible:[box-shadow:0_0_0_3px_rgba(47,107,255,0.55)]"
                style={{ borderColor: color.rule, color: color.ink }}
              >
                <ZoomIn className="h-3 w-3" /> Zoom in
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content
                  aria-describedby={undefined}
                  className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,760px)] -translate-x-1/2 -translate-y-1/2 border outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
                  style={{ borderColor: color.rule, background: color.paper }}
                >
                  <div
                    className="flex items-center justify-between gap-4 border-b px-4 py-2.5"
                    style={{ borderColor: color.rule }}
                  >
                    <Dialog.Title className="truncate text-[12px] font-semibold tracking-[-0.01em]">
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
                  <div
                    className="flex items-center justify-center p-6 sm:p-10"
                    style={{ background: color.coralTint }}
                  >
                    <div className="w-[min(78vh,82vw,560px)]">
                      <ProofRingBadge
                        credential={credential}
                        showcasePhrases={false}
                        intro={false}
                        className="drop-shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                      />
                    </div>
                  </div>
                  <p
                    className="border-t px-4 py-2.5 text-[11px]"
                    style={{ borderColor: color.cell, color: color.inkMuted }}
                  >
                    The rings encode the{" "}
                    <span style={{ ...mono, color: color.ink }}>course_id</span>{" "}
                    and{" "}
                    <span style={{ ...mono, color: color.ink }}>slt_hash</span>.
                    Press <span style={mono}>Esc</span> or click outside to
                    close.
                  </p>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>

      {/* ── Frame footer: the shared info footer. Rendered only with chrome;
             the how-it-works card supplies one footer for all its tabs. ─────── */}
      {chrome && <BadgeInfoFooter />}
    </figure>
  );
}
