import { useWallet } from "@meshsdk/react";
import { type Dispatch, type SetStateAction } from "react";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import { api } from "~/utils/api";

export default function MintLocalState({
  userAccessTokenUnit,
  courseNftPolicyId,
  setSuccessTxHash,
}: {
  userAccessTokenUnit: string;
  courseNftPolicyId: string;
  setSuccessTxHash: Dispatch<SetStateAction<string | undefined>>;
}) {
  const { toast } = useToast();
  const { courseInfo } = useCourseByPolicyId(courseNftPolicyId);

  const { wallet } = useWallet();

  const { data: unsignedTxCBOR } =
    api.learnerCourseTransactions.mintLocalState.useQuery({
      userAccessTokenUnit: userAccessTokenUnit,
      courseNftPolicyId: courseNftPolicyId,
    });

  async function onSubmit() {
    if (unsignedTxCBOR) {
      const signedTx = await wallet.signTx(unsignedTxCBOR.unsignedTxCBOR, true);
      console.log(signedTx);
      const txId = await wallet.submitTx(signedTx);
      console.log(txId);
      toast({
        title: "Transaction submitted",
        description: `${txId}`,
      });
      setSuccessTxHash(txId);
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 text-sm">
      {unsignedTxCBOR ? (
        <Button
          onClick={onSubmit}
          className="mt-10 bg-primary p-5 text-primary-foreground transition-all hover:bg-success-foreground hover:font-semibold hover:text-success"
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
