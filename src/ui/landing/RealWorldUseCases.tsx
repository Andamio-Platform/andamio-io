import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardIcon,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import {
  ClipboardDocumentCheckIcon,
  BriefcaseIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";

export function RealWorldUseCases() {
  return (
    <section className="flex min-h-screen items-center justify-center py-16">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-8 text-center text-4xl font-black uppercase text-primary sm:text-5xl md:text-6xl">
          Explore Andamio Use Cases
        </h2>
        {/* Subheading or Description */}
        <p className="mb-8 text-center font-sans text-lg text-muted-foreground">
          Discover use cases for Andamio and how it can support your
          organization.
        </p>
        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Use Case 1: Catalyst Reviewers */}
          <Card className="flex flex-col items-center rounded-sm bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
            <CardIcon>
              <ClipboardDocumentCheckIcon
                className="h-16 w-16 text-secondary"
                aria-hidden="true"
              />
            </CardIcon>
            <CardHeader className="mt-4 text-xl font-bold text-primary">
              Decentralized Innovation
            </CardHeader>
            <CardContent>
              <p className="text-md mt-2 font-light text-foreground">
                Become a certified reviewer and earn by contributing to real
                projects.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/use-cases/DecentralizedInnovation" target="_blank">
                <Button className="text-md mt-4 rounded-sm bg-primary px-6 py-2 font-sans font-semibold uppercase text-white transition-all duration-300 hover:border-2 hover:border-primary hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Use Case 2: LeadgenDAO */}
          <Card className="flex flex-col items-center rounded-sm bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
            <CardIcon>
              <BriefcaseIcon
                className="h-16 w-16 text-secondary"
                aria-hidden="true"
              />
            </CardIcon>
            <CardHeader className="mt-4 text-xl font-bold text-primary">
              LeadgenDAO
            </CardHeader>
            <CardContent>
              <p className="text-md mt-2 font-light text-foreground">
                Learn lead generation, mentor others, and join a community of
                professionals.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/use-cases/LeadGenerator" target="_blank">
                <Button className="text-md mt-4 rounded-sm bg-primary px-6 py-2 font-sans font-semibold uppercase text-white transition-all duration-300 hover:border-2 hover:border-primary hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Use Case 3: Fan Engagement */}
          <Card className="flex flex-col items-center rounded-sm bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
            <CardIcon>
              <SpeakerWaveIcon
                className="h-16 w-16 text-secondary"
                aria-hidden="true"
              />
            </CardIcon>
            <CardHeader className="mt-4 text-xl font-bold text-primary">
              Fan Engagement
            </CardHeader>
            <CardContent>
              <p className="text-md mt-2 font-light text-foreground">
                Create and promote social media content for your favorite teams
                and earn rewards.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/use-cases/FanEngagement" target="_blank">
                <Button className="text-md mt-4 rounded-sm bg-primary px-6 py-2 font-sans font-semibold uppercase text-white transition-all duration-300 hover:border-2 hover:border-primary hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link href="mailto:hello@andamio.io" target="_blank">
            <Button className="text-md hover:borderborder-primary rounded-sm bg-primary px-6 py-3 font-sans font-semibold uppercase text-white transition-all duration-300 hover:border-2 hover:border-primary hover:bg-white hover:text-primary">
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
