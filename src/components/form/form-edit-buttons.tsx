import React from "react";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

interface FormEditButtonsProps {
  hideButtons: boolean | undefined;
  setEditText: (editText: boolean) => void;
}

export default function FormEditButtons({
  hideButtons,
  setEditText,
}: FormEditButtonsProps) {
  return (
    <>
      {!hideButtons && (
        <div className="flex flex-row gap-3 px-3">
          <Button size="icon" intent="ghost" type="submit">
            <CheckCircledIcon
              className="rounded-full bg-success text-primary-foreground"
              width="22"
              height="22"
            />
          </Button>
        </div>
      )}
    </>
  );
}
