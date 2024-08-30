import { useAddress, useWallet } from "@meshsdk/react";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export default function MintAccessToken({
  userAddress,
  alias,
}: {
  userAddress: string;
  alias: string;
}) {
  const { toast } = useToast();

  const { wallet } = useWallet();
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);

  const { data: unsignedTxCBOR } =
    api.accessTokenTransactions.mintAccessToken.useQuery({
      userAddress: userAddress,
      alias: alias,
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
      }
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {unsignedTxCBOR || isLoading? (
        <Button onClick={onSubmit}>Mint Andamio Access Token</Button>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
    </div>
  );
}
