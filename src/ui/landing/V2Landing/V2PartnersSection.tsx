"use client";

import React from "react";
import { motion } from "framer-motion";

interface Partner {
  domain: string;
  name: string;
  quote: string;
  status: string;
  statusColor: string;
  integration: string;
  accentColor: string;
}

const partners: Partner[] = [
  {
    domain: "Governance",
    name: "Intersect",
    quote:
      "Governance treasury & contributor tracking for Cardano\u2019s ecosystem",
    status: "Enterprise Trial (V2)",
    statusColor: "text-warning",
    integration: "API Integration",
    accentColor: "border-l-primary",
  },
  {
    domain: "Nature Finance",
    name: "Toha Network",
    quote:
      "Nature regeneration financing \u2014 contributors earn MAHI tokens for verified environmental actions",
    status: "Planning Phase",
    statusColor: "text-warning",
    integration: "API Integration",
    accentColor: "border-l-success",
  },
  {
    domain: "Agriculture",
    name: "Syngenta",
    quote:
      "Agricultural supply chain credentials \u2014 1K entrepreneurs \u2192 100K farmers",
    status: "Active",
    statusColor: "text-success",
    integration: "API Integration",
    accentColor: "border-l-secondary",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function V2PartnersSection() {
  return (
    <section id="partners" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
            WHO&apos;S BUILDING ON ANDAMIO
          </p>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
            From governance to agriculture
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
            The diversity is the proof. Each partner validates a different use
            case.
          </p>
        </motion.div>

        {/* Partner cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={cardVariants}
              className={`rounded-xl border border-border border-l-4 ${partner.accentColor} bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-8`}
            >
              {/* Domain badge */}
              <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {partner.domain}
              </span>

              {/* Name */}
              <h3 className="mb-2 mt-3 text-xl font-bold text-foreground">
                {partner.name}
              </h3>

              {/* Quote */}
              <p className="mb-4 italic text-muted-foreground">
                &ldquo;{partner.quote}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${partner.statusColor}`}>
                  {partner.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  {partner.integration}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://docs.andamio.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Learn More &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
