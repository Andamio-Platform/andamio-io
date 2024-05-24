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

interface RequestData {
  address: string;
  changeAddress: string;
  UserUTxOs: UTxOi[];
  CollateralUTxO: UTxOi;
  AccessTokenName: string;
  UserInfo: string;
  UserGlobalStateUTxO: UTxOi;
  UserAccessTokenUTxO: UTxOi;
  LocalStateValidatorAddress: string;
  CourseCreatorNFTPolicyID: string;
  LocalStatePolicyID: string;
  CourseInstanceUTxO: UTxOi;
  LocalStatePolicyRefUTxO: UTxOi;
}

export default function MintLocalState({ courseId }: { courseId: string }) {
  const router = useRouter();

  const { connected, wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const { courseOnchain, isLoadingCourseOnchain } = useCourseOnchain(
    courseId,
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

      // replace with indexer
      const globalStateUtxos = await blockfrostProvider.fetchAddressUTxOs(
        GLOBAL_STATE_VALIDATOR_ADDR,
      );
      const globalStateUtxo = globalStateUtxos.find((utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(accessTokenNameHex!)),
      );

      if (!courseOnchain) {
        throw new Error("Course not found on-chain");
      }

      const req: RequestData = {
        address: addr,
        changeAddress: addr,
        UserUTxOs,
        CollateralUTxO,
        AccessTokenName: accessTokenName,
        UserInfo: "Andamio User",
        UserGlobalStateUTxO: {
          TxID: globalStateUtxo.input.txHash,
          TxIDIndex: globalStateUtxo.input.outputIndex,
        },
        UserAccessTokenUTxO: {
          TxID: accessTokenUtxo.input.txHash,
          TxIDIndex: accessTokenUtxo.input.outputIndex,
        },
        LocalStateValidatorAddress: courseOnchain.LocalStateValidatorAddress,
        CourseCreatorNFTPolicyID: courseOnchain.CourseCreatorNFTPolicyID,
        LocalStatePolicyID: courseOnchain.LocalStatePolicyID,
        CourseInstanceUTxO: {
          TxID: courseOnchain.CourseInstanceUTxO.substring(0, 65),
          TxIDIndex: parseInt(courseOnchain.CourseInstanceUTxO.substring(65)),
        },
        LocalStatePolicyRefUTxO: {
          TxID: courseOnchain.LocalStatePolicyRefUTxO.substring(0, 65),
          TxIDIndex: parseInt(
            courseOnchain.LocalStatePolicyRefUTxO.substring(65),
          ),
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
        <>
          {!connected ? (
            <CardanoWallet />
          ) : (
            <Button onClick={onSubmit}>Enroll now</Button>
          )}
        </>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
    </div>
  );
}
