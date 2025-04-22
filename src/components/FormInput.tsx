// frontend/src/components/FormInput.tsx (Enhanced version)
import React from "react";
import { UseFormRegister, FieldError, RegisterOptions, FieldErrorsImpl, Merge, Path } from "react-hook-form";
import { AlertCircle } from "lucide-react";

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  id: Path<TFormValues>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
  helperText?: string;
  textarea?: boolean;
}

const FormInput = <TFormValues extends Record<string, unknown>>(
  {
    id,
    label,
    type = "text",
    placeholder,
    register,
    rules,
    error,
    className = "",
    disabled = false,
    autoComplete,
    helperText,
    textarea = false
  }: FormInputProps<TFormValues>
) => {
  const { ref, ...rest } = register(id, rules);

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {label}
      </label>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
            ref={ref}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${error ? 'border-red-300' : ''} ${className}`}
            rows={4}
          />
        ) : (
          <input
            {...rest}
            id={id}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            ref={ref}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            className={`block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          />
        )}
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {helperText && !error && (
        <p 
          id={`${id}-helper`} 
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
      {error && (
        <p 
          id={`${id}-error`} 
          className="text-sm text-red-500"
          role="alert"
        >
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInput;