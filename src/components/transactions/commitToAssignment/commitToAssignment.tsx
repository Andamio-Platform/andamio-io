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
import useNetworkCourseConfig from "~/hooks/course/useNetworkCourseConfig";
import { NETWORK } from "~/andamio.config";
import { INDEXER_URL } from "~/config/indexer";
import { toast, useToast } from "~/components/ui/use-toast";
import { set } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { UtxoWithSlot } from "@maestro-org/typescript-sdk";
import { DecodedCourseInstanceDatum } from "@andamiojs/datum-utils";

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

const FormSchema = z.object({
  assignmentInfo: z.string().min(2, {
    message: "Assignment Info must be at least 2 characters.",
  }),
});

export default function CommitToAssignment({
  courseCode,
  assignmentCode,
  isCommitted,
}: {
  courseCode: string;
  assignmentCode: string;
  isCommitted: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const { connected, wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { courseOnchain, isLoadingCourseOnchain } = useNetworkCourseConfig(
    courseCode,
    NETWORK,
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      assignmentInfo: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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

      if (!courseOnchain) {
        throw new Error("Course not found on-chain");
      }

      const localStateValidatorRefUTxO_res = await axios.get(
        `${INDEXER_URL}/api/instance-validator/localStateValildatorRefUtxoByCourseNftPolicy?policy=${courseOnchain.CourseCreatorNFTPolicyID}`,
      );
      const localStateValidatorRefUTxO: UtxoWithSlot =
        localStateValidatorRefUTxO_res.data;

      const localStateUtxo_res = await axios.get(
        `${INDEXER_URL}/api/course-state/courseStateUtxoByCourseNftPolicyAndAlias?policy=${courseOnchain.CourseCreatorNFTPolicyID}&alias=${accessTokenName}`,
      );
      const localStateUtxo: UtxoWithSlot = localStateUtxo_res.data;

      const moduleTokenUtxo_res = await axios.get(
        `${INDEXER_URL}/api/module-ref/moduleRefValidatorUtxoByCourseNftPolicyAndTokenName?policy=${courseOnchain.CourseCreatorNFTPolicyID}&token_name=${assignmentCode}`,
      );
      const moduleTokenUtxo: UtxoWithSlot = moduleTokenUtxo_res.data;

      const instance_res = await axios.get(
        `${INDEXER_URL}/api/instance-validator/decodedCourseInstanceDatumByCourseNftPolicy?policy=${courseOnchain.CourseCreatorNFTPolicyID}`,
      );

      const instance: DecodedCourseInstanceDatum = instance_res.data;

      const req: RequestData = {
        Address: addr,
        ChangeAddress: addr,
        UserUTxOs,
        CollateralUTxO,
        UserLocalStateUTxO: {
          TxID: localStateUtxo.tx_hash,
          TxIDIndex: localStateUtxo.index,
        },
        UserAccessTokenUTxO: {
          TxID: accessTokenUtxo.input.txHash,
          TxIDIndex: accessTokenUtxo.input.outputIndex,
        },
        ModuleTokenUTxO: {
          TxID: moduleTokenUtxo.tx_hash,
          TxIDIndex: moduleTokenUtxo.index,
        }, // match token with assignment code
        AssignmentCode: assignmentCode,
        StudentAssignmentInfo: data.assignmentInfo,
        AssignmentValidatorAddress: instance.AssignmentAddrs[0]!,
        LocalStateValidatorAddress: instance.CourseStateAddr,
        LocalStatePolicyID: instance.LearnerCsList[0]!,
        LocalStateValidatorRefUTxO: {
          TxID: localStateValidatorRefUTxO.tx_hash,
          TxIDIndex: localStateValidatorRefUTxO.index,
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
      });
      // setIsConfirming(true);
      // let confirmation = false;
      // while (!confirmation) {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      //   confirmation = await ConfirmTx(txId);
      // }

      // set database

      // console.log()

      setSubmitted(true);
    } catch (error) {
      setIsLoading(false);
      console.error("Error", error);
    }
  }

  return (
    <div className="flex w-full items-center justify-center rounded-md border py-3 font-mono text-sm">
      {!isLoading ? (
        <>
          {!connected ? (
            <CardanoWallet />
          ) : isCommitted ? (
            <p>Already in Commitment</p>
          ) : submitted ? (
            <p>Submitted</p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto w-11/12 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="assignmentInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignment Info</FormLabel>
                      <FormControl>
                        <Input placeholder="enter assignment info" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Commit</Button>
              </form>
            </Form>
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
