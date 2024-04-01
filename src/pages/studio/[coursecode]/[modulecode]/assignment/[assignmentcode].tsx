import { NextPageContext } from "next";
import { useState } from "react";
import Loading from "~/components/loading";
import useAssignment from "~/hooks/useAssignment";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import useSLT from "~/hooks/useSLT";
import { ModuleSLT } from "~/types/db";
import PageCourseAssignmentContent from "~/ui/studio/[coursecode]/[modulecode]/assignment/[assignmentcode]/PageCourseAssignmentContent";
import PageCourseLessonContent from "~/ui/studio/[coursecode]/[modulecode]/lesson/[moduleindex]/PageCourseLessonContent";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

export default function AssignmentStudioPage({
  courseCode,
  moduleCode,
  assignmentCode,
}: {
  courseCode: string;
  moduleCode: string;
  assignmentCode: string;
}) {
  if (assignmentCode) {

    const { assignment, isLoadingAssignment } = useAssignment(courseCode, moduleCode);
    const { course, isLoadingCourse } = useCourseByOwner(courseCode);
    const { courseModule, isLoadingModule } = useModuleByCourse(
      courseCode,
      moduleCode,
    );

    console.log("check1", assignment)


    if (course && courseModule && assignment) {
      return (
        <PageCourseAssignmentContent
          course={course}
          module={courseModule}
          assignment={assignment}
        />
      );
    } else return <div>sorry! {assignmentCode}</div>;
  }
}

AssignmentStudioPage.getInitialProps = async (ctx: NextPageContext) => {
  const { coursecode, modulecode, assignmentcode } = ctx.query;

  return {
    courseCode: coursecode,
    moduleCode: modulecode,
    assignmentCode: assignmentcode,
  };
};
