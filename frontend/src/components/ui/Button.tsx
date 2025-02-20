// frontend/src/components/ui/Button.tsx
import React from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const variantStyles = variant === 'primary' 
    ? "bg-futuristic-accent text-white hover:bg-futuristic-accent/90"
    : "bg-futuristic-surface text-futuristic-light hover:bg-futuristic-surface/90";

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
