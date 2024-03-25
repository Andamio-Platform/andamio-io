import React from "react";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/shadcn";

const textVariants = cva(
  "flex w-full file:border-0 file:bg-transparent file:text-sm file:font-medium",
  {
    variants: {
      formTextSize: {
        xl: "text-4xl text-black",
        lg: "text-2xl text-black",
        md: "w-[500px] min-h-[200px] text-left text-pretty",
        sm: "text-sm text-black",
        slt: "text-md text-black sm:w-[350px] md:w-[430px] lg:w-[480px] xl:w-[580px]" // todo
      },
    },
    defaultVariants: {
      formTextSize: "md",
    },
  },
);

interface FormEditableFieldProps {
  formTextSize: "sm" | "md" | "lg" | "xl" | "slt" | null | undefined;
  text: string;
  setEditText: (editText: boolean) => void;
}

export default function FormEditableField({
  formTextSize,
  text,
  setEditText,
}: FormEditableFieldProps) {
  return (
    <Button
      variant="ghost"
      size={formTextSize}
      onClick={() => setEditText(true)}
    >
      <div className={cn(textVariants({ formTextSize }))}>{text}</div>
    </Button>
  );
}
