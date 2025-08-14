import type { FC, LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label: FC<InputLabelProps> = ({
  children = "Input Label",
  className = "",
  required = false,
  ...rest
}) => {
  const baseClasses = "block font-medium text-gray-700 mb-1";

  return (
    <label className={twMerge(`${baseClasses} ${className}`)} {...rest}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
