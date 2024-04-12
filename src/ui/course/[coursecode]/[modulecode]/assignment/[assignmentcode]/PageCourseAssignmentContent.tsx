import { Assignment, Slt } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useAssignmentByCourseModule from "~/hooks/useAssignmentByCourseModule";
import useValidateCreator from "~/hooks/useValidateCreator";
import { Module } from "~/types/db";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import ModuleLayout from "~/ui/course/components/layout/ModuleLayout";
import SltList from "~/ui/studio/components/assignment-dashboard/slt-list";

export default function PageCourseAssignmentContent({
  courseCode,
  courseModule,
}: {
  courseCode: string;
  courseModule: Module;
}) {
  const { data: sessionData } = useSession();

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
    </>
  );
}
