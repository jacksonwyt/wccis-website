// Utility for prefetching components and page chunks to reduce loading times and memory spikes

/**
 * Prefetches components and pages when the browser is idle
 * @param modules - An array of dynamic import functions to prefetch
 */
export const prefetchResources = (modules: Array<() => Promise<any>>) => {
  if (typeof window === 'undefined' || !('requestIdleCallback' in window)) {
    return; // Not in browser or requestIdleCallback not supported
  }

  // @ts-ignore - requestIdleCallback might not be typed
  window.requestIdleCallback(
    () => {
      modules.forEach(importFunc => {
        // Fire and forget imports to trigger prefetching
        importFunc().catch(() => {
          // Silently ignore prefetch errors
        });
      });
    },
    { timeout: 2000 } // 2 second timeout
  );
};

/**
 * Prefetches a page module after a delay (useful for hover prefetching)
 * @param importFunc - The dynamic import function
 * @param delay - Delay in ms before prefetching
 */
export const prefetchAfterDelay = (importFunc: () => Promise<any>, delay = 150) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  const startPrefetch = () => {
    timeoutId = setTimeout(() => {
      importFunc().catch(() => {
        // Silently ignore prefetch errors
      });
    }, delay);
  };
  
  const cancelPrefetch = () => {
    clearTimeout(timeoutId);
  };
  
  return {
    startPrefetch,
    cancelPrefetch
  };
};

/**
 * Common imports for major sections of the app that can be prefetched on idle
 */
export const commonImports = {
  quoteForms: [
    () => import('@/pages/insurance/general-liability-quote'),
    () => import('@/pages/insurance/commercial-auto-quote'),
    () => import('@/pages/insurance/workers-comp-quote'),
    () => import('@/components/DynamicForm'), 
  ],
  layout: [
    () => import('@/components/Header'),
    () => import('@/components/Footer'),
  ],
  contact: [
    () => import('@/pages/contact')
  ]
}; 