import React, { useState } from 'react';
import { cn } from '@/utils/utils';
import { AlertCircle, Check } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  icon?: React.ComponentType<any>;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      icon: Icon,
      fullWidth = true,
      className,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {/* Floating Label */}
        {label && (
          <label
            className={cn(
              'absolute left-3 transition-all duration-200 pointer-events-none',
              (isFocused || hasValue) 
                ? '-top-2 text-xs bg-black px-1 z-10'
                : 'top-3 text-base',
              isFocused ? 'text-blue-400' : 'text-gray-400',
              error && 'text-red-400'
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          <input
            type={type}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value !== '');
            }}
            onChange={(e) => setHasValue(e.target.value !== '')}
            className={cn(
              'w-full px-3 py-3 bg-white/[0.07] backdrop-blur-sm',
              'border transition-all duration-200',
              'text-white placeholder-gray-400',
              'focus:outline-none focus:ring-1',
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                : success
                ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20'
                : 'border-white/[0.1] focus:border-blue-500 focus:ring-blue-500/20',
              Icon && 'pl-10',
              className
            )}
            {...props}
          />

          {/* Left Icon */}
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}

          {/* Status Icons */}
          {(error || success) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </div>
          )}

          {/* Animated Focus Border */}
          <div
            className={cn(
              'absolute inset-0 pointer-events-none',
              'transition-opacity duration-300',
              isFocused ? 'opacity-100' : 'opacity-0',
              error
                ? 'border-2 border-red-500/50'
                : success
                ? 'border-2 border-green-500/50'
                : 'border-2 border-blue-500/50'
            )}
          />
        </div>

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              error ? 'text-red-400' : 'text-gray-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';