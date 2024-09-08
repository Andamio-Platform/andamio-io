import React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

interface FormEditButtonsProps {
  hideButtons: boolean | undefined;
  setEditText: (editText: boolean) => void;
}

export default function FormEditButtons({ hideButtons }: FormEditButtonsProps) {
  return (
    <>
      {!hideButtons && (
        <div className="flex flex-row gap-3 px-3">
          <Button size="labeledIcon" intent="outline" type="submit">
            <CheckCircledIcon
              className="rounded-full bg-success text-success-foreground"
              width="22"
              height="22"
            />{" "}
            Save
          </Button>
        </div>
      )}
    </>
  );
}
