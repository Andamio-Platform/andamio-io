import type { InputHTMLAttributes } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "~/components/ui/form";

import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  form: any;
  name: string;
  options: { value: any; label: any }[];
  info?: string;
}

export default function FormSelectRadioGroup(props: SelectProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="my-3">
            {props.options.map((option) => (
              <div className="flex flex-row gap-2 my-1 items-center" key={option.value}>
                <RadioGroupItem
                  key={option.value}
                  value={option.value}
                  id={option.value}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          {props.info && <FormDescription>{props.info}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // return (
  //   <FormField
  //     control={props.form.control}
  //     name={props.name}
  //     render={({ field }) => (
  //       <FormItem>
  //         {props.label && <FormLabel>{props.label}</FormLabel>}
  //         <FormControl>
  //           <Input {...field} />
  //         </FormControl>
  //         {props.placeholder && (
  //           <FormDescription>{props.placeholder}</FormDescription>
  //         )}
  //         <FormMessage />
  //       </FormItem>
  //     )}
  //   />
  // );
}
