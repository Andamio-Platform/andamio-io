import Link from "~/components/link";

export default function Hero() {
  return (
    <div className="relative pt-14 min-h-screen">

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
              Andamio Learning and Contribution Platform
            </h1>
            <p className="mt-6 text-lg leading-8 ">
              v0.1.0
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href={`/auth/signin`}>
                <span className="rounded-md bg-primary text-primary-foreground px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Get started
                </span>
              </Link>
              <a
                href="#"
                className="text-sm font-semibold leading-6 "
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
