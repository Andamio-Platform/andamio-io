import { Assignment, Slt } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useAssignmentByCourseModule from "~/hooks/useAssignmentByCourseModule";
import useValidateCreator from "~/hooks/useValidateCreator";
import { AssignmentCommitment, Module } from "~/types/db";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import DialogAssignmentCommitmentOnNetwork from "./DialogAssignmentCommitmentOnNetwork";
import ModuleLayout from "~/ui/course/components/layout/ModuleLayout";
import SltList from "~/ui/studio/components/assignment-dashboard/slt-list";
import DialogAssignmentLearnerStatus from "~/ui/course/components/dialogs/DialogAssignmentLearnerStatus";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import RenderEditor from "~/components/Editor/components/render/RenderEditor";
import AssignmentBadges from "~/components/ui/assignment-badges";
import CourseNavigation from "~/ui/course/components/ui/CourseNavigation";
import Metatags from "~/components/site/metatags";

import 'highlight.js/styles/atom-one-dark.css'

export default function PageCourseAssignmentContent({
  courseCode,
  courseModule,
  assignmentCode,
}: {
  courseCode: string;
  courseModule: Module;
  assignmentCode: string;
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
        <Metatags title={assignment?.title ?? undefined} />
        {assignment && assignment.live ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
            <Page
              courseModule={courseModule}
              assignment={assignment}
              courseCode={courseCode}
              assignmentCode={assignmentCode}
            />
            <CourseNavigation
              courseCode={courseCode}
              courseModule={courseModule}
              moduleIndex={"assignment"}
            />
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
              <Page
                courseModule={courseModule}
                assignment={assignment}
                courseCode={courseCode}
                assignmentCode={assignmentCode}
              />
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
  courseCode,
  assignmentCode,
}: {
  assignment: { slts: Slt[] } & Assignment;
  courseModule: Module;
  courseCode: string;
  assignmentCode: string;
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

  if (
    assignment &&
    assignment.contentJson &&
    typeof assignment.contentJson === "object"
  ) {
    const editor = RenderEditor({
      editable: false,
      initialContent: assignment?.contentJson,
    });

    return (
      <>
        <div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {assignment.title}
          </h1>
          {/* <p className="py-5 text-xl leading-8">{assignment.description}</p> */}
          {assignment.videoUrl && <VideoPlayer videoId={assignment.videoUrl} />}
          <div className="my-10">
            <SltList courseModule={courseModule} assignment={assignment} />
          </div>
        </div>
        {editor}

        <Card className="mt-10">
          <CardHeader className="flex w-full flex-row items-center justify-between">
            <h2 className="text-2xl font-bold">Assignment Status</h2>
            {currentCommitment?.status && (
              <AssignmentBadges status={currentCommitment.status} />
            )}
          </CardHeader>
          <CardContent>
            {currentCommitment && (
              <>
                <>
                  <div className="my-5">
                    {currentCommitment.learnerNotes && (
                      <>
                        <h2 className="mb-3 text-xl font-bold">Personal Assignment Notes</h2>
                        <div className="bg-background text-foreground p-3">
                        <p>{currentCommitment.learnerNotes}</p>

                        </div>
                      </>
                    )}
                  </div>
                </>
              </>
            )}
            <div className="flex flex-col gap-3 justify-center">
              <DialogAssignmentLearnerStatus
                assignmentId={assignment.id}
                assignmentCommitment={currentCommitment}
              />
              {/* TODO 2024-06-17 */}
              {/* TODO: Only show CommitToAssignmentPage when there is a module token minted for the assignment */}
              {/* TODO: Show current commitment status of learner - ie: if already committed, show that - maybe involve sessionData? */}
              {/* TODO: Handle wallet connected state, so that if connected, user does not have to connect agin */}
              <div className="border-t border-primary my-3" />
              <h2 className="mb-3 text-xl font-bold">Network Commitment</h2>
              <DialogAssignmentCommitmentOnNetwork
              courseCode={courseCode}
              assignmentCode={assignmentCode}
            />
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}
