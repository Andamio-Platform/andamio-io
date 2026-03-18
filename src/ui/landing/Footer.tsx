import Link from "next/link";
import React from "react";
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
    { name: "Privacy", href: "https://app.andamio.io/privacy-policy" },
    { name: "Terms", href: "https://app.andamio.io/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-start md:justify-between lg:px-8">
        {/* Left — brand */}
        <div className="shrink-0">
          <img
            className="hidden mb-3 h-6 w-auto opacity-80 dark:block"
            src="/logo-with-typography-dark.svg"
            alt="Andamio"
          />
          <img
            className="block mb-3 h-6 w-auto opacity-80 dark:hidden"
            src="/logo-with-typography.svg"
            alt="Andamio"
          />
          <p className="text-xs text-muted-foreground/60">
            Open protocol for interoperable credentials
          </p>
          <p className="mt-4 text-xs text-muted-foreground/40">
            © {new Date().getFullYear()} Andamio
          </p>
        </div>

        {/* Right — link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                {key}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
