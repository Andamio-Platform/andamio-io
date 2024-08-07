import { useWallet } from "@meshsdk/react";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import ConnectWalletCard from "~/ui/course/components/assignments/cards/ConnectWalletCard";
import CreatorsSection from "~/ui/profile/creator/CreatorsSection";

export default function CreatorComponent() {
  const { connected } = useWallet();
  const { accessTokenAlias } = useAccessToken();
  return (
    <div>
      CREATOR PAGE!
      {connected ? (
        <CreatorsSection accessTokenAlias={accessTokenAlias ?? ""} />
      ) : (
        <ConnectWalletCard />
      )}
    </div>
  );
}
