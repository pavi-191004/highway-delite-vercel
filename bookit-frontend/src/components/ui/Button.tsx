import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  className,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-black",
    secondary: "bg-gray-200 hover:bg-gray-300 text-black",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent",
  };

  return (
    <button
      {...props}
      className={clsx(baseStyles, variantStyles[variant], className)}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
