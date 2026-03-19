"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "~/ui/landing/V2Landing/motion-variants";

const fadeInVariants = fadeIn(30);
const containerVariants = staggerContainer();

interface Tier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: string;
  ctaHref?: string;
  ctaVariant?: "primary" | "secondary";
  highlight?: boolean;
}

const apiTiers: Tier[] = [
  {
    name: "Pioneer",
    price: "Free",
    description: "Get started with the protocol",
    features: [
      "1,000 API calls/mo",
      "10 requests/min rate limit",
      "Full API access",
      "Content Studio",
      "Community support",
    ],
    cta: "Get Started →",
    ctaHref: EXTERNAL_LINKS.app,
    ctaVariant: "primary",
  },
  {
    name: "Starter",
    price: "$$$",
    period: "/mo",
    description: "For teams building on Andamio",
    features: [
      "11,000 API calls/mo",
      "100 requests/min rate limit",
      "Early access features",
      "Email support",
    ],
    cta: "Join Waitlist",
    ctaHref: "mailto:hello@andamio.io?subject=API%20Starter%20Waitlist",
  },
  {
    name: "Growth",
    price: "$$$",
    period: "/mo",
    description: "Production-ready throughput",
    features: [
      "45,000 API calls/mo",
      "500 requests/min rate limit",
      "Higher throughput for production apps",
      "Priority support",
    ],
    cta: "Join Waitlist",
    ctaHref: "mailto:hello@andamio.io?subject=API%20Growth%20Waitlist",
  },
  {
    name: "Custom",
    price: "Custom",
    description: "Tailored to your scale",
    features: [
      "Custom API call volume",
      "Custom rate limits",
      "Custom endpoints",
      "Priority support + SLA",
    ],
    cta: "Contact Sales",
    ctaHref: "mailto:hello@andamio.io?subject=API%20Custom%20Inquiry",
    highlight: true,
  },
];

const issuerTiers: Tier[] = [
  {
    name: "Starter",
    price: "Free",
    description: "Pay per action, no subscription",
    features: [
      "Full on-chain service fees",
      "5% commission on rewards",
      "Community support",
    ],
    cta: "Get Started →",
    ctaHref: EXTERNAL_LINKS.app,
    ctaVariant: "primary",
  },
  {
    name: "Pro",
    price: "$$$",
    period: "/mo",
    description: "Reduced fees for growing programs",
    features: [
      "Unlimited courses & projects",
      "Unlimited participants",
      "Reduced service fees",
      "3% commission on rewards",
      "Email support",
    ],
    cta: "Join Waitlist",
    ctaHref: "mailto:hello@andamio.io?subject=Issuer%20Pro%20Waitlist",
  },
  {
    name: "Growth",
    price: "$$$",
    period: "/mo",
    description: "Scale your credential programs",
    features: [
      "Unlimited courses & projects",
      "Unlimited participants",
      "Further reduced service fees",
      "2% commission on rewards",
      "Priority support",
    ],
    cta: "Join Waitlist",
    ctaHref: "mailto:hello@andamio.io?subject=Issuer%20Growth%20Waitlist",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom engagement with API included",
    features: [
      "Unlimited courses & projects",
      "Network-cost-only service fees",
      "1% or 0% commission",
      "Full sponsorship (API included)",
      "Dedicated support + SLA",
    ],
    cta: "Contact Sales",
    ctaHref: "mailto:hello@andamio.io?subject=Enterprise%20Inquiry",
  },
];

type ProductTab = "api" | "issuer";

function TierCard({ tier }: { tier: Tier }) {
  return (
    <motion.div
      className={`flex flex-col rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        tier.highlight
          ? "border-primary/30 bg-primary/5 hover:border-primary/40"
          : "border-border bg-card hover:border-primary/20"
      }`}
      variants={fadeInVariants}
    >
      <p className="text-lg font-bold text-foreground">{tier.name}</p>
      {tier.description && (
        <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
      )}
      <p className="mb-1 mt-3 text-3xl font-bold text-foreground">
        {tier.price}
        {tier.period && (
          <span className="text-base font-normal text-muted-foreground">
            {tier.period}
          </span>
        )}
      </p>
      <div className="my-4 border-t border-border" />
      <ul className="flex flex-col gap-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <a
          href={tier.ctaHref}
          target={tier.ctaHref?.startsWith("http") ? "_blank" : undefined}
          rel={tier.ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`block w-full rounded-md py-2.5 text-center text-sm font-semibold transition-all ${
            tier.ctaVariant === "primary"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border text-foreground hover:border-primary/30 hover:bg-muted"
          }`}
        >
          {tier.cta}
        </a>
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<ProductTab>("api");
  const tiers = activeTab === "api" ? apiTiers : issuerTiers;

  return (
    <V2PageLayout
      title="Pricing"
      description="Two products. One protocol. Build with the API or issue credentials."
    >
      <div className="pb-12">
        {/* Subscription Tiers */}
        <div className="mb-16">
          {/* Product tab switcher */}
          <div className="mb-8 text-center">
            <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
              Build with the API or run credential programs. On-chain fees
              and project commission are separate and apply to both products.
            </p>
            <div className="mx-auto inline-flex rounded-xl border border-border bg-muted/50 p-1.5">
              <button
                onClick={() => setActiveTab("api")}
                className="relative rounded-lg px-6 py-3.5 text-sm font-semibold transition-colors"
              >
                {activeTab === "api" && (
                  <motion.div
                    layoutId="pricing-tab-indicator"
                    className="absolute inset-0 rounded-lg bg-primary shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center gap-2 ${
                  activeTab === "api" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  Andamio API
                </span>
                <span className={`relative z-10 mt-1 block text-xs font-normal ${
                  activeTab === "api" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  For developers
                </span>
              </button>
              <button
                onClick={() => setActiveTab("issuer")}
                className="relative rounded-lg px-6 py-3.5 text-sm font-semibold transition-colors"
              >
                {activeTab === "issuer" && (
                  <motion.div
                    layoutId="pricing-tab-indicator"
                    className="absolute inset-0 rounded-lg bg-primary shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center gap-2 ${
                  activeTab === "issuer" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  Credential Issuer
                </span>
                <span className={`relative z-10 mt-1 block text-xs font-normal ${
                  activeTab === "issuer" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  For organizations
                </span>
              </button>
            </div>
          </div>

          {/* Product description */}
          <motion.p
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground"
          >
            {activeTab === "api"
              ? "Programmatic access to Andamio — courses, projects, credentials, and user data. Tiers differentiate on API call volume and rate limits."
              : "For organizations and individuals who create courses or projects. Higher tiers reduce on-chain service fees and commission rates."}
          </motion.p>

          {/* Tier cards */}
          <motion.div
            key={`grid-${activeTab}`}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tiers.map((tier) => (
              <TierCard key={`${activeTab}-${tier.name}`} tier={tier} />
            ))}
          </motion.div>
        </div>

        {/* Protocol Costs Divider */}
        <div className="mb-12 border-t border-border pt-12">
          <p className="mb-2 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
            PROTOCOL COSTS
          </p>
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
            On-Chain Fees
          </h2>
          <p className="mx-auto mb-4 max-w-3xl text-center text-sm text-muted-foreground">
            Every on-chain action has two components: a <strong className="text-foreground">network fee</strong> (Cardano
            base cost, passed through at cost) and an <strong className="text-foreground">Andamio service fee</strong> (reduced
            by higher Issuer tiers). These apply to both products.
          </p>
        </div>

        {/* Transaction Fee Cards */}
        <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {/* Access Token Minting */}
          <Card className="relative overflow-hidden border border-green-500/50 bg-card shadow-xl">
            <div className="absolute -right-12 -top-12 h-20 w-20 bg-green-500/20 blur-2xl"></div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-green-500/30 bg-green-600/20">
                      <svg
                        className="h-5 w-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Access Token
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">~8</span>
                      <span className="text-sm text-muted-foreground">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
  Mint access tokens for users
                </p>
              </div>

              <div className="mb-4 space-y-2 text-muted-foreground">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                    One-time fee per user
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                    Enables credential verification
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                    Blockchain-secured identity
                  </li>
                </ul>
              </div>

              <Link href="/pricing/access-token">
                <Button className="w-full bg-green-600 text-white hover:bg-green-700 text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>

          {/* Course/Project Creation */}
          <Card className="relative overflow-hidden border border-blue-500/50 bg-card shadow-xl">
            <div className="absolute -right-12 -top-12 h-20 w-20 bg-blue-500/20 blur-2xl"></div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-blue-500/30 bg-blue-600/20">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Course/Project
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">150</span>
                      <span className="text-sm text-muted-foreground">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Activate a course or project (mints a Project NFT)
                </p>
              </div>

              <div className="mb-4 space-y-2 text-muted-foreground">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    150 ADA per course or project
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    Credential issuance system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    Treasury management
                  </li>
                </ul>
              </div>

              <Link href="/pricing/instance">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>

          {/* Manager Addition */}
          <Card className="relative overflow-hidden border border-purple-500/50 bg-card shadow-xl">
            <div className="absolute -right-12 -top-12 h-20 w-20 bg-purple-500/20 blur-2xl"></div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-purple-500/30 bg-purple-600/20">
                      <svg
                        className="h-5 w-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Add Manager
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">10</span>
                      <span className="text-sm text-muted-foreground">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add teachers or managers to courses/projects
                </p>
              </div>

              <div className="mb-4 space-y-2 text-muted-foreground">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-purple-400"></div>
                    Full management access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-purple-400"></div>
                    Credential approval rights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-purple-400"></div>
                    Treasury permissions
                  </li>
                </ul>
              </div>

              <Link href="/pricing/instance-manager">
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>

          {/* Task Completion Fee */}
          <Card className="relative overflow-hidden border border-orange-500/50 bg-card shadow-xl">
            <div className="absolute -right-12 -top-12 h-20 w-20 bg-orange-500/20 blur-2xl"></div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-orange-500/30 bg-orange-600/20">
                      <svg
                        className="h-5 w-5 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Task Completion
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">5%</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Base commission on task reward payouts
                </p>
              </div>

              <div className="mb-4 space-y-2 text-muted-foreground">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    Buy down to 0% with NFT add-ons
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    Per-project granularity
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    On-chain verifiable rates
                  </li>
                </ul>
              </div>

              <Link href="/pricing/task">
                <Button className="w-full bg-orange-600 text-white hover:bg-orange-700 text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Commission Discount Add-Ons Section */}
        <div className="mt-12">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
            Commission NFT Add-Ons
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted-foreground">
            Reduce commission two ways: subscribe to a higher Issuer tier (grants the NFT automatically),
            or purchase the NFT outright for a permanent per-project rate.
          </p>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">NFT</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">One-Time Cost</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-foreground sm:table-cell">Or Granted By</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Commission</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-foreground md:table-cell">Best For</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Base</td>
                  <td className="px-4 py-3">Included</td>
                  <td className="hidden px-4 py-3 sm:table-cell">Issuer Starter</td>
                  <td className="px-4 py-3 font-semibold text-orange-400">5%</td>
                  <td className="hidden px-4 py-3 md:table-cell">Testing, pilots</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Tier 1</td>
                  <td className="px-4 py-3">~500 ADA</td>
                  <td className="hidden px-4 py-3 sm:table-cell">Issuer Pro</td>
                  <td className="px-4 py-3 font-semibold text-yellow-400">3%</td>
                  <td className="hidden px-4 py-3 md:table-cell">Growing projects</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Tier 2</td>
                  <td className="px-4 py-3">~1,500 ADA</td>
                  <td className="hidden px-4 py-3 sm:table-cell">Issuer Growth</td>
                  <td className="px-4 py-3 font-semibold text-green-400">2%</td>
                  <td className="hidden px-4 py-3 md:table-cell">Established programs</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Tier 3</td>
                  <td className="px-4 py-3">~2,500 ADA</td>
                  <td className="hidden px-4 py-3 sm:table-cell">—</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">1%</td>
                  <td className="hidden px-4 py-3 md:table-cell">High-volume enterprise</td>
                </tr>
                <tr className="border-t border-border bg-primary/5">
                  <td className="px-4 py-3 font-medium text-foreground">Lifetime Zero</td>
                  <td className="px-4 py-3">~25,000 ADA</td>
                  <td className="hidden px-4 py-3 sm:table-cell">Enterprise (custom)</td>
                  <td className="px-4 py-3 font-bold text-blue-400">0%</td>
                  <td className="hidden px-4 py-3 md:table-cell">Strategic partners</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground/70">
            All NFT purchases are one-time, permanent, per-project. Commission tier is encoded in the Project NFT on-chain.
          </p>
        </div>

        {/* Transaction Sponsorship */}
        <div className="mt-12">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
            Transaction Sponsorship
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted-foreground">
            Deposit ADA into an NFT-bound fund so participants pay $0, zero crypto required.
            Unused ADA stays with you — no expiration.
          </p>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { name: "Pilot", ada: "500", usd: "$225", covers: "~15 students" },
              { name: "Standard", ada: "2,500", usd: "$1,125", covers: "~100 students" },
              { name: "Scale", ada: "10,000", usd: "$4,500", covers: "~350 students" },
            ].map((bundle) => (
              <Card key={bundle.name} className="border border-border bg-card">
                <div className="p-5">
                  <p className="text-lg font-bold text-foreground">{bundle.name}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {bundle.ada} <span className="text-sm font-normal text-muted-foreground">ADA</span>
                  </p>
                  <p className="text-xs text-muted-foreground/70">~{bundle.usd}</p>
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="text-sm text-muted-foreground">Covers approx. {bundle.covers}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground/70">
            Enterprise sponsorship with custom amounts available.{" "}
            <a href="mailto:hello@andamio.io" className="text-primary hover:underline">Contact sales</a>.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="mb-4 text-center text-xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl space-y-3">
            <Card className="border border-border bg-card">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-foreground">
                  What&apos;s the difference between the two products?
                </h3>
                <p className="text-sm text-muted-foreground">
                  The <strong className="text-foreground">Andamio API</strong> is for developers who want programmatic
                  access to build custom applications. The <strong className="text-foreground">Credential Issuer</strong> is
                  for organizations running courses or projects — they define credentials and approve who earns them.
                  You can use one, both, or neither independently.
                </p>
              </div>
            </Card>

            <Card className="border border-border bg-card">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-foreground">
                  What are network fees vs. service fees?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every on-chain action has a <strong className="text-foreground">network fee</strong> (Cardano base cost,
                  passed through at cost) and an <strong className="text-foreground">Andamio service fee</strong>. Higher
                  Issuer tiers reduce the service fee component. Access token costs are fully fixed and do not reduce with tier.
                </p>
              </div>
            </Card>

            <Card className="border border-border bg-card">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-foreground">
                  Do education-only issuers pay commission?
                </h3>
                <p className="text-sm text-muted-foreground">
                  No. Commission only applies when task or milestone rewards are paid out.
                  Education-only issuers (courses with no reward payouts) pay zero commission regardless of tier.
                </p>
              </div>
            </Card>

            <Card className="border border-border bg-card">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-foreground">
                  How does full participant sponsorship work?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Full sponsorship (participants pay $0, zero crypto) requires both an API and Issuer subscription,
                  or an Enterprise Issuer account. The issuer deposits ADA into an NFT-bound fund, and the protocol
                  automatically draws from it for participant actions.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </V2PageLayout>
  );
}
