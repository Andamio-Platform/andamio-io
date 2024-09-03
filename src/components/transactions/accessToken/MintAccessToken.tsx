import { useWallet } from "@meshsdk/react";
import { type Dispatch, type SetStateAction } from "react";
import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

export default function MintAccessToken({
  userAddress,
  alias,
  setSuccessTxHash,
}: {
  userAddress: string;
  alias: string;
  setSuccessTxHash: Dispatch<SetStateAction<string | undefined>>;
}) {
  const { toast } = useToast();

  const { wallet } = useWallet();

  const { data: unsignedTxCBOR } =
    api.accessTokenTransactions.mintAccessToken.useQuery({
      userAddress: userAddress,
      alias: alias,
    });

  async function onSubmit() {
    if (userAddress && alias) {
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
        <Button onClick={onSubmit}>Mint Andamio Access Token</Button>
      ) : (
        <div className="flex flex-col">
          <LoadingCircle />
        </div>
      )}
    </div>
  );
}
