import { NextPageContext } from "next";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import PageCourseAssignmentContent from "~/ui/course/[coursecode]/[modulecode]/assignment/[assignmentcode]/PageCourseAssignmentContent";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

export default function Page({
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

  if (isLoadingModule) {
    <LoadingCircle />;
  }

  if (courseModule) {
    return (
      <PageCourseAssignmentContent
        courseCode={courseCode}
        courseModule={courseModule}
      />
    );
  }
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode } = ctx.query;
  return {
    courseCode: coursecode,
    moduleCode: modulecode,
  };
};
