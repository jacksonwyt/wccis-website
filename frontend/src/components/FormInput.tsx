// frontend/src/components/FormInput.tsx
import React from 'react';
import { UseFormRegister, FieldError, RegisterOptions } from 'react-hook-form';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: FieldError;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  rules,
  error,
  className = '',
}) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, rules)}
        className={`
          w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition duration-200 ease-in-out
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;