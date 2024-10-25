import Link from "next/link";
import React from "react";

const footerData = {
  "Stay Connected with Andamio": [
    { name: "Support", href: "mailto:dev@andamio.com" },
    { name: "Contact Us", href: "mailto:hello@andamio.com" },
  ],
  "Follow Us": [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/andamio-platform",
    },
    { name: "Twitter", href: "https://twitter.com/AndamioPlatform" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Use", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <div className="relative z-30 mt-24 bg-primary text-primary-foreground">
      <footer className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center text-start">
          <div className="grid w-full grid-cols-1 justify-items-start gap-8 sm:grid-cols-2 md:grid-cols-3 md:justify-items-center">
            {Object.entries(footerData).map(([key, links]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  {key}
                </h3>
                <ul className="mt-4 space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            Andamio v0.3.3 | © {new Date().getFullYear()} Andamio. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
