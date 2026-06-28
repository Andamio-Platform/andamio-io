import React from "react";
import Head from "next/head";
import { nav, footer as footerData } from "~/ui/explore/content";
import { Page, Footer } from "~/ui/system/kit";
import Fund12 from "~/ui/fund/12";

export default function Page12() {
  return (
    <>
      <Head>
        <title>Andamio, Build Trust · Project Catalyst Fund 12</title>
        <meta
          name="description"
          content="Andamio proposals submitted to Project Catalyst Fund 12."
        />
      </Head>

      <Page nav={{ items: nav.items, cta: nav.cta }} sections={null}>
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
