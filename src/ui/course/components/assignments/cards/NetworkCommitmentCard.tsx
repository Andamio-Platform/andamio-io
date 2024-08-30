import { Card, CardContent, CardHeader } from "~/components/ui/card";

import AssignmentBadges from "~/components/ui/assignment-badges";
import DialogAssignmentCommitmentOnNetwork from "../dialogs/DialogAssignmentCommitmentOnNetwork";
import useAssignmentNetworkStatus from "~/hooks/onchain/useAssignmentNetworkStatus";

export default function NetworkCommitmentCard({
  courseCode,
  moduleCode,
}: {
  courseCode: string;
  moduleCode: string;
}) {
  const {
    isAssignmentOnchain,
    isLearnerCommitted,
    isLoadingLearnerCommitted,
    isLoadingAssignment,
  } = useAssignmentNetworkStatus({
    courseCode: courseCode,
    moduleCode: moduleCode,
  });
  // here we assume that assignment code matches module code

  return (
    <Card className="">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Assignment Commitment</h2>

        {isLearnerCommitted && <AssignmentBadges status="COMMITMENT" />}
        {isAssignmentOnchain && !isLearnerCommitted && (
          <AssignmentBadges status="NETWORK_READY" />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-3">
          {isLoadingAssignment ? (
            "Loading"
          ) : (
            <>
              {isLearnerCommitted ? (
                "You are currently committed to this assignment"
              ) : (
                <DialogAssignmentCommitmentOnNetwork
                  courseCode={courseCode}
                  assignmentCode={moduleCode}
                />
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
