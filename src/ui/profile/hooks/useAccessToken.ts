import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { ACCESS_TOKEN_POLICY_ID } from "../../../andamio.config";
import { AssetExtended, BrowserWallet } from "@meshsdk/core";

const fetchAccessToken = async ({ queryKey }: QueryFunctionContext<BrowserWallet[]>) => {
  const wallet = queryKey[0]!;
  const userAssets = await wallet.getAssets();
  const accessToken = userAssets.find((asset: AssetExtended) =>
    asset.unit.includes(ACCESS_TOKEN_POLICY_ID),
  );
  return accessToken;
};

export const useAccessToken = (wallet: BrowserWallet) => {
  return useQuery([wallet], fetchAccessToken, {
    select: (accessToken) => {
      if (accessToken) {
        const alias = Buffer.from(
          accessToken.unit.substring(62),
          "hex",
        ).toString();
        return { accessToken, alias };
      }
      return { accessToken: null, alias: null };
    },
  });
};