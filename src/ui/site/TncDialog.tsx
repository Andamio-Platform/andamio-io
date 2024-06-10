import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { api } from "~/utils/api";
import Link from "next/link";

const latestTncVersion = "0.0.0";

export default function TncDialog() {
  const ctx = api.useUtils();
  const { data: sessionData, update: updateSession } = useSession();

  const [mustApproveTnc, setMustApproveTnc] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: updateTncVersion } =
    api.user.updateUserTncVersion.useMutation({
      onSuccess: () => {
        void ctx.user.getUserById.invalidate();
        void ctx.user.getUserByName.invalidate();
        setIsOpen(false);
        setMustApproveTnc(false);
      },
      onError: (e) => {},
    });

  useEffect(() => {
    if (
      !!sessionData?.user &&
      sessionData.user.tncVersion != latestTncVersion
    ) {
      setIsOpen(true);
      setMustApproveTnc(true);
    }
  }, [sessionData?.user.tncVersion]);

  function handleApprovalClick() {
    if (sessionData?.user) {
      updateTncVersion({
        userId: sessionData.user.id,
        tncVersion: latestTncVersion,
      });
    }
  }

  if(!sessionData) return

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader className="font-bold">
          Changes to Terms and Conditions
        </DialogHeader>
        <h2 className="text-sm text-secondary-foreground">
          Terms and Conditions Version 0.0.0 (pre-release)
        </h2>

        <p className="text-sm text-secondary-foreground">
          Andamio Version 0.2.11
        </p>

        <p className="py-1 font-medium">
          Thank you for supporting Andamio as we continue to build it.
        </p>
        <p className="py-1 font-medium">
          You are currently viewing a pre-release version of Andamio. The
          platform is evolving rapidly, so please expect changes.
        </p>
        <p className="py-1 font-medium">
          We are currently putting finishing touches on a Terms + Conditions
          document and a Privacy Policy. You will be notified by this
          application when these documents are updated. Until then, the Andamio
          team reserves all rights to remove users, change access permissions,
          and edit content published on the Andamio Platform.
        </p>
        <Button onClick={handleApprovalClick}>OK</Button>
      </DialogContent>
    </Dialog>
  );
}
