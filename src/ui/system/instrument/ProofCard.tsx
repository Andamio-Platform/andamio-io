"use client";

import React from "react";
import { color, font } from "../tokens";
import { useMotionGate } from "../motion";
import { trackHref } from "~/lib/analytics";

function CornerTicks() {
  const base = "pointer-events-none absolute h-2.5 w-2.5";
  const style = { borderColor: color.inkGhost };
  return (
    <>
      <span
        aria-hidden
        className={`${base} -left-px -top-px border-l border-t`}
        style={style}
      />
      <span
        aria-hidden
        className={`${base} -right-px -top-px border-r border-t`}
        style={style}
      />
      <span
        aria-hidden
        className={`${base} -bottom-px -left-px border-b border-l`}
        style={style}
      />
      <span
        aria-hidden
        className={`${base} -bottom-px -right-px border-b border-r`}
        style={style}
      />
    </>
  );
}

/**
 * A framed piece of evidence. Corner ticks mark the frame; the mono footer
 * names the source (a file, an endpoint, an audit). On hover or focus the
 * outline traces itself in cyan; with reduced motion it simply appears.
 */
export function ProofCard({
  kicker,
  title,
  children,
  footer,
  href,
  external = false,
  className = "",
  bodyClassName = "p-6",
  bodyColor,
}: {
  kicker?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Mono source line, e.g. "GET /v2/credentials/verify" or "TxPipe · 2025". */
  footer?: React.ReactNode;
  /** Makes the whole card a link. */
  href?: string;
  external?: boolean;
  className?: string;
  bodyClassName?: string;
  /** Summary color. Defaults to muted ink. */
  bodyColor?: string;
}) {
  const still = useMotionGate();
  const outline = still
    ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
    : "[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]";

  const inner = (
    <>
      <CornerTicks />
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-px -top-px h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible"
      >
        <rect
          width="100%"
          height="100%"
          fill="none"
          stroke={color.cyan}
          strokeWidth="1"
          pathLength={1}
          className={outline}
        />
      </svg>
      <div className={`relative flex-1 ${bodyClassName}`}>
        {kicker ? (
          <p
            className="text-[11px] uppercase tracking-[0.14em]"
            style={{ fontFamily: font.mono, color: color.inkFaint }}
          >
            {kicker}
          </p>
        ) : null}
        {title ? (
          <h3
            className={`${kicker ? "mt-3" : ""} text-[20px] font-semibold leading-snug tracking-[-0.02em]`}
            style={{ color: color.ink }}
          >
            {title}
          </h3>
        ) : null}
        {children ? (
          <div
            className={`${(title ?? kicker) ? "mt-3" : ""} text-[14px] leading-relaxed`}
            style={{ color: bodyColor ?? color.inkMuted }}
          >
            {children}
          </div>
        ) : null}
      </div>
      {footer ? (
        <div
          className="relative border-t px-6 py-2.5 text-[11px]"
          style={{
            borderColor: color.hairline,
            fontFamily: font.mono,
            color: color.inkFaint,
          }}
        >
          {footer}
        </div>
      ) : null}
    </>
  );

  const frame = `group relative flex flex-col border ${className}`;
  const frameStyle = { borderColor: color.cell, background: color.surface };

  if (href) {
    return (
      <a
        href={href}
        onClick={() => trackHref(href)}
        className={`${frame} focus:outline-none`}
        style={frameStyle}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={frame} style={frameStyle}>
      {inner}
    </div>
  );
}
