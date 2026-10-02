import React from "react";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color } from "~/ui/system/tokens";
import {
  Page,
  Section,
  Kicker,
  Display,
  Footer,
  PageTrail,
} from "~/ui/system/kit";

export default function CalendarPage() {
  return (
    <>
      <Metatags
        title="Public Calendar"
        description="Public calendar for Andamio and Gimbalabs events."
      />

      <Page nav={{ items: nav.items }}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <PageTrail
              className="mb-5"
              back={{ href: "/", label: "← Back to home" }}
            />
            <Kicker>Calendar</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              Andamio Public Calendar
            </Display>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              Open sessions, working groups, and community events.
            </p>
          </div>
        </Section>

        {/* Calendar embed */}
        <Section>
          <div className="py-16 sm:py-20">
            <div style={{ border: `1px solid ${color.cell}` }}>
              <iframe
                src="https://teamup.com/ksso1wk6ysj9ireqau?title=Gimbalabs%20Calendar&showLogo=0&showSearch=0&showProfileAndInfo=0&showSidepanel=1&disableSidepanel=1&showTitle=0&showViewSelector=1&showMenu=0&showAgendaHeader=1&showAgendaDetails=0&showYearViewHeader=1"
                width="100%"
                height="800px"
                style={{ display: "block", border: 0 }}
                title="Andamio Public Calendar"
              ></iframe>
            </div>
          </div>
        </Section>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Calendar"
        />
      </Page>
    </>
  );
}
