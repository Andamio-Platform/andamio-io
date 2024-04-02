import { NextPageContext } from "next";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import PageModuleIntroContent from "~/ui/studio/[coursecode]/[modulecode]/intro/PageModuleIntroContent";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

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

  if (isLoadingModule || isLoadingCourse) {
    return <LoadingCircle />;
  }

  if (course && courseModule) {
    return <PageModuleIntroContent course={course} module={courseModule} />;
  }

  return <div>error</div>
}

IntroductionStudioPage.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode } = ctx.query;

  return {
    courseCode: coursecode,
    moduleCode: modulecode,
  };
};
