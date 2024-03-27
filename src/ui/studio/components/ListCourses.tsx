import { api } from "~/utils/api";
import Loading from "~/components/loading";
import CourseButtonCard from "./course/CourseButtonCard";
import { useSession } from "next-auth/react";
import { Card } from "~/components/ui/card";

export default function ListCourses() {
  const { data: sessionData } = useSession();

  // Here is leftover useQuery :)
  const { data: courses, isLoading } = api.course.getCoursesByOwner.useQuery(
    undefined,
    { enabled: sessionData != null },
  );

  return (
    <>
      {courses === undefined && isLoading && <div className="flex min-h-[90vh] items-center"><Loading /></div>}
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
            <Card className="min-h-[200px] border border-foreground bg-background px-5 py-3 text-foreground hover:bg-secondary hover:text-secondary-foreground">
              <p>No courses yet, want to make one? (todo - replace with illustrative picture)</p>
            </Card>
          )}
        </>
      )}
    </>
  );
}
