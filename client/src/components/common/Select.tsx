import type { FC, SelectHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

const Select: FC<SelectProps> = ({
  children,
  className = "",
  disabled,
  ...rest
}) => {
  const baseClasses =
    "px-3 py-2 bg-white border border-gray-300 rounded-md text-sm w-full capitalize focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <select
      className={twMerge(`${baseClasses} ${className}`)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
