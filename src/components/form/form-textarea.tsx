// TODO:
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
  height?: number;
  defaultValue?: string;
}

export default function FormTextArea(props: InputProps) {
  let textAreaHeight: string;
  if (props.height) {
    const h = props.height.toString();
    textAreaHeight = "min-h-[" + h + "px]";
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && (
            <FormLabel className="text-foreground">{props.label}</FormLabel>
          )}
          {props.info && <FormDescription>{props.info}</FormDescription>}
          <FormControl>
            <Textarea
              {...field}
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
              className={`borderforeground my-3 border-b ${props.height && textAreaHeight}`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
