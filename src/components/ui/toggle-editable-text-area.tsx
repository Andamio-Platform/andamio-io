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
  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      intent: {
        description:
          "bg-neutral-100 border-b border-neutral-400 text-primary-foreground",
      },
      formTextSize: {
        md: "text-md pt-2 text-black",
      },
    },
    defaultVariants: {
      intent: "description",
      formTextSize: "md",
    },
  },
);

const textVariants = cva("flex min-h-[60px] w-full ", {
  variants: {
    formTextSize: {
      md: "text-md pt-2 text-black",
    },
  },
  defaultVariants: {
    formTextSize: "md",
  },
});

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
    return (
      <>
        {hasForm ? (
          <div className="flex w-full flex-row items-center justify-between pr-5">
            <>
              {editText ? (
                <div className="flex w-full flex-row justify-between">
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

                  {!hideButtons && (
                    <div className="flex flex-row gap-3 px-3">
                      <Button size="icon" variant="ghost" type="submit">
                        <CheckCircledIcon
                          className="rounded-full bg-green-900 text-white"
                          width="22"
                          height="22"
                        />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditText(false)}
                      >
                        <CrossCircledIcon
                          className="rounded-full bg-red-900 text-white"
                          width="22"
                          height="22"
                        />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size={formTextSize}
                  onClick={() => setEditText(true)}
                >
                  <div className={cn(textVariants({ formTextSize }))}>
                    {text}
                  </div>
                </Button>
              )}
            </>
            <>
              {!editText && !hideButtons && (
                <Button
                  onClick={() => setEditText(!editText)}
                  size="icon"
                  variant="ghost"
                >
                  <Pencil1Icon />
                </Button>
              )}
            </>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex w-full flex-row items-center justify-between pr-5">
                <>
                  {editText ? (
                    <div className="flex w-full flex-row justify-between">
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

                      {!hideButtons && (
                        <div className="flex flex-row justify-end">
                          <Button variant="ghost" type="submit" size="icon">
                            <CheckCircledIcon
                              className="rounded-full bg-green-900 text-white"
                              width="22"
                              height="22"
                            />
                          </Button>
                          <Button
                            onClick={() => setEditText(false)}
                            variant="ghost"
                            size="icon"
                          >
                            <CrossCircledIcon
                              className="rounded-full bg-red-900 text-white"
                              width="22"
                              height="22"
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size={formTextSize}
                      onClick={() => setEditText(true)}
                    >
                      <div className={cn(textVariants({ formTextSize }))}>
                        {text}
                      </div>
                    </Button>
                  )}
                </>
                <>
                  {!editText && !hideButtons && (
                    <Button
                      onClick={() => setEditText(!editText)}
                      size="icon"
                      variant="ghost"
                    >
                      <Pencil1Icon />
                    </Button>
                  )}
                </>
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
