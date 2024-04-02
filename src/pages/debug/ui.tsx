import { api } from "~/utils/api";
import { useState } from "react";
import { useWallet } from "@meshsdk/react";
import { CardanoWallet } from "@meshsdk/react";
import { checkSignature, generateNonce } from "@meshsdk/core";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";

export default function Page() {
  const ctx = api.useUtils();
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: updateWalletAddresses } =
    api.userWallet.updateWalletAddresses.useMutation({
      onSuccess: () => {
        toast.success("Wallet updated");
        void ctx.userWallet.getWallet.invalidate();
        setLoading(false);
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        console.error(errorMessage);
        toast.error("Something went wrong. Please try again.");
        setLoading(false);
      },
    });

  async function verifyWallet() {
    if (connected) {
      setLoading(true);

      // get user addresses
      const userStakeAddress = (await wallet.getRewardAddresses())[0];
      const userWalletAddress = (await wallet.getUsedAddresses())[0];

      if (userWalletAddress == undefined || userStakeAddress == undefined)
        return;

      // generate nonce
      const nonce = generateNonce("Sign to login in to Andamio: ");

      // user sign message
      const signature = await wallet.signData(userStakeAddress, nonce);

      // verify signature
      const result = checkSignature(nonce, userStakeAddress, signature);

      // set database
      if (result) {
        await updateWalletAddresses({
          walletAddress: userWalletAddress,
          stakeAddress: userStakeAddress,
        });
      } else {
        // somehow user signature does not match the wallet address?
        toast.error("Something went wrong. Please try again.");
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <h1>Connect Wallet with backend demo</h1>

      {connected ? (
        <>
          <Button
            onClick={() => verifyWallet()}
            disabled={loading}
            style={{
              margin: "8px",
              backgroundColor: loading ? "orange" : "grey",
            }}
          >
            Link wallet
          </Button>
        </>
      ) : (
        <CardanoWallet />
      )}
    </div>
  );
}
