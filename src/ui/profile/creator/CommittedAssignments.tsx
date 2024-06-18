import { Card, CardContent, CardHeader } from "~/components/ui/card";
import useAssignmentDatums from "../hooks/useAssignmentDatums";
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

export default function CommittedAssignments({
  courseNftPolicy,
}: {
  courseNftPolicy: string;
}) {
  const { data, isLoading, isError, error } =
    useAssignmentDatums(courseNftPolicy);

  return (
    <div>
      <Card className="col-span-6 row-span-2" size="md">
        <CardHeader className="flex flex-row items-center gap-2 rounded-t-md bg-indigo-200 p-2">
          <DocumentCheckIcon width={"35px"} height={"35px"} />
          <h2>{courseNftPolicy} - Approve Student Assignments</h2>
        </CardHeader>
        <CardContent>
          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Alias</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Accept</TableHead>
                  <TableHead>Deny</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((assignment, i) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
