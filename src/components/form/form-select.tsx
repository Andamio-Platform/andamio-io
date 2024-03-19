import type { InputHTMLAttributes } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  form: any;
  name: string;
  options: { value: any; label: any }[];
  info?: string;
}

export default function FormSelect(props: SelectProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
