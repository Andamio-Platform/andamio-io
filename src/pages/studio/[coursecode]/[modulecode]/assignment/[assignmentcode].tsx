import { NextPageContext } from "next";
import useAssignment from "~/hooks/useAssignment";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import PageCourseAssignmentContent from "~/ui/studio/[coursecode]/[modulecode]/assignment/[assignmentcode]/PageCourseAssignmentContent";
import LoadingContentEditor from "~/ui/studio/components/ContentEditor/ui/LoadingContentEditor";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";

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
    const { assignment, isLoadingAssignment } = useAssignment(
      courseCode,
      moduleCode,
    );
    const { course, isLoadingCourse } = useCourseByOwner(courseCode);
    const { courseModule, isLoadingModule } = useModuleByCourse(
      courseCode,
      moduleCode,
    );

    if (isLoadingAssignment || isLoadingCourse || isLoadingModule) {
      return (
        <div className="flex min-h-screen w-full content-center items-center justify-center">
          <LoadingContentEditor>Loading Assignment Editor</LoadingContentEditor>
        </div>
      );
    }

    // Todo: Extract one component for these, add some style, and improve with interactions.
    if (!course) {
      return (
        <StudioLayout>
          <h1>This Course does not exist. Want to build it?</h1>
        </StudioLayout>
      );
    }
    if (!courseModule) {
      return (
        <StudioLayout>
          <h1>
            There is no Course Module with that Module Code in this Course. Want
            to create it?
          </h1>
        </StudioLayout>
      );
    }
    if (!assignment) {
      return (
        <StudioLayout>
          <h1>This Assignment does not exist. What to create it?</h1>
        </StudioLayout>
      );
    }

    return (
      <PageCourseAssignmentContent
        course={course}
        courseModule={courseModule}
        assignment={assignment}
      />
    );
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
