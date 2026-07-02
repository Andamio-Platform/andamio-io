"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/* Fixed up/down arrows that snap-scroll between the landing's full-height
 * sections. Tracks the section in view with an IntersectionObserver; arrows
 * disable at the ends. Reduced-motion aware. */

export default function V2ScrollNav() {
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const sectionsRef = React.useRef<HTMLElement[]>([]);

  React.useEffect(() => {
    // The landing is a stack of full-height <section> blocks (footer is <footer>).
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("section, footer"),
    );
    sectionsRef.current = nodes;
    setCount(nodes.length);
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section as current.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const i = nodes.indexOf(visible.target as HTMLElement);
          if (i >= 0) setIndex(i);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const go = (dir: 1 | -1) => {
    const nodes = sectionsRef.current;
    const next = Math.min(Math.max(index + dir, 0), nodes.length - 1);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nodes[next]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  if (count <= 1) return null;

  const atTop = index <= 0;
  const atBottom = index >= count - 1;
  const btn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 print:hidden">
      <button type="button" onClick={() => go(-1)} disabled={atTop} aria-label="Previous section" className={btn}>
        <ChevronUp className="h-5 w-5" />
      </button>
      <button type="button" onClick={() => go(1)} disabled={atBottom} aria-label="Next section" className={btn}>
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}
