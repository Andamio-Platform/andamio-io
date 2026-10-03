"use client";

/**
 * ProofRingBadge — the concept-40 Proof Ring credential as a live component.
 *
 * Layers (one 1024 x 1024 coordinate space, scaled with container units):
 * clean-plate artwork → drifting motes → ring B (ccw) → ring A (cw) → tick
 * scan → fixed markers → HTML face. Every credential field is real DOM text.
 */

import Image from "next/image";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_CREDENTIAL,
  middleTruncate,
  SHOWCASE_PHRASES,
  type ProofCredential,
  type ProofTheme,
} from "./credential";
import { BADGE_SIZE, FACE, GLYPH_EM, type FieldArc } from "./geometry";
import {
  CalendarGlyph,
  CardanoGlyph,
  CopyGlyph,
  ExternalGlyph,
  SkillGlyph,
} from "./icons";
import {
  Particles,
  RingA,
  RingB,
  RingFixtures,
  RingHighlights,
  TickScan,
} from "./ProofRings";

const PLATE_SRC = "/images/landing/proof-badge-plate.webp";
const PLATE_OPEN_SRC = "/images/landing/proof-badge-plate-open.webp";
const COPIED_MS = 1600;
const INTRO_MS = 1900;

/** `2026-07-01T00:30:00Z` → `2026-07-01 00:30`. Falls back to the raw value. */
function formatIssued(iso: string): string {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(iso);
  return match ? `${match[1]} ${match[2]}` : iso;
}

const u = (n: number) => `calc(var(--u) * ${n})`;
const at = (x: number, y: number): React.CSSProperties => ({
  left: `${(x / BADGE_SIZE) * 100}%`,
  top: `${(y / BADGE_SIZE) * 100}%`,
});

/** Shrinks a size so `text` fits `maxW` (badge px), assuming `em` per glyph. */
function fitSize(text: string, base: number, maxW: number, em: number): number {
  const natural = text.length * em * base;
  return natural > maxW
    ? Math.max(base * 0.62, maxW / (text.length * em))
    : base;
}

/** `did:web:credentials.andamio.io` → break opportunities after each colon. */
function breakAfterColons(value: string): React.ReactNode {
  const parts = value.split(/(?<=:)/);
  return parts.map((p, k) => (
    <React.Fragment key={k}>
      {p}
      {k < parts.length - 1 && <wbr />}
    </React.Fragment>
  ));
}

function themeStyle(theme: ProofTheme | undefined): React.CSSProperties {
  if (!theme) return {};
  const vars: Record<string, string | undefined> = {
    "--pb-cyan": theme.cyan,
    "--pb-cyan-hot": theme.cyanHot,
    "--pb-orange": theme.orange,
    "--pb-orange-hot": theme.orangeHot,
    "--pb-band-cool": theme.bandCool,
    "--pb-band-warm": theme.bandWarm,
    "--pb-label": theme.label,
    "--pb-accent": theme.accent,
    "--pb-ink": theme.ink,
  };
  return Object.fromEntries(
    Object.entries(vars).filter((e): e is [string, string] => Boolean(e[1])),
  ) as React.CSSProperties;
}

async function writeClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

type FieldHooks = {
  onHighlight: (key: FieldArc | null) => void;
  announce: (message: string) => void;
};

function useCopy(
  value: string,
  label: string,
  announce: FieldHooks["announce"],
) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = useCallback(async () => {
    if (!(await writeClipboard(value))) return;
    setCopied(true);
    announce(`${label} copied`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  }, [announce, label, value]);
  return { copied, copy };
}

function highlightHandlers(
  key: FieldArc,
  onHighlight: FieldHooks["onHighlight"],
) {
  return {
    onMouseEnter: () => onHighlight(key),
    onMouseLeave: () => onHighlight(null),
    onFocus: () => onHighlight(key),
    onBlur: () => onHighlight(null),
  };
}

/** Click-to-copy value (DID, SLT hash). */
function CopyValue({
  value,
  display,
  label,
  arc,
  hooks,
  className,
  style,
}: {
  value: string;
  display: React.ReactNode;
  label: string;
  /** Set only when this value is encoded on a ring. */
  arc?: FieldArc;
  hooks: FieldHooks;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { copied, copy } = useCopy(value, label, hooks.announce);
  return (
    <button
      type="button"
      className={`pb-copy ${className ?? ""}`}
      style={style}
      title={value}
      aria-label={`Copy ${label}: ${value}`}
      onClick={() => void copy()}
      {...(arc ? highlightHandlers(arc, hooks.onHighlight) : {})}
    >
      <span>{display}</span>
      <CopyGlyph className="pb-icon" />
      {copied && <span className="pb-copied">Copied</span>}
    </button>
  );
}

/** Course ID: opens the explorer page; the icon beside it copies. */
function LinkedCopyValue({
  value,
  display,
  label,
  href,
  arc,
  hooks,
  className,
}: {
  value: string;
  display: string;
  label: string;
  href: string;
  arc: FieldArc;
  hooks: FieldHooks;
  className?: string;
}) {
  const { copied, copy } = useCopy(value, label, hooks.announce);
  const hl = highlightHandlers(arc, hooks.onHighlight);
  return (
    <span
      className={`pb-row pb-on-dark ${className ?? ""}`}
      style={{ position: "relative" }}
    >
      <a
        className="pb-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={value}
        aria-label={`${label} ${value}, open on Andamioscan`}
        {...hl}
      >
        <span>{display}</span>
        <ExternalGlyph className="pb-icon" />
      </a>
      <button
        type="button"
        className="pb-icon-btn"
        aria-label={`Copy ${label}`}
        onClick={() => void copy()}
        {...hl}
      >
        <CopyGlyph className="pb-icon" />
      </button>
      {copied && <span className="pb-copied">Copied</span>}
    </span>
  );
}

// Code-split: the QR encoder stays out of first-load JS; the fixed-size box
// renders empty until it arrives, so nothing shifts.
const loadQrEncoder = () =>
  import("@pjaudiomv/qrcode-svg").then((m) => m.default);

const VerifyQr = memo(function VerifyQr({ url }: { url: string }) {
  const [markup, setMarkup] = useState("");
  useEffect(() => {
    let live = true;
    void loadQrEncoder().then((QRCode) => {
      if (!live) return;
      setMarkup(
        new QRCode({
          content: url,
          padding: 0,
          width: 256,
          height: 256,
          ecl: "L",
          join: true,
          container: "none",
          color: "#0b121b",
          background: "#ffffff",
          pretty: false,
          xmlDeclaration: false,
        }).svg(),
      );
    });
    return () => {
      live = false;
    };
  }, [url]);
  const q = FACE.qr;
  return (
    <a
      className="pb-qr pb-field"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Verify this credential (opens the signed badge)"
      style={{
        ...at(q.x, q.y),
        width: `${(q.size / BADGE_SIZE) * 100}%`,
        height: `${(q.size / BADGE_SIZE) * 100}%`,
        ["--i" as string]: 11,
      }}
    >
      <svg
        viewBox="0 0 256 256"
        aria-hidden
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </a>
  );
});

export type ProofRingBadgeProps = {
  credential?: ProofCredential;
  /** Continuous ring motion and polish loops. Off → a still badge. */
  animated?: boolean;
  /** One-time verification intro on first view. */
  intro?: boolean;
  /** Marketing phrases on ring B. Real credentials leave this off. */
  showcasePhrases?: boolean | readonly string[];
  className?: string;
  style?: React.CSSProperties;
  /** Plate is the hero LCP image when true. */
  priority?: boolean;
  /** Externally driven ring highlight (e.g. an inspector panel). */
  highlight?: FieldArc | null;
};

export function ProofRingBadge({
  credential = DEFAULT_CREDENTIAL,
  animated = true,
  intro = true,
  showcasePhrases = false,
  className = "",
  style,
  priority = false,
  highlight = null,
}: ProofRingBadgeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef(highlight);
  const [introOn, setIntroOn] = useState(intro && animated);
  const c = credential;

  const phrases =
    showcasePhrases === true ? SHOWCASE_PHRASES : showcasePhrases || null;

  const onHighlight = useCallback((key: FieldArc | null) => {
    const el = rootRef.current;
    if (!el) return;
    const next = key ?? highlightRef.current;
    if (next) el.dataset.hl = next;
    else delete el.dataset.hl;
  }, []);

  useEffect(() => {
    highlightRef.current = highlight;
    onHighlight(null);
  }, [highlight, onHighlight]);

  const announce = useCallback((message: string) => {
    if (liveRef.current) liveRef.current.textContent = message;
  }, []);

  const hooks = useMemo(
    () => ({ onHighlight, announce }),
    [onHighlight, announce],
  );

  // Pause everything while off-screen; end the intro once it has been seen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let introTimer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          delete el.dataset.offscreen;
          if (introTimer === undefined) {
            introTimer = window.setTimeout(() => setIntroOn(false), INTRO_MS);
          }
        } else {
          el.dataset.offscreen = "";
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(introTimer);
    };
  }, []);

  const f = FACE;
  const earnerName = c.holder.displayName ?? c.holder.alias;
  const showAlias = Boolean(c.holder.displayName && c.holder.alias);
  const courseSize = fitSize(
    c.course,
    f.course.size,
    f.course.maxW,
    GLYPH_EM.course,
  );
  const moduleSize = fitSize(
    c.module,
    f.module.size,
    f.module.maxW,
    GLYPH_EM.module,
  );
  const earnerSize = fitSize(
    earnerName,
    f.earner.size,
    f.earner.maxW,
    GLYPH_EM.earner,
  );
  const didWraps = c.issuerDid.length * GLYPH_EM.value * 14.5 > 180;
  const wordmarkSize = fitSize(
    c.brand,
    f.wordmark.size,
    f.wordmark.maxW,
    GLYPH_EM.wordmark,
  );
  const skills = c.skills.slice(0, 4);
  const skillX = (i: number) =>
    skills.length === 4
      ? (f.skills.columns[i] ?? 512)
      : f.skills.span[0] +
        ((i + 0.5) * (f.skills.span[1] - f.skills.span[0])) / skills.length;
  const courseIdDisplay = middleTruncate(c.courseId);
  const hashDisplay = middleTruncate(c.sltHash);

  const classes = [
    "pb-root",
    animated ? "pb-live" : "",
    introOn ? "pb-intro" : "",
  ].join(" ");

  let i = 0;
  const field = (extra?: React.CSSProperties): React.CSSProperties => ({
    ["--i" as string]: i++,
    ...extra,
  });

  return (
    <div
      className={`pb-frame ${className}`}
      style={{ ...themeStyle(c.theme), ...style }}
    >
      <div
        ref={rootRef}
        className={classes}
        style={intro ? { ["--pb-spin-delay" as string]: "0.82s" } : undefined}
        role="group"
        aria-label={`Andamio credential: ${c.module}, ${c.course}. Earned by ${earnerName}. Anchored on ${c.network}.`}
      >
        <div className="pb-stage">
          <Image
            key={c.mark ? PLATE_OPEN_SRC : PLATE_SRC}
            src={c.mark ? PLATE_OPEN_SRC : PLATE_SRC}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 36rem, 92vw"
            className="pb-plate"
            draggable={false}
          />
          <Particles />
          <RingB phrases={phrases} hash={c.sltHash} />
          <RingA courseId={c.courseId} />
          {animated && <TickScan />}
          <RingFixtures />
          <RingHighlights />

          <div className="pb-face">
            {c.mark ? (
              <span
                className="pb-at pb-mark"
                style={field({
                  ...at(f.mark.x, f.mark.y),
                  width: u(f.mark.w),
                  height: u(f.mark.h),
                })}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.mark} alt="" />
              </span>
            ) : (
              <p
                className="pb-at pb-at-start pb-wordmark pb-field"
                style={field({
                  ...at(f.wordmark.x, f.wordmark.y),
                  fontSize: u(wordmarkSize),
                })}
              >
                {c.brand.toUpperCase()}
              </p>
            )}

            <p
              className="pb-at pb-label pb-field"
              style={field(at(f.courseLabel.x, f.courseLabel.y))}
            >
              Course
            </p>
            <h3
              className="pb-at pb-title pb-field"
              style={field({
                ...at(f.course.x, f.course.y),
                fontSize: u(courseSize),
                maxWidth: u(f.course.maxW),
              })}
              title={c.course}
            >
              {c.course}
            </h3>

            <p
              className="pb-at pb-label pb-field"
              style={field(at(f.moduleLabel.x, f.moduleLabel.y))}
            >
              Module
            </p>
            <p
              className="pb-at pb-module pb-field"
              style={field({
                ...at(f.module.x, f.module.y),
                fontSize: u(moduleSize),
                maxWidth: u(f.module.maxW),
              })}
              title={c.module}
            >
              {c.module}
            </p>

            {earnerName.trim() ? (
              <>
                <p
                  className="pb-at pb-label pb-label-accent pb-field"
                  style={field(at(f.earnerLabel.x, f.earnerLabel.y))}
                >
                  Earner
                </p>
                <p
                  className="pb-at pb-earner pb-field"
                  style={field({
                    ...at(f.earner.x, f.earner.y - (showAlias ? 3 : 0)),
                    fontSize: u(earnerSize),
                    maxWidth: u(f.earner.maxW),
                  })}
                >
                  {earnerName}
                  {c.holderIsSample && (
                    <span className="pb-sr"> (sample holder)</span>
                  )}
                </p>
                {showAlias && (
                  <p
                    className="pb-at pb-alias pb-field"
                    style={field(at(f.earner.x, 511))}
                    title="Access Token alias"
                  >
                    {c.holder.alias}
                  </p>
                )}
              </>
            ) : null}

            {c.issuerDid.trim() ? (
              <>
                <p
                  className="pb-at pb-label pb-field"
                  style={field(
                    at((f.didBox.x0 + f.didBox.x1) / 2, f.boxLabelY),
                  )}
                >
                  Issuer DID
                </p>
                <div
                  className="pb-at pb-value pb-field"
                  style={field({
                    ...at(
                      (f.didBox.x0 + f.didBox.x1) / 2,
                      f.boxValueY + (didWraps ? 4 : 0),
                    ),
                    fontSize: u(didWraps ? 13 : 14.5),
                    maxWidth: u(206),
                  })}
                >
                  <CopyValue
                    value={c.issuerDid}
                    display={
                      didWraps ? breakAfterColons(c.issuerDid) : c.issuerDid
                    }
                    label="issuer DID"
                    hooks={hooks}
                    className={didWraps ? "pb-wrap" : ""}
                  />
                </div>
              </>
            ) : null}

            <p
              className="pb-at pb-label pb-field"
              style={field(
                at((f.issuedBox.x0 + f.issuedBox.x1) / 2, f.boxLabelY),
              )}
            >
              Issued
            </p>
            <p
              className="pb-at pb-value pb-row pb-field"
              style={field(
                at((f.issuedBox.x0 + f.issuedBox.x1) / 2 + 2, f.boxValueY),
              )}
            >
              <time dateTime={c.issuedAt}>{formatIssued(c.issuedAt)}</time>
              <CalendarGlyph className="pb-icon" />
            </p>

            <p
              className="pb-at pb-label pb-field"
              style={field(at(f.networkLabel.x, f.networkLabel.y))}
            >
              Network
            </p>
            <p
              className="pb-at pb-row pb-field"
              style={field({
                ...at(f.network.x + 4, f.network.y + 6),
                fontSize: u(f.network.size),
                color: "var(--pb-body)",
              })}
            >
              <CardanoGlyph className="pb-cardano" />
              {c.network}
            </p>

            {skills.length > 0 && (
              <>
                <p
                  className="pb-at pb-label pb-label-accent pb-field"
                  style={field(at(f.skillsLabel.x - 4, f.skillsLabel.y))}
                >
                  Skills
                </p>
                <ul
                  style={{ margin: 0, padding: 0, listStyle: "none" }}
                  aria-label="Skills"
                >
                  {skills.map((s, k) => (
                    <li
                      key={s.label}
                      className="pb-at pb-skill pb-field"
                      style={field({
                        ...at(
                          skillX(k),
                          (f.skills.iconY + f.skills.textY) / 2 - 4.5,
                        ),
                        gap: u(10),
                      })}
                    >
                      <SkillGlyph icon={s.icon} className="pb-skill-icon" />
                      <span className="pb-skill-label">{s.label}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p
              className="pb-at pb-panel-label pb-field"
              data-arc="courseId"
              style={field(at(f.courseIdPanel.x + 8, f.courseIdPanel.labelY))}
            >
              Course ID
            </p>
            <div
              className="pb-at pb-mono pb-field"
              data-arc="courseId"
              style={field(at(f.courseIdPanel.x + 8, f.courseIdPanel.valueY))}
            >
              {c.courseUrl ? (
                <LinkedCopyValue
                  value={c.courseId}
                  display={courseIdDisplay}
                  label="course ID"
                  href={c.courseUrl}
                  arc="courseId"
                  hooks={hooks}
                />
              ) : (
                <CopyValue
                  value={c.courseId}
                  display={courseIdDisplay}
                  label="course ID"
                  arc="courseId"
                  hooks={hooks}
                  className="pb-on-dark"
                />
              )}
            </div>

            <p
              className="pb-at pb-panel-label pb-field"
              data-arc="hash"
              style={field(at(f.hashPanel.x - 29, f.hashPanel.labelY))}
            >
              SLT hash
            </p>
            <div
              className="pb-at pb-mono pb-field"
              data-arc="hash"
              style={field(at(f.hashPanel.x - 2, f.hashPanel.valueY))}
            >
              {c.hashUrl ? (
                <LinkedCopyValue
                  value={c.sltHash}
                  display={hashDisplay}
                  label="SLT hash"
                  href={c.hashUrl}
                  arc="hash"
                  hooks={hooks}
                />
              ) : (
                <CopyValue
                  value={c.sltHash}
                  display={hashDisplay}
                  label="SLT hash"
                  arc="hash"
                  hooks={hooks}
                  className="pb-on-dark"
                />
              )}
            </div>

            <VerifyQr url={c.verifyUrl} />

            <a
              className="pb-at pb-verify pb-field"
              href={c.claimUrl ?? c.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={field(at(f.verifyTab.x, f.verifyTab.y))}
            >
              Verify credential
            </a>
          </div>

          {phrases && (
            <p className="pb-sr">Andamio credentials: {phrases.join(". ")}.</p>
          )}
          <p ref={liveRef} className="pb-sr" aria-live="polite" />
        </div>
      </div>
    </div>
  );
}
