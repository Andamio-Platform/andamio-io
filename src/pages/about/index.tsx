import { Card } from "~/components/ui/card";
import MenuBar from "~/ui/landing/MenuBar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <VideoBackground>
        <MenuBar />
        <main className="px-6 py-16 lg:px-24">
          <section className="relative mx-auto w-full max-w-7xl">
            <h1 className="text-center text-5xl font-black uppercase text-primary sm:text-6xl md:text-7xl">
              About Andamio
            </h1>
            <p className="mx-auto mt-4 max-w-4xl text-center text-lg font-light text-muted-foreground">
              Learn about Andamio’s vision, team, and technology, and explore
              how we’re transforming the future of collaboration and learning.
            </p>

            {/* Navigation Section */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Whitepaper Card */}
              <Link href="/about/whitepaper" legacyBehavior>
                <Card className="flex flex-col items-start p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
                  <h3 className="text-xl font-bold text-primary">
                    Andamio Whitepaper
                  </h3>
                  <p className="mt-2 text-sm font-light text-foreground">
                    Dive into our whitepaper to explore the foundations of
                    Andamio’s learning and contribution platform.
                  </p>
                  <span className="mt-4 cursor-pointer text-sm font-medium text-primary hover:underline">
                    Read More →
                  </span>
                </Card>
              </Link>

              {/* Our Team Card */}
              <Link href="/about/our-team" legacyBehavior>
                <Card className="flex flex-col items-start p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
                  <h3 className="text-xl font-bold text-primary">Our Team</h3>
                  <p className="mt-2 text-sm font-light text-foreground">
                    Meet the people driving Andamio’s vision, from product
                    developers to blockchain experts.
                  </p>
                  <span className="mt-4 cursor-pointer text-sm font-medium text-primary hover:underline">
                    Meet the Team →
                  </span>
                </Card>
              </Link>

              {/* Our Technology Card */}
              <Link href="/about/our-technology" legacyBehavior>
                <Card className="flex flex-col items-start p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
                  <h3 className="text-xl font-bold text-primary">
                    Our Technology
                  </h3>
                  <p className="mt-2 text-sm font-light text-foreground">
                    Discover how Andamio leverages blockchain and innovative
                    tools to revolutionize contribution management.
                  </p>
                  <span className="mt-4 cursor-pointer text-sm font-medium text-primary hover:underline">
                    Learn More →
                  </span>
                </Card>
              </Link>
            </div>
          </section>
        </main>
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
