import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "~/components/ui/form";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/shadcn";

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      intent: {
        lesson: "bg-neutral-400 text-primary-foreground",
        slt: "flex font-mono w-full border border-slate-400",
        text: "bg-neutral-400 text-primary-foreground",
      },
      formTextSize: {
        xl: "text-4xl py-5",
        lg: "text-2xl py-3",
        md: "text-md py-2",
        sm: "text-sm py-1",
      },
    },
    defaultVariants: {
      intent: "text",
      formTextSize: "md",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  form: any;
  name: string;
  info?: string;
}

const ToggleEditableField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, intent, formTextSize, ...props }, ref) => {
    return (
      <FormField
        control={props.form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem className="flex w-11/12 ">
            <FormControl className="flex w-full">
              <input
                {...field}
                placeholder={props.placeholder}
                className={cn(
                  inputVariants({ intent, formTextSize, className }),
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
  },
);

export { ToggleEditableField, inputVariants };
