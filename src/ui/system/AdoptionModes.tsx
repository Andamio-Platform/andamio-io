import React from "react";
import { type adoptionModes } from "~/ui/explore/content";
import { color } from "./tokens";
import { Readout } from "./instrument";

/** Invisible vs visible adoption as two readouts side by side. */
export function AdoptionModes({ data }: { data: typeof adoptionModes }) {
  return (
    <div>
      <h3 className="text-[22px] font-semibold tracking-[-0.02em]" style={{ color: color.ink }}>
        {data.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed" style={{ color: color.inkMuted }}>
        {data.lead}
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {data.modes.map((m) => (
          <div key={m.name}>
            <Readout title={`${m.name} blockchain`} rows={m.rows} />
            <a
              href={m.href}
              className="mt-3 inline-block text-[13px] font-medium underline-offset-4 hover:underline"
              style={{ color: color.cyan }}
            >
              See it in use →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
