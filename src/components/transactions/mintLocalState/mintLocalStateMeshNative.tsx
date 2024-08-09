import { useWallet } from "@meshsdk/react";
import { useState } from "react";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export default function MintLocalStateMeshNative({
  accessTokenAssetId,
  courseNftPolicyId,
}: {
  accessTokenAssetId: string;
  courseNftPolicyId: string;
}) {
  const { toast } = useToast();

  const { wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const { data: unsignedTxCBOR } =
    api.learnerCourseTransactions.mintLocalState.useQuery({
      userAccessTokenUnit: accessTokenAssetId,
      courseNftPolicyId: courseNftPolicyId,
    });

  async function onSubmit() {
    setIsLoading(true);
    try {
      console.log(unsignedTxCBOR);

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
      }

      // setIsConfirming(true);
      // let confirmation = false;
      // while (!confirmation) {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      //   confirmation = await ConfirmTx(txId);
      // }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error", error);
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {unsignedTxCBOR ? (
        <Button onClick={onSubmit}>Enroll now (Mesh Tx)</Button>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
      {isLoading && <Loading />}
    </div>
  );
}
