import React from "react";
import Link from "next/link";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { primaryBtnClass } from "./_ui";

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
        <p className="text-sm font-semibold text-primary">Build the graph with us</p>

        <h3 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
          The credential graph is being drawn.
          <br />
          <span className="text-primary">Get your issuers on it.</span>
        </h3>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed tracking-[-0.005em] text-white/70 sm:text-xl">
          Twenty minutes. We’ll scope a pilot against one of your active
          credentialing programs and show you cross-issuer composability live.
          No slides.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request"
            className={primaryBtnClass}
          >
            Book a 20-minute walkthrough
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="/dead-end-tax.html"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-md border border-white/30 bg-transparent px-6 py-3 text-[15px] font-medium text-white transition-colors duration-150 hover:border-white/60 hover:bg-white/[0.06]"
          >
            Read the Dead-End Tax audit
          </a>
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
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Composable Credentials. The credential graph, built on an open
              protocol, ready to integrate with your systems.
            </p>
            <p className="mt-6 text-[13px] text-white/40">
              © {new Date().getFullYear()} Andamio
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h3 className="mb-4 text-[13px] font-semibold text-white/80">
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
