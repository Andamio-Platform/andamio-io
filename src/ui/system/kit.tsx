"use client";

/**
 * Andamio Landing — Component Kit
 * =================================================================
 * The reusable building blocks of the "Warm Index · Editorial rail"
 * design language (iteration 22). Every component reads ./tokens.ts;
 * none hard-codes a hex or a size. Composed end-to-end in
 * ./AndamioLanding.tsx and documented at /explore/system.
 */

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import {
  color,
  font,
  display,
  typeScale,
  layout,
  motion as motionTok,
  containerCls,
  SECTIONS,
} from "./tokens";

const IDS = SECTIONS.map((s) => s.id) as string[];

/* ── Scroll-spy: which section is in view ───────────────────────────── */
export function useActiveSection(ids: string[] = IDS, initial = "top"): string {
  const [active, setActive] = useState<string>(initial);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

/* ── Faint fixed 12-column grid field ───────────────────────────────── */
export function GridField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden justify-center md:flex"
    >
      <div
        className="grid h-full w-full grid-cols-12 px-6 sm:px-10"
        style={{ maxWidth: layout.maxWidth, borderRight: `1px solid ${color.grid}` }}
      >
        {Array.from({ length: layout.columns }).map((_, i) => (
          <div key={i} style={{ borderLeft: `1px solid ${color.grid}` }} />
        ))}
      </div>
    </div>
  );
}

/* ── Editorial margin rail (right side, de-chromed) ─────────────────── */
export interface RailItem {
  id: string;
  label: string;
  /** Cross-page link; defaults to the in-page anchor `#${id}`. */
  href?: string;
}

export function EditorialRail({
  sections,
  activeId,
}: {
  sections: readonly RailItem[];
  activeId: string;
}) {
  return (
    <aside
      className="pointer-events-none fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
      aria-label="Section index"
    >
      {/* The rail's own plate: a height-constrained, generously padded box that
          hugs the menu with a soft translucent paper background — so section
          rules dissolve behind the labels without a full-height gutter mask. */}
      <nav
        className="pointer-events-auto flex flex-col items-end gap-3.5 px-6 py-7"
        style={{
          background: "rgb(var(--sys-paper-rgb) / 0.72)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <a
              key={s.id}
              href={s.href ?? `#${s.id}`}
              className="flex items-center gap-3"
              style={{ fontFamily: font.mono }}
            >
              <span
                className="text-[10px] tracking-[0.06em] transition-all duration-300"
                style={{
                  color: isActive ? color.ink : color.inkGhost,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {s.label}
              </span>
              <span
                className="inline-block h-px transition-all duration-300"
                style={{
                  width: isActive ? 24 : 8,
                  background: isActive ? color.blue : "rgb(var(--sys-ink-rgb) / 0.22)",
                }}
              />
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

/* ── Brand mark (orange square + wordmark) ──────────────────────────── */
export function Brand({ href = "/", height = 22 }: { href?: string; height?: number }) {
  // Theme-aware wordmark: the ink logotype on light surfaces, the reversed one
  // on dark. Swapped via the `.dark` selector (no JS, no hydration flash). The
  // `.sys-light` island re-asserts light, so a Brand inside one would still want
  // the light logo — Brand isn't used inside an island today, so this is moot.
  return (
    <a href={href} className="inline-flex items-center" aria-label="Andamio — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-with-typography.svg"
        alt="Andamio"
        style={{ height, width: "auto" }}
        className="block select-none dark:hidden"
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-with-typography-dark.svg"
        alt="Andamio"
        style={{ height, width: "auto" }}
        className="hidden select-none dark:block"
        draggable={false}
      />
    </a>
  );
}

/* ── Light/dark toggle (kit-styled: flat, ink-colored icon) ─────────────── */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Reserve the slot before mount to avoid an SSR/theme hydration mismatch.
  if (!mounted) return <span className="inline-block h-9 w-9" aria-hidden />;
  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60"
      style={{ color: color.ink }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
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
  cta: { label: string; href: string };
  /** Optional quieter second action (outline), rendered before the primary. */
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
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
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
          className="absolute left-0 top-[calc(100%+0.85rem)] z-50 w-[26rem] animate-in fade-in-0 slide-in-from-top-1 duration-150"
          style={{
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
                        className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{ fontFamily: font.mono, color: color.inkFaint }}
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
              return it.soon ? (
                <span key={it.name} className="flex cursor-default flex-col p-4" style={cellStyle}>
                  {inner}
                </span>
              ) : (
                <a
                  key={it.name}
                  href={it.href}
                  onClick={onClose}
                  className="nav-card-item flex flex-col p-4"
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

export function TopNav({ items, cta, secondaryCta }: NavData) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: color.rule, background: "rgb(var(--sys-paper-rgb) / 0.95)" }}
    >
      <div
        className={`${containerCls} flex items-center justify-between gap-6 py-4`}
        style={{ maxWidth: layout.maxWidth }}
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
              )
            )}
          </nav>
          {/* Theme toggle reads as a quiet page utility sitting with the nav. */}
          <ThemeToggle />
          {/* Divider isolates the actions from the nav links and the theme
              utility. Primary (ink) = the Issuer conversion; secondary
              (outline) = the app path for developers / existing users. */}
          <span
            className="hidden h-5 w-px lg:block"
            style={{ background: color.cell }}
            aria-hidden
          />
          {secondaryCta && (
            <span className="hidden sm:block">
              <Button href={secondaryCta.href} variant="outline">
                {secondaryCta.label}
              </Button>
            </span>
          )}
          <Button href={cta.href} variant="ink">
            {cta.label}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center lg:hidden"
            style={{ color: color.ink }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t lg:hidden" style={{ borderColor: color.rule, background: color.paper }}>
          <nav className={`${containerCls} flex flex-col py-2`} style={{ maxWidth: layout.maxWidth }}>
            {items.map((entry) =>
              "items" in entry ? (
                <div key={entry.label} className="py-2">
                  <p
                    className="py-1.5 text-[11px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: font.mono, color: color.inkFaint }}
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
                        {it.name} <span className="text-[11px] uppercase">· soon</span>
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
                    )
                  )}
                </div>
              ) : (
                <a
                  key={entry.label}
                  href={entry.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-[13px] uppercase tracking-[0.1em] transition-colors hover:[color:var(--sys-ink)]"
                  style={{ fontFamily: font.mono, color: color.inkMuted }}
                >
                  {entry.label}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ── Page frame: grid + rail + content offset ───────────────────────── */
export function Page({
  nav,
  sections = SECTIONS,
  activeId,
  children,
  footer,
}: {
  nav: NavData;
  /** Rail items. Defaults to the landing index; pass `null` for no rail. */
  sections?: readonly RailItem[] | null;
  /** Force the active rail item (cross-page). Omit to use in-page scroll-spy. */
  activeId?: string;
  children: React.ReactNode;
  /** Full-bleed footer, rendered OUTSIDE the rail-reserve padding so it spans
   *  the whole viewport like the TopNav (not clipped at the rail gutter). */
  footer?: React.ReactNode;
}) {
  const railSections = sections && sections.length > 0 ? sections : null;
  const spyIds = railSections && activeId === undefined ? railSections.map((s) => s.id) : [];
  const spied = useActiveSection(spyIds);
  const active = activeId ?? spied;
  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: color.paper, color: color.ink, fontFamily: font.sans }}
    >
      <GridField />
      {railSections && <EditorialRail sections={railSections} activeId={active} />}
      <div className="relative z-10">
        {/* TopNav spans the full viewport so its bottom border is edge-to-edge. */}
        <TopNav {...nav} />
        {/* railReserve (tokens.layout.railReserve = 150) — literal for Tailwind.
            Scoped to content only so the header border stays full-bleed. The rail
            carries its own contained plate (see EditorialRail), so there is no
            full-height gutter mask to wash over the footer. */}
        <div className={railSections ? "xl:pr-[150px]" : undefined}>{children}</div>
        {/* Footer sits OUTSIDE the rail-reserve wrapper so it spans the full
            viewport like the TopNav, instead of being clipped at the rail. */}
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
    screen ? "flex min-h-[calc(100svh_-_var(--nav-clear))] flex-col justify-center" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section
      id={id}
      className={cls || undefined}
      style={bordered ? { borderColor: color.rule } : undefined}
    >
      <div className={`${containerCls} w-full`} style={{ maxWidth: layout.maxWidth }}>
        {children}
      </div>
    </section>
  );
}

/* ── Kicker: mono uppercase label. NEVER orange. ────────────────────── */
export function Kicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.18em] ${className}`}
      style={{ fontFamily: font.mono, color: color.inkMuted }}
    >
      {children}
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
      <span
        className="text-[11px] uppercase tracking-[0.18em]"
        style={{ fontFamily: font.mono, color: color.inkMuted }}
      >
        {kicker}
      </span>
      {live && (
        <span
          className="inline-flex items-center gap-2 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{ fontFamily: font.mono, borderColor: color.rule }}
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
  return React.createElement(
    As,
    {
      className,
      style: {
        fontFamily: font.sans,
        fontWeight: display.weight,
        letterSpacing: display.tracking,
        lineHeight: display.leading,
        fontSize: typeScale[size],
        ...style,
      },
    },
    children,
  );
}

/* ── Buttons ───────────────────────────────────────────────────────── */
type ButtonVariant = "primary" | "ink" | "outline" | "chip" | "disabled";
const btnBase =
  "inline-flex items-center justify-center gap-3 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors";

export function Button({
  variant = "outline",
  href,
  children,
  className = "",
  full = false,
}: {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}) {
  const styles: Record<ButtonVariant, React.CSSProperties> = {
    primary: { background: color.orange, border: `1px solid ${color.orange}`, color: "#fff" },
    ink: { background: color.ink, border: `1px solid ${color.ink}`, color: color.onInk },
    outline: { border: `1px solid ${color.ink}`, color: color.ink },
    chip: { border: `1px solid ${color.ink}`, color: color.inkFaint },
    disabled: { border: `1px solid ${color.cell}`, color: color.inkGhost },
  };
  const cls = `${btnBase} ${variant === "disabled" ? "cursor-not-allowed" : ""} ${full ? "w-full" : ""} ${className}`;
  const sty = { fontFamily: font.mono, ...styles[variant] };
  if (variant === "disabled" || !href) {
    return (
      <span aria-disabled className={cls} style={sty}>
        {children}
      </span>
    );
  }
  return (
    <a href={href} className={`${cls} hover:opacity-90`} style={sty}>
      {children}
    </a>
  );
}

/** Connected action group — stitches button borders (offset by 1px). */
export function Stitch({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-stretch [&>*]:-mt-px [&>*:first-child]:mt-0 sm:[&>*]:mt-0 sm:[&>*]:-ml-px sm:[&>*:first-child]:ml-0">
      {children}
    </div>
  );
}

const CARD_NUMS = ["01", "02", "03", "04", "05", "06"];

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
      {eyebrow && (
        <p
          className="text-[12px] uppercase tracking-[0.14em]"
          style={{ fontFamily: font.mono, color: color.inkFaint }}
        >
          {eyebrow}
        </p>
      )}
      <Display as="h2" size={size} className={eyebrow ? "mt-3" : undefined}>
        {title}
      </Display>
      {lead && (
        <p className="mt-3 text-lg leading-snug" style={{ color: color.inkMuted }}>
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
    : "col-span-12 py-7 sm:col-span-4 sm:px-7 sm:first:pl-0";
  const headCls = md
    ? "text-2xl font-semibold leading-none tracking-[-0.03em]"
    : "text-xl font-semibold leading-none tracking-[-0.03em]";
  const bodyCls = md
    ? "mt-3 text-[15px] leading-relaxed"
    : "mt-2.5 text-[14px] leading-relaxed";
  return (
    <div className="grid grid-cols-12 border-t" style={{ borderColor: color.rule }}>
      {items.map((it, i) => (
        <div
          key={it.heading}
          className={itemCls}
          style={{ borderTop: i > 0 ? `1px solid ${color.cell}` : undefined }}
        >
          {numbered && (
            <div className="flex items-baseline gap-4">
              <span
                className="text-[12px] uppercase tracking-[0.14em] tabular-nums"
                style={{ fontFamily: font.mono, color: color.inkFaint }}
              >
                {CARD_NUMS[i]}
              </span>
              <span className="h-px flex-1 translate-y-[-4px]" style={{ background: color.cell }} />
            </div>
          )}
          <h3 className={numbered ? `mt-5 ${headCls}` : headCls}>{it.heading}</h3>
          <p className={bodyCls} style={{ color: color.inkMuted }}>
            {it.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * TierCard — one pricing tier: name + price (+ note), optional Recommended
 * flag, optional dimmed price, and a body slot for the tier's contents. Shared
 * across every pricing surface so a tier-card restyle lands once.
 */
export function TierCard({
  name,
  price,
  priceNote,
  recommended,
  dim,
  children,
}: {
  name: string;
  price: string;
  priceNote?: string;
  recommended?: boolean;
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col p-6"
      style={{
        border: `1px solid ${recommended ? color.ink : color.cell}`,
        background: recommended ? "rgb(var(--sys-ink-rgb) / 0.03)" : undefined,
      }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ fontFamily: font.mono }}>
          {name}
        </span>
        {recommended && (
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ fontFamily: font.mono, color: color.orange }}
          >
            Recommended
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span
          className="text-3xl font-semibold tracking-[-0.03em] tabular-nums"
          style={{ color: dim ? color.inkMuted : color.ink }}
        >
          {price}
        </span>
        {priceNote && (
          <span className="text-[13px]" style={{ fontFamily: font.mono, color: color.inkFaint }}>
            {priceNote}
          </span>
        )}
      </div>
      <div className="mt-5 border-t pt-5" style={{ borderColor: color.cell }}>
        {children}
      </div>
    </div>
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const x = useTransform(scrollYProgress, [0, 1], motionTok.badgeX);
  const opacity = useTransform(
    scrollYProgress,
    motionTok.badgeOpacity.input,
    motionTok.badgeOpacity.output,
  );
  const width = useTransform(scrollYProgress, [0, 1], motionTok.frameWidth);

  return (
    <div ref={ref}>
      <motion.figure style={{ width, border: `1px solid ${color.rule}` }} className="ml-auto">
        <div
          className="flex items-center justify-between border-b"
          style={{ borderColor: color.rule }}
        >
          <span
            className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ fontFamily: font.mono }}
          >
            {specimenLabel}
          </span>
          <span
            className="inline-flex items-center gap-2 border-l px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: color.orange, borderColor: color.rule, fontFamily: font.mono }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color.orange }} />
            Verified
          </span>
        </div>
        <div className="overflow-hidden" style={{ background: color.coralTint }}>
          <motion.div
            style={{ x, opacity }}
            className="flex items-center justify-center px-8 py-12 sm:px-12 sm:py-16"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} width={520} height={520} className="w-full max-w-[360px]" />
          </motion.div>
        </div>
        <figcaption className="border-t" style={{ borderColor: color.rule }}>
          <p className="px-4 py-4 text-[13px] leading-relaxed" style={{ color: color.inkMuted }}>
            {caption}
          </p>
          <div className="flex items-center justify-between border-t" style={{ borderColor: color.cell }}>
            <span
              className="px-4 py-2 text-[10px] uppercase tracking-[0.14em] tabular-nums"
              style={{ fontFamily: font.mono, color: color.inkFaint }}
            >
              {metaLabel}
            </span>
            <span
              className="border-l px-4 py-2 text-[10px] uppercase tracking-[0.14em]"
              style={{ fontFamily: font.mono, color: color.inkFaint, borderColor: color.cell }}
            >
              {figLabel}
            </span>
          </div>
        </figcaption>
      </motion.figure>
    </div>
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
          <dt className="uppercase tracking-[0.12em]" style={{ color: color.inkFaint }}>
            {k}
          </dt>
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
      className="block leading-none tracking-[-0.05em] tabular-nums"
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
            ...(layer.emphasis ? { background: color.ink, color: color.onInk } : {}),
          }}
        >
          <div className="col-span-12 sm:col-span-3">
            <span
              className="text-[11px] uppercase tracking-[0.12em]"
              style={{
                fontFamily: font.mono,
                color: layer.emphasis ? "rgb(var(--sys-on-ink-rgb) / 0.85)" : color.inkFaint,
              }}
            >
              L{i} · {layer.labelKicker}
            </span>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <p className="flex items-center gap-3 text-lg font-semibold leading-tight tracking-[-0.03em]">
              {layer.name}
              {layer.emphasis && (
                <span aria-hidden className="inline-block h-2 w-2" style={{ background: color.orange }} />
              )}
            </p>
            <p
              className="mt-1.5 text-[14px] leading-relaxed"
              style={{ color: layer.emphasis ? "rgb(var(--sys-on-ink-rgb) / 0.9)" : color.inkMuted }}
            >
              {layer.description}
            </p>
          </div>
        </div>
      ))}
    </div>
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
      style={{ borderColor: color.rule, background: "rgb(var(--sys-ink-rgb) / 0.03)" }}
    >
      <div className={containerCls} style={{ maxWidth: layout.maxWidth }}>
        <div className="grid grid-cols-12 gap-y-10 py-14">
          <div className="col-span-12 lg:col-span-4 lg:pr-10">
            <Brand height={30} />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed" style={{ color: color.inkMuted }}>
              {tagline}
            </p>
            <p
              className="mt-5 text-[11px] uppercase tracking-[0.1em]"
              style={{ fontFamily: font.mono, color: color.inkFaint }}
            >
              {meta}
            </p>
            <p
              className="mt-2 text-[11px] tabular-nums"
              style={{ fontFamily: font.mono, color: color.inkGhost }}
            >
              {copyright}
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
            {Object.entries(columns).map(([key, links]) => (
              <div key={key}>
                <h3
                  className="mb-4 border-b pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ fontFamily: font.mono, borderColor: color.rule }}
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
        {(backHref || caption) && (
          <div
            className="flex flex-col items-start justify-between gap-3 border-t py-5 sm:flex-row sm:items-center"
            style={{ borderColor: color.rule }}
          >
            {backHref ? (
              <a
                href={backHref}
                className="text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:[color:var(--sys-ink)]"
                style={{ fontFamily: font.mono, color: color.inkFaint }}
              >
                {backLabel}
              </a>
            ) : (
              <span />
            )}
            {caption && (
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ fontFamily: font.mono, color: color.inkGhost }}
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
