// frontend/src/components/dynamic-components.tsx
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import header and footer components with performance optimizations
export const Header = dynamic(() => import('./layout/Header'), {
  ssr: true,
  loading: () => null
});

export const Footer = dynamic(() => import('./layout/Footer'), {
  ssr: true,
  loading: () => null
});

// Form components
export const DynamicForm = dynamic(() => 
  import('./DynamicForm').then(mod => mod.DynamicForm), {
  ssr: false, // Client-side only to ensure form state management works correctly
  loading: () => <div className="animate-pulse h-96 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
});

// Form layout wrapper
export const FormLayout = ({ 
  children, 
  title, 
  subtitle, 
  error, 
  success, 
  maxWidth = "2xl",
  className = ""
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  error?: string;
  success?: string;
  maxWidth?: string;
  className?: string;
}) => {
  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full"
  };

  const selectedWidth = widthClasses[maxWidth] || widthClasses["2xl"];

  return (
    <div className={`${selectedWidth} w-full ${className}`}>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
        {title && <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>}
        {subtitle && <p className="text-gray-600 dark:text-gray-300 mb-6">{subtitle}</p>}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md">
            {success}
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};