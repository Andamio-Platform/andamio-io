import { useWallet } from "@meshsdk/react";
import { useState } from "react";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export default function MintLocalState({
  userAccessTokenUnit,
  courseNftPolicyId,
}: {
  userAccessTokenUnit: string;
  courseNftPolicyId: string;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { wallet } = useWallet();

  const { data: unsignedTxCBOR } =
    api.learnerCourseTransactions.mintLocalState.useQuery({
      userAccessTokenUnit: userAccessTokenUnit,
      courseNftPolicyId: courseNftPolicyId,
    });

  async function onSubmit() {
    setIsLoading(true);

    if (unsignedTxCBOR) {
      const signedTx = await wallet.signTx(unsignedTxCBOR.unsignedTxCBOR, true);
      console.log(signedTx);
      const txId = await wallet.submitTx(signedTx);
      console.log(txId);
      toast({
        title: "Transaction submitted",
        description: `${txId}`,
      });
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {unsignedTxCBOR || isLoading ? (
        <Button onClick={onSubmit}>Enroll Tx</Button>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
    </div>
  );
}
