import React from 'react';
import { Alert } from './Alert';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  error?: string;
  success?: string;
  className?: string;
  showBackButton?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl'
};

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  subtitle,
  children,
  error,
  success,
  className = '',
  showBackButton = false,
  maxWidth = 'xl'
}) => {
  const router = useRouter();

  return (
    <div className={`w-full mx-auto ${maxWidthClasses[maxWidth]} ${className}`}>
      <div className="relative p-8 border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02]">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 dark:from-gray-800/20 dark:to-gray-900/10 -z-10" />
        
        {/* Content */}
        <div className="relative z-10">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="mb-6 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:-translate-x-1 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
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

          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};