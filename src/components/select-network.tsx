import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  options: { value: any; label: any }[];
}

export default function SelectNetwork(props: Props) {
  return (
    <select
      {...props}
      className={clsx([
        props.className,
        "mt-2 block w-48 rounded-md border-0 py-1 px-5 bg-gray-900 text-gray-300 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6",
      ])}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
