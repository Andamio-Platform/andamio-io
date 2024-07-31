import type { InputHTMLAttributes } from "react";

import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  form: any;
  name: string;
  options: { id: string; value: string; label: string }[];
  info?: string;
}

export function FormCheckboxes(props: SelectProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={() => (
        <FormItem className="text-foreground">
          <div className="mb-1 text-foreground">
            <FormLabel className="text-base">{props.label}</FormLabel>
            <FormDescription className="">{props.info}</FormDescription>
          </div>
          {props.options.map((item) => (
            <FormField
              key={item.id}
              control={props.form.control}
              name={props.name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-center space-x-3 py-1"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.id,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
