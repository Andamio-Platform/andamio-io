import { Asset, BlockfrostProvider, UTxO } from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "~/components/loading";
import UTxOi from "~/components/transactions/model";
import { Button } from "~/components/ui/button";
import { blockfrostProvider } from "~/config/blockfrost";
import {
  ACCESS_TOKEN_POLICY_ID,
  GLOBAL_STATE_VALIDATOR_ADDR,
} from "~/andamio.config";
import useCourseOnchain from "~/hooks/useCourseOnchain";
import { Network } from "~/config/Network";
import maestro from "~/config/maestro";
import { UtxoWithSlot } from "@maestro-org/typescript-sdk";
import { INDEXER_URL } from "~/config/indexer";
import { DecodedCourseInstanceDatum } from "@andamiojs/datum-utils";

interface RequestData {
  address: string;
  changeAddress: string;
  UserUTxOs: UTxOi[];
  CollateralUTxO: UTxOi;
  UserGlobalStateUTxO: UTxOi;
  UserAccessTokenUTxO: UTxOi;
  LocalStateValidatorAddress: string;
  CourseNFTPolicyID: string;
  LocalStatePolicyID: string;
  CourseInstanceUTxO: UTxOi;
  LocalStatePolicyRefUTxO: UTxOi;
}

export default function MintLocalState({ courseCode }: { courseCode: string }) {
  const router = useRouter();

  const { connected, wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const { courseOnchain, isLoadingCourseOnchain } = useCourseOnchain(
    courseCode,
    Network,
  );

  async function onSubmit() {
    setIsLoading(true);
    try {
      const addr = await wallet.getChangeAddress();
      // sum utxos with mininum ADA 10
      const userUTxOs = await wallet.getUtxos();
      const UserUTxOs: UTxOi[] = [];
      userUTxOs.forEach((utxo: UTxO) => {
        UserUTxOs.push({
          TxID: utxo.input.txHash,
          TxIDIndex: utxo.input.outputIndex,
        });
      });
      const coll_utxo = await wallet.getCollateral();
      const CollateralUTxO: UTxOi = {
        TxID: coll_utxo[0].input.txHash,
        TxIDIndex: coll_utxo[0].input.outputIndex,
      };

      const accessTokenUtxo: UTxO = userUTxOs.find((utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(ACCESS_TOKEN_POLICY_ID)),
      );
      const accessToken = accessTokenUtxo?.output.amount.find((item: Asset) =>
        item.unit.includes(ACCESS_TOKEN_POLICY_ID),
      );
      const accessTokenNameHex = accessToken?.unit.substring(62);
      const accessTokenName = Buffer.from(
        accessTokenNameHex ? accessTokenNameHex : "",
        "hex",
      ).toString("utf-8");

      const res = await axios.get(
        `${INDEXER_URL}/api/global-state/utxoByAlias?alias=${accessTokenName}`,
      );

      const globalStateUtxo: UtxoWithSlot = res.data;

      if (!courseOnchain) {
        throw new Error("Course not found on-chain");
      }
      const instance_res = await axios.get(
        `${INDEXER_URL}/api/instance-validator/decodedCourseInstanceDatumByCourseNftPolicy?policy=${courseOnchain!.CourseCreatorNFTPolicyID}`,
      );

      const instance: DecodedCourseInstanceDatum = instance_res.data;

      const CourseInstanceUTxO_res = await axios.get(
        `${INDEXER_URL}/api/instance-validator/courseInstanceUtxoByCourseNftPolicy?policy=${courseOnchain!.CourseCreatorNFTPolicyID}`,
      );
      const CourseInstanceUTxO: UtxoWithSlot = CourseInstanceUTxO_res.data;

      const LocalStatePolicyRefUTxO_res = await axios.get(
        `${INDEXER_URL}/api/instance-validator/localStatePolicyRefUtxoByCourseNftPolicy?policy=${courseOnchain!.CourseCreatorNFTPolicyID}`,
      );
      const LocalStatePolicyRefUTxO: UtxoWithSlot =
        LocalStatePolicyRefUTxO_res.data;

      const req: RequestData = {
        address: addr,
        changeAddress: addr,
        UserUTxOs,
        CollateralUTxO,
        UserGlobalStateUTxO: {
          TxID: globalStateUtxo.tx_hash,
          TxIDIndex: globalStateUtxo.index,
        },
        UserAccessTokenUTxO: {
          TxID: accessTokenUtxo.input.txHash,
          TxIDIndex: accessTokenUtxo.input.outputIndex,
        },
        LocalStateValidatorAddress: instance.CourseStateAddr,
        CourseNFTPolicyID: courseOnchain.CourseCreatorNFTPolicyID,
        LocalStatePolicyID: instance.LearnerCsList[0]!,
        CourseInstanceUTxO: {
          TxID: CourseInstanceUTxO.tx_hash,
          TxIDIndex: CourseInstanceUTxO.index,
        },
        LocalStatePolicyRefUTxO: {
          TxID: LocalStatePolicyRefUTxO.tx_hash,
          TxIDIndex: LocalStatePolicyRefUTxO.index,
        },
      };

      console.log(req);

      const response = await axios.post("/api/backend/txs/mintLocalState", req);

      console.log(response.data);

      const unsignedTx = response.data.unsignedTxCBOR;

      console.log(unsignedTx);

      const signedTx = await wallet.signTx(unsignedTx, true);

      console.log(signedTx);

      const txId = await wallet.submitTx(signedTx);

      console.log(txId);

      // setIsConfirming(true);
      // let confirmation = false;
      // while (!confirmation) {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      //   confirmation = await ConfirmTx(txId);
      // }

      // set database

      void router.push("/home"); // maybe change to Dashboard?
    } catch (error) {
      setIsLoading(false);
      console.error("Error", error);
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {!isLoading && !isLoadingCourseOnchain ? (
        <Button onClick={onSubmit}>Enroll now</Button>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
    </div>
  );
}
