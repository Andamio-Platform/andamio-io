import React from "react";
import MenuBar from "~/ui/landing/MenuBar";
import Footer from "~/ui/landing/Footer";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardIcon,
  CardHeader,
  CardContent,
} from "~/components/ui/card";

export default function WhitepaperPage() {
  return (
    <>
      <VideoBackground>
        <MenuBar />
        <main className="px-6 py-16 lg:px-24">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h1 className="text-5xl font-black uppercase text-primary sm:text-6xl md:text-7xl">
              Andamio Whitepaper
            </h1>
            <p className="mx-auto mt-4 max-w-4xl text-lg font-light text-muted-foreground">
              Explore Andamio’s vision for decentralized education and
              contribution management through blockchain-powered innovation.
            </p>
          </section>

          {/* Whitepaper Highlights Section */}
          <section className="mx-auto mb-16 max-w-7xl space-y-12 rounded-lg p-8">
            <h2 className="text-center text-3xl font-bold uppercase text-primary">
              Key Highlights
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Highlight 1 */}
              <Card className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
                <CardIcon>
                  <AcademicCapIcon className="mb-4 h-12 w-12 text-secondary" />
                </CardIcon>
                <CardHeader className="mt-4 text-xl font-bold text-primary">
                  The Education Problem
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-light text-muted-foreground">
                    Addressing gaps in skill-based education and practical
                    learning through PBL frameworks.
                  </p>
                </CardContent>
              </Card>
              {/* Highlight 2 */}
              <Card className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
                <CardIcon>
                  <BriefcaseIcon className="mb-4 h-12 w-12 text-secondary" />
                </CardIcon>
                <CardHeader className="mt-4 text-xl font-bold text-primary">
                  The Organization Problem
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-light text-muted-foreground">
                    Overcoming inefficiencies in onboarding, talent management,
                    and secure collaboration.
                  </p>
                </CardContent>
              </Card>

              {/* Highlight 3 */}
              <Card className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
                <CardIcon>
                  <EyeIcon className="mb-4 h-12 w-12 text-secondary" />
                </CardIcon>
                <CardHeader className="mt-4 text-xl font-bold text-primary">
                  The Oracle Problem
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-light text-muted-foreground">
                    Leveraging blockchain to ensure trust and transparency in
                    data and credentials.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Embedded Whitepaper */}
          <section className="mx-auto mb-16 max-w-7xl space-y-12">
            <h2 className="text-3xl font-bold uppercase text-primary">
              Read the Full Whitepaper
            </h2>
            <div className="rounded-lg bg-white shadow-lg">
              <iframe
                src="https://v2-embednotion.com/c39ff303c99841079a02e43dddc6815f"
                width="100%"
                height="800px"
                className="rounded-lg"
                title="Andamio Whitepaper"
              ></iframe>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold uppercase text-primary">
              Join the Andamio Community
            </h2>
            <p className="text-md mx-auto mt-4 max-w-4xl font-light text-muted-foreground">
              Be part of the revolution in decentralized learning and
              contribution. Explore opportunities to collaborate and grow with
              Andamio.
            </p>
            <div className="mt-8">
              <Link href="https://app.andamio.io">
                <Button className="rounded bg-primary px-8 py-4 text-lg font-semibold uppercase text-white shadow-md hover:bg-primary/90">
                  Open Andamio App
                </Button>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </VideoBackground>
    </>
  );
}

const VideoBackground = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen">
    <div className="fixed left-0 top-0 h-full w-full overflow-hidden opacity-70">
      <video
        className="min-h-screen min-w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/bg-video-002.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);
