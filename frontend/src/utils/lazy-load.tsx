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

// Define a type for the import function that always returns a module with a default export
type ImportFunc<T> = () => Promise<{ default: T }>;

/**
 * Higher order function to create lazy loaded components that works with both
 * default exports and named exports
 * 
 * @param importFunc Dynamic import function that returns a module with a default export
 * @param fallback Optional fallback component to show during loading
 * @returns Lazy loaded component
 * 
 * Usage examples:
 * - For default exports: () => import('./Component').then(m => ({ default: m.default }))
 * - For named exports: () => import('./Component').then(m => ({ default: m.NamedComponent }))
 */
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFunc: ImportFunc<T>,
  fallback = <DefaultLoadingFallback />
) {
  // Create a lazy component using React.lazy
  const LazyImport = lazy(importFunc);
  
  // Return a component that wraps the lazy import in a Suspense boundary
  return (props: React.ComponentProps<T>) => (
    <LazyLoadWrapper fallback={fallback}>
      <LazyImport {...props} />
    </LazyLoadWrapper>
  );
} 