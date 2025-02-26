import React, { useState } from 'react';
import { cn } from '@/utils/utils';
import { AlertCircle, Check } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    return (
      <div className={cn(fullWidth ? 'w-full' : '', 'mb-4')}>
        {label && (
          <label className="block text-sm font-medium text-gray-100 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            className={cn(
              'block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6',
              error ? 'ring-red-500 focus:ring-red-500' : 'ring-white/10',
              success ? 'ring-green-500 focus:ring-green-500' : '',
              className
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={4}
            {...props}
          />
          {error && (
            <div className="absolute right-2 top-2 text-red-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
          {success && (
            <div className="absolute right-2 top-2 text-green-500">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
); 