import { NextPageContext } from "next";
import Loading from "~/components/loading";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import useSLT from "~/hooks/useSLT";
import PageCourseLessonContent from "~/ui/studio/[coursecode]/[modulecode]/lesson/[moduleindex]/PageCourseLessonContent";

export default function LessonStudioPage({
  courseCode,
  moduleCode,
  moduleIndex,
}: {
  courseCode: string;
  moduleCode: string;
  moduleIndex: string;
}) {
  if (moduleIndex && typeof moduleIndex == "string") {
    const sltIndex = parseInt(moduleIndex);
    const { slt, isLoadingSLT } = useSLT(courseCode, moduleCode, sltIndex);
    const { course, isLoadingCourse } = useCourseByOwner(courseCode);
    const { courseModule, isLoadingModule } = useModuleByCourse(
      courseCode,
      moduleCode,
    );

    return (
      <>
        {isLoadingSLT || isLoadingCourse || isLoadingModule ? (
          <div className="flex min-h-screen w-full content-center items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {slt && course && courseModule ? (
              <PageCourseLessonContent
                course={course}
                courseModule={courseModule}
                moduleIndex={sltIndex}
                slt={slt}
              />
            ) : (
              <div>
                Cannot load page content - todo: replace with error screen
              </div>
            )}
          </>
        )}
      </>
    );
  } else return <div>We are not ready!</div>;
}

LessonStudioPage.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode, moduleindex } = ctx.query;

  return {
    courseCode: coursecode,
    moduleCode: modulecode,
    moduleIndex: moduleindex,
  };
};
