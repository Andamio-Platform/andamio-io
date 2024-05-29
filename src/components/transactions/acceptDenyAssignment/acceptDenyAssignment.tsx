import axios from "axios";
import UTxOi from "../model";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Button } from "~/components/ui/button";
import { UTxO } from "@meshsdk/core";
import useCourseOnchain from "~/hooks/useCourseOnchain";
import { Network } from "~/config/Network";
import maestro from "~/config/maestro";
import { INDEXER_URL } from "~/config/indexer";
import { useToast } from "~/components/ui/use-toast";

interface RequestData {
  AssignmentCode: string;
  CollateralUTxO: UTxOi;
  CourseFacilitatorDecision: "accept" | "deny";
  CourseFacilitatorTokenUTxO: UTxOi;
  UserAssignmentUTxO: UTxOi;
  UserUTxOs: UTxOi[];
  address: string;
  changeAddress: string;
  LocalStateValidatorAddress: string;
  AssignmentValidatorAddress: string;
  LocalStatePolicyID: string;
  AssignmentValidatorRefUTxO: UTxOi;
  CourseCreatorNFTPolicyID: string;
}

export default function AcceptDenyAssignment({
  courseCode,
  learnerAlias,
  decision,
  assignmentCode,
}: {
  courseCode: string;
  learnerAlias: string;
  decision: "accept" | "deny";
  assignmentCode: string;
}) {
  const { toast } = useToast();
  const { connected, wallet } = useWallet();
  const { courseOnchain, isLoadingCourseOnchain } = useCourseOnchain(
    courseCode,
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

    const courseFacilitatorTokenUTxO = userUTxOs.find((utxo: UTxO) =>
      utxo.output.amount.some((a) =>
        a.unit.includes(courseOnchain!.CourseCreatorNFTPolicyID),
      ),
    );

    const assignmentValidatorUtxos = await maestro.fetchAddressUTxOs(
      courseOnchain!.AssignmentValidatorAddress,
    );
    const learnerAliasHex = Buffer.from(learnerAlias).toString("hex");
    const assignmentValidatorUTxO = assignmentValidatorUtxos.find(
      (utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(learnerAliasHex)),
    );

    const remainingUTxOs = userUTxOs.filter(
      (utxo) => utxo !== coll_utxo && utxo !== courseFacilitatorTokenUTxO,
    );
    const UserUTxOs: UTxOi[] = [];
    remainingUTxOs.forEach((utxo: UTxO) => {
      UserUTxOs.push({
        TxID: utxo.input.txHash,
        TxIDIndex: utxo.input.outputIndex,
      });
    });

    const res = await axios.get(
      `${INDEXER_URL}/api/v1/instance-validator/fetchAssignmentValidatorRefUtxoByCourseNftPolicy?policy=${courseOnchain!.CourseCreatorNFTPolicyID}`,
    );
    interface _utxo {
      id: number;
      tx_hash: string;
      tx_id: number;
      datum: {
        bytes: string;
      };
      asset: string;
      consumed: boolean;
    }

    const assignmentValidatorRefUTxO: _utxo = res.data;

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
      LocalStateValidatorAddress: courseOnchain!.LocalStateValidatorAddress,
      AssignmentValidatorAddress: courseOnchain!.AssignmentValidatorAddress,
      LocalStatePolicyID: courseOnchain!.LocalStatePolicyID,
      AssignmentValidatorRefUTxO: {
        TxID: assignmentValidatorRefUTxO.tx_hash,
        TxIDIndex: assignmentValidatorRefUTxO.tx_id,
      },
      CourseCreatorNFTPolicyID: courseOnchain!.CourseCreatorNFTPolicyID,
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
    toast({
      title: "Transaction submitted",
      description: `${txId}`,
    });
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
