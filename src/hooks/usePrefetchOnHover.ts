import { useCallback, useRef, useEffect } from 'react';
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
  const prefetcherRef = useRef<ReturnType<typeof prefetchAfterDelay> | null>(null);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (prefetcherRef.current) {
        prefetcherRef.current.cancel();
        prefetcherRef.current = null;
      }
    };
  }, []);

  const onMouseEnter = useCallback(() => {
    // Also prefetch the Next.js page
    if (typeof router.prefetch === 'function') {
      router.prefetch(router.pathname);
    }
    
    // Cancel any existing prefetch
    if (prefetcherRef.current) {
      prefetcherRef.current.cancel();
    }
    
    // Start prefetching the component
    const prefetcher = prefetchAfterDelay(importFunc, delay);
    prefetcherRef.current = prefetcher;
    prefetcher.startPrefetch();
  }, [router, importFunc, delay]);

  const onMouseLeave = useCallback(() => {
    // Cancel the prefetch if mouse leaves before completion
    if (prefetcherRef.current) {
      prefetcherRef.current.cancel();
      prefetcherRef.current = null;
    }
  }, []);

  return { onMouseEnter, onMouseLeave };
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
  const prefetchersRef = useRef<Array<ReturnType<typeof prefetchAfterDelay>>>([]);
  
  // Clean up all prefetchers when the component unmounts
  useEffect(() => {
    return () => {
      prefetchersRef.current.forEach(prefetcher => prefetcher.cancel());
      prefetchersRef.current = [];
    };
  }, []);
  
  const onMouseEnter = useCallback(() => {
    // Prefetch the Next.js page route
    if (typeof router.prefetch === 'function') {
      router.prefetch(path);
    }
    
    // Clean up any existing prefetchers
    prefetchersRef.current.forEach(prefetcher => prefetcher.cancel());
    prefetchersRef.current = [];
    
    // Prefetch the component resources
    importFuncs.forEach(importFunc => {
      const prefetcher = prefetchAfterDelay(importFunc, delay);
      prefetchersRef.current.push(prefetcher);
      prefetcher.startPrefetch();
    });
  }, [router, path, importFuncs, delay]);
  
  const onMouseLeave = useCallback(() => {
    // Cancel prefetching if the mouse leaves before completion
    prefetchersRef.current.forEach(prefetcher => prefetcher.cancel());
    prefetchersRef.current = [];
  }, []);
  
  const onClick = useCallback(() => {
    // Immediately load the path
    router.push(path);
  }, [router, path]);
  
  return { onMouseEnter, onMouseLeave, onClick };
}; 