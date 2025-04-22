// frontend/src/components/ui/Button.tsx
import React from 'react';
import { cn } from '@/utils/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = "group relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-1 focus:ring-brand-primary focus:ring-offset-1 isolate";
    
    const variants = {
      primary: "bg-gradient-to-r from-brand-primary to-brand-dark text-white hover:brightness-110",
      secondary: "bg-white text-brand-dark hover:bg-brand-light/50",
      outline: "border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
      ghost: "text-blue-400 hover:text-blue-300 transition-colors",
      glass: "backdrop-blur-md bg-white/30 hover:bg-white/40 border border-white/30 text-brand-dark"
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          size === "sm" && "px-3 py-1.5 md:px-4 md:py-2 text-sm gap-2 rounded-[var(--border-radius-sm)]",
          size === "md" && "px-5 py-2.5 md:px-6 md:py-3 text-base gap-3 rounded-[var(--border-radius-md)]",
          size === "lg" && "px-6 py-3 md:px-8 md:py-4 text-base md:text-lg gap-3 rounded-[var(--border-radius-md)]",
          (disabled || isLoading) ? "opacity-50 cursor-not-allowed" : "",
          className || ""
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 mr-2" />
        )}
        {!isLoading && leftIcon && (
          <span className="inline-block mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-block ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';