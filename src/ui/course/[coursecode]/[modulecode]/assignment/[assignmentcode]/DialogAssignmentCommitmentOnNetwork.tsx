import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import CommitToAssignment from "~/components/transactions/commitToAssignment/commitToAssignment";
import { useWallet } from "@meshsdk/react";
import Link from "next/link";

export default function DialogAssignmentCommitmentOnNetwork({
  courseCode,
  assignmentCode,
}: {
  courseCode: string;
  assignmentCode: string;
}) {
  const { connected } = useWallet()

  console.log(courseCode);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button intent="dialog" size="dialog" className="mx-auto">
          Commit to Assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Commit to Assignment</DialogTitle>
          <DialogDescription>By completing this transaction, you will make a public commitment to Assignment {assignmentCode} on the Andamio Network.</DialogDescription>
        </DialogHeader>
        {!connected && "Connect a wallet to make a commitment."}
        {!!connected && "Enter Assignment Info, then press Commit to sign a transaction."}
        
        <CommitToAssignment
          courseCode={courseCode}
          assignmentCode={assignmentCode}
        />
      <DialogFooter>
        <p className="text-xs font-bold pt-5">To learn about network Assignment Commitments, view <Link href="/course/andamio101/102/lesson/4"><span className="underline">Lesson 102.4 in the Andamio 101 Course</span></Link>.</p>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
