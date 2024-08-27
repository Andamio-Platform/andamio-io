import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import BurnLocalStateMeshNative from "~/components/transactions/course/learner/burnLocalState/BurnLocalStateMeshNative";

export default function BurnLocalStateMeshDialog({
  accessTokenAssetId,
  courseNftPolicyId,
}: {
  accessTokenAssetId: string;
  courseNftPolicyId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className="m-0 p-0">
        <Button size="sm">Un-Enroll</Button>
      </DialogTrigger>
      <DialogContent>
        <p>{accessTokenAssetId}</p>
        <p>{courseNftPolicyId}</p>
        <BurnLocalStateMeshNative
          accessTokenAssetId={accessTokenAssetId}
          courseNftPolicyId={courseNftPolicyId}
        />
      </DialogContent>
    </Dialog>
  );
}
