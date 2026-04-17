import React from "react";

interface StackLayer {
  label: string;
  description: string;
  emphasis?: boolean;
  surface: string;
}

const stackLayers: StackLayer[] = [
  {
    label: "What you already run",
    description:
      "Your LMS, CRM, or certification platform. Stays where it is.",
    surface: "bg-card",
  },
  {
    label: "Andamio API",
    description:
      "REST endpoints for issuing, verifying, and gating credentials.",
    emphasis: true,
    surface: "bg-primary/10",
  },
  {
    label: "Andamio Protocol",
    description:
      "Smart contracts audited by TxPipe. On-chain credential registry.",
    surface: "bg-surface-subtle",
  },
  {
    label: "Cardano mainnet",
    description:
      "Settlement and permanence. The credentials outlive every vendor.",
    surface: "bg-card",
  },
];

export default function V2ArchitectureSection() {
  return (
    <section id="platform" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              How it fits
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              A credential layer on top of what you already run.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Andamio does not replace your LMS or your certification platform.
              It adds a composable credential layer, anchored on Cardano, that
              your current stack calls via REST API.
            </p>
            <p className="mt-6 max-w-lg text-base text-muted-foreground">
              Smart contracts audited by TxPipe. Live on Cardano mainnet since
              February 2026.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            {stackLayers.map((layer, index) => (
              <div
                key={layer.label}
                className={`${layer.surface} ${
                  index > 0 ? "border-t border-border" : ""
                } px-6 py-6 sm:px-8`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                    layer.emphasis ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {layer.label}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {layer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
