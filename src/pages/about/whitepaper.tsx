import React from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Card } from "~/components/ui/card";

export default function WhitepaperPage() {
  return (
    <ModernPageLayout
      title="Andamio Whitepaper"
      description="Explore Andamio's vision for decentralized education and contribution management through blockchain-powered innovation."
      currentPage="about"
    >
      <div className="pb-20">
        {/* Whitepaper Highlights Section */}
        <section className="mb-16 space-y-12">
          <h2 className="text-left text-3xl font-bold text-white">
            Key Highlights
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Highlight 1 */}
            <Card className="group relative flex flex-col items-center overflow-hidden border border-white/20 bg-gray-800/50 p-6 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl">
              <div className="mb-4">
                <AcademicCapIcon className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-200 group-hover:text-blue-300">
                The Education Problem
              </h3>
              <p className="text-gray-300">
                Addressing gaps in skill-based education and practical
                learning through PBL frameworks.
              </p>
            </Card>
            
            {/* Highlight 2 */}
            <Card className="group relative flex flex-col items-center overflow-hidden border border-white/20 bg-gray-800/50 p-6 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl">
              <div className="mb-4">
                <BriefcaseIcon className="h-12 w-12 text-green-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-200 group-hover:text-green-300">
                The Organization Problem
              </h3>
              <p className="text-gray-300">
                Overcoming inefficiencies in onboarding, talent management,
                and secure collaboration.
              </p>
            </Card>

            {/* Highlight 3 */}
            <Card className="group relative flex flex-col items-center overflow-hidden border border-white/20 bg-gray-800/50 p-6 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl">
              <div className="mb-4">
                <EyeIcon className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-200 group-hover:text-purple-300">
                The Oracle Problem
              </h3>
              <p className="text-gray-300">
                Leveraging blockchain to ensure trust and transparency in
                data and credentials.
              </p>
            </Card>
          </div>
        </section>

        {/* Embedded Whitepaper */}
        <section className="mb-16 space-y-12">
          <h2 className="text-3xl font-bold text-white">
            Read the Full Whitepaper
          </h2>
          <div className="rounded-sm border border-white/20 bg-gray-800/50 shadow-xl backdrop-blur-sm">
            <iframe
              src="https://v2-embednotion.com/c39ff303c99841079a02e43dddc6815f"
              width="100%"
              height="800px"
              className="rounded-sm"
              title="Andamio Whitepaper"
            ></iframe>
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-sm border border-white/20 bg-gray-800/50 p-8 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white">
            Join the Andamio Community
          </h2>
          <p className="text-md mx-auto mt-4 max-w-4xl text-gray-300">
            Be part of the revolution in decentralized learning and
            contribution. Explore opportunities to collaborate and grow with
            Andamio.
          </p>
          <div className="mt-8">
            <Link href="https://app.andamio.io">
              <Button className="rounded-sm bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700">
                Open Andamio App
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </ModernPageLayout>
  );
}