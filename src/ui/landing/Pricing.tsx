import { CheckIcon } from "@heroicons/react/20/solid";
import classNames from "~/utils/classnames";
import Link from "next/link";

const tiers = [
  {
    name: "Free Tier",
    id: "tier-free",
    href: "#",
    email: "hello@andamio.io",
    priceMonthly: "$0",
    description: "The essentials to get you started with Andamio.",
    features: [
      "Access to one onboarding course",
      "One integrated onboarding and contribution manager",
      "Basic project management tools",
      "Decentralized treasury management for small projects",
    ],
    transactionFee: "10% on top of network fees",
    mostPopular: false,
  },
  {
    name: "Pro Tier",
    id: "tier-pro",
    href: "#",
    email: "hello@andamio.io",
    priceMonthly: "$95",
    description: "A comprehensive plan for growing organizations.",
    features: [
      "All Free Tier functionalities",
      "Access to more courses and contribution managers",
      "Enhanced onboarding tools",
      "Detailed project tracking",
      "Support for larger projects",
    ],
    transactionFee: "5% on top of network fees",
    mostPopular: true,
  },
  {
    name: "Enterprise Tier",
    id: "tier-enterprise",
    href: "#",
    email: "hello@andamio.io",
    priceMonthly: "$995",
    description: "Designed for organizations with high transaction volumes.",
    features: [
      "Unlimited access to all features",
      "Advanced analytics",
      "Priority support",
      "Custom solutions for large organizations",
    ],
    transactionFee: "2.5% on top of network fees",
    mostPopular: false,
  },
  {
    name: "Catalyst Proposer Tier",
    id: "tier-catalyst",
    href: "#",
    email: "hello@andamio.io",
    priceMonthly: "₳26,000",
    description: "Lifetime access tailored for catalyst proposers.",
    features: ["All Pro Tier features", "Enterprise transaction fees"],
    transactionFee: "Enterprise transaction fees",
    mostPopular: false,
  },
];

export function Pricing() {
  return (
    <div className="py-24 sm:pt-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Pricing plans for organizations of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-700">
          Find the right plan that fits your organization’s needs, from getting
          started to scaling up and beyond.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                tierIdx < tiers.length - 1 && tierIdx > 0
                  ? "lg:rounded-none"
                  : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-300 xl:p-10",
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-primary" : "text-gray-900",
                      "text-lg font-semibold leading-8",
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Transaction Fee: {tier.transactionFee}
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-700"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`mailto:${tier.email}?subject=Inquiry about ${tier.name}`}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "hover:bg-primary-dark bg-primary text-white shadow-sm"
                    : "text-primary ring-1 ring-inset ring-primary hover:ring-primary",
                  "mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                )}
              >
                Get in touch
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
