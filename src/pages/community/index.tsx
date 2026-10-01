import React from "react";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { color, font } from "~/ui/system/tokens";
import {
  Page,
  Section,
  Kicker,
  Display,
  Button,
  Footer,
} from "~/ui/system/kit";
import { roadmap } from "~/roadmap";

const catalyst = roadmap.find(
  (track) => track.category === "Catalyst Proposals",
);

const FUND_14 = {
  name: "F14: On-chain task and contributor verification",
  description:
    "A proposal to plug the Andamio protocol into an existing collaboration tool, so tasks and contributors can be verified on Cardano.",
  href: "https://projectcatalyst.io/funds/14/cardano-use-cases-concepts/onchain-task-and-contributor-verification",
};

export default function CommunityPage() {
  return (
    <>
      <Metatags
        title="Community"
        description="The Andamio Discord, the public events calendar, and the Project Catalyst funds that built the protocol."
      />
      <Page nav={{ items: nav.items }}>
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>Community</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              Where the work happens
            </Display>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              Talk with the team on Discord, join an open session, or read the
              Catalyst proposals that funded the protocol.
            </p>
          </div>
        </Section>

        <Section id="discord">
          <div className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Kicker>Discord</Kicker>
              <Display as="h2" size="md" className="mt-5">
                Andamio Discord
              </Display>
              <p
                className="mt-4 max-w-xl text-[16px] leading-relaxed"
                style={{ color: color.inkMuted }}
              >
                The public server is open. Questions about issuing, building, or
                a partnership belong here as much as they do in email.
              </p>
            </div>
            <Button variant="primary" href={EXTERNAL_LINKS.discord}>
              Join the Discord →
            </Button>
          </div>
        </Section>

        <Section id="calendar">
          <div className="py-16 sm:py-20">
            <Kicker>Calendar</Kicker>
            <Display as="h2" size="md" className="mt-5">
              Open sessions
            </Display>
            <p
              className="mt-4 max-w-2xl text-[16px] leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              Working groups and community events, shared with Gimbalabs.
            </p>
            <div className="mt-8 border" style={{ borderColor: color.cell }}>
              <iframe
                title="Andamio and Gimbalabs public calendar"
                src="https://teamup.com/ksso1wk6ysj9ireqau?title=Andamio%20Calendar&showLogo=0&showSearch=0&showProfileAndInfo=0&showSidepanel=1&disableSidepanel=1&showTitle=0&showViewSelector=1&showMenu=0&showAgendaHeader=1&showAgendaDetails=0&showYearViewHeader=1"
                width="100%"
                height="720"
                style={{ display: "block", border: 0, background: color.paper }}
              />
            </div>
          </div>
        </Section>

        <Section id="catalyst">
          <div className="py-16 sm:py-20">
            <Kicker>Project Catalyst</Kicker>
            <Display as="h2" size="md" className="mt-5">
              Funds 10 to 14
            </Display>
            <p
              className="mt-4 max-w-2xl text-[16px] leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              Andamio was funded in public rounds. Each line is a proposal, not
              a claim about how the vote went.
            </p>
            <ol
              className="mt-10 max-w-3xl border-l"
              style={{ borderColor: color.cell }}
            >
              {(catalyst?.epics ?? []).map((epic) => (
                <li key={epic.name} className="relative pb-8 pl-8">
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border"
                    style={{ borderColor: color.cyan, background: color.paper }}
                  />
                  <p
                    className="text-[12px] tabular-nums"
                    style={{ fontFamily: font.mono, color: color.inkFaint }}
                  >
                    {epic.years[0]}
                    {epic.quarter ? ` Q${epic.quarter}` : ""}
                    {epic.status === "inProgress" ? " · in progress" : ""}
                  </p>
                  <p
                    className="mt-1 text-[16px] font-semibold"
                    style={{ color: color.ink }}
                  >
                    {epic.name}
                  </p>
                  <p
                    className="mt-1 text-[15px] leading-relaxed"
                    style={{ color: color.inkMuted }}
                  >
                    {epic.description}
                  </p>
                  {epic.link ? (
                    <a
                      href={epic.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-[14px] underline-offset-4 hover:underline"
                      style={{ color: color.cyan }}
                    >
                      {epic.link.label} →
                    </a>
                  ) : null}
                </li>
              ))}
              <li className="relative pl-8">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border"
                  style={{ borderColor: color.cyan, background: color.paper }}
                />
                <p
                  className="text-[12px] tabular-nums"
                  style={{ fontFamily: font.mono, color: color.inkFaint }}
                >
                  2025 · proposal
                </p>
                <p
                  className="mt-1 text-[16px] font-semibold"
                  style={{ color: color.ink }}
                >
                  {FUND_14.name}
                </p>
                <p
                  className="mt-1 text-[15px] leading-relaxed"
                  style={{ color: color.inkMuted }}
                >
                  {FUND_14.description}
                </p>
                <a
                  href={FUND_14.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[14px] underline-offset-4 hover:underline"
                  style={{ color: color.cyan }}
                >
                  View proposal →
                </a>
              </li>
            </ol>
          </div>
        </Section>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Community"
        />
      </Page>
    </>
  );
}
