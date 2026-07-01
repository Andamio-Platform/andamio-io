import Metatags from "~/components/site/metatags";
import AndamioPricing from "~/ui/system/AndamioPricing";

export default function PricingPage() {
  return (
    <>
      <Metatags
        title="Pricing"
        description="Andamio pricing for two products: Andamio Issuer (managed credentials for organizations, annual) and the Andamio API (self-serve protocol access for developers, monthly)."
      />
      <AndamioPricing />
    </>
  );
}
