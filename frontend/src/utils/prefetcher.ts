import { NextRouter } from 'next/router';

/**
 * Prefetches a URL after a short delay to avoid unnecessary prefetching on accidental hovers
 * 
 * @param url - The URL to prefetch or a dynamic import function
 * @param delayOrRouter - Either delay in milliseconds or Next.js router instance
 * @param optionalDelay - Optional delay when router is provided as second parameter
 * @returns An object with startPrefetch method and a cancel method
 */
export const prefetchAfterDelay = (
  urlOrImportFunc: string | (() => Promise<any>), 
  delayOrRouter: NextRouter | number = 100,
  optionalDelay?: number
) => {
  let timeoutId: NodeJS.Timeout;
  
  const startPrefetch = () => {
    const delay = typeof delayOrRouter === 'number' ? delayOrRouter : (optionalDelay || 100);
    
    timeoutId = setTimeout(() => {
      if (typeof urlOrImportFunc === 'string' && typeof delayOrRouter !== 'number') {
        // It's a URL with router
        delayOrRouter.prefetch(urlOrImportFunc);
      } else if (typeof urlOrImportFunc === 'function') {
        // It's an import function
        urlOrImportFunc();
      }
    }, delay);
  };

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return {
    startPrefetch,
    cancel
  };
}; 