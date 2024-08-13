import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import useCourseModuleOverviews from "~/hooks/course/useCourseModuleOverviews";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

// Logic
// 1. If Module has at least 1 SLT and an Assignment, it can be minted on-chain
// 2. Show mint module button if (1) is true
// 3. Create some sort of hash of the data: SLTs? Assignment?

export default function NetworkModuleManagement({
  courseNftPolicyId,
  key,
}: {
  courseNftPolicyId: string;
  key: number | string;
}) {
  const { courseInfo } = useCourseByPolicyId(courseNftPolicyId);
  const { courseModuleOverviews } = useCourseModuleOverviews(
    courseInfo?.courseCode ?? "",
  );
  return (
    <div key={key} className="my-5 bg-primary p-5 text-primary-foreground">
      <h2>{courseInfo?.title}</h2>
      <p>{courseNftPolicyId}</p>
      {courseModuleOverviews?.map((cm, i) => (
        <Card key={i} className="my-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold">Module Title: {cm.title}</h2>
            <p>Number SLTs: {cm.slts.length}</p>
            <p>Number Assignments: {cm.assignments.length}</p>
          </CardHeader>
          <CardContent>
            {cm.slts.map((slt, j) => (
              <p key={j}>
                {cm.moduleCode}.{slt.moduleIndex}: {slt.sltText}
              </p>
            ))}
            {cm.assignments?.length > 0 && (
              <p>Assignment: {cm.assignments[0]?.title}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-row gap-5">
            <Button>Mint Course Module</Button>
            <Button>View Assignment Commitments</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
