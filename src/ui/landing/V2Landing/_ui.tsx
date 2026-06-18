import React from "react";

/* Shared detox primitives for the V2 landing.
   One source of truth for buttons and section kickers so the page reads as a
   designed system, not a stack of independently-generated sections. */

const focusable =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export const primaryBtnClass =
  "inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground " +
  "transition-[background,transform] duration-150 hover:bg-primary/90 active:translate-y-px " +
  focusable +
  " focus-visible:outline-primary";

export const outlineBtnClass =
  "inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-[15px] font-medium text-foreground " +
  "transition-colors duration-150 hover:border-foreground/40 hover:bg-foreground/[0.04] " +
  focusable +
  " focus-visible:outline-foreground/40";

/* Smaller variants for inline controls (walkthrough stepper, etc.) */
export const primaryBtnSm =
  "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground " +
  "transition-[background,transform] duration-150 hover:bg-primary/90 active:translate-y-px " +
  focusable +
  " focus-visible:outline-primary";

export const outlineBtnSm =
  "inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground " +
  "transition-colors duration-150 hover:border-foreground/40 hover:bg-foreground/[0.04] " +
  focusable +
  " focus-visible:outline-foreground/40";

export const ghostBtnSm =
  "inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium text-muted-foreground " +
  "transition-colors hover:bg-foreground/[0.05] hover:text-foreground " +
  focusable +
  " focus-visible:outline-foreground/30";

/* A restrained editorial kicker. Sentence case, no mono, no wide tracking, no
   hairline dash — the opposite of the generated eyebrow it replaces. */
export function Kicker({
  children,
  tone = "primary",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "primary" | "muted";
  className?: string;
}) {
  const color = tone === "primary" ? "text-primary" : "text-muted-foreground";
  return (
    <p className={`text-sm font-semibold ${color} ${className}`}>{children}</p>
  );
}
