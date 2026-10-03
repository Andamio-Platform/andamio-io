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
import {
  badgeSvgFilename,
  buildBadgeSvg,
  credentialFromBuilder,
  ProofRingBadge,
} from "./proof-badge";
import {
  checkFields,
  FIELD_MAX,
  fieldsAreValid,
  sanitizeField,
} from "./proof-badge/field-check";
import {
  buildBadgeParams,
  type BadgeParams,
} from "./proof-badge/builder-params";
import { GETTING_STARTED } from "./proof-badge/getting-started";
import type { FieldArc } from "./proof-badge/geometry";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, ZoomIn } from "lucide-react";
import { BadgeInfoFooter } from "./BadgeInfoFooter";
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
  courseId: "courseId",
  sltHash: "hash",
};

/** Icon until hover, or the first tap on a touch screen. */
function useCornerReveal() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  const guard = (event: React.MouseEvent, run: () => void) => {
    const touch = window.matchMedia("(hover: none)").matches;
    if (touch && !open) {
      event.preventDefault();
      setOpen(true);
      return;
    }
    run();
  };
  return { ref, open, guard };
}

const cornerButtonCls = (side: "left" | "right", open: boolean) =>
  [
    "group absolute bottom-1 z-10 inline-flex h-8 max-w-8 items-center justify-center overflow-hidden rounded-full border bg-background/90 px-2 text-[11px] font-semibold tracking-[-0.01em] backdrop-blur",
    "transition-[max-width] duration-200 hover:max-w-[9.5rem] focus-visible:max-w-[9.5rem]",
    "focus:outline-none focus-visible:[box-shadow:0_0_0_3px_rgb(63_217_232/0.55)] disabled:opacity-60",
    open ? "max-w-[9.5rem]" : "",
    side === "left" ? "left-1" : "right-1 flex-row-reverse",
  ].join(" ");

const cornerLabelCls = (side: "left" | "right", open: boolean) =>
  [
    "max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200",
    "group-hover:max-w-[7.5rem] group-hover:opacity-100 group-focus-visible:max-w-[7.5rem] group-focus-visible:opacity-100",
    open ? "max-w-[7.5rem] opacity-100" : "",
    side === "left"
      ? "group-hover:ml-1.5 group-focus-visible:ml-1.5"
      : "group-hover:mr-1.5 group-focus-visible:mr-1.5",
    open ? (side === "left" ? "ml-1.5" : "mr-1.5") : "",
  ].join(" ");

function FieldHint({
  error,
  children,
}: {
  error?: string;
  children?: React.ReactNode;
}) {
  if (!error && !children) return null;
  return (
    <p
      className="mt-0.5 text-[11px] leading-snug"
      style={{ color: error ? color.orange : color.inkMuted }}
      role={error ? "alert" : undefined}
    >
      {error || children}
    </p>
  );
}

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
    mark?: string;
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
    mark: face.mark ?? params.mark,
  });
}

/** Pathname ends in .png. Query strings are fine; other types are not. */
function isPngUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    const url = new URL(trimmed, "https://andamio.local");
    return url.pathname.toLowerCase().endsWith(".png");
  } catch {
    return false;
  }
}

function isPngFile(file: File): boolean {
  const nameOk = file.name.toLowerCase().endsWith(".png");
  if (file.type === "image/png") return nameOk;
  if (file.type === "") return nameOk;
  return false;
}

const mono = { fontFamily: font.mono };
const sans = { fontFamily: font.sans };

/* Square, hairline input. Blue inset on focus = the system's data/linking accent. */
const inputCls =
  "w-full border px-3 py-1.5 text-[14px] transition-shadow placeholder:text-foreground/30 focus:outline-none focus:[box-shadow:inset_0_0_0_1.5px_var(--sys-cyan)]";
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
    color: on ? color.cyan : color.inkFaint,
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
  const [logoUrl, setLogoUrl] = React.useState("");
  const [logoDraft, setLogoDraft] = React.useState("");
  const [logoError, setLogoError] = React.useState("");
  const logoObjectUrl = React.useRef<string | null>(null);
  const logoFileRef = React.useRef<HTMLInputElement>(null);
  const [credential, setCredential] = React.useState(() =>
    credentialFromBadge(GETTING_STARTED.params, {
      earnerName: GETTING_STARTED.params.earnerName,
      did: GETTING_STARTED.params.did,
      issuedAt: GETTING_STARTED.params.issuedAt,
      skills: (GETTING_STARTED.params.skills ?? []).map((s) => s.label),
    }),
  );
  const [downloading, setDownloading] = React.useState(false);
  const zoom = useCornerReveal();
  const download = useCornerReveal();

  const downloadSvg = async () => {
    if (downloading || !previewReady) return;
    setDownloading(true);
    try {
      const svg = await buildBadgeSvg(credential);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = badgeSvgFilename(credential);
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const revokeLogoObjectUrl = () => {
    if (!logoObjectUrl.current) return;
    URL.revokeObjectURL(logoObjectUrl.current);
    logoObjectUrl.current = null;
  };
  React.useEffect(
    () => () => {
      if (logoObjectUrl.current) URL.revokeObjectURL(logoObjectUrl.current);
    },
    [],
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
  const errors = checkFields({
    course: courseName,
    module: moduleName,
    targets: slts,
    earner: earnerName,
    did,
    issued: issuedAt,
    skills: skillLabels,
  });
  const previewReady = fieldsAreValid(errors) && !logoError;

  React.useEffect(() => {
    if (!previewReady) return;
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
        : await buildBadgeParams({
            courseName: courseName.trim(),
            moduleName: moduleName.trim(),
            slts: slts.map((line) => line.trim()),
          });
      if (myReq !== reqRef.current) return;
      const skills = skillLabels
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 4)
        .map((label, i) => ({ id: `s${i + 1}`, label }));
      const params: BadgeParams = {
        ...base,
        earnerName: earnerName.trim(),
        did: did.trim(),
        issuedAt: issuedAt.trim(),
        skills,
        mark: logoUrl || undefined,
      };
      setCredential(
        credentialFromBadge(params, {
          earnerName: params.earnerName,
          did: params.did,
          issuedAt: params.issuedAt,
          skills: params.skills?.map((s) => s.label),
          mark: params.mark,
        }),
      );
    }, 150);
    return () => window.clearTimeout(t);
  }, [
    courseName,
    moduleName,
    slts,
    earnerName,
    did,
    issuedAt,
    skillLabels,
    logoUrl,
    previewReady,
  ]);

  const updateSlt = (i: number, value: string) =>
    setSlts((prev) =>
      prev.map((s, j) =>
        j === i ? sanitizeField(value, FIELD_MAX.target) : s,
      ),
    );
  const addSlt = () => {
    focusZone("targets");
    setSlts((prev) => [...prev, ""]);
  };
  const removeSlt = (i: number) => {
    focusZone("targets");
    setSlts((prev) => prev.filter((_, j) => j !== i));
  };

  const clearLogo = () => {
    revokeLogoObjectUrl();
    setLogoUrl("");
    setLogoDraft("");
    setLogoError("");
    if (logoFileRef.current) logoFileRef.current.value = "";
  };
  const onLogoFile = (file: File | undefined) => {
    if (!file) return;
    if (!isPngFile(file)) {
      setLogoError("PNG only.");
      if (logoFileRef.current) logoFileRef.current.value = "";
      return;
    }
    revokeLogoObjectUrl();
    const url = URL.createObjectURL(file);
    logoObjectUrl.current = url;
    setLogoUrl(url);
    setLogoDraft("");
    setLogoError("");
  };
  const applyLogoUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setLogoError("");
      return;
    }
    if (!isPngUrl(trimmed)) {
      setLogoError("PNG only. The link must end in .png.");
      return;
    }
    revokeLogoObjectUrl();
    if (logoFileRef.current) logoFileRef.current.value = "";
    setLogoUrl(trimmed);
    setLogoError("");
  };

  return (
    <figure
      id="builder"
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
              onChange={(e) =>
                setCourseName(sanitizeField(e.target.value, FIELD_MAX.course))
              }
              aria-invalid={errors.course ? true : undefined}
              onFocus={() => focusZone("identity")}
              onBlur={blurZone}
              className={inputCls}
              style={inputStyle}
              placeholder="e.g. Bike Repair Basics"
            />
            {/* What a course is + the ownership rule, in one quiet line. */}
            <FieldHint error={errors.course}>
              A course is yours — only its owner can issue credentials on it.
            </FieldHint>
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
              onChange={(e) =>
                setModuleName(sanitizeField(e.target.value, FIELD_MAX.module))
              }
              aria-invalid={errors.module ? true : undefined}
              onFocus={() => focusZone("identity")}
              onBlur={blurZone}
              className={inputCls}
              style={inputStyle}
              placeholder="e.g. Fix a Flat Tire"
            />
            <FieldHint error={errors.module} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <MicroLabel as="label" htmlFor="bb-logo-file">
                Logo (PNG)
              </MicroLabel>
              {logoUrl ? (
                <button
                  type="button"
                  onClick={clearLogo}
                  className="text-[12px] font-semibold tracking-[-0.01em] transition-colors hover:opacity-70"
                  style={{ color: color.cyan }}
                >
                  Clear
                </button>
              ) : null}
            </div>
            <input
              id="bb-logo-file"
              ref={logoFileRef}
              type="file"
              accept="image/png,.png"
              className={`${inputCls} file:mr-3 file:border-0 file:bg-transparent file:text-[13px] file:font-medium`}
              style={inputStyle}
              onChange={(e) => onLogoFile(e.target.files?.[0])}
            />
            <label htmlFor="bb-logo-url" className="sr-only">
              Logo PNG URL
            </label>
            <input
              id="bb-logo-url"
              {...noAutofill}
              type="url"
              inputMode="url"
              value={logoDraft}
              onChange={(e) => {
                setLogoDraft(e.target.value);
                if (logoError) setLogoError("");
              }}
              onBlur={(e) => applyLogoUrl(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyLogoUrl(e.currentTarget.value);
                }
              }}
              className={inputCls}
              style={inputStyle}
              placeholder="or paste a .png link"
            />
            <p
              className="mt-0.5 text-[11px] leading-snug"
              style={{ color: logoError ? color.orange : color.inkMuted }}
            >
              {logoError ||
                "Shown on the badge in this browser only. Nothing is uploaded."}
            </p>
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
                    aria-invalid={errors.targets ? true : undefined}
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
                    className="shrink-0 border px-2.5 py-2 text-[13px] transition-colors hover:bg-white/[0.04]"
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
              style={{ color: color.cyan }}
            >
              + Add a learning target
            </button>
            <FieldHint error={errors.targets} />
          </div>

          <div className="flex flex-col gap-1">
            <MicroLabel as="label" htmlFor="bb-earner" on={active === "earner"}>
              Earner
            </MicroLabel>
            <input
              id="bb-earner"
              {...noAutofill}
              value={earnerName}
              onChange={(e) =>
                setEarnerName(sanitizeField(e.target.value, FIELD_MAX.earner))
              }
              aria-invalid={errors.earner ? true : undefined}
              onFocus={() => focusZone("earner")}
              onBlur={blurZone}
              className={inputCls}
              style={inputStyle}
              placeholder="e.g. Jordan Smith"
            />
            <FieldHint error={errors.earner} />
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
                onChange={(e) =>
                  setDid(sanitizeField(e.target.value, FIELD_MAX.did))
                }
                aria-invalid={errors.did ? true : undefined}
                onFocus={() => focusZone("did")}
                onBlur={blurZone}
                className={inputCls}
                style={{ ...inputStyle, ...mono, fontSize: 12 }}
                placeholder="did:andamio:…"
              />
              <FieldHint error={errors.did} />
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
                onChange={(e) => setIssuedAt(sanitizeField(e.target.value, 40))}
                aria-invalid={errors.issued ? true : undefined}
                onFocus={() => focusZone("issued")}
                onBlur={blurZone}
                className={inputCls}
                style={{ ...inputStyle, ...mono, fontSize: 12 }}
                placeholder="2025-06-03T10:30:00Z"
              />
              <FieldHint error={errors.issued} />
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
              onChange={(e) =>
                setSkillLabels(sanitizeField(e.target.value, FIELD_MAX.skills))
              }
              aria-invalid={errors.skills ? true : undefined}
              onFocus={() => focusZone("skills")}
              onBlur={blurZone}
              className={inputCls}
              style={inputStyle}
              placeholder="Access Token, Commit, Evidence, Review"
            />
            <FieldHint error={errors.skills}>
              Up to four labels, comma-separated. Marks on the face stay
              generic.
            </FieldHint>
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
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 [background:radial-gradient(circle_at_center,rgb(63_217_232/0.10),transparent_62%)] ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />

            <Dialog.Root>
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
                  className={`ring-[var(--sys-cyan)]/40 pointer-events-none absolute inset-[3%] rounded-full shadow-[0_0_28px_4px_rgb(63_217_232/0.45)] ring-[5px] blur-[3px] transition-opacity duration-300 ${
                    active === "identity" ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  aria-hidden
                  className={`ring-[var(--sys-cyan)]/40 pointer-events-none absolute inset-[7%] rounded-full shadow-[0_0_28px_4px_rgb(63_217_232/0.45)] ring-[5px] blur-[3px] transition-opacity duration-300 ${
                    active === "targets" ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <Dialog.Trigger
                ref={zoom.ref}
                type="button"
                aria-label="Zoom in"
                data-open={zoom.open ? "true" : undefined}
                onClick={(event) => zoom.guard(event, () => undefined)}
                className={cornerButtonCls("left", zoom.open)}
                style={{ borderColor: color.rule, color: color.ink }}
              >
                <ZoomIn className="h-3.5 w-3.5 shrink-0" />
                <span className={cornerLabelCls("left", zoom.open)}>
                  Zoom in
                </span>
              </Dialog.Trigger>
              <button
                ref={download.ref}
                type="button"
                aria-label="Download SVG"
                data-open={download.open ? "true" : undefined}
                disabled={downloading || !previewReady}
                onClick={(event) =>
                  download.guard(event, () => void downloadSvg())
                }
                className={cornerButtonCls("right", download.open)}
                style={{ borderColor: color.rule, color: color.ink }}
              >
                <Download className="h-3.5 w-3.5 shrink-0" />
                <span className={cornerLabelCls("right", download.open)}>
                  {downloading ? "Preparing…" : "Download SVG"}
                </span>
              </button>

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
                      className="shrink-0 border px-2.5 py-1 text-[13px] leading-none transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_var(--sys-cyan)]"
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
