// frontend/src/components/ui/LoadingComponents.tsx
import React from "react";

interface LoadingProps {
  isLoading: boolean;
  pastDelay: boolean;
}

export const HeaderSkeleton: React.FC<LoadingProps> = ({ isLoading, pastDelay }) => {
  if (\!isLoading || \!pastDelay) return null;
  
  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="hidden md:flex space-x-6">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const FooterSkeleton: React.FC<LoadingProps> = ({ isLoading, pastDelay }) => {
  if (\!isLoading || \!pastDelay) return null;
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {Array(4).fill(0).map((_, i) => (
            <div key={i}>
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                {Array(4).fill(0).map((_, j) => (
                  <div key={j} className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const FormSkeletonLoader: React.FC<LoadingProps> = ({ isLoading, pastDelay }) => {
  if (\!isLoading || \!pastDelay) return null;
  
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
      
      <div className="space-y-4 mt-8">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
        
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded mt-6"></div>
      </div>
    </div>
  );
};
