import { Card, CardHeader, CardContent } from "~/components/ui/card";
import useLearnerNetworkStatus from "~/hooks/onchain/useLearnerNetworkStatus";
import { type Asset } from "@meshsdk/core";
import CommittedAssignment from "./CommittedAssignment";
import { type DecodedTokenInfo } from "@andamiojs/datum-utils";

export default function AssignmentCommitmentsSection({
  accessToken,
  alias,
  courses,
}: {
  accessToken: Asset;
  alias: string;
  courses: DecodedTokenInfo[];
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
        {courses &&
          courses.length > 0 &&
          courses.map((course, i) => (
            <CommittedAssignment
              courseNftPolicy={course.LsCs}
              alias={alias}
              key={i}
            />
          ))}
        {/* <p className="py-5 text-sm font-bold">
          Note: Assignment details will be added to this Assignment Dashboard
          after on-chain upgrades to Andamio are deployed.
        </p> */}
      </CardContent>
    </Card>
  );
}
