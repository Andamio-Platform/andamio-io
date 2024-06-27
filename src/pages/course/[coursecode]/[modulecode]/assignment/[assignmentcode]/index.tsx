import { NextPageContext } from "next";
import useModuleByCourse from "~/hooks/course/useModuleByCourse";
import PageCourseAssignmentContent from "~/ui/course/[coursecode]/[modulecode]/assignment/[assignmentcode]/PageCourseAssignmentContent";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

export default function Page({
  courseCode,
  moduleCode,
  assignmentCode,
}: {
  courseCode: string;
  moduleCode: string;
  assignmentCode: string;
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
        assignmentCode={assignmentCode}
      />
    );
  }
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode, assignmentcode } = ctx.query;
  return {
    courseCode: coursecode,
    moduleCode: modulecode,
    assignmentCode: assignmentcode,
  };
};
