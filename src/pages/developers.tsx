import Metatags from "~/components/site/metatags";
import AndamioDevelopers from "~/ui/system/AndamioDevelopers";

export default function DevelopersPage() {
  return (
    <>
      <Metatags
        title="Developers"
        description="Build on Andamio — a protocol for programmable credentials. Issue, verify, and gate on credentials from your own stack over plain REST, with Cardano validators enforcing the rules."
      />
      <AndamioDevelopers />
    </>
  );
}
