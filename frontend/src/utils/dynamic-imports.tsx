import dynamic from 'next/dynamic';
import React from 'react';
import type { DynamicOptionsLoadingProps } from 'next/dynamic';

// Default loading component with proper type annotations
export const DefaultLoadingFallback = (props: DynamicOptionsLoadingProps): React.ReactElement => (
  <div className="flex items-center justify-center p-4">
    <div className="w-6 h-6 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
  </div>
);

// Simple type to define loading options
export interface DynamicImportOptions {
  ssr?: boolean;
  loading?: (props: DynamicOptionsLoadingProps) => React.ReactElement;
}

/**
 * Create a dynamically imported component using Next.js dynamic import
 * 
 * @param importFunc Function that returns the component import
 * @param options Options for dynamic import (ssr, loading component)
 * @returns Dynamically imported component
 */
export function createDynamicComponent<T>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  options: DynamicImportOptions = {}
) {
  const { ssr = true, loading = DefaultLoadingFallback } = options;
  
  return dynamic(importFunc, {
    loading,
    ssr
  });
} 