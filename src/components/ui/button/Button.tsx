import React from "react";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  // ... tambahkan prop custom lain jika ada
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, size = "md", variant = "primary", ...props }, ref) => {
    const baseStyle = "rounded-md font-medium focus:outline-none transition";
    const sizeStyle = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-5 py-2.5",
      lg: "text-lg px-6 py-3",
    };

    const variantStyle = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyle, sizeStyle[size], variantStyle[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;