import Metatags from "~/components/site/metatags";
import JsonLd from "~/components/site/JsonLd";
import { softwareAppJsonLd } from "~/lib/seo";
import AndamioCli from "~/ui/system/AndamioCli";

export default function CliPage() {
  return (
    <>
      <Metatags
        title="Andamio CLI"
        description="The Andamio CLI — interact with the Andamio Protocol from your terminal: build, sign, and submit transactions, author courses and projects, and authenticate with your wallet."
      />
      <JsonLd
        id="cli"
        data={softwareAppJsonLd({
          name: "Andamio CLI",
          description:
            "The terminal interface to the Andamio protocol: build, sign, and submit transactions on Windows, macOS, and Linux.",
          path: "/cli",
        })}
      />
      <AndamioCli />
    </>
  );
}
