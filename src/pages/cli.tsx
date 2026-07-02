import Metatags from "~/components/site/metatags";
import AndamioCli from "~/ui/system/AndamioCli";

export default function CliPage() {
  return (
    <>
      <Metatags
        title="Andamio CLI"
        description="The Andamio CLI — interact with the Andamio Protocol from your terminal: build, sign, and submit transactions, author courses and projects, and authenticate with your wallet."
      />
      <AndamioCli />
    </>
  );
}
