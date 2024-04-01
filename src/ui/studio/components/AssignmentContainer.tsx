import Link from "next/link";
import { Card } from "~/components/ui/card";
import { Assignment } from "~/types/db";

export default function AssignmentContainer({
  assignment,
}: {
  assignment: Assignment;
}) {
  return (
    <Card className="mx-auto my-5 flex flex-row justify-between rounded-md bg-primary hover:secondary-foreground px-10 py-3 text-primary-foreground">
      <div>
        Assignment {assignment.assignmentCode}: {assignment.title}
      </div>
      <div>{assignment.slts.length} SLTs Measured</div>
    </Card>
  );
}
