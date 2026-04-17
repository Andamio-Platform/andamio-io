import React from "react";

interface Belief {
  headline: string;
  elaboration: string;
}

const beliefs: Belief[] = [
  {
    headline:
      "Every credential should outlive the platform that issued it.",
    elaboration:
      "A credential locked inside a vendor\u2019s database isn\u2019t a credential. It\u2019s a rental.",
  },
  {
    headline:
      "A credential that can\u2019t unlock anything else is a receipt.",
    elaboration:
      "If your customers hold a credential and can\u2019t use it anywhere but your app, you\u2019ve issued a souvenir.",
  },
  {
    headline:
      "Composability is not a feature. It\u2019s a category.",
    elaboration:
      "Credly and Accredible are world-class at issuing. They are not composable. That gap is the category.",
  },
  {
    headline:
      "The credential graph is coming. We\u2019re building it.",
    elaboration:
      "Every credential a person earns should compose with every other — across issuers, across industries, across time. One graph. No gatekeeper.",
  },
];

export default function V2ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden border-t border-border/60 bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            The Composable Credentials manifesto
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
            What we believe.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Four stakes in the ground. If you agree with any of them, we
            should talk.
          </p>
        </div>

        <ol className="mt-16 space-y-12 sm:space-y-16">
          {beliefs.map((belief, index) => (
            <li
              key={belief.headline}
              className="grid gap-6 border-t-2 border-foreground/80 pt-8 sm:grid-cols-[auto_1fr] sm:gap-12"
            >
              <p className="font-display text-3xl font-extrabold text-primary tabular-nums sm:text-4xl">
                0{index + 1}
              </p>
              <div>
                <p className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                  {belief.headline}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {belief.elaboration}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
