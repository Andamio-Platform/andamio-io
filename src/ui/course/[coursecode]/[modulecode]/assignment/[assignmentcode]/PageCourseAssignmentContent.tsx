import { Assignment, Slt } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useAssignmentByCourseModule from "~/hooks/useAssignmentByCourseModule";
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

  const { assignment, isLoadingAssignment } = useAssignmentByCourseModule(
    courseCode,
    moduleCode,
  );

  const { isCreator } = useValidateCreator(sessionData, courseCode);

  return (
    <CourseLayout>
      {assignment && assignment.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
          <Page {...assignment} />
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
        {assignment.slts.slice().sort((a, b) => a.moduleIndex - b.moduleIndex).map((slt) => (
          <p
            key={slt.moduleIndex}
            className="text-base font-semibold leading-7 text-accent-foreground"
          >
            {slt.moduleIndex} {slt.sltText}
          </p>
        ))}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {assignment.title}
        </h1>
        <p className="text-xl leading-8">{assignment.description}</p>
        {assignment.videoUrl && <VideoPlayer videoId={assignment.videoUrl} />}
      </div>
      {assignment.contentJson && editor.render()}
    </>
  );
}
