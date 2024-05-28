import { Asset, BlockfrostProvider, UTxO } from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "~/components/loading";
import UTxOi from "~/components/transactions/model";
import { Button } from "~/components/ui/button";
import { blockfrostProvider } from "~/config/blockfrost";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";
import maestro from "~/config/maestro";
import useCourseOnchain from "~/hooks/useCourseOnchain";
import { Network } from "~/config/Network";
import { INDEXER_URL } from "~/config/indexer";
import { toast, useToast } from "~/components/ui/use-toast";
import { set } from "date-fns";

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

export default function CommitToAssignment({
  courseId,
  assignmentCode,
}: {
  courseId: string;
  assignmentCode: string;
}) {
  const router = useRouter();
  const { toast } = useToast()

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

      const localStateUtxos = await maestro.fetchAddressUTxOs(
        "addr_test1zq0mlfagzryh0h5ek8gzqdql6eu47r8eju8ts24wk66uuv6vlu7w7kccycfgum045pdq9h2rnnyt6ep7wghq27nmwr0qxmvrs0",
      );
      const localStateUtxo = localStateUtxos.find((utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(accessTokenNameHex!)),
      );

      const ModuleTokenUTxOs = await maestro.fetchAddressUTxOs(
        "addr_test1zrwgmka397urn6492pzv8fztztxr9apfnv52mjzawlg55vjvlu7w7kccycfgum045pdq9h2rnnyt6ep7wghq27nmwr0qpaj3kf",
      );
      const assignmentCodeHex = Buffer.from(assignmentCode, "utf-8").toString(
        "hex",
      );
      const moduleTokenUtxo = ModuleTokenUTxOs.find((utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(assignmentCodeHex)),
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

      const res = await axios.get(
        `${INDEXER_URL}/api/v1/instance-validator/fetchLocalStateValildatorRefUtxoByCourseNftPolicy?policy=${courseOnchain?.CourseCreatorNFTPolicyID!}`,
      );

      const localStateValidatorRefUTxO: _utxo = res.data;

      const req: RequestData = {
        Address: addr,
        ChangeAddress: addr,
        UserUTxOs,
        CollateralUTxO,
        UserLocalStateUTxO: {
          TxID: localStateUtxo.input.txHash,
          TxIDIndex: localStateUtxo.input.outputIndex,
        },
        UserAccessTokenUTxO: {
          TxID: accessTokenUtxo.input.txHash,
          TxIDIndex: accessTokenUtxo.input.outputIndex,
        },
        ModuleTokenUTxO: {
          TxID: moduleTokenUtxo.input.txHash,
          TxIDIndex: moduleTokenUtxo.input.outputIndex,
        }, // match token with assignment code
        AssignmentCode: assignmentCode,
        StudentAssignmentInfo: "Assignment Info",
        AssignmentValidatorAddress: courseOnchain?.AssignmentValidatorAddress!,
        LocalStateValidatorAddress: courseOnchain?.LocalStateValidatorAddress!,
        LocalStatePolicyID: courseOnchain?.LocalStatePolicyID!,
        LocalStateValidatorRefUTxO: {
          TxID: localStateValidatorRefUTxO.tx_hash,
          TxIDIndex: localStateValidatorRefUTxO.tx_id,
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

      setIsLoading(false);
      toast({
        title: "Transaction submitted",
        description: `${txId}`,
      })
      // setIsConfirming(true);
      // let confirmation = false;
      // while (!confirmation) {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      //   confirmation = await ConfirmTx(txId);
      // }

      // set database

      // console.log()

      // void router.push("/home");
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
