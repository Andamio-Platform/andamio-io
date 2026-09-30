import Metatags from "~/components/site/metatags";
import JsonLd from "~/components/site/JsonLd";
import { faqJsonLd, productOffersJsonLd } from "~/lib/seo";
import { pricing } from "~/ui/explore/content";
import AndamioPricing from "~/ui/system/AndamioPricing";

export default function PricingPage() {
  return (
    <>
      <Metatags
        title="Pricing"
        description="Andamio pricing for two products: Andamio Issuer (managed credentials for organizations, annual) and the Andamio API (self-serve protocol access for developers, monthly)."
      />
      <JsonLd id="faq" data={faqJsonLd(pricing.faq)} />
      <JsonLd
        id="issuer-offers"
        data={productOffersJsonLd(
          { name: pricing.issuer.title, description: pricing.issuer.lead },
          [
            { name: "Growth", price: "12000", unit: "per year" },
            { name: "Scale", price: "30000", unit: "per year" },
          ],
        )}
      />
      <JsonLd
        id="api-offers"
        data={productOffersJsonLd(
          { name: pricing.api.title, description: pricing.api.lead },
          [
            { name: "Free", price: "0", unit: "per month" },
            { name: "Starter", price: "29", unit: "per month" },
            { name: "Growth", price: "129", unit: "per month" },
          ],
        )}
      />
      <AndamioPricing />
    </>
  );
}
