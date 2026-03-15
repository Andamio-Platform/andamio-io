"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { fadeIn, staggerContainer } from "./motion-variants";

const fadeInVariants = fadeIn(30);
const containerVariants = staggerContainer();

interface Tier {
  name: string;
  price: string;
  period?: string;

  description?: string;
  features: string[];
  cta: string;
  ctaEnabled: boolean;
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
      "Unlimited courses & projects",
      "Generous API rate limits",
      "Content Studio access",
      "Community support",
      "Basic usage dashboard",
    ],
    cta: "Get Started →",
    ctaEnabled: true,
    ctaHref: EXTERNAL_LINKS.app,
    ctaVariant: "primary",
  },
  {
    name: "Starter",
    price: "$99",
    period: "/mo",
    description: "For teams building on Andamio",
    features: [
      "Unlimited courses & projects",
      "Standard API rate limits",
      "Email support",
      "Usage dashboard",
    ],
    cta: "Join Waitlist",
    ctaEnabled: true,
    ctaHref: "mailto:hello@andamio.io?subject=Waitlist",
  },
  {
    name: "Growth",
    price: "$299",
    period: "/mo",
    description: "Scale your integration",
    features: [
      "Unlimited courses & projects",
      "Higher API rate limits",
      "Transaction Sponsorship management",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Join Waitlist",
    ctaEnabled: true,
    ctaHref: "mailto:hello@andamio.io?subject=Waitlist",
  },
  {
    name: "Enterprise",
    price: "$999",
    period: "/mo",
    description: "Custom solutions at scale",
    features: [
      "Unlimited courses & projects",
      "Custom API rate limits",
      "White-label + custom branding",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Join Waitlist",
    ctaEnabled: true,
    ctaHref: "mailto:hello@andamio.io?subject=Waitlist",
    highlight: true,
  },
];

const platformTiers: Tier[] = [
  {
    name: "Starter",
    price: "Free",
    description: "Try the app",
    features: [
      "Unlimited courses & projects",
      "Andamio branding",
      "Community forum support",
      "Basic stats",
    ],
    cta: "Get Started →",
    ctaEnabled: true,
    ctaHref: EXTERNAL_LINKS.app,
    ctaVariant: "primary",
  },
  {
    name: "Pro",
    price: "$299",
    period: "/mo",
    description: "For growing organizations",
    features: [
      "Unlimited courses & projects",
      "Co-branded experience",
      "Email support (48hr)",
      "Usage analytics",
    ],
    cta: "Join Waitlist",
    ctaEnabled: true,
    ctaHref: "mailto:hello@andamio.io?subject=Waitlist",
  },
  {
    name: "Business",
    price: "$999",
    period: "/mo",
    description: "For organizations at scale",
    features: [
      "Unlimited courses & projects",
      "White-label + custom subdomain",
      "Priority support (24hr)",
      "SSO / SAML / OAuth",
      "Custom dashboards",
      "99.5% uptime SLA",
    ],
    cta: "Join Waitlist",
    ctaEnabled: true,
    ctaHref: "mailto:hello@andamio.io?subject=Waitlist",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored to your needs",
    features: [
      "Unlimited courses & projects",
      "Custom domain + landing page",
      "Dedicated account manager",
      "Custom implementation",
      "Data export + API access",
      "99.9% uptime SLA",
    ],
    cta: "Contact Sales",
    ctaEnabled: true,
    ctaHref: "mailto:hello@andamio.io",
    ctaVariant: "primary",
  },
];

type ProductTab = "api" | "platform";


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

export default function V2PricingSection() {
  const [activeTab, setActiveTab] = useState<ProductTab>("api");

  const tiers = activeTab === "api" ? apiTiers : platformTiers;

  return (
    <section id="pricing" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="text-center"
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
            PRICING
          </p>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Two products. One protocol.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted-foreground">
            Build with the API or use the hosted App. On-chain transaction
            fees and project commission are separate and apply to both.
          </p>

          {/* Product tab switcher */}
          <div className="mx-auto mb-12 inline-flex rounded-xl border border-border bg-muted/50 p-1.5">
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
              onClick={() => setActiveTab("platform")}
              className="relative rounded-lg px-6 py-3.5 text-sm font-semibold transition-colors"
            >
              {activeTab === "platform" && (
                <motion.div
                  layoutId="pricing-tab-indicator"
                  className="absolute inset-0 rounded-lg bg-primary shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 flex items-center justify-center gap-2 ${
                activeTab === "platform" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
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
                Andamio App
              </span>
              <span className={`relative z-10 mt-1 block text-xs font-normal ${
                activeTab === "platform" ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>
                For organizations
              </span>
            </button>
          </div>
        </motion.div>

        {/* Product description */}
        <motion.p
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground"
        >
          {activeTab === "api"
            ? "Usage-based pricing for developers building on the Andamio protocol. Bring your own frontend — pay for API access based on volume."
            : "Subscription-based pricing for organizations wanting turnkey credentialing. Hosted, branded, and managed for you via the Andamio App."}
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

        {/* Protocol costs note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="mt-12 rounded-xl border border-border border-l-4 border-l-primary bg-muted/30 p-6"
        >
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Protocol costs (apply to both products)
          </h3>
          <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <div>
              <p className="font-medium text-foreground">On-chain fees</p>
              <p>
                Transaction costs via sponsorship bundles (500–25,000 ADA).
                Unused ADA stays with you.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Project commission</p>
              <p>
                5% base rate on task rewards. Buy down to 0% with per-project
                NFT add-ons.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">
                Project activation
              </p>
              <p>
                ~150 ADA one-time fee to mint a Project NFT on-chain. Access
                tokens ~5 ADA per user.
              </p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
          >
            View full protocol costs →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
