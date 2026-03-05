import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";

const useCases = [
  {
    title: "Decentralized Innovation Fund",
    description:
      "Certify reviewers, build their reputation, and ensure high-quality assessments within your community.",
    href: "/use-cases/CatalystReviewers",
    domain: "Governance",
  },
  {
    title: "Decentralized Innovation",
    description:
      "Certify reviewers, build their reputation, and ensure high-quality assessments.",
    href: "/use-cases/DecentralizedInnovation",
    domain: "Innovation",
  },
  {
    title: "Fan Engagement",
    description:
      "Empower contributors to promote your sports team on social media, build fan loyalty, and grow your audience.",
    href: "/use-cases/FanEngagement",
    domain: "Sports & Media",
  },
  {
    title: "Lead Generation",
    description:
      "Connect with certified lead generators to drive your business growth.",
    href: "/use-cases/LeadGenerator",
    domain: "Business Development",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function UseCasesIndex() {
  return (
    <V2PageLayout
      title="Use Cases"
      description="Explore how organizations use Andamio to manage credentials, coordinate contributors, and scale impact."
    >
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {useCases.map((uc) => (
          <motion.div key={uc.href} variants={cardVariants}>
            <Link
              href={uc.href}
              className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-8"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {uc.domain}
              </span>
              <h2 className="mb-2 mt-3 text-xl font-bold text-foreground group-hover:text-primary">
                {uc.title}
              </h2>
              <p className="text-muted-foreground">{uc.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </V2PageLayout>
  );
}
