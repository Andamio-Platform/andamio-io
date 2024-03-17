import { NextPageContext } from "next";
import { useState } from "react";
import useSLT from "~/hooks/useSLT";
import { ModuleSLT } from "~/types/db";
import PageCourseLessonContent from "~/ui/studio/[coursecode]/[modulecode]/lesson/[lessoncode]/PageCourseLessonContent";

export default function LessonStudioPage({
  courseCode,
  moduleCode,
  lessonCode,
}: {
  courseCode: string;
  moduleCode: string;
  lessonCode: string;
}) {
  const [lessonSLT, setLessonSLT] = useState<ModuleSLT | undefined>(undefined);

  if (lessonCode && typeof lessonCode == "string") {
    const sltIndex = parseInt(lessonCode.substring(3));
    const { slt, isLoading } = useSLT(courseCode, moduleCode, sltIndex);
    return (
      <>
        {slt ? (
          <>
            <PageCourseLessonContent
              courseCode={courseCode}
              moduleCode={moduleCode}
              lessonCode={lessonCode}
              slt={slt}
            />
          </>
        ) : (
          "no slt found"
        )}
      </>
    );
  } else return <div>We are not ready!</div>;
}

LessonStudioPage.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode, lessoncode } = ctx.query;

  return {
    courseCode: coursecode,
    moduleCode: modulecode,
    lessonCode: lessoncode,
  };
};
