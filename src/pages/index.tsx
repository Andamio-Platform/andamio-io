import Head from "next/head";
import Metatags from "~/components/site/metatags";
import AndamioLanding from "~/ui/system/AndamioLanding";
import { ORGANIZATION_JSON_LD } from "~/lib/seo";

export default function Landing() {
  return (
    <>
      <Metatags />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
          key="org-json-ld"
        />
      </Head>
      <AndamioLanding />
    </>
  );
}
