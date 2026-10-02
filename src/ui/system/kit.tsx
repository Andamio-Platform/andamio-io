"use client";

/**
 * Andamio Landing — Component Kit
 * =================================================================
 * Page chrome and layout primitives (nav, footer, sections, buttons). Every
 * component reads ./tokens.ts; none hard-codes a hex or a size. The
 * proof-instrument marks (ticks, arcs, readouts, proof cards) live in
 * ./instrument/.
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav as siteNav } from "~/ui/explore/content";
import {
  color,
  font,
  display,
  typeScale,
  layout,
  space,
  motion as motionTok,
  containerCls,
} from "./tokens";
import { trackHref } from "~/lib/analytics";
import {
  Pressable,
  Reveal,
  ScrollProgress,
  Stagger,
  StaggerItem,
  useMotionGate,
} from "./motion";

/* The faint fixed 12-column GridField is RETIRED (2026-07-02): a graph-paper
 * background is pok.tech's hero treatment (a direct competitor) — structure
 * comes from the hairline section rules alone. Don't reintroduce a grid field. */

/* ── LogoWash: the atmosphere layer ─────────────────────────────────────
 * Stand inside the logo mark. Its splotches — coral and vermilion pinwheels
 * high, amber upper-right, teal rounds low in the corners, everything strung
 * on the deep scaffold blue — are blown up far past focus and wash the page
 * at near-threshold opacity. The composition mirrors the mark's own
 * geography, and the center column stays nearly clean so content sits on
 * paper. Fixed, non-interactive, no blend modes. This is atmosphere, not
 * structure — section rules still do the structural work. */
const WASH = {
  coral: "232 93 61", // the pinwheel vermilion
  amber: "240 160 60", // the warm rounds
  teal: "63 169 184", // the cool rounds
  blue: "23 90 114", // the scaffold lattice
} as const;

function washStack(a: {
  coral: number;
  amber: number;
  teal: number;
  blue: number;
}) {
  return [
    // Corals live high in the mark.
    `radial-gradient(46% 36% at 10% 6%, rgb(${WASH.coral} / ${a.coral}), transparent 70%)`,
    `radial-gradient(38% 30% at 92% 10%, rgb(${WASH.amber} / ${a.amber}), transparent 70%)`,
    // Teals hold the low corners.
    `radial-gradient(42% 34% at 4% 82%, rgb(${WASH.teal} / ${a.teal}), transparent 70%)`,
    `radial-gradient(36% 30% at 97% 68%, rgb(${WASH.teal} / ${a.teal * 0.8}), transparent 70%)`,
    // A second coral ember low, off-center — the mark repeats them.
    `radial-gradient(30% 26% at 74% 96%, rgb(${WASH.coral} / ${a.coral * 0.7}), transparent 70%)`,
    // The scaffold blue is the room itself: one broad whisper across the middle.
    `radial-gradient(70% 55% at 50% 42%, rgb(${WASH.blue} / ${a.blue}), transparent 75%)`,
  ].join(", ");
}

export function LogoWash() {
  // Static soft wash; the hero badge is the only continuous motion.
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: washStack({
          coral: 0.07,
          amber: 0.06,
          teal: 0.1,
          blue: 0.12,
        }),
        filter: "blur(48px)",
        opacity: 0.9,
      }}
    />
  );
}

/* ── Brand mark (logo + wordmark, reversed for the dark page) ────────── */
export function Brand({
  href = "/",
  height = 22,
}: {
  href?: string;
  height?: number;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center"
      aria-label="Andamio — home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-with-typography-dark.svg"
        alt="Andamio"
        style={{ height, width: "auto" }}
        className="block select-none"
        draggable={false}
      />
    </a>
  );
}
/** A single card item inside a dropdown menu. */
export interface NavMenuItem {
  name: string;
  desc: string;
  href: string;
  /** Destination not live yet — rendered non-clickable with a "Soon" tag. */
  soon?: boolean;
}
/** A plain top-level link. */
export interface NavLink {
  label: string;
  href: string;
}
/** A top-level entry that opens a rich card of items. */
export interface NavMenu {
  label: string;
  items: readonly NavMenuItem[];
}
export type NavEntry = NavLink | NavMenu;

export interface NavData {
  items: readonly NavEntry[];
  /**
   * Optional filled nav action. The header no longer uses one: the hero's
   * "Show me" is the primary, and issuing lives on /issuer.
   */
  cta?: { label: string; href: string };
  /** Optional quieter action (outline), e.g. "Try the App". */
  secondaryCta?: { label: string; href: string };
}

/* ── Rich dropdown menu (click to open; card of items) ──────────────────── */
function NavDropdown({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: readonly NavMenuItem[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const place = () => {
      const panel = panelRef.current;
      const parent = ref.current;
      if (!panel || !parent) return;
      const gutter = 16;
      const parentLeft = parent.getBoundingClientRect().left;
      const width = panel.offsetWidth;
      let left = 0;
      const viewRight = parentLeft + width;
      if (viewRight > window.innerWidth - gutter) {
        left -= viewRight - (window.innerWidth - gutter);
      }
      if (parentLeft + left < gutter) left += gutter - (parentLeft + left);
      setShift(left);
    };
    place();
    const frame = window.requestAnimationFrame(place);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", place);
      window.cancelAnimationFrame(frame);
    };
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1.5 text-[12px] tracking-[0.02em] transition-colors hover:[color:var(--sys-ink)]"
        style={{ color: open ? color.ink : color.inkMuted }}
      >
        {label}
        <ChevronDown
          size={13}
          aria-hidden
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && (
        <div
          ref={panelRef}
          className="absolute top-[calc(100%+0.85rem)] z-50 w-[min(26rem,calc(100vw-32px))] duration-150 animate-in fade-in-0 slide-in-from-top-1"
          style={{
            left: shift,
            background: color.paper,
            border: `1px solid ${color.rule}`,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div className="grid grid-cols-2">
            {items.map((it, i) => {
              const inner = (
                <>
                  <span
                    className="flex items-center gap-2 text-[14px] font-semibold tracking-[-0.01em]"
                    style={{ color: color.ink }}
                  >
                    {it.name}
                    {it.soon && (
                      <span
                        className="text-[10px] font-semibold tracking-[-0.01em]"
                        style={{ color: color.inkFaint }}
                      >
                        Soon
                      </span>
                    )}
                  </span>
                  <span
                    className="mt-1 text-[12px] leading-snug"
                    style={{ color: color.inkMuted }}
                  >
                    {it.desc}
                  </span>
                </>
              );
              const cellStyle: React.CSSProperties = {
                borderTop: i >= 2 ? `1px solid ${color.cell}` : undefined,
                borderLeft: i % 2 === 1 ? `1px solid ${color.cell}` : undefined,
              };
              const span =
                i === items.length - 1 && items.length % 2 === 1
                  ? "col-span-2"
                  : "";
              return it.soon ? (
                <span
                  key={it.name}
                  className={`flex cursor-default flex-col p-4 ${span}`}
                  style={cellStyle}
                >
                  {inner}
                </span>
              ) : (
                <a
                  key={it.name}
                  href={it.href}
                  onClick={onClose}
                  className={`nav-card-item flex flex-col p-4 ${span}`}
                  style={cellStyle}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function TopNav({
  items,
  secondaryCta = siteNav.secondaryCta,
}: NavData) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const reduce = useMotionGate();
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: color.rule,
        background: "rgb(var(--sys-paper-rgb) / 0.95)",
      }}
    >
      {/* Full-bleed row: the brand and CTAs anchor to the viewport edges
          (at the shared padX gutter) rather than the content measure. */}
      <div
        className={`flex items-center justify-between gap-3 py-2.5 sm:gap-6 sm:py-3 ${layout.padX}`}
      >
        <Brand />
        <div className="flex items-center gap-5 sm:gap-6">
          <nav className="hidden items-center gap-7 lg:flex">
            {items.map((entry) =>
              "items" in entry ? (
                <NavDropdown
                  key={entry.label}
                  label={entry.label}
                  items={entry.items}
                  open={openMenu === entry.label}
                  onToggle={() =>
                    setOpenMenu((m) => (m === entry.label ? null : entry.label))
                  }
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <a
                  key={entry.label}
                  href={entry.href}
                  className="text-[12px] tracking-[0.02em] transition-colors hover:[color:var(--sys-ink)]"
                  style={{ color: color.inkMuted }}
                >
                  {entry.label}
                </a>
              ),
            )}
          </nav>
          {/* Outline only. The hero's "Show me" is the primary; this is the
              app path for developers and existing users. */}
          {secondaryCta && (
            <>
              <span
                className="hidden h-5 w-px lg:block"
                style={{ background: color.cell }}
                aria-hidden
              />
              <Button href={secondaryCta.href} variant="outline" compact>
                {secondaryCta.label}
              </Button>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center lg:hidden"
            style={{ color: color.ink }}
          >
            {reduce ? (
              open ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )
            ) : (
              <span className="relative inline-flex h-5 w-5 items-center justify-center">
                <motion.span
                  className="absolute block h-[2px] w-5 origin-center"
                  style={{ background: color.ink, top: 4 }}
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={motionTok.spring.press}
                />
                <motion.span
                  className="absolute block h-[2px] w-5"
                  style={{ background: color.ink, top: 9 }}
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: motionTok.duration.press }}
                />
                <motion.span
                  className="absolute block h-[2px] w-5 origin-center"
                  style={{ background: color.ink, top: 14 }}
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={motionTok.spring.press}
                />
              </span>
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t lg:hidden"
            style={{ borderColor: color.rule, background: color.paper }}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{
              duration: motionTok.duration.enterFast,
              ease: motionTok.ease,
            }}
          >
            <nav
              className={`${containerCls} flex flex-col py-2`}
              style={{ maxWidth: layout.maxWidth }}
            >
              {items.map((entry) =>
                "items" in entry ? (
                  <div key={entry.label} className="py-2">
                    <p
                      className="py-1.5 text-[12px] font-medium tracking-[-0.01em]"
                      style={{ color: color.inkFaint }}
                    >
                      {entry.label}
                    </p>
                    {entry.items.map((it) =>
                      it.soon ? (
                        <span
                          key={it.name}
                          className="block py-2 pl-3 text-[14px]"
                          style={{ color: color.inkFaint }}
                        >
                          {it.name} <span className="text-[12px]">· soon</span>
                        </span>
                      ) : (
                        <a
                          key={it.name}
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className="block py-2 pl-3 text-[14px] transition-colors hover:[color:var(--sys-ink)]"
                          style={{ color: color.inkMuted }}
                        >
                          {it.name}
                        </a>
                      ),
                    )}
                  </div>
                ) : (
                  <a
                    key={entry.label}
                    href={entry.href}
                    onClick={() => setOpen(false)}
                    className="py-2.5 text-[14px] font-medium tracking-[-0.01em] transition-colors hover:[color:var(--sys-ink)]"
                    style={{ color: color.inkMuted }}
                  >
                    {entry.label}
                  </a>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Page frame: grid + rail + content offset ───────────────────────── */
/* The right-hand EditorialRail (scroll-spy section index) is RETIRED
 * (2026-07-02) — removed from the landing first, then everywhere. */
export function Page({
  nav,
  children,
  footer,
}: {
  nav: NavData;
  children: React.ReactNode;
  /** Full-bleed footer — spans the whole viewport like the TopNav. */
  footer?: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen antialiased"
      style={{
        background: color.paper,
        color: color.ink,
        fontFamily: font.sans,
      }}
    >
      <LogoWash />
      <ScrollProgress />
      <div className="relative z-10">
        {/* First focusable: skip past chrome to the main landmark (A11Y-01). */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:tracking-[-0.01em] focus:outline-none focus:ring-2"
          style={{
            background: color.ink,
            color: color.onInk,
            // ring color via box-shadow so it stays on-brand without a utility
            boxShadow: `0 0 0 2px ${color.paper}, 0 0 0 4px ${color.orange}`,
          }}
        >
          Skip to content
        </a>
        {/* TopNav spans the full viewport so its bottom border is edge-to-edge. */}
        <TopNav {...nav} />
        <main id="main-content" className="overflow-x-clip">
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}

/* ── Section: full-bleed, ink-ruled, system measure ─────────────────── */
export function Section({
  id,
  children,
  bordered = true,
  screen = false,
}: {
  id?: string;
  children: React.ReactNode;
  bordered?: boolean;
  /** Make the section at least one viewport tall and center its content. */
  screen?: boolean;
}) {
  const cls = [
    bordered ? "border-b" : "",
    // Subtract the sticky-nav clearance (--nav-clear, shared with html
    // scroll-padding-top) so content centers in the *visible* area, not behind
    // the fixed header.
    screen
      ? "flex min-h-[calc(100svh_-_var(--nav-clear))] flex-col justify-center"
      : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section
      id={id}
      className={cls || undefined}
      style={bordered ? { borderColor: color.rule } : undefined}
    >
      <Reveal
        soft
        className={`${containerCls} w-full`}
        style={{ maxWidth: layout.maxWidth }}
      >
        {children}
      </Reveal>
    </section>
  );
}

/* ── Kicker: the section eyebrow ─────────────────────────────────────
 * Sentence case in the body sans, led by a small Scaffold-Orange square —
 * the brand mark's own tile, a mark competitors don't share. The previous
 * mono-uppercase letterspaced eyebrow is RETIRED (2026-07-02): it was
 * pok.tech's exact eyebrow treatment. No all-caps tracked eyebrows. */
export function Kicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[13px] font-semibold tracking-[-0.01em] ${className}`}
      style={{ color: color.inkMuted }}
    >
      <span
        aria-hidden
        className="h-2 w-2 shrink-0"
        style={{ background: color.orange }}
      />
      <span>{children}</span>
    </p>
  );
}

/* ── Hairline rule ──────────────────────────────────────────────────── */
export function Hairline({ strong = true }: { strong?: boolean }) {
  return (
    <span
      className="h-px flex-1"
      style={{ background: strong ? color.rule : color.cell }}
    />
  );
}

/* ── Section header row: kicker · [LIVE] · rule ─────────────────────── */
/* Design rule: the header rule carries no trailing meta text. A faint mono
 * label floating on the rule reads as illegible decoration, so the rule runs
 * clean to the edge of the measure. (Removed the former `meta` slot.) */
export function SectionHead({
  kicker,
  live = false,
  liveLabel = "Live",
}: {
  kicker: string;
  live?: boolean;
  liveLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-16 sm:pt-24">
      <Kicker>{kicker}</Kicker>
      {live && (
        <span
          className="inline-flex items-center gap-2 border px-2.5 py-1 text-[11px] font-semibold tracking-[-0.01em]"
          style={{ borderColor: color.rule }}
        >
          <span
            className="h-1.5 w-1.5 animate-pulse"
            style={{ background: color.orange }}
          />
          {liveLabel}
        </span>
      )}
      <Hairline />
    </div>
  );
}

/* ── Display type ──────────────────────────────────────────────────── */
type SizeKey = keyof typeof typeScale;
export function Display({
  size = "xl",
  as: As = "h2",
  className = "",
  style,
  children,
}: {
  size?: SizeKey;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const typeStyle: React.CSSProperties = {
    fontFamily: font.sans,
    fontWeight: display.weight,
    letterSpacing: display.tracking,
    lineHeight: display.leading,
    fontSize: typeScale[size],
    ...style,
  };
  const revealAs =
    As === "h1" || As === "h2" || As === "h3" || As === "p" || As === "span"
      ? As
      : "div";

  if (revealAs === "div" && As !== "div") {
    return (
      <Reveal className={className} style={typeStyle}>
        {React.createElement(As, null, children)}
      </Reveal>
    );
  }

  return (
    <Reveal as={revealAs} className={className} style={typeStyle}>
      {children}
    </Reveal>
  );
}

/* ── Buttons ───────────────────────────────────────────────────────── */
type ButtonVariant = "primary" | "ink" | "outline" | "chip" | "disabled";
// Button type follows the label system: Inter sentence case, no mono, no caps.
// The square geometry + ink/orange fills carry the identity, not the type.
const btnBase =
  "sys-control-press inline-flex items-center justify-center gap-3 px-6 py-3 text-[13px] font-semibold tracking-[-0.01em] transition-[colors,transform,box-shadow,opacity] duration-150";

export function Button({
  variant = "outline",
  href,
  onClick,
  children,
  className = "",
  full = false,
  compact = false,
}: {
  variant?: ButtonVariant;
  href?: string;
  /** Action buttons (no href) — e.g. the StoryFork chapter advances. */
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
  /** Tighter padding so the control fits a short header, including phones. */
  compact?: boolean;
}) {
  const styles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: color.orange,
      border: `1px solid ${color.orange}`,
      color: "#fff",
      boxShadow: color.controlShadow,
    },
    ink: {
      background: color.ink,
      border: `1px solid ${color.ink}`,
      color: color.onInk,
      boxShadow: color.controlShadow,
    },
    outline: {
      border: `1px solid ${color.ink}`,
      color: color.ink,
      boxShadow: color.controlShadow,
      background: "transparent",
    },
    chip: {
      border: `1px solid ${color.ink}`,
      color: color.inkFaint,
      boxShadow: color.controlShadow,
      background: "transparent",
    },
    disabled: { border: `1px solid ${color.cell}`, color: color.inkGhost },
  };
  const cls = `${btnBase} ${compact ? "px-3 py-1.5 text-[12px]" : ""} ${variant === "disabled" ? "cursor-not-allowed" : ""} ${full ? "w-full" : ""} ${className}`;
  const sty: React.CSSProperties = compact
    ? { ...styles[variant], padding: "6px 12px", fontSize: 12 }
    : styles[variant];
  if (variant !== "disabled" && !href && onClick) {
    return (
      <Pressable
        as="button"
        type="button"
        onClick={onClick}
        className={`${cls} hover:opacity-90`}
        style={sty}
      >
        {children}
      </Pressable>
    );
  }
  if (variant === "disabled" || !href) {
    return (
      <Pressable as="span" aria-disabled className={cls} style={sty}>
        {children}
      </Pressable>
    );
  }
  return (
    <Pressable
      as="a"
      href={href}
      onClick={() => {
        trackHref(href);
        onClick?.();
      }}
      className={`${cls} hover:opacity-90`}
      style={sty}
    >
      {children}
    </Pressable>
  );
}

/**
 * ButtonRow — an action group: buttons side by side with x spacing
 * (space.gapButtons), stacking vertically on small screens. Replaces the old
 * border-stitched treatment; rows of buttons always get a gap, never touch.
 */
export function ButtonRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col ${space.gapButtons} sm:flex-row sm:flex-wrap sm:items-stretch`}
    >
      {children}
    </div>
  );
}

/**
 * SectionIntro — the shared section-header triple (eyebrow · Display title ·
 * lead). Used by the product/pricing sections so a header restyle lands once.
 */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  size = "lg",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  size?: SizeKey;
}) {
  return (
    <>
      {eyebrow && <Kicker>{eyebrow}</Kicker>}
      <Display as="h2" size={size} className={eyebrow ? "mt-3" : undefined}>
        {title}
      </Display>
      {lead && (
        <p
          className="mt-3 text-lg leading-snug"
          style={{ color: color.inkMuted }}
        >
          {lead}
        </p>
      )}
    </>
  );
}

/**
 * CardRow — a hairline-ruled row of {heading, body} cards (the "three-pronged
 * array" idiom). Shared by the landing Issuer teaser (size sm, no numbers) and
 * the /issuer decisions block (size md, numbered). Renders its own top rule.
 * NOTE: class strings are full literals per branch so Tailwind's JIT sees them.
 */
export function CardRow({
  items,
  size = "md",
  numbered = false,
  cols = 3,
}: {
  items: readonly { heading: string; body: string }[];
  size?: "sm" | "md";
  numbered?: boolean;
  /** Cards per row at lg. Default 3; use 4 for four-step rows. */
  cols?: 3 | 4;
}) {
  const md = size === "md";
  const itemCls = md
    ? `col-span-12 py-9 sm:col-span-6 sm:px-7 ${cols === 4 ? "lg:col-span-3" : "lg:col-span-4"}`
    : cols === 4
      ? "col-span-12 py-7 sm:col-span-6 sm:px-7 sm:first:pl-0 lg:col-span-3"
      : "col-span-12 py-7 sm:col-span-4 sm:px-7 sm:first:pl-0";
  const headCls = md
    ? "text-2xl font-semibold leading-none tracking-[-0.03em]"
    : "text-xl font-semibold leading-none tracking-[-0.03em]";
  const bodyCls = md
    ? "mt-3 text-[15px] leading-relaxed"
    : "mt-2.5 text-[14px] leading-relaxed";
  return (
    <Stagger
      className="grid grid-cols-12 border-t"
      style={{ borderColor: color.rule }}
    >
      {items.map((it, i) => (
        <StaggerItem
          key={it.heading}
          className={itemCls}
          style={{ borderTop: i > 0 ? `1px solid ${color.cell}` : undefined }}
        >
          {/* Sequence numeral folds into the heading — an editorial "1. " in
              the display face, NOT a floating mono `01` marker (that idiom is
              retired with the old kicker; it matched pok.tech's card marks). */}
          <h3 className={headCls}>
            {numbered && (
              <span className="tabular-nums" style={{ color: color.inkFaint }}>
                {i + 1}.{" "}
              </span>
            )}
            {it.heading}
          </h3>
          <p className={bodyCls} style={{ color: color.inkMuted }}>
            {it.body}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/**
 * TierCard — one pricing tier: name + price (+ note), optional dimmed price,
 * and a body slot for the tier's contents. Shared across every pricing
 * surface so a tier-card restyle lands once.
 */
export function TierCard({
  name,
  price,
  priceNote,
  dim,
  children,
}: {
  name: string;
  price: string;
  priceNote?: string;
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <StaggerItem
      className="flex flex-col p-6"
      style={{ border: `1px solid ${color.cell}` }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[14px] font-semibold tracking-[-0.01em]">
          {name}
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span
          className="text-3xl font-semibold tabular-nums tracking-[-0.03em]"
          style={{ color: dim ? color.inkMuted : color.ink }}
        >
          {price}
        </span>
        {priceNote && (
          <span
            className="text-[13px]"
            style={{ fontFamily: font.mono, color: color.inkFaint }}
          >
            {priceNote}
          </span>
        )}
      </div>
      <div className="mt-5 border-t pt-5" style={{ borderColor: color.cell }}>
        {children}
      </div>
    </StaggerItem>
  );
}

/* ── Specimen reveal: the signature scroll-in credential ────────────── */
export function SpecimenReveal({
  src,
  alt,
  caption,
  specimenLabel = "Specimen 001",
  metaLabel = "SVG · Cardano mainnet",
  figLabel = "Fig. 001",
}: {
  src: string;
  alt: string;
  caption: string;
  specimenLabel?: string;
  metaLabel?: string;
  figLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // offset mirrors tokens.motion.revealOffset; inline for framer's literal types.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const x = useTransform(scrollYProgress, [0, 1], motionTok.badgeX);
  const opacity = useTransform(
    scrollYProgress,
    motionTok.badgeOpacity.input,
    motionTok.badgeOpacity.output,
  );
  const width = useTransform(scrollYProgress, [0, 1], motionTok.frameWidth);

  return (
    <div ref={ref}>
      <motion.figure
        style={{ width, border: `1px solid ${color.rule}` }}
        className="ml-auto"
      >
        <div
          className="flex items-center justify-between border-b"
          style={{ borderColor: color.rule }}
        >
          <span className="px-4 py-2 text-[11px] font-semibold tracking-[-0.01em]">
            {specimenLabel}
          </span>
          <span
            className="inline-flex items-center gap-2 border-l px-4 py-2 text-[11px] font-semibold tracking-[-0.01em]"
            style={{ color: color.orange, borderColor: color.rule }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: color.orange }}
            />
            Verified
          </span>
        </div>
        <div
          className="overflow-hidden"
          style={{ background: color.coralTint }}
        >
          <motion.div
            style={{ x, opacity }}
            className="flex items-center justify-center px-8 py-12 sm:px-12 sm:py-16"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              width={520}
              height={520}
              className="w-full max-w-[360px]"
            />
          </motion.div>
        </div>
        <figcaption className="border-t" style={{ borderColor: color.rule }}>
          <p
            className="px-4 py-4 text-[13px] leading-relaxed"
            style={{ color: color.inkMuted }}
          >
            {caption}
          </p>
          <div
            className="flex items-center justify-between border-t"
            style={{ borderColor: color.cell }}
          >
            <span
              className="px-4 py-2 text-[11px] font-medium tabular-nums tracking-[-0.01em]"
              style={{ color: color.inkFaint }}
            >
              {metaLabel}
            </span>
            <span
              className="border-l px-4 py-2 text-[11px] font-medium tracking-[-0.01em]"
              style={{ color: color.inkFaint, borderColor: color.cell }}
            >
              {figLabel}
            </span>
          </div>
        </figcaption>
      </motion.figure>
    </div>
  );
}

/* ── Artifact plate: old-book / museum-figure container ─────────────────
   Static sibling of SpecimenReveal (same border grammar as the demo card:
   1px `color.rule` outside and in, nothing heavier). An artifact sits on a
   bare plate; a hairline rule separates the fig-numbered caption below. */
export function ArtifactPlate({
  src,
  alt,
  caption,
  figLabel = "fig. 1",
  className = "",
  imgStyle,
}: {
  src: string;
  alt: string;
  caption: string;
  figLabel?: string;
  className?: string;
  imgStyle?: React.CSSProperties;
}) {
  return (
    <figure
      className={className}
      style={{
        border: `1px solid ${color.rule}`,
        boxShadow: color.specimenShadow,
      }}
    >
      {/* Opaque plate behind the artifact; the caption strip below stays
          transparent (page paper shows through). */}
      <div
        className="flex items-center justify-center p-6 sm:p-10"
        style={{ background: color.plate }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={1024}
          height={1024}
          className="h-auto w-full"
          style={imgStyle}
        />
      </div>
      <figcaption className="border-t" style={{ borderColor: color.rule }}>
        <p
          className="px-4 py-3 text-[13px] leading-relaxed"
          style={{ color: color.inkMuted }}
        >
          <span
            className="text-[12px] font-medium tracking-[-0.01em]"
            style={{ color: color.inkFaint }}
          >
            {figLabel}:
          </span>{" "}
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

/* ── Mono data readout list ─────────────────────────────────────────── */
export function DataList({ rows }: { rows: [string, string][] }) {
  return (
    <dl
      className="border-t text-[12px]"
      style={{ fontFamily: font.mono, borderColor: color.cell }}
    >
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="flex items-center justify-between border-b py-2.5"
          style={{ borderColor: color.cell }}
        >
          {/* Keys stay mono with the readout (it's a data surface), but no
              decorative uppercase/letterspacing. */}
          <dt style={{ color: color.inkFaint }}>{k}</dt>
          <dd style={{ color: color.ink }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Big tabular watermark numeral ──────────────────────────────────── */
export function NumberWatermark({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block tabular-nums leading-none tracking-[-0.05em]"
      style={{
        fontFamily: font.sans,
        fontWeight: display.weight,
        color: color.inkWatermark,
        fontSize: "clamp(5rem, 12vw, 9rem)",
      }}
    >
      {children}
    </span>
  );
}

/* ── API stack layers ───────────────────────────────────────────────── */
export interface StackLayer {
  labelKicker: string;
  name: string;
  description: string;
  emphasis?: boolean;
}
export function StackLayers({ layers }: { layers: readonly StackLayer[] }) {
  return (
    <div>
      {layers.map((layer, i) => (
        <div
          key={layer.name}
          className="grid grid-cols-12 items-baseline gap-4 py-7 lg:px-10"
          style={{
            borderTop: i > 0 ? `1px solid ${color.cell}` : undefined,
            ...(layer.emphasis
              ? { background: color.ink, color: color.onInk }
              : {}),
          }}
        >
          <div className="col-span-12 sm:col-span-3">
            <span
              className="text-[12px] font-medium tracking-[-0.01em]"
              style={{
                color: layer.emphasis
                  ? "rgb(var(--sys-on-ink-rgb) / 0.85)"
                  : color.inkFaint,
              }}
            >
              L{i} · {layer.labelKicker}
            </span>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <p className="flex items-center gap-3 text-lg font-semibold leading-tight tracking-[-0.03em]">
              {layer.name}
              {layer.emphasis && (
                <span
                  aria-hidden
                  className="inline-block h-2 w-2"
                  style={{ background: color.orange }}
                />
              )}
            </p>
            <p
              className="mt-1.5 text-[14px] leading-relaxed"
              style={{
                color: layer.emphasis
                  ? "rgb(var(--sys-on-ink-rgb) / 0.9)"
                  : color.inkMuted,
              }}
            >
              {layer.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Back link above a title, with an optional next link in the same column. */
export function PageTrail({
  back,
  next,
  className = "",
}: {
  back: { href: string; label: string };
  next?: { href: string; label: string };
  className?: string;
}) {
  const linkCls =
    "text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:[color:var(--sys-ink)]";
  return (
    <nav
      aria-label="Page"
      className={`flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between ${className}`}
    >
      <Link
        href={back.href}
        className={linkCls}
        style={{ color: color.inkFaint }}
      >
        {back.label}
      </Link>
      {next ? (
        <Link
          href={next.href}
          className={`${linkCls} max-w-full sm:max-w-[16rem] sm:text-right`}
          style={{ color: color.inkFaint }}
        >
          {next.label}
        </Link>
      ) : null}
    </nav>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────── */
export interface FooterData {
  tagline: string;
  meta: string;
  copyright: string;
  columns: Record<string, readonly { name: string; href: string }[]>;
  backHref?: string;
  backLabel?: string;
  caption?: string;
}
export function Footer({
  tagline,
  meta,
  copyright,
  columns,
  backHref,
  backLabel = "← Back",
  caption,
}: FooterData) {
  return (
    // Distinct from the page: a strong full-bleed top rule (matching the
    // editorial section dividers) over a faint ink-wash slab. Both theme-aware,
    // so the footer reads as its own zone in light and dark.
    <footer
      className="border-t"
      style={{
        borderColor: color.rule,
        background: "rgb(var(--sys-ink-rgb) / 0.03)",
      }}
    >
      <div className={containerCls} style={{ maxWidth: layout.maxWidth }}>
        <div className="grid grid-cols-12 gap-y-10 py-14">
          <div className="col-span-12 lg:col-span-4 lg:pr-10">
            <Brand height={30} />
            <p
              className="mt-4 max-w-xs text-[13px] leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              {tagline}
            </p>
            <p
              className="mt-5 text-[12px] font-medium tracking-[-0.01em]"
              style={{ color: color.inkFaint }}
            >
              {meta}
            </p>
            <p
              className="mt-2 text-[12px] tabular-nums"
              style={{ color: color.inkGhost }}
            >
              {copyright}
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
            {Object.entries(columns).map(([key, links]) => (
              <div key={key}>
                <h3
                  className="mb-4 border-b pb-2 text-[12px] font-semibold tracking-[-0.01em]"
                  style={{ borderColor: color.rule }}
                >
                  {key}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[13px] transition-colors hover:[color:var(--sys-ink)]"
                        style={{ color: color.inkMuted }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {(backHref ? backHref : caption) && (
          <div
            className="flex flex-col items-start justify-between gap-3 border-t py-5 sm:flex-row sm:items-center"
            style={{ borderColor: color.rule }}
          >
            {backHref ? (
              <a
                href={backHref}
                className="text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:[color:var(--sys-ink)]"
                style={{ color: color.inkFaint }}
              >
                {backLabel}
              </a>
            ) : (
              <span />
            )}
            {caption && (
              <span
                className="text-[12px] font-medium tracking-[-0.01em]"
                style={{ color: color.inkGhost }}
              >
                {caption}
              </span>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
