import { NextPageContext } from "next";
import PageCourseAssignmentContent from "~/ui/course/[coursecode]/[modulecode]/assignment/[assignmentcode]/PageCourseAssignmentContent";

export default function Page({
  courseCode,
  moduleCode,
}: {
  courseCode: string;
  moduleCode: string;
}) {
  return (
    <PageCourseAssignmentContent
      courseCode={courseCode}
      moduleCode={moduleCode}
    />
  );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode } = ctx.query;
  return {
    courseCode: coursecode,
    moduleCode: modulecode,
  };
};
