import Link from "next/link";
import Head from "next/head";
import { VARIANTS, type VariantMeta } from "~/ui/explore/content";

/**
 * Round 1 design exploration gallery.
 *
 * Ten content-identical iterations of the landing page, exploring font, color,
 * and layout. Same words everywhere (src/ui/explore/content.ts); only the
 * design changes. See docs/brainstorms/2026-06-27-design-inspiration.md.
 */
export default function ExploreIndex() {
  const schemeStyle: Record<string, string> = {
    light: "bg-white text-zinc-900 border-zinc-200",
    dark: "bg-zinc-950 text-zinc-100 border-zinc-800",
    mixed:
      "bg-gradient-to-br from-white via-white to-zinc-900 text-zinc-900 border-zinc-300",
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <Head>
        <title>Round 1 — Landing Page Explorations</title>
      </Head>

      <header className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Prototypes &amp; Exploration
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Landing pages, one set of words
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Every iteration uses identical copy. Only font, color, and layout
          change.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/explore/moodboard" className="text-orange-600 underline-offset-2 hover:underline">
            Mood board →
          </Link>
          <Link href="/explore/system" className="text-orange-600 underline-offset-2 hover:underline">
            Design system →
          </Link>
          <Link href="/explore/final" className="text-orange-600 underline-offset-2 hover:underline">
            Final page (22, on the system) →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {([3, 2, 1] as const).map((batch) => {
          const items = VARIANTS.filter((v) => v.batch === batch);
          const label =
            batch === 3
              ? "Round 3 · Convergence (11 + 12 + 15)"
              : batch === 2
                ? "Round 2 · Informed by your picks"
                : "Round 1 · Broad exploration";
          return (
            <section key={batch} className="mt-10 first:mt-0">
              <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {label}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((v: VariantMeta) => (
                  <Link
                    key={v.slug}
                    href={`/explore/${v.slug}`}
                    className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={`mb-5 flex h-28 items-center justify-center rounded-lg border ${schemeStyle[v.scheme]}`}
                    >
                      <span className="font-mono text-3xl font-bold opacity-80">
                        {v.slug}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold tracking-tight">
                        {v.title}
                      </h2>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        {v.scheme}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {v.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-600 opacity-0 transition group-hover:opacity-100">
                      View iteration →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
