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

const inputVariants = cva(
  "flex h-9 w-full rounded-sm border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      intent: {
        lesson: "bg-neutral-100 border border-neutral-400 text-primary-foreground",
        slt: "flex font-mono w-full border border-neutral-400",
        text: "bg-neutral-100 border border-neutral-400 text-primary-foreground",
      },
      formTextSize: {
        xl: "text-4xl py-8 font-mono text-black",
        lg: "text-2xl py-4 font-mono text-black",
        md: "text-md pt-2 font-mono text-black",
        sm: "text-sm p-1 font-mono text-black",
      },
    },
    defaultVariants: {
      intent: "text",
      formTextSize: "md",
    },
  },
);

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
                          <input
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
                      <Button
                        size="sm"
                        variant="lesson"
                        type="submit"
                        className="bg-green-800"
                      >
                        OK
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setEditText(false)}
                        className="bg-red-800"
                      >
                        X
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Button variant="ghost" size={formTextSize} onClick={() => setEditText(true)}>
                  <p>{text}</p>
                </Button>
              )}
            </>
            <>
              {!editText && !hideButtons && (
                <Button
                  onClick={() => setEditText(!editText)}
                  size="sm"
                  variant="edit"
                >
                  EDIT
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
                              <input
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
                          <Button
                            size="sm"
                            variant="lesson"
                            type="submit"
                            className="bg-green-800"
                          >
                            OK
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setEditText(false)}
                            className="bg-red-800"
                          >
                            X
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>{text}</p>
                  )}
                </>
                <>
                  {!editText && !hideButtons && (
                    <Button
                      onClick={() => setEditText(!editText)}
                      size="sm"
                      variant="edit"
                    >
                      EDIT
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

ToggleEditableField.displayName = "ToggleEditableField";

export { ToggleEditableField, inputVariants };
