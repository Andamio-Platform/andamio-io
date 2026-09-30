import React from "react";
import type { SkillIcon } from "./credential";

type IconProps = { className?: string };

export function SkillGlyph({ icon, className }: { icon: SkillIcon } & IconProps) {
  switch (icon) {
    case "scaffold":
      return (
        <svg viewBox="0 0 34 34" className={className} aria-hidden>
          <path d="M8 31V4M26 31V4M8 11h18M8 20h18M8 29h18M8 11l18 9M26 11L8 20M8 20l18 9M26 20L8 29M5 31h24" />
        </svg>
      );
    case "warning":
      return (
        <svg viewBox="0 0 34 34" className={className} aria-hidden>
          <path d="M17 4L31 29H3z" />
          <path d="M17 13v8M17 24.5v.5" />
        </svg>
      );
    case "calculator":
      return (
        <svg viewBox="0 0 34 34" className={className} aria-hidden>
          <rect x="7" y="3" width="20" height="28" rx="2" />
          <rect x="10.5" y="6.5" width="13" height="5.5" />
          <path d="M11 16h2M16 16h2M21 16h2M11 20.5h2M16 20.5h2M21 20.5h2M11 25h2M16 25h2M21 25h2" />
        </svg>
      );
    case "checklist":
      return (
        <svg viewBox="0 0 34 34" className={className} aria-hidden>
          <rect x="7" y="5" width="20" height="26" rx="2" />
          <path d="M13 3.5h8v4h-8zM11 13l1.5 1.5L15 12M18 13.5h6M11 19l1.5 1.5L15 18M18 19.5h6M11 25l1.5 1.5L15 24M18 25.5h6" />
        </svg>
      );
    case "badge":
      return (
        <svg viewBox="0 0 34 34" className={className} aria-hidden>
          <circle cx="17" cy="13" r="8" />
          <path d="M12 19.5L9.5 31l7.5-4 7.5 4L22 19.5M14 13l2 2 4-4" />
        </svg>
      );
    default: {
      const unreachable: never = icon;
      return unreachable;
    }
  }
}

export function CopyGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 3.5V3a1 1 0 0 0-1-1H3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" />
    </svg>
  );
}

export function CalendarGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M2 6.5h12M5 1.5v3M11 1.5v3M5 9h1M7.5 9h1M10 9h1M5 11.5h1M7.5 11.5h1" />
    </svg>
  );
}

/** Cardano mark: ring with the inner node, stroked like the other face icons. */
export function CardanoGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="1.15" style={{ fill: "currentColor", stroke: "none" }} />
    </svg>
  );
}

export function LinkGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </svg>
  );
}

export function ExternalGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M9 2.5h4.5V7M13.5 2.5L7.5 8.5M12 10v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3" />
    </svg>
  );
}

export function VerifiedGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.18" />
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.8 8.2l2.1 2.1 4.3-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
