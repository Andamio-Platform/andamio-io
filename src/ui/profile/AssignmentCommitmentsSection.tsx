import { Card, CardHeader, CardContent } from "~/components/ui/card";
import useLearnerNetworkStatus from "./hooks/useLearnerNetworkStatus";
import { AssetExtended } from "@meshsdk/core";

export default function AssignmentCommitmentsSection({
  accessToken,
}: {
  accessToken: AssetExtended;
}) {
  const { courseEnrollments } = useLearnerNetworkStatus(accessToken);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">Assignment Commitments</h1>
      </CardHeader>
      <CardContent>
        {courseEnrollments?.map((ce, i) => (
          <div key={i}>
            {" "}
            {ce?.course}:{" "}
            {ce?.assignment
              ? "Currently committed to assignment"
              : "No current commitments"}
          </div>
        ))}
        <p className="py-5 text-sm font-bold">
          Note: Assignment details will be added to this Assignment Dashboard
          after on-chain upgrades to Andamio are deployed.
        </p>
      </CardContent>
    </Card>
  );
}
