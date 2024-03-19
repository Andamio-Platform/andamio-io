import { api } from "~/utils/api";
import Text from "~/components/typography/text";
import MiddleScreen from "~/components/middle-screen";
import Loading from "~/components/loading";
import CourseButtonCard from "./CourseButtonCard";
import { useSession } from "next-auth/react";

export default function ListCourses() {
  const { data: sessionData } = useSession();

  // Here is leftover useQuery :)
  const { data: courses, isLoading } = api.course.getCoursesByOwner.useQuery(
    undefined,
    { enabled: sessionData != null },
  );

  return (
    <>
      {courses === undefined && isLoading && <Loading />}
      {courses && (
        <>
          {courses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <MiddleScreen>
              <Text>No courses (to be replaced with illustrative picture)</Text>
            </MiddleScreen>
          )}
        </>
      )}
    </>
  );
}
