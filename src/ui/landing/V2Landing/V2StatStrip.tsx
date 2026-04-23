import React from "react";

interface Stat {
  k: string;
  v: string;
}

const stats: Stat[] = [
  { k: "Live since", v: "Feb 6, 2026" },
  { k: "Audited by", v: "TxPipe" },
  { k: "Tx types", v: "17 shipped" },
  { k: "Test suite", v: "152 e2e" },
  { k: "App features", v: "12 live" },
];

export default function V2StatStrip() {
  return (
    <section
      aria-label="Protocol status at a glance"
      className="border-y border-foreground bg-foreground text-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-x divide-background/15 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <div
              key={stat.k}
              className={`flex flex-col gap-1.5 px-5 py-7 sm:px-6 sm:py-9 ${
                index === 0 ? "pl-0 sm:pl-0" : ""
              }`}
            >
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-background/55">
                {stat.k}
              </dt>
              <dd className="font-display text-xl font-semibold leading-tight tracking-[-0.015em] text-background tabular-nums sm:text-2xl">
                {stat.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
