import React from "react";
import {
  FormItem,
  FormLabel, // todo
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
import FormEditButtons from "../form/form-edit-buttons";
import FormEditableField from "../form/form-editable-field";

const inputVariants = cva(
  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      intent: {
        description:
          "bg-neutral-100 border-b border-neutral-400 text-primary-foreground ",
      },
      formTextSize: {
        md: "w-[500px] min-h-[190px] text-left text-pretty text-black",
      },
    },
    defaultVariants: {
      intent: "description",
      formTextSize: "md",
    },
  },
);

export interface ToggleEditableTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
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

const ToggleEditableTextArea = React.forwardRef<
  HTMLTextAreaElement,
  ToggleEditableTextAreaProps
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
    const renderTextArea = () => (
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem className="flex w-11/12 ">
            <FormControl className="flex w-full">
              <textarea
                {...field}
                placeholder={props.placeholder}
                className={cn(
                  inputVariants({
                    intent,
                    formTextSize,
                    className,
                  }),
                )}
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
                {renderTextArea()}
                <FormEditButtons
                  hideButtons={hideButtons}
                  setEditText={setEditText}
                />
              </>
            ) : (
              <>
                <FormEditableField
                  formTextSize={formTextSize}
                  text={text}
                  setEditText={setEditText}
                />
                {!editText && !hideButtons && (
                  <Button
                    onClick={() => setEditText(!editText)}
                    size="icon"
                    variant="ghost"
                  >
                    <Pencil1Icon
                      className="m-1 rounded-full bg-white text-blue-900"
                      width="20"
                      height="20"
                    />
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
                    {renderTextArea()}
                    <FormEditButtons
                      hideButtons={hideButtons}
                      setEditText={setEditText}
                    />
                  </>
                ) : (
                  <>
                    <FormEditableField
                      formTextSize={formTextSize}
                      text={text}
                      setEditText={setEditText}
                    />
                    {!editText && !hideButtons && (
                      <Button
                        onClick={() => setEditText(!editText)}
                        size="icon"
                        variant="ghost"
                      >
                        <Pencil1Icon
                          className="m-1 rounded-full bg-white text-blue-900"
                          width="20"
                          height="20"
                        />
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

ToggleEditableTextArea.displayName = "ToggleEditableTextArea";

export { ToggleEditableTextArea, inputVariants };
