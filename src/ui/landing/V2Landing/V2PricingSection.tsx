"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface Tier {
  name: string;
  price: string;
  period?: string;
  annual?: string;
  features: string[];
  cta: string;
  ctaEnabled: boolean;
  highlight?: boolean;
}

const tiers: Tier[] = [
  {
    name: "A La Carte",
    price: "Free",
    features: [
      "1K API calls/month",
      "10 calls/min rate limit",
      "Community support",
    ],
    cta: "Start Free →",
    ctaEnabled: true,
  },
  {
    name: "Developer",
    price: "$500",
    period: "/mo",
    annual: "$5,400/yr",
    features: [
      "11K API calls/month",
      "100 calls/min",
      "Early access features",
    ],
    cta: "Coming Soon",
    ctaEnabled: false,
  },
  {
    name: "Growth",
    price: "$1,500",
    period: "/mo",
    annual: "$16,200/yr",
    features: [
      "45K API calls/month",
      "500 calls/min",
      "Priority support",
    ],
    cta: "Coming Soon",
    ctaEnabled: false,
  },
  {
    name: "Enterprise",
    price: "$2,500",
    period: "/mo",
    annual: "$26,000/yr",
    features: [
      "85K API calls/month",
      "1K calls/min",
      "Custom branding & URL",
      "Analytics dashboard",
    ],
    cta: "Coming Soon",
    ctaEnabled: false,
    highlight: true,
  },
];


function CheckIcon() {
  return (
    <span className="mt-0.5 text-success">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 8.5 6.5 12 13 4" />
      </svg>
    </span>
  );
}

export default function V2PricingSection() {
  return (
    <section id="pricing" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center"
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
            PRICING
          </p>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
            Pay for API calls. On-chain transaction fees are separate and
            deterministic.
          </p>
        </motion.div>

        {/* Tier cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              className={`flex flex-col rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                tier.highlight
                  ? "border-primary/30 bg-primary/5 hover:border-primary/40"
                  : "border-border bg-card hover:border-primary/20"
              }`}
              variants={fadeIn}
            >
              <p className="text-lg font-bold text-foreground">{tier.name}</p>
              <p className="mb-1 mt-2 text-3xl font-bold text-foreground">
                {tier.price}
                {tier.period && (
                  <span className="text-base font-normal text-muted-foreground">
                    {tier.period}
                  </span>
                )}
              </p>
              {tier.annual && (
                <p className="text-xs text-muted-foreground">{tier.annual}</p>
              )}
              <div className="my-4 border-t border-border" />
              <ul className="flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                {tier.ctaEnabled ? (
                  <button className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                    {tier.cta}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full cursor-not-allowed rounded-md border border-border py-2.5 text-sm font-medium text-muted-foreground opacity-60"
                  >
                    {tier.cta}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
