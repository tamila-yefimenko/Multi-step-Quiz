import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-orange-500 text-orange-500 hover:bg-orange-50",
  };

  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200";

  const disabledStyles = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${
        disabled ? disabledStyles : variants[variant]
      }`}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
