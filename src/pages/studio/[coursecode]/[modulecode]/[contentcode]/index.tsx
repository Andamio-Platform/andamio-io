import { NextPageContext } from "next";
import PageCourseContent from "~/ui/studio/[coursecode]/[modulecode]/[contentcode]/PageCourseContent";

export default function Page({
  courseCode,
  moduleCode,
  contentCode,
}: {
  courseCode: string;
  moduleCode: string;
  contentCode: string;
}) {
  return (
    <PageCourseContent
      courseCode={courseCode}
      moduleCode={moduleCode}
      contentCode={contentCode}
    />
  );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode, contentcode } = ctx.query;
  return {
    courseCode: coursecode,
    moduleCode: modulecode,
    contentCode: contentcode,
  };
};
