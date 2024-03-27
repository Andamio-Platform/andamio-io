import { ArrowUpIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function DialogForm({
  children,
  openButton,
  openButtonIntent,
  title,
  buttonLabel,
  buttonLoading,
  buttonDisabled,
  handleSubmit,
}: {
  children: React.ReactNode;
  openButton: string;
  openButtonIntent: "module" | "default" | "dialog";
  title: string;
  buttonLabel: string;
  buttonLoading: boolean;
  buttonDisabled: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        {/* PICK UP HERE */}
        {openButton == "delete" ? (
          <CrossCircledIcon width="18" height="18" />
        ) : (
          <Button intent={openButtonIntent} size="dialog">
            {openButton}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              {children}
              <div className="mt-5 gap-2 sm:mt-4 sm:flex">
                <Button type="submit" disabled={buttonDisabled}>
                  {buttonLoading ? (
                    <ArrowUpIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    buttonLabel
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
