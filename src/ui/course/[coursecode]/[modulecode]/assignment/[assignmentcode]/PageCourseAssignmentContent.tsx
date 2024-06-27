import { Slt } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useValidateCreator from "~/hooks/course/useValidateCreator";
import { Assignment, AssignmentCommitment, Module } from "~/types/db";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import ModuleLayout from "~/ui/course/components/layout/ModuleLayout";
import SltList from "~/ui/studio/components/assignment-dashboard/slt-list";
import { useEffect, useState } from "react";

import RenderEditor from "~/components/Editor/components/render/RenderEditor";
import CourseNavigation from "~/ui/course/components/ui/CourseNavigation";
import Metatags from "~/components/site/metatags";

import "highlight.js/styles/atom-one-dark.css";
import NetworkCommitmentCard from "~/ui/course/components/assignments/cards/NetworkCommitmentCard";
import PersonalNotesCard from "~/ui/course/components/assignments/cards/PersonalNotesCard";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import useAssignmentNetworkStatus from "~/hooks/onchain/useAssignmentNetworkStatus";
import NoOnchainAssignmentCard from "~/ui/course/components/assignments/cards/NoOnchainAssignmentCard";

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

  const { assignment, isLoadingAssignment, isAssignmentOnchain } =
    useAssignmentNetworkStatus(courseCode, courseModule.moduleCode);

  const { isCreator } = useValidateCreator(sessionData, courseCode);

  return (
    <CourseLayout>
      <ModuleLayout courseCode={courseCode} courseModule={courseModule}>
        <Metatags title={assignment?.title ?? undefined} />
        {assignment && assignment.live ? (
          <div className="mx-auto flex w-11/12 max-w-5xl flex-col gap-4 text-base leading-7 text-foreground">
            <Page
              courseModule={courseModule}
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
          <div className="mx-auto flex w-11/12 max-w-5xl flex-col gap-4 text-base leading-7 text-foreground">
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
  courseModule,
  courseCode,
  assignmentCode,
}: {
  courseModule: Module;
  courseCode: string;
  assignmentCode: string;
}) {
  const { data: sessionData } = useSession();
  const { connected } = useWallet();
  const [currentCommitment, setCurrentCommitment] = useState<
    AssignmentCommitment | undefined
  >(undefined);

  const {
    assignment,
    isLoadingAssignment,
    isAssignmentOnchain,
    isLoadingAssignmentOnchain,
    isLearnerCommitted,
    isLoadingLearnerCommitted,
  } = useAssignmentNetworkStatus(courseCode, courseModule.moduleCode);

  useEffect(() => {
    if (sessionData && assignment) {
      const currentCommitment = sessionData?.user.assignmentCommitments.find(
        (a) => a.assignmentId === assignment.id,
      );
      setCurrentCommitment(currentCommitment);
    }
  }, [sessionData, assignment]);

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

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          <PersonalNotesCard
            currentCommitment={currentCommitment}
            assignment={assignment}
          />

          {isAssignmentOnchain ? (
            <>
              {connected ? (
                <NetworkCommitmentCard
                  assignmentCode={assignmentCode}
                  courseCode={courseCode}
                />
              ) : (
                <div className="">
                  <CardanoWallet />
                </div>
              )}
            </>
          ) : (
            <NoOnchainAssignmentCard />
          )}

          <div className="col-span-2">
            <pre>
              {isLoadingAssignment ? "Loading Assignment" : "Assignment Loaded"}
            </pre>
            <pre>
              {isAssignmentOnchain
                ? "Assignment is on-chain"
                : "Assignment not on-chain"}
            </pre>
            <pre>
              {isLoadingAssignmentOnchain
                ? "Loading Assignment on-chain status"
                : "Assignment on-chain status Loaded"}
            </pre>
            <pre>
              {isLearnerCommitted
                ? "You are committed to this assignment"
                : "You are not committed"}
            </pre>
            <pre>
              {isLoadingLearnerCommitted
                ? "Loading commitment status"
                : "Assignment Commitment status Loaded"}
            </pre>
          </div>
        </div>
      </>
    );
  }
}
