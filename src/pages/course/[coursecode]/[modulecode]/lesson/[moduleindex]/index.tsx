import { NextPageContext } from "next";
import PageCourseContent from "~/ui/course/[coursecode]/[modulecode]/lesson/[moduleindex]/PageCourseLessonContent";

export default function Page({
  courseCode,
  moduleCode,
  moduleIndex,
}: {
  courseCode: string;
  moduleCode: string;
  moduleIndex: string;
}) {
  return (
    <PageCourseContent
      courseCode={courseCode}
      moduleCode={moduleCode}
      moduleIndex={moduleIndex}
    />
  );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode, moduleindex } = ctx.query;
  return {
    courseCode: coursecode,
    moduleCode: modulecode,
    moduleIndex: moduleindex,
  };
};