import React, { lazy, Suspense } from 'react';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Simple loading fallback component
export const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="w-6 h-6 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
  </div>
);

// Wrapper for lazy-loaded components
export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  fallback = <DefaultLoadingFallback />
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

// Higher order function to create lazy loaded components
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback = <DefaultLoadingFallback />
) {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <LazyLoadWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyLoadWrapper>
  );
} 