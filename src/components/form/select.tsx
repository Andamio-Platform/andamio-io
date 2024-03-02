import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  register: UseFormRegister<FieldValues>;
  options: { value: any; label: any }[];
}

export default function Select(props: Props) {
  return (
    <select
      {...props}
      className={clsx([
        props.className,
        "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6",
      ])}
      {...props.register(props.name!)}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
