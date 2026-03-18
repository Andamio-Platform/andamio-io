"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "./motion-variants";

interface Partner {
  name: string;
  description: string;
  status: string;
  statusColor: string;
}

const partners: Partner[] = [
  {
    name: "Intersect",
    description: "Cardano ecosystem governance & contributor tracking",
    status: "Enterprise Trial (V2)",
    statusColor: "text-warning",
  },
  {
    name: "Toha Network",
    description: "Nature regeneration financing",
    status: "Planning Phase",
    statusColor: "text-warning",
  },
  {
    name: "Syngenta",
    description: "Agricultural supply chain credentials",
    status: "Active",
    statusColor: "text-success",
  },
];

const fadeInVariants = fadeIn();
const listVariants = staggerContainer(0.08);

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function V2PartnersSection() {
  return (
    <section id="partners" className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
        >
          <p className="mb-6 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
            WHO&apos;S BUILDING ON ANDAMIO
          </p>
          <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
            From governance to agriculture.{" "}
            <span className="text-muted-foreground">Room for more.</span>
          </h2>
        </motion.div>

        {/* Partner list */}
        <motion.div
          className="mx-auto max-w-3xl"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              className="flex items-center justify-between border-b border-border py-5"
            >
              <div>
                <span className="font-semibold text-foreground">
                  {partner.name}
                </span>
                <span className="ml-3 text-muted-foreground">
                  {partner.description}
                </span>
              </div>
              <span className={`shrink-0 text-sm font-medium ${partner.statusColor}`}>
                {partner.status}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/use-cases"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all use cases &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
