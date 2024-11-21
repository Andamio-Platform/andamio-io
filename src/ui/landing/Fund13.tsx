import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const CatalystHero = () => {
  return (
    <section className="relative flex h-lvh w-full items-center justify-center bg-gradient-to-br from-primary to-secondary px-8 py-16 text-center md:px-12">
      <div className="max-w-4xl space-y-8">
        {/* Title */}
        <h1 className="text-5xl font-black uppercase text-white sm:text-6xl md:text-7xl">
          Vote for Andamio in Fund 13
        </h1>

        {/* Subtitle */}
        <p className="text-lg font-light text-white sm:text-xl">
          Support Andamio's mission to revolutionize education, contributor
          management, and blockchain innovation by voting in Fund 13 of Project
          Catalyst.
        </p>

        {/* Call to Action */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/fund/13">
            <Button className="rounded bg-white px-6 py-3 text-lg font-bold uppercase text-primary shadow-md transition-all duration-300 hover:bg-opacity-90">
              Explore Proposals
            </Button>
          </Link>
        </div>

        {/* Highlight */}
        <div className="flex items-center justify-center space-x-4 text-white">
          <CheckCircleIcon className="h-8 w-8 text-green-300" />
          <p className="text-sm font-medium uppercase">
            Every vote drives blockchain innovation forward
          </p>
        </div>
      </div>
    </section>
  );
};

export default CatalystHero;
