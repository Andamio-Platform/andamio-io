import { type DecodedGlobalStateDatum } from "@andamiojs/datum-utils";
import { type Asset, type BrowserWallet } from "@meshsdk/core";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";
import { INDEXER_URL } from "~/config/indexer";

export default async function checkIfEnrolled(
  courseNftPolicy: string,
  wallet: BrowserWallet,
) {
  const userAssets: Asset[] = await wallet.getAssets();
  const accessToken = userAssets.find((asset) =>
    asset.unit.includes(ACCESS_TOKEN_POLICY_ID),
  );

  if (!accessToken) return false;

  const alias = Buffer.from(accessToken.unit.substring(62), "hex").toString();

  const response = await fetch(
    `${INDEXER_URL}/api/global-state/decodedGlobalStateDatumByAlias?alias=${alias}`,
    { cache: "no-store" },
  );
  const datum: DecodedGlobalStateDatum = await response.json();
  let enrolled = false;

  if (!datum || !datum.TokenInfos) return false;

  enrolled = datum.TokenInfos.some((tokenInfo) => {
    if (tokenInfo.LsCs === courseNftPolicy && tokenInfo.Minted) {
      return true;
    }
  });

  return enrolled;
}
