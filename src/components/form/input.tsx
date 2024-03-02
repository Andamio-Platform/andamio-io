import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>;
}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={clsx([
        props.className,
        "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
      ])}
      {...props.register(props.name!)}
    />
  );
}
