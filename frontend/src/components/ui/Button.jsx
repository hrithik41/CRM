import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Button = ({
  children,
  variant = "default",
  size = "default",
  active = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-white text-[#0B213E] hover:bg-gray-100 shadow-sm",
    ghost: active
      ? "bg-[#1A365D] text-white border-b-2 border-white"
      : "text-gray-300 hover:text-white hover:bg-white/5",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    icon: "text-gray-300 hover:text-white", // Transparent background, changes text color on hover
    profile:
      "bg-blue-500 text-white ring-2 ring-white/10 hover:ring-white/30 shadow-inner",
  };

  const sizes = {
    default: "h-9 px-4 py-2 rounded-md",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-10 px-8 rounded-md",
    icon: "h-9 w-9 rounded-md",
    iconSm: "p-1.5 rounded-md",
    pill: "px-3 py-1.5 text-xs rounded-full",
    circle: "w-8 h-8 rounded-full text-xs",
  };

  const combinedClassName = `${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
