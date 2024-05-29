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
          <Button intent="ghost" size="icon">
            <GearIcon className="w-[14px] h-[14px] xl:w-[16px] xl:h-[16px]" />
            <p className="text-xs lg:text-sm">Settings</p>
          </Button>
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
