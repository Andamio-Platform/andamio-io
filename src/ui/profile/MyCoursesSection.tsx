import { AssetExtended } from "@meshsdk/core";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import useLearnerNetworkStatus from "./hooks/useLearnerNetworkStatus";
import CourseStateDatum from "./CompletedAssignments";
import { DecodedTokenInfo } from "@andamiojs/datum-utils";

export default function MyCoursesSection({
  accessToken,
  alias,
  courses,
}: {
  accessToken: AssetExtended;
  alias: string;
  courses: DecodedTokenInfo[];
}) {
  if (!accessToken) return;

  const {
    courseInfos,
    courseEnrollments,
    isLoadingCourseEnrollments,
    isLoadingCourseInfos,
  } = useLearnerNetworkStatus(accessToken);

  if (isLoadingCourseInfos || isLoadingCourseEnrollments) {
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <Card className="mx-auto flex w-full flex-col">
      <CardHeader>
        <h1 className="text-2xl font-bold">Active Courses</h1>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(courseEnrollments, null, 2)}</pre>
        <p className="">You are currently enrolled in these courses:</p>
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
        {courses &&
          courses.length > 0 &&
          courses.map((course, i) => (
            <div className="bg-slate-400">
            { course.Minted &&

              <div className="break-all">
                {course.LsCs}
            </div>
            }
              <CourseStateDatum
                courseNftPolicy={course.LsCs}
                alias={alias}
                key={i}
              />
            </div>
          ))}
        <p className="my-5 text-xs font-bold">
          Note: This dashboard only shows your on-chain course enrollment data.
          If you want to see off-chain data, look at My Learning Journey.
        </p>
        <Badge className="mt-1">Learn More about Andamio Data Policy</Badge>
      </CardContent>
    </Card>
  );
}
