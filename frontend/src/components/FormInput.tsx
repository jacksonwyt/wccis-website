// frontend/src/components/FormInput.tsx (Enhanced version)
import React from "react";
import { UseFormRegister, FieldError, RegisterOptions } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: FieldError;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
}

const FormInput: React.FC<FormInputProps> = ({
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
}) => {
  const { ref, ...rest } = register(id, rules);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-futuristic-light">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        {...rest}
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-futuristic-accent focus:border-futuristic-accent transition duration-200 ease-in-out ${
          error ? "border-red-500" : "border-futuristic-light/30"
        } ${className}`}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500 mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
