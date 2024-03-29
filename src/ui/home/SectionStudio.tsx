import Link from "~/components/link";

export default function SectionStudio() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          Start creating a new course
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          The platform to create and manage courses
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Access Andamio Studio to create and manage courses, modules, and
          content.
        </p>
      </div>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href={`/studio`}>
          <span className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-background shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Go to Studio (Hide this for non-Creators)
          </span>
        </Link>
        {/* <a href="#" className="text-sm font-semibold leading-6 text-foreground">
          Learn more <span aria-hidden="true">→</span>
        </a> */}
      </div>
    </div>
  );
}
