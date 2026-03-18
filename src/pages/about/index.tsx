import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";
import { fadeIn as fadeInFactory, staggerContainer } from "~/ui/landing/V2Landing/motion-variants";
import { EXTERNAL_LINKS } from "~/lib/external-links";

const fadeIn = fadeInFactory();
const containerVariants = staggerContainer(0.08);
const cardVariants = fadeInFactory();

const teamMembers = [
  {
    name: "James Dunseith",
    role: "Co-founder",
    focus: "Learning design, developer experience, strategy",
    image: "/images/team/james.webp",
  },
  {
    name: "Yoram Ben Zvi",
    role: "Co-founder",
    focus: "Business models, partnerships, sustainability",
    image: "/images/team/yoram.jpeg",
  },
  {
    name: "Adrian Hüetter",
    role: "Smart Contract Developer",
    focus: "Plutus, protocol design, open source",
    image: "/images/team/adrian.webp",
  },
  {
    name: "HongJing (Jingles) K",
    role: "Developer",
    focus: "Full-stack, analytics, user experience",
    image: "/images/team/jingles.webp",
  },
  {
    name: "Nelson Kshetrimayum",
    role: "Developer",
    focus: "Full-stack, Cardano integration",
    image: "/images/team/nelson.webp",
  },
  {
    name: "Roberto Mayen",
    role: "Product Manager",
    focus: "Product strategy, design systems",
    image: "/images/team/rmh.webp",
  },
  {
    name: "M. Ali Modiri",
    role: "Smart Contract Developer",
    focus: "Plutus, security, CIP authorship",
    image: "/images/team/mix.webp",
  },
  {
    name: "Nori Nishigaya",
    role: "Infrastructure",
    focus: "DevOps, governance, systems architecture",
    image: "/images/team/nori.jpeg",
  },
  {
    name: "Sebastian Pabon",
    role: "Ecosystem Lead",
    focus: "Education, facilitation, open source",
    image: "/images/team/sebastian.png",
  },
];

export default function AboutPage() {
  return (
    <V2PageLayout
      title="About Andamio"
      description="An open protocol for interoperable credentials, built on Cardano."
    >
      {/* Mission — one paragraph, no card */}
      <motion.section
        className="mb-20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Andamio gives organizations the infrastructure to issue credentials,
          gate content, and manage contributions — all anchored on-chain.
          Recipients own their credentials. Developers integrate via REST API.
          The blockchain is invisible to end users.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={EXTERNAL_LINKS.docsWhitepaper}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Read the Whitepaper &rarr;
          </a>
        </div>
      </motion.section>

      {/* Team */}
      <section id="team" className="mb-20 scroll-mt-24">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
            TEAM
          </p>
          <h2 className="mb-12 text-3xl font-bold text-foreground sm:text-4xl">
            The people building Andamio.
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className="flex items-start gap-4 bg-card p-6"
              variants={cardVariants}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted">
                {member.image && (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {member.role}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join */}
        <motion.div
          className="mt-8 flex items-center justify-between rounded-lg border border-border p-6"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h3 className="font-semibold text-foreground">Work with us</h3>
            <p className="text-sm text-muted-foreground">
              We're always looking for builders.
            </p>
          </div>
          <a
            href="mailto:hello@andamio.io"
            className="inline-flex shrink-0 items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            Get in Touch &rarr;
          </a>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link
          href={EXTERNAL_LINKS.docs}
          className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Read the Docs &rarr;
        </Link>
        <Link
          href="/use-cases"
          className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
        >
          View Use Cases
        </Link>
      </motion.div>
    </V2PageLayout>
  );
}
