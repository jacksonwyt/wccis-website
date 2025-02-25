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
                : 'top-3 text-sm text-gray-500'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full bg-gray-700/30 border-gray-700/50 text-gray-200',
              'rounded-[var(--border-radius-md)] py-3',
              'focus:ring-1 focus:ring-brand-primary focus:border-brand-primary',
              'transition-all duration-200',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              success && 'border-green-500 focus:ring-green-500 focus:border-green-500',
              Icon ? 'pl-10' : 'pl-4',
              'pr-4',
              label ? 'pt-4 pb-2' : 'py-3',
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value !== '');
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(e.target.value !== '');
              props.onChange?.(e);
            }}
            {...props}
          />
          
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
          
          {success && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Check className="h-5 w-5 text-green-500" />
            </div>
          )}
        </div>
        
        {(helperText || error) && (
          <p className={cn(
            'mt-1 text-xs',
            error ? 'text-red-500' : 'text-gray-500'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';