import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";

export default function SuccessfulTxDialog({
  successTxHash,
}: {
  successTxHash: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!!successTxHash) {
      setOpen(true);
    }
  }, [successTxHash]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h1 className="font-beckman text-lg">Tx Successful!</h1>

        <p>Tx Hash: {successTxHash}</p>
      </DialogContent>
    </Dialog>
  );
}
