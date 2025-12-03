import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "success";

export type Props = {
  children?: ReactNode;
  isLoading?: boolean;
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<Variant, string> = {
  primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-400",
  secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400",
  danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-400",
  success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-400",
};

const Button = (props: Props) => {
  const {
    children,
    isLoading = false,
    variant = "primary",
    className = "",
    ...rest
  } = props;

  return (
    <button
      type="submit"
      className={`w-full flex items-center justify-center px-4 py-2 rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {isLoading && (
        <div
          role="spinbutton"
          className="h-5 w-5 border-4 mr-3 border-white border-t-transparent rounded-full animate-spin"
        ></div>
      )}
      {children}
    </button>
  );
};

export default Button;
