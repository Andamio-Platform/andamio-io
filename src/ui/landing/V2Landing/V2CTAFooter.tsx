import React from "react";
import Link from "next/link";
import { EXTERNAL_LINKS } from "~/lib/external-links";

const footerLinks = {
  "For buyers": [
    { name: "Book a walkthrough", href: "mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request" },
    { name: "Use cases", href: "/use-cases" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ],
  "For builders": [
    { name: "Docs", href: EXTERNAL_LINKS.docs },
    { name: "API Reference", href: EXTERNAL_LINKS.apiReference },
    { name: "GitHub", href: EXTERNAL_LINKS.github },
    { name: "App", href: EXTERNAL_LINKS.app },
  ],
  Connect: [
    { name: "hello@andamio.io", href: "mailto:hello@andamio.io" },
    { name: "LinkedIn", href: EXTERNAL_LINKS.linkedin },
    { name: "Twitter", href: EXTERNAL_LINKS.twitter },
    { name: "Discord", href: EXTERNAL_LINKS.discord },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Terms", href: "/terms" },
  ],
};

export default function V2CTAFooter() {
  return (
    <section className="bg-surface-dark">
      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
          Ready when you are
        </p>
        <h3 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Talk to our enterprise team.
        </h3>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Twenty minutes. We&rsquo;ll scope a pilot against one of your
          active credentialing programs and show you the cross-issuer demo
          live. No slides.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:hello@andamio.io?subject=Enterprise%20demo%20request"
            className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a 20-minute walkthrough
          </a>
          <Link
            href="/use-cases"
            className="inline-flex items-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            See use cases
          </Link>
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
              Open, interoperable, composable credentials. Ready to integrate with your systems.
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
