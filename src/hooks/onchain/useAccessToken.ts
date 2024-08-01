import { type DecodedTokenInfo } from "@andamiojs/datum-utils";
import { ACCESS_TOKEN_POLICY_ID } from "../../andamio.config";
import {
  type UTxO,
  type Asset,
  type AssetExtended,
  hexToString,
} from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { useCallback, useEffect, useState } from "react";

// TODO: For course list use:
// import { DecodedTokenInfo } from "@andamiojs/datum-utils";

export const useAccessToken = () => {
  const { wallet } = useWallet();

  // placeholder:
  const accessTokenCourses: DecodedTokenInfo[] = [];
  const [accessTokenAsset, setAccessTokenAsset] = useState<
    AssetExtended | undefined
  >(undefined);
  const [accessTokenUtxo, setAccessTokenUtxo] = useState<UTxO | undefined>(
    undefined,
  );
  const [accessTokenAlias, setAccessTokenAlias] = useState<string | undefined>(
    undefined,
  );

  const getAssetTokenAsset = useCallback(async () => {
    const assets = await wallet.getAssets();
    const accessToken: AssetExtended | undefined = assets.find(
      (asset: AssetExtended) => asset.unit.includes(ACCESS_TOKEN_POLICY_ID),
    );
    if (accessToken) {
      setAccessTokenAsset(accessToken);
      const alias = hexToString(accessToken.unit.substring(62));
      setAccessTokenAlias(alias);
    }
  }, [wallet]);

  const getAssetTokenUtxo = useCallback(async () => {
    const utxos: UTxO[] | undefined = await wallet.getUtxos();
    const accessToken: UTxO | undefined = utxos.find((utxo: UTxO) => {
      utxo.output.amount.some((a: Asset) =>
        a.unit.includes(ACCESS_TOKEN_POLICY_ID),
      );
    });
    if (accessToken) {
      setAccessTokenUtxo(accessToken);
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet) {
      void getAssetTokenAsset();
      void getAssetTokenUtxo();
    }
  }, [wallet, getAssetTokenAsset, getAssetTokenUtxo]);

  return {
    accessTokenAsset,
    accessTokenUtxo,
    accessTokenAlias,
    accessTokenCourses,
  };
};
