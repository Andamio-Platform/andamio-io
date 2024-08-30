import { useWallet } from "@meshsdk/react";
import { useState } from "react";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { type CourseModuleOverview } from "~/types/db";
import { api } from "~/utils/api";

export default function MintCourseModule({
  accessTokenAssetId,
  courseNftPolicyId,
  courseModuleOverview,
}: {
  accessTokenAssetId: string;
  courseNftPolicyId: string;
  courseModuleOverview: CourseModuleOverview;
}) {
  const { toast } = useToast();

  const { wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const slts = courseModuleOverview.slts.map((slt) => ({
    sltId: slt.moduleIndex.toString(),
    sltContent: slt.sltText,
  }));

  const courseModuleDetails = [
    {
      moduleId: courseModuleOverview.moduleCode,
      slts: slts,
      assignmentContent: courseModuleOverview.assignments[0]?.title,
    },
  ];

  const { data: unsignedTxCBOR } =
    api.creatorCourseTransactions.mintCourseModule.useQuery({
      userAccessTokenUnit: accessTokenAssetId,
      courseNftPolicyId: courseNftPolicyId,
      moduleInfos: JSON.stringify(courseModuleDetails),
    });

  async function onSubmit() {
    setIsLoading(true);
    try {
      console.log(unsignedTxCBOR);

      if (unsignedTxCBOR) {
        const signedTx = await wallet.signTx(
          unsignedTxCBOR.unsignedTxCBOR,
          true,
        );
        console.log(signedTx);
        const txId = await wallet.submitTx(signedTx);
        console.log(txId);
        toast({
          title: "Transaction submitted",
          description: `${txId}`,
        });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error", error);
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {unsignedTxCBOR ? (
        <Button onClick={onSubmit}>Publish Credential Criteria</Button>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
      {isLoading && <Loading />}
    </div>
  );
}
