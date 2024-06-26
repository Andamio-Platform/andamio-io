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
import { useAccessToken } from "~/ui/profile/hooks/useAccessToken";
import { BrowserWallet } from "@meshsdk/core";
import useCourseOnchain from "~/hooks/useCourseOnchain";
import { NETWORK } from "~/andamio.config";
import axios from "axios";
import { INDEXER_URL } from "~/config/indexer";
import { DecodedModuleRefDatum } from "@andamiojs/datum-utils";
import { useEffect, useState } from "react";

export default function DialogAssignmentCommitmentOnNetwork({
  courseCode,
  assignmentCode,
}: {
  courseCode: string;
  assignmentCode: string;
}) {
  const { connected } = useWallet();
  const [assignmentOnChain, setAssignmentOnChain] = useState(false);
  const { courseOnchain, isLoadingCourseOnchain } = useCourseOnchain(
    courseCode,
    NETWORK,
  );

  useEffect(() => {
    (async () => {
      if (!courseOnchain) return;
      const onChain = await AssignmentNotOnChain({
        CourseCreatorNFTPolicyID: courseOnchain.CourseCreatorNFTPolicyID,
        assignmentCode,
      });
      setAssignmentOnChain(onChain);
    })();
  }, [courseOnchain, assignmentCode]);

  console.log(courseCode);

  return (
    <>
      {!assignmentOnChain ? (
        <p>Assignment {assignmentCode} is not published on chain</p>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button intent="dialog" size="dialog" className="mx-auto">
              Commit to Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6">
            <DialogHeader>
              <DialogTitle>Commit to Assignment</DialogTitle>
              <DialogDescription>
                By completing this transaction, you will make a public
                commitment to Assignment {assignmentCode} on the Andamio
                Network.
              </DialogDescription>
            </DialogHeader>
            {!connected && "Connect a wallet to make a commitment."}
            {!!connected &&
              "Enter Assignment Info, then press Commit to sign a transaction."}

            <CommitToAssignment
              courseCode={courseCode}
              assignmentCode={assignmentCode}
            />
            <DialogFooter>
              <p className="pt-5 text-xs font-bold">
                To learn about network Assignment Commitments, view{" "}
                <Link href="/course/andamio101/102/lesson/4">
                  <span className="underline">
                    Lesson 102.4 in the Andamio 101 Course
                  </span>
                </Link>
                .
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

async function AssignmentNotOnChain({
  CourseCreatorNFTPolicyID,
  assignmentCode,
}: {
  CourseCreatorNFTPolicyID: string;
  assignmentCode: string;
}) {
  const modules_res = await axios.get(
    `${INDEXER_URL}/api/module-ref/decodedModuleRefDatumsByCourseNftPolicy?policy=${CourseCreatorNFTPolicyID}`,
  );
  const modules: Modules[] = modules_res.data;
  if (modules.some((m) => m.module_token === assignmentCode)) {
    return true;
  } else {
    return false;
  }
}
type Modules = {
  module_token: string;
  decoded_datum: DecodedModuleRefDatum;
};

// async function AlreadyCommittedToAssignment({
//   wallet,
//   assignmentCode,
// }: {
//   wallet: BrowserWallet;
//   assignmentCode: string;
// }) {
//   const { data, isLoading, isError, error } = useAccessToken(wallet);
// }

