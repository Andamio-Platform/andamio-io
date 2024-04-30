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
} from "../andamio-params";

interface RequestData {
  Address: string;
  ChangeAddress: string;
  UserUTxOs: UTxOi[];
  CollateralUTxO: UTxOi;
  UserLocalStateUTxO: UTxOi;
  UserAccessTokenUTxO: UTxOi;
  ModuleTokenUTxO: UTxOi;
  AssignmentCode: string;
  StudentAssignmentInfo: string;
  AssignmentValidatorAddress: string;
  LocalStateValidatorAddress: string;
  LocalStatePolicyID: string;
  LocalStateValidatorRefUTxO: UTxOi;
}

export default function CommitToAssignment() {
  const router = useRouter();

  const { connected, wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

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

      const req: RequestData = {
        Address: addr,
        ChangeAddress: addr,
        UserUTxOs,
        CollateralUTxO,
        UserLocalStateUTxO: {
          TxID: "",
          TxIDIndex: 0,
        },
        UserAccessTokenUTxO: {
          TxID: accessTokenUtxo.input.txHash,
          TxIDIndex: accessTokenUtxo.input.outputIndex,
        },
        ModuleTokenUTxO: {
          TxID: "",
          TxIDIndex: 0,
        },
        AssignmentCode: "",
        StudentAssignmentInfo: "Assignment Info",
        AssignmentValidatorAddress: "",
        LocalStateValidatorAddress: "",
        LocalStatePolicyID: "",
        LocalStateValidatorRefUTxO: {
          TxID: "",
          TxIDIndex: 0,
        },
      };

      console.log(req);

      const response = await axios.post(
        "/api/backend/txs/commitToAssignment",
        req,
      );

      const unsignedTx = response.data.unsignedTxCBOR;

      const signedTx = await wallet.signTx(unsignedTx, true);
      const txId = await wallet.submitTx(signedTx);

      console.log(txId);

      // setIsConfirming(true);
      // let confirmation = false;
      // while (!confirmation) {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      //   confirmation = await ConfirmTx(txId);
      // }

      // set database

      void router.push("/home");
    } catch (error) {
      setIsLoading(false);
      console.error("Error", error);
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {!isLoading ? (
        <>
          {!connected ? (
            <CardanoWallet />
          ) : (
            <Button onClick={onSubmit}>Commit</Button>
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
