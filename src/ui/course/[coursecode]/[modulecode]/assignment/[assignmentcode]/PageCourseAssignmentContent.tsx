import { Assignment, Slt } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useAssignmentByCourseModule from "~/hooks/useAssignmentByCourseModule";
import useValidateCreator from "~/hooks/useValidateCreator";
import { AssignmentCommitment, Module } from "~/types/db";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import CommitToAssignmentPage from "./CommitToAssignmentPage";
import ModuleLayout from "~/ui/course/components/layout/ModuleLayout";
import SltList from "~/ui/studio/components/assignment-dashboard/slt-list";
import DialogAssignmentCommitment from "~/ui/course/components/dialogs/DialogAssignmentCommitment";
import { useEffect, useState } from "react";

export default function PageCourseAssignmentContent({
  courseCode,
  courseModule,
}: {
  courseCode: string;
  courseModule: Module;
}) {
  const { data: sessionData } = useSession();

  // const assignmentCommitments = sessionData?.u

  const { assignment, isLoadingAssignment } = useAssignmentByCourseModule(
    courseCode,
    courseModule.moduleCode,
  );

  const { isCreator } = useValidateCreator(sessionData, courseCode);

  return (
    <CourseLayout>
      <ModuleLayout courseCode={courseCode} courseModule={courseModule}>
        {assignment && assignment.live ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
            <Page courseModule={courseModule} assignment={assignment} />
          </div>
        ) : assignment && !assignment.live ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Assignment is not Live!</AlertTitle>
              <AlertDescription>
                Learners will not be able to see this assignment.
              </AlertDescription>
            </Alert>
            {isCreator && (
              <Page courseModule={courseModule} assignment={assignment} />
            )}
          </div>
        ) : isLoadingAssignment ? (
          <Loading />
        ) : null}
      </ModuleLayout>
    </CourseLayout>
  );
}

function Page({
  assignment,
  courseModule,
}: {
  assignment: { slts: Slt[] } & Assignment;
  courseModule: Module;
}) {
  const { data: sessionData } = useSession();
  const [currentCommitment, setCurrentCommitment] = useState<
    AssignmentCommitment | undefined
  >(undefined);

  useEffect(() => {
    if (sessionData) {
      const currentCommitment = sessionData?.user.assignmentCommitments.find(
        (a) => a.assignmentId === assignment.id,
      );
      setCurrentCommitment(currentCommitment);
    }
  }, [sessionData]);

  const editor = new Editor({
    editable: false,
  });

  if (
    assignment &&
    assignment.contentJson &&
    typeof assignment.contentJson === "object"
  ) {
    editor.setContent(assignment.contentJson);
  }

  return (
    <>
      <div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {assignment.title}
        </h1>
        <p className="py-5 text-xl leading-8">{assignment.description}</p>
        {assignment.videoUrl && <VideoPlayer videoId={assignment.videoUrl} />}
        <div className="my-10">
          <SltList courseModule={courseModule} assignment={assignment} />
        </div>
      </div>
      {assignment.contentJson && editor.render()}
      {/* TO-DO: Only show CommitToAssignmentPage when there is a module token minted for the assignment */}
      {currentCommitment && (
        <div className="my-5 rounded-lg bg-primary p-3 text-primary-foreground">
          <h2>You are committed to this Assignment</h2>
          {currentCommitment.evidenceString ? (
            <p>Current evidence: {currentCommitment.evidenceString}</p>
          ) : (
            <p>
              You have not yet submitted evidence for this Assignment. Click the
              Update button to submit evidence.
            </p>
          )}
        </div>
      )}
      <DialogAssignmentCommitment
        assignmentId={assignment.id}
        assignmentCommitment={currentCommitment}
      />
      <CommitToAssignmentPage />
    </>
  );
}
