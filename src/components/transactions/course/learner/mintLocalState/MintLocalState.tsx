import { useWallet } from "@meshsdk/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import { api } from "~/utils/api";

export default function MintLocalState({
  userAccessTokenUnit,
  courseNftPolicyId,
}: {
  userAccessTokenUnit: string;
  courseNftPolicyId: string;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { courseInfo } = useCourseByPolicyId(courseNftPolicyId);

  const { wallet } = useWallet();

  const router = useRouter();

  const { data: unsignedTxCBOR } =
    api.learnerCourseTransactions.mintLocalState.useQuery({
      userAccessTokenUnit: userAccessTokenUnit,
      courseNftPolicyId: courseNftPolicyId,
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
      await router.push(`/course/${courseInfo?.courseCode}`);
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 text-sm">
      {(unsignedTxCBOR ?? isLoading) ? (
        <Button
          onClick={onSubmit}
          className="mt-10 bg-secondary p-5 text-black transition-all hover:bg-success hover:font-semibold"
        >
          Enroll In {courseInfo?.title}
        </Button>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
    </div>
  );
}
