import { NextPageContext } from "next";
import { useState } from "react";
import useSLT from "~/hooks/useSLT";
import { ModuleSLT } from "~/types/db";
import PageCourseLessonContent from "~/ui/studio/[coursecode]/[modulecode]/lesson/[moduleindex]/PageCourseLessonContent";

export default function LessonStudioPage({
  courseCode,
  moduleCode,
  moduleIndex,
}: {
  courseCode: string;
  moduleCode: string;
  moduleIndex: string;
}) {

  if (moduleIndex && typeof moduleIndex == "string") {
    const sltIndex = parseInt(moduleIndex);
    const { slt, isLoading } = useSLT(courseCode, moduleCode, sltIndex);
    return (
      <>
        {slt ? (
          <>
            <PageCourseLessonContent
              courseCode={courseCode}
              moduleCode={moduleCode}
              moduleIndex={sltIndex}
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
  const { coursecode, modulecode, moduleindex } = ctx.query;

  return {
    courseCode: coursecode,
    moduleCode: modulecode,
    moduleIndex: moduleindex,
  };
};
