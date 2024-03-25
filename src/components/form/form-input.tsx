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

export default function FormInput(props: InputProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel className="text-black">{props.label}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={props.placeholder} className="border-b border-black my-3" />
          </FormControl>
          {props.info && <FormDescription>{props.info}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
