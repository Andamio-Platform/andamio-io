import React from "react";
import { EXTERNAL_LINKS } from "~/lib/external-links";

interface IntegrationPath {
  kicker: string;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
  external: boolean;
}

const integrationPaths: IntegrationPath[] = [
  {
    kicker: "For developers",
    title: "Build with the API",
    description:
      "Add credentials, access control, and courses to your app via REST API.",
    linkLabel: "Getting Started Guide",
    linkHref: EXTERNAL_LINKS.docsGettingStarted,
    external: false,
  },
  {
    kicker: "For protocol engineers",
    title: "Build on the Platform",
    description:
      "Work directly with Andamio smart contracts on Cardano. Full control.",
    linkLabel: "View on GitHub",
    linkHref: EXTERNAL_LINKS.github,
    external: true,
  },
  {
    kicker: "For the curious",
    title: "See it in action",
    description:
      "Explore the Andamio App to see how credentials, courses, and projects work together.",
    linkLabel: "Open the App",
    linkHref: EXTERNAL_LINKS.app,
    external: true,
  },
];

interface StackLayer {
  label: string;
  description: string;
  emphasis?: boolean;
  surface: string;
}

const stackLayers: StackLayer[] = [
  {
    label: "Your app",
    description: "You build this — your frontend, your experience, your users.",
    surface: "bg-card",
  },
  {
    label: "Andamio API",
    description: "Credentials · Access Control · Courses · Treasury",
    emphasis: true,
    surface: "bg-primary/10",
  },
  {
    label: "Andamio Platform",
    description:
      "Smart contracts, on-chain state, credential registry (audited by TxPipe).",
    surface: "bg-surface-subtle",
  },
  {
    label: "Cardano blockchain",
    description: "Settlement, permanence, interoperability.",
    surface: "bg-card",
  },
];

export default function V2ArchitectureSection() {
  return (
    <section id="platform" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Andamio is built on Cardano.
            <br />
            Your app is built on Andamio.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Role-based access, credential gating, and contribution tracking — on
            a layer you don&rsquo;t have to build yourself.
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
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

          <ul className="space-y-8">
            {integrationPaths.map((path) => (
              <li
                key={path.title}
                className="border-l-2 border-border pl-6 transition-colors hover:border-primary"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {path.kicker}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  {path.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {path.description}
                </p>
                <a
                  href={path.linkHref}
                  {...(path.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {path.linkLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
