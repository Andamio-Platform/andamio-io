import React from "react";
import { Kicker } from "./_ui";
import { EXTERNAL_LINKS } from "~/lib/external-links";

interface StackLayer {
  labelKicker: string;
  name: string;
  description: string;
  emphasis?: boolean;
  surface: string;
}

const stackLayers: StackLayer[] = [
  {
    labelKicker: "Your surface",
    name: "What you already run",
    description:
      "Your LMS, CRM, or certification platform. Stays where it is.",
    surface: "bg-card",
  },
  {
    labelKicker: "Integration",
    name: "Andamio API",
    description:
      "REST endpoints to issue, verify, and gate on credentials from your own stack.",
    emphasis: true,
    surface: "bg-primary",
  },
  {
    labelKicker: "Protocol",
    name: "Andamio smart contracts",
    description:
      "Audited by TxPipe. On-chain credential registry. 17 transaction types.",
    surface: "bg-surface-subtle",
  },
  {
    labelKicker: "Settlement",
    name: "Cardano mainnet",
    description:
      "Permanence. Your credentials outlive every vendor — including us.",
    surface: "bg-card",
  },
];

export default function V2ArchitectureSection() {
  return (
    <section
      id="andamio-api"
      className="border-t border-border/60 bg-surface-subtle py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-24">
          <div>
            <Kicker>Andamio API · for builders</Kicker>

            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
              Building on credentials? Start with the API.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground">
              The Issuer product runs on the same machinery you can build on
              directly. Andamio credentials are machine-readable: an application
              can check that someone holds one and act on it — gate access,
              unlock the next step, or drive what the app does next.
            </p>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-muted-foreground">
              This is where credentials gate access today: a course credential
              can gate a project through the API. Smart contracts audited by
              TxPipe, live on Cardano mainnet, called over REST — your stack
              never touches crypto.
            </p>
            <a
              href={EXTERNAL_LINKS.apiReference}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Read the API reference{" "}
              <span aria-hidden className="transition-transform duration-150 hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-lg">
            {stackLayers.map((layer, index) => (
              <div
                key={layer.name}
                className={`${layer.surface} ${
                  index > 0 ? "border-t border-border" : ""
                } px-7 py-7 sm:px-8`}
              >
                <p
                  className={`text-[13px] font-semibold ${
                    layer.emphasis
                      ? "text-primary-foreground/85"
                      : "text-muted-foreground"
                  }`}
                >
                  {layer.labelKicker}
                </p>
                <p
                  className={`mt-1.5 font-display text-[18px] font-semibold tracking-[-0.015em] ${
                    layer.emphasis ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {layer.name}
                </p>
                <p
                  className={`mt-2 text-[14px] leading-relaxed tracking-[-0.005em] ${
                    layer.emphasis ? "text-primary-foreground/85" : "text-muted-foreground"
                  }`}
                >
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
