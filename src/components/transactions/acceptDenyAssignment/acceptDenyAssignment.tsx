import axios from "axios";
import UTxOi from "../model";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Button } from "~/components/ui/button";
import { UTxO } from "@meshsdk/core";

interface RequestData {
  AssignmentCode: "string";
  CollateralUTxO: UTxOi;
  CourseFacilitatorDecision: "string";
  CourseFacilitatorTokenUTxO: UTxOi;
  UserAssignmentUTxO: UTxOi;
  UserUTxOs: UTxOi[];
  address: string;
  changeAddress: string;
}

export default function AcceptDenyAssignment() {
  const { connected, wallet } = useWallet();

  async function onSubmit() {
    const addr = await wallet.getChangeAddress();

    const coll_utxo = await wallet.getCollateral();
    const CollateralUTxO: UTxOi = {
      TxID: coll_utxo[0].input.txHash,
      TxIDIndex: coll_utxo[0].input.outputIndex,
    };

    const userUTxOs = await wallet.getUtxos();
    const UserUTxOs: UTxOi[] = [];
    userUTxOs.forEach((utxo: UTxO) => {
      UserUTxOs.push({
        TxID: utxo.input.txHash,
        TxIDIndex: utxo.input.outputIndex,
      });
    });

    const req: RequestData = {
      AssignmentCode: "string",
      CollateralUTxO: CollateralUTxO,
      CourseFacilitatorDecision: "string",
      CourseFacilitatorTokenUTxO: {
        TxID: "string",
        TxIDIndex: 0,
      },
      UserAssignmentUTxO: {
        TxID: "string",
        TxIDIndex: 0,
      },
      UserUTxOs: UserUTxOs,
      address: addr,
      changeAddress: addr,
    };

    const response = await axios.post(
      "/api/backend/txs/commitToAssignment",
      req,
    );

    const unsignedTx = response.data.unsignedTxCBOR;

    const signedTx = await wallet.signTx(unsignedTx, true);
    const txId = await wallet.submitTx(signedTx);

    console.log(txId);
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {!connected ? (
        <CardanoWallet />
      ) : (
        <Button onClick={onSubmit}>Action</Button>
      )}
    </div>
  );
}
