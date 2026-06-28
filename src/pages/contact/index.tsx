import React from "react";
import Head from "next/head";
import { nav, footer as footerData, EXTERNAL_LINKS } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Button, Footer } from "~/ui/system/kit";

const mono = { fontFamily: font.mono };

const channels = [
  {
    label: "Email",
    value: "hello@andamio.io",
    href: "mailto:hello@andamio.io",
    cta: "Email us →",
  },
  {
    label: "X",
    value: "@AndamioPlatform",
    href: EXTERNAL_LINKS.twitter,
    cta: "Follow →",
  },
  {
    label: "Discord",
    value: "Andamio Public Discord: Coming Q3 2024",
    href: null,
    cta: null,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Andamio</title>
        <meta
          name="description"
          content="Get in touch with the Andamio team."
        />
      </Head>

      <Page nav={{ items: nav.items, cta: nav.cta }} sections={null}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>Contact</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              Get In Touch
            </Display>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              Reach the Andamio team directly, or find us on X and Discord.
            </p>
          </div>
        </Section>

        {/* Channels */}
        <Section>
          <div className="py-16 sm:py-20">
            <div
              className="grid gap-px sm:grid-cols-3"
              style={{ background: color.cell }}
            >
              {channels.map((channel) => (
                <div
                  key={channel.label}
                  className="flex flex-col gap-3 p-6"
                  style={{ background: color.paper }}
                >
                  <p
                    className="text-[11px] uppercase tracking-[0.18em]"
                    style={{ ...mono, color: color.inkMuted }}
                  >
                    {channel.label}
                  </p>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="text-lg font-semibold tracking-[-0.01em] transition-colors hover:underline"
                      style={{ color: color.blue }}
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p
                      className="text-lg font-semibold tracking-[-0.01em]"
                      style={{ color: color.ink }}
                    >
                      {channel.value}
                    </p>
                  )}
                  {channel.href && channel.cta && (
                    <Button variant="outline" href={channel.href}>
                      {channel.cta}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Bottom CTA */}
        <Section bordered={false}>
          <div className="flex flex-wrap items-center gap-3 py-16">
            <Button variant="primary" href="mailto:hello@andamio.io">
              Email the team →
            </Button>
            <Button variant="outline" href="/about">
              About Andamio
            </Button>
          </div>
        </Section>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Contact"
        />
      </Page>
    </>
  );
}
