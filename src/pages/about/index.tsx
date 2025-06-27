import { Card } from "~/components/ui/card";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import Link from "next/link";

export default function AboutPage() {
  return (
    <ModernPageLayout
      title="About Andamio"
      description="Learn about Andamio's vision, team, and technology, and explore how we're transforming the future of collaboration and learning."
      currentPage="about"
    >
      <div className="pb-20">
        {/* Main Content */}
        <div className="relative mb-16">
          <p className="mb-12 text-lg leading-relaxed text-gray-300">
            Andamio is a{" "}
            <strong className="text-white">
              Trust Protocol for Distributed Work
            </strong>{" "}
            that provides infrastructure for decentralized access control,
            credential issuance, contributor onboarding, and treasury
            management. We believe in enabling local participation that opens
            global opportunity.
          </p>

          {/* Mission Statement */}
          <div className="mb-16 rounded-sm border border-white/20 bg-gray-800/50 p-8 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-lg text-gray-300">
              To create trust networks that enable purpose-driven, collaborative
              work by providing the tools and infrastructure needed for
              distributed organizations to thrive.
            </p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Whitepaper Card */}
          <Link href="https://docs.andamio.io/docs/whitepaper">
            <Card className="group relative overflow-hidden border border-white/20 bg-gray-800/50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl">
              <div className="p-6">
                <div className="mb-4">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-blue-500/30 bg-blue-600/20">
                    <svg
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-blue-300">
                    Andamio Whitepaper
                  </h3>
                </div>
                <p className="mb-4 text-gray-300">
                  Dive into our whitepaper to explore the foundations of
                  Andamio's trust protocol and distributed work platform.
                </p>
                <div className="flex items-center gap-2 text-blue-400 transition-colors duration-200 group-hover:text-blue-300">
                  <span className="text-sm font-medium">Read More</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>

          {/* Our Team Card */}
          <Link href="/about/our-team">
            <Card className="group relative overflow-hidden border border-white/20 bg-gray-800/50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl">
              <div className="p-6">
                <div className="mb-4">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-green-500/30 bg-green-600/20">
                    <svg
                      className="h-6 w-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-green-300">
                    Our Team
                  </h3>
                </div>
                <p className="mb-4 text-gray-300">
                  Meet the people driving Andamio's vision, from product
                  developers to blockchain experts and community builders.
                </p>
                <div className="flex items-center gap-2 text-green-400 transition-colors duration-200 group-hover:text-green-300">
                  <span className="text-sm font-medium">Meet the Team</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>

          {/* Our Technology Card */}
          <Link href="/about/our-technology">
            <Card className="group relative overflow-hidden border border-white/20 bg-gray-800/50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl">
              <div className="p-6">
                <div className="mb-4">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-purple-500/30 bg-purple-600/20">
                    <svg
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-purple-300">
                    Our Technology
                  </h3>
                </div>
                <p className="mb-4 text-gray-300">
                  Discover how Andamio leverages blockchain and innovative tools
                  to revolutionize trust and contribution management.
                </p>
                <div className="flex items-center gap-2 text-purple-400 transition-colors duration-200 group-hover:text-purple-300">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </ModernPageLayout>
  );
}
