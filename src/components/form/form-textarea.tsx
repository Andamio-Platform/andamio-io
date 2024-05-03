import type { InputHTMLAttributes } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  form: any;
  name: string;
  info?: string;
}

export default function FormTextArea(props: InputProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel className="text-foreground">{props.label}</FormLabel>}
          {props.info && <FormDescription>{props.info}</FormDescription>}
          <FormControl>
            <Textarea {...field} placeholder={props.placeholder} className="border-b borderforeground my-3" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
