import React from "react";

interface Decision {
  title: string;
  body: string;
}

// Drawn directly from the Andamio Issuer paper —
// "What makes an Andamio credential different" (the six design decisions).
const decisions: Decision[] = [
  {
    title: "It outlives whoever issued it",
    body: "It’s immutable, on public infrastructure no single company owns. It can’t be altered, and it doesn’t disappear when a vendor does. You’re not locked in, and neither are the people you credential.",
  },
  {
    title: "It builds on other credentials",
    body: "Like a university prerequisite, one credential can be required before another. The chain enforces it, not an app. So a credential you issue can gate a program someone else runs.",
  },
  {
    title: "Software can act on it",
    body: "It’s machine-readable and programmable. An app can check that someone holds it and gate access on that.",
  },
  {
    title: "Proof is public; evidence is private",
    body: "Anyone can verify a credential is real. The work behind it stays with the earner and the issuer. A diploma is public. The exam papers are not.",
  },
  {
    title: "You own what it means",
    body: "Issuing is easy, and the credential makes no claim about its own value. You define what it certifies. Its value comes from the track record it earns. The infrastructure is ours. The meaning is yours.",
  },
  {
    title: "The earner keeps it",
    body: "It lives with the person who earned it, not your system. Everything they earn from you sits in one record they control. They can carry it anywhere, even if they leave your program.",
  },
];

export default function V2IssuerOverview() {
  return (
    <section
      id="issuer"
      className="flex min-h-screen flex-col justify-center border-t border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              Product 01 · No code
            </p>
            <h2 className="mt-4 font-display text-[3.25rem] font-bold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-8xl lg:text-9xl">
              Andamio Issuer
            </h2>
          </div>
          <p className="max-w-2xl text-xl leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-2xl">
            Andamio turns the badge you already issue into a credential you
            control. It adds a verifiable layer on top of the programs you
            already run. You get everything a blockchain guarantees, and none of
            the blockchain to learn.
          </p>
        </div>

        <p className="mt-16 font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl">
          Six design decisions set an Andamio credential apart.
        </p>

        <dl className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
          {decisions.map((d, i) => (
            <div key={d.title} className="flex flex-col border-t-2 border-border pt-7">
              <span className="font-display text-xl font-bold tabular-nums text-primary/60">
                0{i + 1}
              </span>
              <dt className="mt-4 font-display text-xl font-bold leading-[1.15] tracking-[-0.015em] text-foreground sm:text-2xl">
                {d.title}
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-base">
                {d.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
