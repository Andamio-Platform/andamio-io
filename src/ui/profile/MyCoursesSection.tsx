import { AssetExtended } from "@meshsdk/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import { api } from "~/utils/api";

export default function MyCoursesSection({
  accessToken,
}: {
  accessToken: AssetExtended;
}) {
  if (!accessToken) return;

  const { data: courseEnrollments, isLoading: isLoadingCourseEnrollments } =
    api.learnerOnchain.getCoursesByTokenName.useQuery({
      tokenName: accessToken.unit.substring(62),
    });

  const { data: courseInfos, isLoading: isLoadingCourseInfo } =
    api.course.getCoursesByIds.useQuery(
      {
        courseIds: courseEnrollments ?? [""],
      },
      { enabled: !!courseEnrollments },
    );

  if (isLoadingCourseInfo || isLoadingCourseEnrollments) {
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col">
      <h1 className="">
        You are currently enrolled in these courses:
      </h1>

      {/* TO-DO: Query local state corresponding to the user's access token */}
      {courseInfos ? (
        <div>
          {courseInfos.map((c) => (
            <div
              key={c.id}
              className="my-5 rounded-md border border-foreground p-5"
            >
              <Link href={`/course/${c.courseCode}`}>
                <span className="hover:underline">{c.title}</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not registered with any courses on-chain</p>
      )}
      <p className="mb-1 mt-5 text-xs font-bold">
        Note: This dashboard only shows your on-chain course enrollment data. If you want to see off-chain data, look at My Learning Journey.
      </p>
      <Badge className="mt-1">Learn More about Andamio Data Policy</Badge>
    </div>
  );
}
