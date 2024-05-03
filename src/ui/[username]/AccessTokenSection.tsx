import { AssetExtended } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";

export default function AccessTokenSection() {
  const { wallet, connected } = useWallet();
  const [accessToken, setAccessToken] = useState<AssetExtended | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchAccessToken = async () => {
      const userAssets = await wallet.getAssets();
      const accessToken = userAssets.find((asset) =>
        asset.unit.includes(ACCESS_TOKEN_POLICY_ID),
      );
      setAccessToken(accessToken);
    };

    if (connected) {
      fetchAccessToken();
    }
  }, [wallet]);
  return (
    <div>
      <p>
        Your unique alias in the Andamio network is 
        <b>
          {accessToken
            ? " " + Buffer.from(accessToken.unit.substring(62), "hex").toString()
            : ""}
        </b>
        .
      </p>
    </div>
  );
}
