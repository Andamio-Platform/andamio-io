import { Button } from "~/components/ui/button";
import Link from "next/link";

// Define the type for the props
interface JoinAndamioProps {
  role: "learner" | "organization";
}

export function JoinAndamio({ role }: JoinAndamioProps) {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Headline */}
        <h2 className="mb-6 text-4xl font-extrabold text-primary">
          Join the Future of Work
        </h2>

        {/* Subheadline */}
        <p className="mx-auto mb-12 max-w-3xl text-lg font-light text-foreground">
          Andamio connects talent and work like never before, whether you're a
          contributor or an organization.
        </p>

        {/* Conditional CTAs */}
        <div className="flex flex-col justify-center gap-8 md:flex-row">
          {/* Conditionally Render Button Based on Role */}
          {/* For Organizations */}
          {role === "organization" ? (
            <div>
              <Link href="/get-started-organization">
                <Button className="bg-primary px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-opacity-90">
                  Get Started Today
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/get-started-contributor">
                <Button className="text-md hover:borderborder-primary font-montserrat rounded bg-primary px-6 py-3 font-semibold  uppercase text-white transition-all duration-300 hover:border-2 hover:border-primary hover:bg-white hover:text-primary  ">
                  Start Learning and Earning Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
