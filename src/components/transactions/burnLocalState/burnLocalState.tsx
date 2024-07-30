import { useToast } from "~/components/ui/use-toast";
import type UTxOi from "../model";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import axios from "axios";
import { type Asset, type UTxO } from "@meshsdk/core";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";
import { INDEXER_URL } from "~/config/indexer";
import { type UtxoWithSlot } from "@maestro-org/typescript-sdk";
import { type DecodedCourseInstanceDatum } from "@andamiojs/datum-utils";
import { Button } from "~/components/ui/button";

interface RequestData {
  Address: string;
  ChangeAddress: string;
  UserUTxOs: UTxOi[];
  CollateralUTxO: UTxOi;
  AccessTokenName: string;
  UserLocalStateUTxO: UTxOi;
  UserGlobalStateUTxO: UTxOi;
  UserAccessTokenUTxO: UTxOi;
  CourseNFTPolicyID: string;
  LocalStateValidatorRefUTxO: UTxOi;
  LocalStatePolicyRefUTxO: UTxOi;
  LocalStatePolicyID: string;
}

export default function BurnLocalState({
  courseNftPolicy,
}: {
  courseNftPolicy: string;
}) {
  const { toast } = useToast();
  const { connected, wallet } = useWallet();

  async function onSubmit() {
    const addr = await wallet.getChangeAddress();
    const coll_utxo: UTxO[] = await wallet.getCollateral();
    const userUTxOs: UTxO[] = await wallet.getUtxos();

    if (userUTxOs && coll_utxo[0]) {
      const accessTokenUTxO: UTxO | undefined = userUTxOs.find((utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(ACCESS_TOKEN_POLICY_ID)),
      );

      if (!accessTokenUTxO) return;

      const accessToken = accessTokenUTxO?.output.amount.find((item: Asset) =>
        item.unit.includes(ACCESS_TOKEN_POLICY_ID),
      );
      const accessTokenNameHex = accessToken?.unit.substring(62);
      const accessTokenName = Buffer.from(
        accessTokenNameHex ? accessTokenNameHex : "",
        "hex",
      ).toString("utf-8");

      const remainingUTxOs = userUTxOs.filter(
        (utxo) => utxo !== coll_utxo[0] && utxo !== accessTokenUTxO,
      );
      const UserUTxOs: UTxOi[] = [];
      remainingUTxOs.forEach((utxo: UTxO) => {
        UserUTxOs.push({
          TxID: utxo.input.txHash,
          TxIDIndex: utxo.input.outputIndex,
        });
      });

      const UserLocalStateUTxO_res = await axios.get(
        `${INDEXER_URL}/api/course-state/courseStateUtxoByCourseNftPolicyAndAlias?policy=${courseNftPolicy}&alias=${accessTokenName}`,
      );
      const UserLocalStateUTxO: UtxoWithSlot = UserLocalStateUTxO_res.data;

      const UserGlobalStateUTxO_res = await axios.get(
        `${INDEXER_URL}/api/global-state/utxoByAlias?alias=${accessTokenName}`,
      );
      const UserGlobalStateUTxO: UtxoWithSlot = UserGlobalStateUTxO_res.data;

      const LocalStateValidatorRefUTxO_res = await axios.get(
        `${INDEXER_URL}/api/instance-validator/localStateValildatorRefUtxoByCourseNftPolicy?policy=${courseNftPolicy}`,
      );
      const LocalStateValidatorRefUTxO: UtxoWithSlot =
        LocalStateValidatorRefUTxO_res.data;

      const LocalStatePolicyRefUTxO_res = await axios.get(
        `${INDEXER_URL}/api/instance-validator/localStatePolicyRefUtxoByCourseNftPolicy?policy=${courseNftPolicy}`,
      );
      const LocalStatePolicyRefUTxO: UtxoWithSlot =
        LocalStatePolicyRefUTxO_res.data;

      const instance_res = await axios.get(
        `${INDEXER_URL}/api/instance-validator/decodedCourseInstanceDatumByCourseNftPolicy?policy=${courseNftPolicy}`,
      );

      const instance: DecodedCourseInstanceDatum = instance_res.data;

      const req: RequestData = {
        Address: addr,
        ChangeAddress: addr,
        UserUTxOs: UserUTxOs,
        CollateralUTxO: {
          TxID: coll_utxo[0].input.txHash,
          TxIDIndex: coll_utxo[0].input.outputIndex,
        },
        AccessTokenName: accessTokenName,
        UserLocalStateUTxO: {
          TxID: UserLocalStateUTxO.tx_hash,
          TxIDIndex: UserLocalStateUTxO.index,
        },
        UserGlobalStateUTxO: {
          TxID: UserGlobalStateUTxO.tx_hash,
          TxIDIndex: UserGlobalStateUTxO.index,
        },
        UserAccessTokenUTxO: {
          TxID: accessTokenUTxO.input.txHash,
          TxIDIndex: accessTokenUTxO.input.outputIndex,
        },
        CourseNFTPolicyID: courseNftPolicy,
        LocalStateValidatorRefUTxO: {
          TxID: LocalStateValidatorRefUTxO.tx_hash,
          TxIDIndex: LocalStateValidatorRefUTxO.index,
        },
        LocalStatePolicyRefUTxO: {
          TxID: LocalStatePolicyRefUTxO.tx_hash,
          TxIDIndex: LocalStatePolicyRefUTxO.index,
        },
        LocalStatePolicyID: instance.LearnerCsList[0]!,
      };

      console.log(req);

      const response: { data: { unsignedTxCBOR: string } } = await axios.post(
        "/api/backend/txs/burnLocalStateToken",
        req,
      );

      const unsignedTx = response.data.unsignedTxCBOR;

      const signedTx = await wallet.signTx(unsignedTx, true);
      const txId = await wallet.submitTx(signedTx);

      console.log(txId);
      toast({
        title: "Transaction submitted",
        description: `${txId}`,
      });
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {!connected ? (
        <CardanoWallet />
      ) : (
        <Button onClick={onSubmit}>Burn</Button>
      )}
    </div>
  );
}
