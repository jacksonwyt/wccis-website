import React from 'react';
import type { DynamicOptionsLoadingProps } from 'next/dynamic';

// Default loading spinner with proper types for Next.js dynamic imports
export const DefaultLoadingSpinner = ({ isLoading, pastDelay }: DynamicOptionsLoadingProps): React.ReactElement | null => {
  // Only show loading indicator after delay to prevent flickering
  if (!isLoading || !pastDelay) return null;
  
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-6 h-6 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};

// Header skeleton with proper types
export const HeaderSkeleton = ({ isLoading, pastDelay }: DynamicOptionsLoadingProps): React.ReactElement | null => {
  if (!isLoading || !pastDelay) return null;
  
  return (
    <div className="h-16 w-full bg-white/80 dark:bg-gray-900/80 animate-pulse"></div>
  );
};

// Footer skeleton with proper types
export const FooterSkeleton = ({ isLoading, pastDelay }: DynamicOptionsLoadingProps): React.ReactElement | null => {
  if (!isLoading || !pastDelay) return null;
  
  return (
    <div className="h-40 w-full bg-white/80 dark:bg-gray-900/80 animate-pulse"></div>
  );
};

// Form skeleton with proper types
export const FormSkeletonLoader = ({ isLoading, pastDelay }: DynamicOptionsLoadingProps): React.ReactElement | null => {
  if (!isLoading || !pastDelay) return null;
  
  return (
    <div className="space-y-4 w-full animate-pulse">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
    </div>
  );
}; 