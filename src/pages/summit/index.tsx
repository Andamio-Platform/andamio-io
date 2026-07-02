import React, { useEffect } from "react";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Button, Footer } from "~/ui/system/kit";

const mono = { fontFamily: font.mono };

const benefits = [
  {
    title: "Enterprise-ready Solution",
    body: "Andamio leverages Cardano’s robust blockchain technology to onboard enterprises efficiently, supporting ecosystem growth and driving adoption.",
  },
  {
    title: "Next-Generation Smart Contracts",
    body: "Our next-generation smart contracts are built to optimize and automate business processes, ensuring scalability, transparency, and trust in every transaction.",
  },
  {
    title: "Transparent On-Chain Operations",
    body: "Utilize streamlined, verifiable on-chain transactions that prioritize efficiency and security, designed to meet the demands of growing transaction volumes and support long-term ecosystem sustainability.",
  },
];

export default function SummitPage() {
  useEffect(() => {
    const countdownElement = document.getElementById("countdown");
    const targetDate = new Date("2024-11-15T00:00:00").getTime();

    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (countdownElement) {
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      if (timeLeft < 0) {
        clearInterval(countdownTimer);
        if (countdownElement) {
          countdownElement.innerHTML = "Voting has closed!";
        }
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  return (
    <>
      <Metatags
        title="Cardano Summit 2024"
        description="The benefits of voting for Andamio in Project Catalyst Fund 13."
      />

      <Page nav={{ items: nav.items, cta: nav.cta }}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>Cardano Summit 2024 · Project Catalyst Fund 13</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              The Benefits of Voting for Andamio
            </Display>
          </div>
        </Section>

        {/* Benefits */}
        <Section>
          <div className="py-16 sm:py-20">
            <div
              className="grid gap-px sm:grid-cols-3"
              style={{ background: color.cell }}
            >
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="p-6 sm:p-8"
                  style={{ background: color.paper }}
                >
                  <h2 className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">
                    {b.title}
                  </h2>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: color.inkMuted }}
                  >
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Vote CTA + countdown */}
        <Section bordered={false}>
          <div className="flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
            <Button
              variant="primary"
              href="https://projectcatalyst.io/search?q=andamio"
            >
              Vote for Andamio in Fund 13 →
            </Button>
            <div
              className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:gap-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0"
              style={{ borderColor: color.rule }}
            >
              <h2 className="text-xl font-semibold tracking-[-0.02em]">
                Time is Running Out to Vote!
              </h2>
              <div
                id="countdown"
                className="text-xl font-semibold tabular-nums sm:text-2xl"
                style={{ ...mono, color: color.ink }}
              ></div>
            </div>
          </div>
        </Section>

        {/* Summit meta — preserved from the original page footer */}
        <Section bordered={false}>
          <div className="pb-16">
            <p
              className="text-[11px] tabular-nums"
              style={{ ...mono, color: color.inkGhost }}
            >
              © 2024 Andamio. All rights reserved.
            </p>
            <p className="mt-1 text-[11px]" style={{ ...mono, color: color.inkGhost }}>
              Built for the Cardano Summit 2024.
            </p>
          </div>
        </Section>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Cardano Summit 2024"
        />
      </Page>
    </>
  );
}
