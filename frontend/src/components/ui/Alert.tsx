// frontend/src/components/ui/Alert.tsx
import React from 'react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  className?: string;
}

const alertStyles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
};

export const Alert: React.FC<AlertProps> = ({ type, message, onClose, className = '' }) => (
  <div className={`p-4 rounded-lg border ${alertStyles[type]} ${className}`}>
    <p>{message}</p>
    {onClose && (
      <button
        onClick={onClose}
        className="absolute top-4 right-4 hover:opacity-75"
        aria-label="Close alert"
      >
        ×
      </button>
    )}
  </div>
);