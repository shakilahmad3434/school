import type { FC, TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  rows = 2,
  placeholder = "Enter your text...",
  className = "",
  ...rest
}) => {
  const baseClasses =
    "px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed text-sm transition duration-150 w-full";

  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      className={twMerge(`${baseClasses} ${className}`)}
      {...rest}
    />
  );
};

export default Textarea;
