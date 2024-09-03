import { useAddress, useWallet } from "@meshsdk/react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export default function AcceptDenyAssignment({
  courseNftPolicy,
  userAccessTokenUnit,
  studentAlias,
  decision,
  setSuccessTxHash,
}: {
  courseNftPolicy: string;
  userAccessTokenUnit: string;
  studentAlias: string;
  decision: "accept" | "deny";
  setSuccessTxHash: Dispatch<SetStateAction<string | undefined>>;
}) {
  const { toast } = useToast();

  const { wallet } = useWallet();
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: unsignedTxCBOR,
    isError: txError,
    isLoading: txLoading,
  } = decision === "accept"
    ? api.creatorCourseTransactions.acceptAssignment.useQuery({
        userAccessTokenUnit: userAccessTokenUnit,
        courseNftPolicyId: courseNftPolicy,
        studentAlias: studentAlias,
      })
    : api.creatorCourseTransactions.denyAssignment.useQuery({
        userAccessTokenUnit: userAccessTokenUnit,
        courseNftPolicyId: courseNftPolicy,
        studentAlias: studentAlias,
      });

  async function onSubmit() {
    setIsLoading(true);
    if (address) {
      if (unsignedTxCBOR) {
        const signedTx = await wallet.signTx(
          unsignedTxCBOR.unsignedTxCBOR,
          true,
        );
        console.log(signedTx);
        const txId = await wallet.submitTx(signedTx);
        console.log(txId);
        toast({
          title: "Transaction submitted",
          description: `${txId}`,
        });
        setSuccessTxHash(txId);
      }
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {unsignedTxCBOR ? (
        <Button onClick={onSubmit}>{decision} assignment</Button>
      ) : (
        <>
          {txLoading || (isLoading && <Loading />)}
          {txError && "Tx Error"}
        </>
      )}
    </div>
  );
}
