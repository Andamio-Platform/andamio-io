import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import BurnLocalStateMeshNative from "../burnLocalState/burnLocalStateMeshNative";

export default function BurnLocalStateMeshDialog({
  accessTokenAssetId,
  courseNftPolicyId,
}: {
  accessTokenAssetId: string;
  courseNftPolicyId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm">Un-Enroll in this Course</Button>
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
