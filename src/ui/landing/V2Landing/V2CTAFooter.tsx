import React from "react";
import Link from "next/link";
import { EXTERNAL_LINKS } from "~/lib/external-links";

const footerLinks = {
  Build: [
    { name: "Docs", href: EXTERNAL_LINKS.docs },
    { name: "API Reference", href: EXTERNAL_LINKS.apiReference },
    { name: "GitHub", href: EXTERNAL_LINKS.github },
    { name: "Discord", href: EXTERNAL_LINKS.discord },
  ],
  Explore: [
    { name: "Use Cases", href: "/use-cases" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "App", href: EXTERNAL_LINKS.app },
  ],
  Connect: [
    { name: "hello@andamio.io", href: "mailto:hello@andamio.io" },
    { name: "LinkedIn", href: EXTERNAL_LINKS.linkedin },
    { name: "Twitter", href: EXTERNAL_LINKS.twitter },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Terms", href: "/terms" },
  ],
};

export default function V2CTAFooter() {
  return (
    <section className="bg-surface-dark">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
            <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              Get your API key. Start issuing credentials today.
            </h3>
            <a
              href={EXTERNAL_LINKS.docs}
              className="mt-8 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read the Docs
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
            <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              See how Intersect, Toha, and Syngenta use Andamio.
            </h3>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/use-cases"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View Use Cases
              </Link>
              <a
                href="mailto:hello@andamio.io"
                className="inline-flex items-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between lg:px-8">
          <div className="shrink-0">
            <img
              className="mb-3 h-6 w-auto opacity-80"
              src="/logo-with-typography-dark.svg"
              alt="Andamio"
            />
            <p className="max-w-xs text-sm text-white/60">
              Open protocol for interoperable credentials.
            </p>
            <p className="mt-6 text-xs text-white/40">
              © {new Date().getFullYear()} Andamio
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                  {key}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => {
                    const isExternal =
                      link.href.startsWith("http") ||
                      link.href.startsWith("mailto:");
                    return (
                      <li key={link.name}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            {...(link.href.startsWith("http")
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="text-sm text-white/70 transition-colors hover:text-white"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-white/70 transition-colors hover:text-white"
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
