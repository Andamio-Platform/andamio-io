import type { InputHTMLAttributes } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  form: any;
  name: string;
  info?: string;
}

export default function SltEditInput(props: InputProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex w-11/12 ">
          <FormControl className="flex w-full">
            <Input {...field} placeholder={props.placeholder} className="flex font-mono w-full border border-slate-400" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
