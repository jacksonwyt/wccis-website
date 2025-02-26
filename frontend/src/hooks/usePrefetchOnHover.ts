import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { prefetchAfterDelay } from '@/utils/prefetcher';

/**
 * Custom hook that returns mouse event handlers to prefetch resources when hovering over a link
 * @param importFunc - Dynamic import function for the resource to prefetch
 * @param delay - Delay in ms before prefetching starts (default: 150ms)
 */
export const usePrefetchOnHover = (
  importFunc: () => Promise<any>,
  delay = 150
) => {
  const router = useRouter();

  const onPrefetch = useCallback(() => {
    // Also prefetch the Next.js page
    if (typeof router.prefetch === 'function') {
      router.prefetch(router.pathname);
    }
    
    // Start prefetching the component
    const { startPrefetch } = prefetchAfterDelay(importFunc, delay);
    startPrefetch();
  }, [router, importFunc, delay]);

  return onPrefetch;
};

/**
 * Custom hook that returns mouse event handlers to prefetch resources when hovering over a link
 * @param path - The route path to prefetch
 * @param importFuncs - Array of dynamic import functions to prefetch
 * @param delay - Delay in ms before prefetching starts (default: 150ms)
 */
export const usePrefetchPathOnHover = (
  path: string,
  importFuncs: Array<() => Promise<any>> = [],
  delay = 150
) => {
  const router = useRouter();
  
  const prefetchHandlers = {
    onMouseEnter: useCallback(() => {
      // Prefetch the Next.js page route
      if (typeof router.prefetch === 'function') {
        router.prefetch(path);
      }
      
      // Prefetch the component resources
      importFuncs.forEach(importFunc => {
        const { startPrefetch } = prefetchAfterDelay(importFunc, delay);
        startPrefetch();
      });
    }, [router, path, importFuncs, delay]),
    
    onClick: useCallback(() => {
      // Immediately load the path
      router.push(path);
    }, [router, path])
  };
  
  return prefetchHandlers;
}; 