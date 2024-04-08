import { NextPageContext } from "next";
import useAssignmentByCourseModule from "~/hooks/useAssignmentByCourseModule";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import PageCourseAssignmentContent from "~/ui/studio/[coursecode]/[modulecode]/assignment/[assignmentcode]/PageCourseAssignmentContent";

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

    const { assignment, isLoadingAssignment } = useAssignmentByCourseModule(courseCode, moduleCode);
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
