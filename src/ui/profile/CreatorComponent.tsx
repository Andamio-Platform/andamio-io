import { useWallet } from "@meshsdk/react";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import CreatorsSection from "~/ui/profile/creator/CreatorsSection";
import CreatorConnectWalletCard from "./creator/CreatorConnectWalletCard";

export default function CreatorComponent() {
  const { connected } = useWallet();
  const { accessTokenAlias } = useAccessToken();
  return (
    <div>
      {connected ? (
        <CreatorsSection accessTokenAlias={accessTokenAlias ?? ""} />
      ) : (
        <CreatorConnectWalletCard />
      )}
    </div>
  );
}
