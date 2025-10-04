import React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "outline-primary"
    | "success"
    | "danger"
    | "warning"
    | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    {
      // Variants
      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] border-0 focus:ring-blue-500":
        variant === "primary",

      "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md focus:ring-gray-500":
        variant === "secondary",

      "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 shadow-sm hover:shadow-md focus:ring-gray-500":
        variant === "outline",

      "bg-blue-50 border-2 border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-800 shadow-sm hover:shadow-md focus:ring-blue-500":
        variant === "outline-primary",

      "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-0 focus:ring-green-500":
        variant === "success",

      "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-0 focus:ring-red-500":
        variant === "danger",

      "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-0 focus:ring-yellow-500":
        variant === "warning",

      "hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-500":
        variant === "ghost",

      // Sizes
      "h-8 px-3 py-1 text-sm": size === "sm",
      "h-10 px-4 py-2 text-base": size === "md",
      "h-12 px-6 py-3 text-lg": size === "lg",

      // Full width
      "w-full": fullWidth,

      // Loading state
      "opacity-75 cursor-not-allowed pointer-events-none": loading || disabled,
    }
  );

  const iconClasses = cn("flex-shrink-0", {
    "w-3 h-3": size === "sm",
    "w-4 h-4": size === "md",
    "w-5 h-5": size === "lg",
  });

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg
            className={cn(iconClasses, "animate-spin")}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="ml-2">Loading...</span>
        </>
      );
    }

    // Icon-only button
    if (Icon && !children) {
      return <Icon className={iconClasses} />;
    }

    if (Icon && iconPosition === "left") {
      return (
        <>
          <Icon className={cn(iconClasses, "mr-2")} />
          {children}
        </>
      );
    }

    if (Icon && iconPosition === "right") {
      return (
        <>
          {children}
          <Icon className={cn(iconClasses, "ml-2")} />
        </>
      );
    }

    return children;
  };

  return (
    <button
      className={cn(baseClasses, className)}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default CustomButton;
