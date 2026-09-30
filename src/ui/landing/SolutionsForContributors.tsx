import React, { type FC } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { motion } from "motion/react";
import {
  AcademicCapIcon,
  CreditCardIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

interface BenefitProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const Benefit: FC<BenefitProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 p-4 text-center md:flex-row md:items-start md:text-left"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Icon className="h-12 w-12 text-secondary" />
      <div>
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        <p className="text-md font-light text-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export const SolutionsForContributors: FC = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center py-16">
      {/* Main Heading */}
      <div className="w-full px-4 pb-4 text-center">
        <h2 className="text-4xl font-black uppercase text-primary sm:text-5xl md:text-6xl">
          Unlock Work Opportunities
        </h2>
        <p className="mt-4 text-lg font-light text-foreground">
          Develop skills, find work, and build a lasting reputation in a global
          marketplace.
        </p>
      </div>

      {/* Benefits */}
      <div className="mt-8 flex w-full max-w-7xl flex-col items-center gap-8 px-4 md:flex-row md:justify-center">
        <Benefit
          icon={AcademicCapIcon}
          title="Verified Credentials"
          description="Showcase verifiable skills trusted and visible on the blockchain."
        />
        <Benefit
          icon={RocketLaunchIcon}
          title="Instant Opportunities"
          description="Apply your skills to paid tasks immediately after training."
        />
        <Benefit
          icon={CreditCardIcon}
          title="Fast Payments"
          description="Receive instant, secure payments via smart contracts."
        />
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <Link href="/get-started">
          <Button className="text-md hover:borderborder-primary rounded-sm bg-primary px-6 py-3 font-sans font-semibold uppercase text-white transition-all duration-300 hover:border-2 hover:border-primary hover:bg-white hover:text-primary">
            Build Your Reputation Today
          </Button>
        </Link>
      </div>
    </section>
  );
};
