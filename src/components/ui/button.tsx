import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/shadcn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        default: "bg-primary text-primary-foreground shadow hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        lesson: "border border-blue-900 hover:bg-blue-200",
        delete: "bg-warning hover:bg-red-800 text-red-100",
        edit: "bg-slate-700 hover:bg-slate-800 text-slate-100",
        module:
          "flex flex-col min-w-1/3 mx-auto px-3 py-1 gap-2 items-center justify-center hover:bg-primary hover:text-primary-foreground rounded-md transition-colors ease-in-out duration-300",
        courseOutlineAction:
          "flex flex-col w-full mx-auto p-2 my-2 items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors ease-in-out duration-300 border border-primary",
        dialog:
          "border border-input bg-primary text-primary-foreground shadow-sm hover:bg-accent-foreground hover:text-accent",
        navigation: "flex flex-row w-full gap-5 items-center h-[40px]",
        learnMore:
          "bg-secondary text-secondary-foreground opacity-90 hover:opacity-100",
      },
      size: {
        default: "p-1 px-3 bg-primary text-primary-foreground",
        sm: "h-5 rounded-sm p-2 text-xs",
        md: "text-md pt-2 text-foreground",
        lg: "text-xl",
        xl: "text-2xl p-3",
        slt: "text-md text-foreground",
        icon: "flex flex-col xl:flex-row rounded-full gap-1",
        bigIcon: "flex h-[30px] w-[30px] items-center justify-center",
        labeledIcon:
          "flex min-w-[90px] items-center justify-center justify-between px-3 py-1",
        dialog: "h-[30px] rounded-sm w-[150px] text-xs",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
