import { NextPageContext } from "next";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import PageModuleIntroContent from "~/ui/studio/[coursecode]/[modulecode]/intro/PageModuleIntroContent";
import LoadingContentEditor from "~/ui/studio/components/ContentEditor/ui/LoadingContentEditor";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";

export default function IntroductionStudioPage({
  courseCode,
  moduleCode,
}: {
  courseCode: string;
  moduleCode: string;
}) {
  const { courseModule, isLoadingModule } = useModuleByCourse(
    courseCode,
    moduleCode,
  );
  const { course, isLoadingCourse } = useCourseByOwner(courseCode);

  if (isLoadingCourse || isLoadingModule) {
    return (
      <div className="flex min-h-screen w-full content-center items-center justify-center">
        <LoadingContentEditor>Loading Module Introduction</LoadingContentEditor>
      </div>
    );
  }

  // Todo: Extract one component for these, add some style, and improve with interactions.
  if (!course) {
    return (
      <StudioLayout>
        <h1>This Course does not exist. Want to build it?</h1>
      </StudioLayout>
    );
  }
  if (!courseModule) {
    return (
      <StudioLayout>
        <h1>
          There is no Course Module with that Module Code in this Course. Want
          to create it?
        </h1>
      </StudioLayout>
    );
  }

  return <PageModuleIntroContent course={course} courseModule={courseModule} />;
}

IntroductionStudioPage.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode } = ctx.query;

  return {
    courseCode: coursecode,
    moduleCode: modulecode,
  };
};
