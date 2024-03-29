import { Assignment, Slt } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useAssignment from "~/hooks/useAssignment";
import useSLT from "~/hooks/useSLT";
import useValidateCreator from "~/hooks/useValidateCreator";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";

export default function PageCourseAssignmentContent({
  courseCode,
  moduleCode,
}: {
  courseCode: string;
  moduleCode: string;
}) {
  const { data: sessionData } = useSession();

  const { assignment, isLoadingAssignment } = useAssignment(
    courseCode,
    moduleCode,
  );

  const { isCreator } = useValidateCreator(
    sessionData,
    courseCode,
  );

  return (
    <CourseLayout>
      {assignment && assignment.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          <Page {...assignment} />
        </div>
      ) : assignment && !assignment.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Assignment is not Live!</AlertTitle>
            <AlertDescription>
              Learners will not be able to see this assignment.
            </AlertDescription>
          </Alert>
          {isCreator && <Page {...assignment} />}
        </div>
      ) : isLoadingAssignment ? (
        <Loading />
      ) : null}
    </CourseLayout>
  );
}

function Page(assignment: { slts: Slt[] } & Assignment) {
  const editor = new Editor({
    editable: false,
  });

  useEffect(() => {
    if (
      assignment &&
      assignment.contentJson &&
      typeof assignment.contentJson === "object"
    )
      editor.setContent(assignment.contentJson);
  }, [assignment]);

  return (
    <>
      <div>
        {assignment.slts.map((slt) => (
          <p
            key={slt.moduleIndex}
            className="text-base font-semibold leading-7 text-indigo-600"
          >
            {slt.moduleIndex} {slt.sltText}
          </p>
        ))}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {assignment.title}
        </h1>
        <p className="text-xl leading-8">{assignment.description}</p>
      </div>
      {assignment.contentJson && editor.render()}
    </>
  );
}
