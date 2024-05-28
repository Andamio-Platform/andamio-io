import axios from "axios";
import UTxOi from "../model";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Button } from "~/components/ui/button";
import { UTxO } from "@meshsdk/core";
import useCourseOnchain from "~/hooks/useCourseOnchain";
import { Network } from "~/config/Network";
import maestro from "~/config/maestro";

interface RequestData {
  AssignmentCode: string;
  CollateralUTxO: UTxOi;
  CourseFacilitatorDecision: "accept" | "deny";
  CourseFacilitatorTokenUTxO: UTxOi;
  UserAssignmentUTxO: UTxOi;
  UserUTxOs: UTxOi[];
  address: string;
  changeAddress: string;
}

export default function AcceptDenyAssignment({
  courseId,
  learnerAlias,
  decision,
  assignmentCode,
}: {
  courseId: string;
  learnerAlias: string;
  decision: "accept" | "deny";
  assignmentCode: string;
}) {
  const { connected, wallet } = useWallet();
  const { courseOnchain, isLoadingCourseOnchain } = useCourseOnchain(
    courseId,
    Network,
  );

  async function onSubmit() {
    const addr = await wallet.getChangeAddress();

    const coll_utxo = await wallet.getCollateral();
    const CollateralUTxO: UTxOi = {
      TxID: coll_utxo[0].input.txHash,
      TxIDIndex: coll_utxo[0].input.outputIndex,
    };

    const userUTxOs = await wallet.getUtxos();

    const courseFacilitatorTokenUTxO = userUTxOs.find(
      (utxo: UTxO) => utxo.output.amount.some((a) => a.unit.includes(courseOnchain!.CourseCreatorNFTPolicyID)),
    );

    const assignmentValidatorUtxos = await maestro.fetchAddressUTxOs(courseOnchain!.AssignmentValidatorAddress!);
    const learnerAliasHex = Buffer.from(learnerAlias).toString("hex");
    const assignmentValidatorUTxO = assignmentValidatorUtxos.find(
      (utxo: UTxO) => utxo.output.amount.some((a) => a.unit.includes(learnerAliasHex)),
    );

    const remainingUTxOs = userUTxOs.filter(utxo => utxo !== coll_utxo && utxo !== courseFacilitatorTokenUTxO);
    const UserUTxOs: UTxOi[] = [];
    remainingUTxOs.forEach((utxo: UTxO) => {
      UserUTxOs.push({
        TxID: utxo.input.txHash,
        TxIDIndex: utxo.input.outputIndex,
      });
    });

    const req: RequestData = {
      AssignmentCode: assignmentCode,
      CollateralUTxO: CollateralUTxO,
      CourseFacilitatorDecision: decision,
      CourseFacilitatorTokenUTxO: {
        TxID: courseFacilitatorTokenUTxO.input.txHash,
        TxIDIndex: courseFacilitatorTokenUTxO.input.outputIndex,
      },
      UserAssignmentUTxO: {
        TxID: assignmentValidatorUTxO.input.txHash,
        TxIDIndex: assignmentValidatorUTxO.input.outputIndex,
      },
      UserUTxOs: UserUTxOs,
      address: addr,
      changeAddress: addr,
    };

    console.log(req);

    const response = await axios.post(
      "/api/backend/txs/acceptDenyAssignment",
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
