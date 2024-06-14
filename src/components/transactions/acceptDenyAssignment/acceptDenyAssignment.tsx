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
import { Asset, UtxoWithSlot } from "@maestro-org/typescript-sdk";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";
interface RequestData {
  CourseGovernanceUTxO: UTxOi;
  CourseNFTTokenName: string;
  CourseFacilitatorAccessTokenName: string;
  AssignmentCode: string;
  CollateralUTxO: UTxOi;
  CourseFacilitatorDecision: "accept" | "deny";
  CourseFacilitatorAccessTokenUTxO: UTxOi;
  UserAssignmentUTxO: UTxOi;
  UserUTxOs: UTxOi[];
  address: string;
  changeAddress: string;
  LocalStateValidatorAddress: string;
  AssignmentValidatorAddress: string;
  LocalStatePolicyID: string;
  AssignmentValidatorRefUTxO: UTxOi;
  CourseNFTPolicyID: string;
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

    const courseFacilitatorAccessTokenUTxO = userUTxOs.find((utxo: UTxO) =>
      utxo.output.amount.some((a) =>
        a.unit.includes(ACCESS_TOKEN_POLICY_ID),
      ),
    );

    const accessToken = courseFacilitatorAccessTokenUTxO?.output.amount.find((item: Asset) =>
      item.unit.includes(ACCESS_TOKEN_POLICY_ID),
    );
    const accessTokenNameHex = accessToken?.unit.substring(62);
    const accessTokenName = Buffer.from(
      accessTokenNameHex ? accessTokenNameHex : "",
      "hex",
    ).toString("utf-8");

    const assignmentValidatorUtxos = await maestro.fetchAddressUTxOs(
      courseOnchain!.AssignmentValidatorAddress,
    );
    const learnerAliasHex = Buffer.from(learnerAlias).toString("hex");
    const assignmentValidatorUTxO = assignmentValidatorUtxos.find(
      (utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(learnerAliasHex)),
    );

    const remainingUTxOs = userUTxOs.filter(
      (utxo) => utxo !== coll_utxo && utxo !== courseFacilitatorAccessTokenUTxO,
    );
    const UserUTxOs: UTxOi[] = [];
    remainingUTxOs.forEach((utxo: UTxO) => {
      UserUTxOs.push({
        TxID: utxo.input.txHash,
        TxIDIndex: utxo.input.outputIndex,
      });
    });

    const res = await axios.get(
      `${INDEXER_URL}/api/instance-validator/assignmentValidatorRefUtxoByCourseNftPolicy?policy=${courseOnchain!.CourseCreatorNFTPolicyID}`,
    );

    const assignmentValidatorRefUTxO: UtxoWithSlot = res.data;

    const courseGovernanceUTxO_res = await axios.get(
      `${INDEXER_URL}/api/course-governance-validator/utxoByCourseNftPolicy?policy=${courseOnchain!.CourseCreatorNFTPolicyID}`,
    );

    const courseGovernanceUTxO: UtxoWithSlot = courseGovernanceUTxO_res.data;
    const courseNFTTokenName = courseGovernanceUTxO.assets.find((asset: Asset) => asset.unit.includes(courseOnchain!.CourseCreatorNFTPolicyID))?.unit.substring(56);

    const req: RequestData = {
      CourseGovernanceUTxO: {
        TxID: courseGovernanceUTxO.tx_hash,
        TxIDIndex: courseGovernanceUTxO.index,
      },
      CourseNFTTokenName: courseNFTTokenName!,
      CourseFacilitatorAccessTokenName: accessTokenName,
      AssignmentCode: assignmentCode,
      CollateralUTxO: CollateralUTxO,
      CourseFacilitatorDecision: decision,
      CourseFacilitatorAccessTokenUTxO: {
        TxID: courseFacilitatorAccessTokenUTxO.input.txHash,
        TxIDIndex: courseFacilitatorAccessTokenUTxO.input.outputIndex,
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
        TxIDIndex: assignmentValidatorRefUTxO.index,
      },
      CourseNFTPolicyID: courseOnchain!.CourseCreatorNFTPolicyID,
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
