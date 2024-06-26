import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

import AssignmentBadges from "~/components/ui/assignment-badges";
import DialogAssignmentCommitmentOnNetwork from "../dialogs/DialogAssignmentCommitmentOnNetwork";
import { AssignmentCommitment } from "~/types/db";
import useAssignmentByCourseModule from "~/hooks/useAssignmentByCourseModule";

export default function NetworkCommitmentCard({
  courseCode,
  assignmentCode,
}: {
  courseCode: string;
  assignmentCode: string;
}) {
  const {
    assignment,
    isLoadingAssignment,
    isAssignmentOnchain,
    isLoadingAssignmentOnchain,
    isLearnerCommitted,
    isLoadingLearnerCommitted,
  } = useAssignmentByCourseModule(courseCode, assignmentCode);
  // here we assume that assignment code matches module code

  return (
    <Card className="">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Assignment Commitment</h2>

        <AssignmentBadges status="COMMITMENT" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-3">
          <h2 className="mb-3">Make a Commitment on the Andamio Network</h2>
          {isLoadingLearnerCommitted ? (
            "Loading"
          ) : (
            <>
              {isLearnerCommitted ? (
                "You are currently committed to this assignment"
              ) : (
                <DialogAssignmentCommitmentOnNetwork
                  courseCode={courseCode}
                  assignmentCode={assignmentCode}
                />
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
