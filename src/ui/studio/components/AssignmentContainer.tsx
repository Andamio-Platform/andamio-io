import Link from "next/link";
import { Card } from "~/components/ui/card";
import { Assignment } from "~/types/db";

export default function AssignmentContainer({
  assignment,
}: {
  assignment: Assignment;
}) {
  return (
    <Card intent="module" size="wide">
      <div>
        Assignment {assignment.assignmentCode}: {assignment.title}
      </div>
      <div>{assignment.slts.length} SLTs Measured</div>
    </Card>
  );
}
