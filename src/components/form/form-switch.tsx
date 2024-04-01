import type { InputHTMLAttributes } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  form: any;
  name: string;
  info?: string;
}

export default function FormSwitch(props: SwitchProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center gap-5 text-foreground">
          <div>
            {props.label && <FormLabel>{props.label}</FormLabel>}
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </TooltipTrigger>
              <TooltipContent>
                <p>{props.info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </FormItem>
      )}
    />
  );
}
