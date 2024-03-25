import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  Form,
} from "~/components/ui/form";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/shadcn";
import { Button } from "./button";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";

const inputVariants = cva(
  "flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      intent: {
        lesson:
          "bg-neutral-100 border-b border-neutral-400 text-primary-foreground",
        title: "border-b border-neutral-400 text-primary-foreground",
        slt: "flex w-full border-b border-neutral-400",
        text: "bg-neutral-100 border-b border-neutral-400 text-primary-foreground",
      },
      formTextSize: {
        xl: "text-4xl py-8 text-black",
        lg: "text-2xl py-4 text-black",
        md: "text-md pt-2 text-black",
        sm: "text-sm p-1 text-black",
      },
    },
    defaultVariants: {
      intent: "text",
      formTextSize: "md",
    },
  },
);

const textVariants = cva("flex h-9 w-full px-3 py-1 file:border-0 file:bg-transparent file:text-sm file:font-medium", {
  variants: {
    formTextSize: {
      xl: "text-4xl py-8 text-black",
      lg: "text-2xl py-4 text-black",
      md: "text-md pt-2 text-black",
      sm: "text-sm p-1 text-black",
    },
  },
  defaultVariants: {
    formTextSize: "md",
  },
});

export interface ToggleEditableFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  form: any;
  name: string;
  info?: string;
  editText: boolean;
  setEditText: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  hideButtons?: boolean;
  hasForm?: boolean;
}

interface RenderEditButtonsProps {
  hideButtons: boolean | undefined;
  setEditText: (editText: boolean) => void;
}

interface RenderTextFieldProps {
  formTextSize: 'sm' | 'md' | 'lg' | 'xl' | null | undefined
  text: string;
  setEditText: (editText: boolean) => void;
}

const renderEditButtons = ({hideButtons, setEditText}: RenderEditButtonsProps) =>
  !hideButtons && (
    <div className="flex flex-row gap-3 px-3">
      <Button size="icon" variant="ghost" type="submit">
        <CheckCircledIcon className="rounded-full bg-green-900 text-white" width="22" height="22" />
      </Button>
      <Button size="icon" variant="ghost" onClick={() => setEditText(false)}>
        <CrossCircledIcon className="rounded-full bg-red-900 text-white" width="22" height="22" />
      </Button>
    </div>
  );

const renderTextField = ({formTextSize, text, setEditText}: RenderTextFieldProps) => (
  <Button variant="ghost" size={formTextSize} onClick={() => setEditText(true)}>
    <div className={cn(textVariants({ formTextSize }))}>{text}</div>
  </Button>
);


const ToggleEditableField = React.forwardRef<
  HTMLInputElement,
  ToggleEditableFieldProps
>(
  (
    {
      className,
      intent,
      formTextSize,
      form,
      onSubmit,
      editText,
      setEditText,
      text,
      hideButtons,
      hasForm,
      ...props
    },
    ref,
  ) => {

    const renderField = () => (
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem className="flex w-11/12 ">
            <FormControl className="flex w-full">
              <input
                {...field}
                placeholder={props.placeholder}
                className={cn(inputVariants({ intent, formTextSize, className }))}
                ref={ref}
                {...props}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );


    return (
      <>
        {hasForm ? (
          <div className="flex w-full flex-row items-center justify-between pr-5">
            {editText ? (
              <>
                {renderField()}
                {renderEditButtons({hideButtons, setEditText})}
              </>
            ) : (
              <>
                {renderTextField({formTextSize, text, setEditText})}
                {!editText && !hideButtons && (
                  <Button onClick={() => setEditText(!editText)} size="icon" variant="ghost">
                    <Pencil1Icon className="rounded-full bg-white text-blue-900 m-1" width="20" height="20" />
                  </Button>
                )}
              </>
            )}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex w-full flex-row items-center justify-between pr-5">
                {editText ? (
                  <>
                    {renderField()}
                    {renderEditButtons({hideButtons, setEditText})}
                  </>
                ) : (
                  <>
                    {renderTextField({formTextSize, text, setEditText})}
                    {!editText && !hideButtons && (
                      <Button onClick={() => setEditText(!editText)} size="icon" variant="ghost">
                        <Pencil1Icon />
                      </Button>
                    )}
                  </>
                )}
              </div>
            </form>
          </Form>
        )}
      </>
    );
  },
);

ToggleEditableField.displayName = "ToggleEditableField";

export { ToggleEditableField, inputVariants };
