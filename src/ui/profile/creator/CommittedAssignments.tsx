import { Card } from "~/components/ui/card";
import useAssignmentDatums from "~/hooks/onchain/useAssignmentDatums";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import AcceptDenyAssignment from "~/components/transactions/acceptDenyAssignment/acceptDenyAssignment";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";

export default function CommittedAssignments({
  courseNftPolicy,
}: {
  courseNftPolicy: string;
}) {
  const { listCourseAssignmentDatums } = useAssignmentDatums(courseNftPolicy);

  const { courseInfo, isLoadingCourseInfo } =
    useCourseByPolicyId(courseNftPolicy);

  if (isLoadingCourseInfo) return <LoadingCircle />;

  return (
    <div className="flex w-full flex-col">
      <div className="grid w-full grid-cols-1 gap-5">
        <Card
          className="flex w-full items-center justify-between bg-indigo-800 px-24 text-xl font-bold text-white"
          size="md"
        >
          <DocumentCheckIcon width={"35px"} height={"35px"} />
          <h2>
            {courseInfo?.title} ({courseInfo?.courseCode}) - Approve Student
            Assignments
          </h2>
        </Card>

        {listCourseAssignmentDatums && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alias</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Accept</TableHead>
                <TableHead>Deny</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-left">
              {listCourseAssignmentDatums.map((assignment, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {assignment.CourseState.CsdUserName}
                  </TableCell>
                  <TableCell>{assignment.CommittedAssignmentId}</TableCell>
                  <TableCell>
                    <AcceptDenyAssignment
                      key={i}
                      courseNftPolicy={courseNftPolicy}
                      assignment={assignment}
                      decision="accept"
                    />
                  </TableCell>
                  <TableCell>
                    <AcceptDenyAssignment
                      key={i}
                      courseNftPolicy={courseNftPolicy}
                      assignment={assignment}
                      decision="deny"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
