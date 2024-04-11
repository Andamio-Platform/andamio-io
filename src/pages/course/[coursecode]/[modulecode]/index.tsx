import { NextPageContext } from "next";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import PageCourseIntroductionContent from "~/ui/course/[coursecode]/[modulecode]/introduction/PageCourseIntroductionContent";
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
    return <LoadingCircle />;
  }

  if (courseModule) {
    

    return (
      <PageCourseIntroductionContent
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
