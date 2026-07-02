import Metatags from "~/components/site/metatags";
import AndamioIssuer from "~/ui/system/AndamioIssuer";

export default function IssuerPage() {
  return (
    <>
      <Metatags
        title="Andamio Issuer"
        description="Turn the courses you run into credentials you own — permanent, useful, and yours. See how issuing a credential works in three steps."
      />
      <AndamioIssuer />
    </>
  );
}
