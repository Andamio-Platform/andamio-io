import { useSession } from "next-auth/react";
import Link from "~/components/link";

export default function SectionStudio() {
  const { data: sessionData } = useSession();

  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8 min-h-[50vh]">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          from learning to contribution
        </h2>
        <p className="my-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Build a Course
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600 w-1/2 mx-auto">
          With Andamio Course Studio, you can create and create courses, write modules, and deploy lesson content.
        </p>
      </div>
      {sessionData && sessionData.user.creatorId && (
        <div className="my-24 flex items-center justify-center gap-x-6">
          <Link href={`/studio`}>
            <span className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Go to Course Studio
            </span>
          </Link>
          {/* <a href="#" className="text-sm font-semibold leading-6 text-foreground">
          Learn more <span aria-hidden="true">→</span>
        </a> */}
        </div>
      )}
    </div>
  );
}
