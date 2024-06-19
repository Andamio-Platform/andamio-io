import { DecodedGlobalStateDatum } from "@andamiojs/datum-utils";
import { BrowserWallet } from "@meshsdk/core";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";
import { INDEXER_URL } from "~/config/indexer";

export default async function checkIfEnrolled(
  courseNftPolicy: string,
  wallet: BrowserWallet,
) {
  const userAssets = await wallet.getAssets();
  const accessToken = userAssets.find((asset) =>
    asset.unit.includes(ACCESS_TOKEN_POLICY_ID),
  );
  const alias = Buffer.from(accessToken.unit.substring(62), "hex").toString();

  const response = await fetch(
    `${INDEXER_URL}/api/global-state/decodedGlobalStateDatumByAlias?alias=${alias}`,
    { cache: "no-store" },
  );
  const datum: DecodedGlobalStateDatum = await response.json();
  let enrolled = false;

  enrolled = datum.TokenInfos.some((tokenInfo) => {
    if (tokenInfo.LsCs === courseNftPolicy && tokenInfo.Minted) {
      return true;
    }
  });

  return enrolled;
}
