import type { AssignmentStatus } from "@prisma/client";
import { Badge } from "./badge";

export default function AssignmentBadges({
  status,
}: {
  status: AssignmentStatus;
}) {
  return (
    <>
      {status === "COMPLETE" && (
        <Badge className="bg-green-200 text-green-800">Complete</Badge>
      )}
      {status === "IN_PROGRESS" && (
        <Badge className="bg-orange-200 text-orange-800">In Progress</Badge>
      )}
      {status === "SAVE_FOR_LATER" && (
        <Badge className="bg-blue-200 text-blue-800">Saved for Later</Badge>
      )}
      {status === "COMMITMENT" && (
        <Badge className="bg-purple-200 text-purple-800">Committed</Badge>
      )}
      {status === "NETWORK_READY" && (
        <Badge className="bg-orange-200 text-orange-800">Ready to Commit</Badge>
      )}
    </>
  );
}
