import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    icon?: string;
}

const Button: FC<ButtonInterface> = ({ children, icon = "", ...rest }) => {
    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-103 duration-300 cursor-pointer"
            {...rest}
        >
            {
                !!icon &&
                <i className={`ri-${icon} mr-1`}></i>
            }
            {children}
        </button>
    );
};

export default Button;
