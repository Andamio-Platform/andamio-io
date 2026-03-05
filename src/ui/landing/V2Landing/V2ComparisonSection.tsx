"use client";

import React from "react";
import { motion } from "framer-motion";

interface ComparisonRow {
  feature: string;
  credly: string;
  ethereum: string;
  andamio: string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Ownership",
    credly: "Platform-locked",
    ethereum: "Portable",
    andamio: "Owned by the recipient",
  },
  {
    feature: "Cost per credential",
    credly: "$5\u201350/user/month",
    ethereum: "~$25 gas",
    andamio: "~$0.17*",
  },
  {
    feature: "At 100K credentials",
    credly: "$6M\u201360M/year",
    ethereum: "$2.5M gas",
    andamio: "~$17K*",
  },
  {
    feature: "Privacy",
    credly: "Platform-controlled",
    ethereum: "Public by default",
    andamio: "Private by design",
  },
  {
    feature: "User experience",
    credly: "Web2",
    ethereum: "Web3 friction",
    andamio: "Web2 UX, Web3 trust",
  },
  {
    feature: "Blockchain required?",
    credly: "No blockchain",
    ethereum: "Yes (user pays)",
    andamio: "Invisible (org sponsors)",
  },
];

const competitors = [
  { key: "credly" as const, label: "Credly / Accredible" },
  { key: "ethereum" as const, label: "Ethereum" },
  { key: "andamio" as const, label: "Andamio (Cardano)" },
];

export default function V2ComparisonSection() {
  return (
    <section className="relative bg-muted/30 py-16 sm:py-24 overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
          WHY ANDAMIO
        </p>
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          Your credentials. Your terms.{" "}
          <span className="text-muted-foreground">Not a vendor&rsquo;s.</span>
        </h2>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-border md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  &nbsp;
                </th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  Credly / Accredible
                </th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  Ethereum
                </th>
                <th className="bg-primary/5 px-6 py-4 text-left font-semibold text-foreground">
                  Andamio (Cardano)
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr key={row.feature} className="border-t border-border">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {row.credly}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {row.ethereum}
                  </td>
                  <td className="bg-primary/5 px-6 py-4 font-semibold text-foreground">
                    {row.andamio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 hidden text-xs italic text-muted-foreground md:block">
          *Approximate. Actual costs depend on transaction complexity and network conditions.
        </p>

        {/* Mobile stacked cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {comparisonData.map((row) => (
            <div
              key={row.feature}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {row.feature}
              </h3>
              <dl className="space-y-2">
                {competitors.map((comp) => (
                  <div key={comp.key} className="flex justify-between gap-4">
                    <dt className="text-sm text-muted-foreground">
                      {comp.label}
                    </dt>
                    <dd
                      className={`text-right text-sm ${
                        comp.key === "andamio"
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {row[comp.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground md:hidden">
          *Approximate. Actual costs depend on transaction complexity and network conditions.
        </p>
      </motion.div>
    </section>
  );
}
