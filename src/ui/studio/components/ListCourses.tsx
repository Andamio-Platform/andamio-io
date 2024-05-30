import { api } from "~/utils/api";
import Loading from "~/components/loading";
import CourseButtonCard from "./course/CourseButtonCard";
import { useSession } from "next-auth/react";
import { Card } from "~/components/ui/card";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function ListCourses() {
  const { data: sessionData } = useSession();

  // Here is leftover useQuery :)
  const { data: courses, isLoading } = api.course.getCoursesByOwner.useQuery(
    undefined,
    { enabled: sessionData != null },
  );

  return (
    <>
      {courses === undefined && isLoading && (
        <div className="flex min-h-[90vh] items-center">
          <Loading />
        </div>
      )}
      {courses && (
        <>
          {courses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => {
                return (
                  <CourseButtonCard
                    key={course.id}
                    course={course}
                    link={`/studio/${course.courseCode}`}
                  />
                );
              })}
            </div>
          ) : (
            <Card intent="default" size="default">
              <h1 className="pb-5 text-2xl font-bold">
                You do not have any courses yet
              </h1>
              <p className="pb-5">
                To build courses in Andamio, you must first complete the{" "}
                <Link href="/course/andamio101">
                  <span className="link">Andamio 101 Course</span>.
                </Link>
              </p>
              <Link href="/course/andamio101">
                <Button>Get Started</Button>
              </Link>
            </Card>
          )}
        </>
      )}
    </>
  );
}
