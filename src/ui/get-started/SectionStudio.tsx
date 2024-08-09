import { useSession } from "next-auth/react";
import Link from "~/components/link";

const pageCopy = [
  "With Andamio Course Studio, you can create courses, write modules, and deploy lesson content that grows your community and engages contributors.",
  "If you want to build a course on Andamio we would like to hear from you. To learn how to get in touch, please follow the steps below.",
];

export default function SectionStudio() {
  const { data: sessionData } = useSession();

  return (
    <div className="mx-auto  max-w-7xl px-6  lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="teacking-tight my-5 text-3xl font-bold text-primary-foreground sm:text-4xl">
          Want to create a course?
        </h2>

        {pageCopy.map((pc, i) => (
          <p
            key={i}
            className="prose mx-auto w-5/6 text-left text-lg leading-8 text-primary-foreground"
          >
            {pc}
          </p>
        ))}
      </div>
      {sessionData?.user.creatorId && (
        <div className="my-24 flex items-center justify-center gap-x-6">
          <Link href={`/studio`}>
            <span className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Enter Andamio Course Studio
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
