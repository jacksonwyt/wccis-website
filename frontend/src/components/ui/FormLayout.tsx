import React from 'react';
import { Alert } from './Alert';

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  error?: string;
  success?: string;
  className?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  subtitle,
  children,
  error,
  success,
  className = ''
}) => {
  return (
    <div className={`max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-gray-600">{subtitle}</p>
        )}
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          className="mb-6"
        />
      )}

      {success && (
        <Alert
          type="success"
          message={success}
          className="mb-6"
        />
      )}

      {children}
    </div>
  );
};