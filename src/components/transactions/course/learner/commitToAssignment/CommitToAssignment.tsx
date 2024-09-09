import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useState } from "react";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import useNetworkCourseConfig from "~/hooks/onchain/useNetworkCourseConfig";
import { NETWORK } from "~/andamio.config";
import { useToast } from "~/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import { api } from "~/utils/api";

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
  const { toast } = useToast();

  const { connected } = useWallet();
  const { accessTokenAsset } = useAccessToken();
  const [isReadyToCommit, setIsReadyToCommit] = useState(false);
  const [assignmentInfo, setAssignmentInfo] = useState("");

  const { courseOnchain } = useNetworkCourseConfig(courseCode, NETWORK);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      assignmentInfo: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setAssignmentInfo(data.assignmentInfo);
    if (accessTokenAsset && courseOnchain) {
      setIsReadyToCommit(true);
    } else {
      toast({
        title: "Something went wrong",
        description: `accessTokenAsset and courseOnchain missing`,
      });
    }
  }

  return (
    <div className="flex w-full items-center justify-center rounded-md border py-3 font-mono text-sm">
      {!isReadyToCommit ? (
        <>
          {!connected ? (
            <CardanoWallet />
          ) : isCommitted ? (
            <p>Already in Commitment</p>
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
                <Button type="submit">Ready To Commit</Button>
              </form>
            </Form>
          )}
        </>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <CommitToAssignmentButton
            userAccessTokenUnit={accessTokenAsset!.unit}
            courseNftPolicyId={courseOnchain!.CourseCreatorNFTPolicyID}
            assignmentCode={assignmentCode}
            assignmentInfo={assignmentInfo}
          />
        </>
      )}
    </div>
  );
}

export function CommitToAssignmentButton({
  userAccessTokenUnit,
  courseNftPolicyId,
  assignmentCode,
  assignmentInfo,
}: {
  userAccessTokenUnit: string;
  courseNftPolicyId: string;
  assignmentCode: string;
  assignmentInfo: string;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { wallet } = useWallet();

  const { data: unsignedTxCBOR } =
    api.learnerCourseTransactions.commitToAssignment.useQuery({
      userAccessTokenUnit: userAccessTokenUnit,
      courseNftPolicyId: courseNftPolicyId,
      assignmentCode: assignmentCode,
      assignmentInfo: assignmentInfo,
    });

  async function onSubmit() {
    setIsLoading(true);

    if (unsignedTxCBOR) {
      const signedTx = await wallet.signTx(unsignedTxCBOR.unsignedTxCBOR, true);
      console.log(signedTx);
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
      {unsignedTxCBOR || isLoading ? (
        <Button onClick={onSubmit}>Commit To Assignment</Button>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
    </div>
  );
}
