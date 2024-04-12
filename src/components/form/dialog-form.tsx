import {
  ArrowUpIcon,
  CrossCircledIcon,
  GearIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import Link from "next/link";

export default function DialogForm({
  children,
  openButton,
  openButtonIntent,
  title,
  description,
  buttonLabel,
  buttonLoading,
  buttonDisabled,
  handleSubmit,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  openButton: string;
  openButtonIntent: "module" | "default" | "dialog";
  title: string;
  description?: string;
  buttonLabel: string;
  buttonLoading: boolean;
  buttonDisabled: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const hasIconButton =
    openButton == "delete" || openButton == "moduleSettings";

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {/* PICK UP HERE */}
        {hasIconButton ? (
          <div className="flex flex-row gap-1 text-xs">
            <GearIcon width="18" height="18" />
            <p>Settings</p>
          </div>
        ) : (
          <Button intent={openButtonIntent} size="dialog" className="mx-auto">
            {openButton}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="mt-5 gap-2 sm:mt-4 sm:flex">
            <Button type="submit" disabled={buttonDisabled} intent="default">
              {buttonLoading ? (
                <SymbolIcon className="h-5 w-5 animate-spin" />
              ) : (
                buttonLabel
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
