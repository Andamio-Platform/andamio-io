import React from "react";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { Page, Footer } from "~/ui/system/kit";
import Fund12 from "~/ui/fund/12";

export default function Page12() {
  return (
    <>
      <Metatags
        title="Project Catalyst Fund 12"
        description="Andamio proposals submitted to Project Catalyst Fund 12."
      />

      <Page nav={{ items: nav.items, cta: nav.cta }}>
        <Fund12 />

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Project Catalyst · Fund 12"
        />
      </Page>
    </>
  );
}
