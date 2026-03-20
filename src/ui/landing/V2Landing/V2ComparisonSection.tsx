"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeatureRow {
  feature: string;
  detail: string;
}

const featureData: FeatureRow[] = [
  {
    feature: "Ownership",
    detail: "Credentials belong to the recipient. Portable across every app on the protocol.",
  },
  {
    feature: "Accessibility",
    detail: "No per-user licensing. Start building without upfront commitments.",
  },
  {
    feature: "Privacy",
    detail: "Personal data stays off-chain. Only credential proofs are recorded.",
  },
  {
    feature: "Wallets",
    detail: "Users don\u2019t need one. Organizations sponsor transactions. Blockchain is invisible.",
  },
  {
    feature: "Durability",
    detail: "Credentials survive on Cardano mainnet regardless of any single platform. Open source.",
  },
  {
    feature: "Integration",
    detail: "REST API. Add credentials to your existing app without learning Cardano.",
  },
];

export default function V2ComparisonSection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Section divider */}
      <div className="absolute left-1/2 top-0 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <p className="mb-6 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
          WHY ANDAMIO
        </p>
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          What you get.{" "}
          <span className="text-muted-foreground">Why it matters.</span>
        </h2>

        {/* Feature table */}
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {featureData.map((row) => (
                <tr key={row.feature} className="border-t border-border first:border-t-0">
                  <td className="px-6 py-4 font-medium text-foreground w-1/4">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
