import { NextPageContext } from "next";
import PageCourseContent from "~/ui/course/[coursecode]/[modulecode]/[contentcode]/PageCourseContent";

export default function Page({
  courseCode,
  moduleCode,
  lessonCode,
}: {
  courseCode: string;
  moduleCode: string;
  lessonCode: string;
}) {
  return (
    <PageCourseContent
      courseCode={courseCode}
      moduleCode={moduleCode}
      lessonCode={lessonCode}
    />
  );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode, lessoncode } = ctx.query;
  return {
    courseCode: coursecode,
    moduleCode: modulecode,
    lessonCode: lessoncode,
  };
};