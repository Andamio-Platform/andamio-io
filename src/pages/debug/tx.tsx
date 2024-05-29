import AcceptDenyAssignment from "~/components/transactions/acceptDenyAssignment/acceptDenyAssignment";
import CommitToAssignment from "~/components/transactions/commitToAssignment/commitToAssignment";

export default function Tx() {
  return (
    <AcceptDenyAssignment
      courseCode="ha2024"
      learnerAlias="dummy2"
      decision="deny"
      assignmentCode="100"
    />
  );
}
