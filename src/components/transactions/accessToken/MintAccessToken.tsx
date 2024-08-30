import { useWallet } from "@meshsdk/react";
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
  const [isLoading, setIsLoading] = useState(false);

  const { data: unsignedTxCBOR } =
    api.accessTokenTransactions.mintAccessToken.useQuery({
      userAddress: userAddress,
      alias: alias,
    });

  async function onSubmit() {
    setIsLoading(true);
    if (userAddress && alias) {
      if (unsignedTxCBOR) {
        const signedTx = await wallet.signTx(
          unsignedTxCBOR.unsignedTxCBOR,
          true,
        );
        console.log(signedTx);
        setIsLoading(false);
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
      {unsignedTxCBOR ? (
        <Button onClick={onSubmit}>Mint Andamio Access Token</Button>
      ) : (
        <div className="flex flex-col">
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          {/* <Loading /> */}
          <p>Addr: {userAddress}</p>
          <p>Alias: {alias}</p>
        </div>
      )}
    </div>
  );
}
