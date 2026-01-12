import Link from "next/link";
import React from "react";

const footerData = {
  "Stay Connected with Andamio": [
    { name: "Support", href: "mailto:dev@andamio.com" },
    { name: "Contact Us", href: "mailto:hello@andamio.com" },
    { name: "Docs", href: "https://docs.andamio.io" },
    { name: "Andamio Network community", href: "https://discord.gg/FtvpAYnBMU" },

  ],
  "Follow Us": [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/andamio-teams",
    },
    { name: "Twitter", href: "https://twitter.com/andamio_teams" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Brand Hub", href: "/brand" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "https://app.andamio.io/privacy-policy" },
    { name: "Terms of Use", href: "https://app.andamio.io/terms" },
  ],
};

export default function Footer() {
  return (
    <div className="relative z-30 border-t border-border bg-muted/30 text-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="grid h-full grid-cols-16">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-border"></div>
          ))}
        </div>
        <div className="absolute inset-0">
          <div className="flex h-full flex-col">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-1 border-b border-border"></div>
            ))}
          </div>
        </div>
      </div>

      <footer className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Top accent line */}
        <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <div className="flex flex-col">
          {/* Main footer content */}
          <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(footerData).map(([key, links], index) => (
              <div key={key} className="relative">
                {/* Angular accent for each section */}
                <div className="absolute -top-2 left-0 h-1 w-8 bg-gradient-to-r from-primary to-transparent opacity-60"></div>

                <h3 className="mb-6 text-lg font-bold uppercase tracking-wider text-foreground">
                  {key}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        <span className="mr-3 h-px w-2 bg-border transition-colors duration-200 group-hover:bg-primary"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="mt-16 border-t border-border pt-8">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 flex items-center gap-4 md:mb-0">
                <img
                  className="h-8 w-auto opacity-80"
                  src="/andamio-logo.svg"
                  alt="Andamio"
                />
                <div className="text-sm text-muted-foreground">
                  Trust Protocol for Distributed Work
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-sm border border-border bg-muted px-2 py-1 font-mono text-xs">
                  v0.3.3
                </span>
                <span>|</span>
                <span>
                  © {new Date().getFullYear()} Andamio. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
