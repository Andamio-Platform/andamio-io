import { type NextPageContext } from "next";
import useCoursesByOwner from "~/hooks/course/useCoursesByOwner";
import useModuleByCourse from "~/hooks/course/useModuleByCourse";
import PageModuleIntroContent from "~/ui/studio/[coursecode]/[modulecode]/intro/PageModuleIntroContent";
import LoadingContentEditor from "~/ui/studio/components/ContentEditor/ui/LoadingContentEditor";

interface IntroductionStudioPageProps {
  courseCode: string;
  moduleCode: string;
}

const IntroductionStudioPage = ({
  courseCode,
  moduleCode,
}: IntroductionStudioPageProps) => {
  const { courseModule, isLoadingModule } = useModuleByCourse(
    courseCode,
    moduleCode,
  );
  const { course, isLoadingCourses } = useCoursesByOwner(courseCode);

  if (isLoadingCourses || isLoadingModule) {
    return (
      <div className="flex min-h-screen w-full content-center items-center justify-center">
        <LoadingContentEditor>Loading Module Introduction</LoadingContentEditor>
      </div>
    );
  }

  return (
    <>
      {!course ? (
        <CourseNotFoundMessage />
      ) : !courseModule ? (
        <ModuleNotFoundMessage />
      ) : (
        <PageModuleIntroContent course={course} courseModule={courseModule} />
      )}
    </>
  );
};

const CourseNotFoundMessage = () => (
  <h1>This Course does not exist. Want to build it?</h1>
);

const ModuleNotFoundMessage = () => (
  <h1>
    There is no Course Module with that Module Code in this Course. Want to
    create it?
  </h1>
);

IntroductionStudioPage.getInitialProps = async (
  ctx: NextPageContext,
): Promise<IntroductionStudioPageProps> => {
  const { coursecode, modulecode } = ctx.query;

  return {
    courseCode: coursecode as string,
    moduleCode: modulecode as string,
  };
};

export default IntroductionStudioPage;
