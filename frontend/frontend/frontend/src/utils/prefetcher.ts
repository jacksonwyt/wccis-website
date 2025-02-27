// frontend/src/utils/prefetcher.ts
/**
 * Utility to prefetch resources during idle time or on-demand
 */

/**
 * Prefetches an array of dynamic imports
 * This can be used to load components in the background
 * that will be needed later, improving perceived performance
 */
export async function prefetchResources(
  resources: (() => Promise<any>)[],
  options: { priority?: boolean; timeout?: number } = {}
) {
  const { priority = false, timeout = 0 } = options;

  const loadResources = async () => {
    try {
      // If there is a timeout, delay the loading
      if (timeout > 0) {
        await new Promise((resolve) => setTimeout(resolve, timeout));
      }

      // Load all resources in parallel
      await Promise.all(resources.map((resource) => resource()));
    } catch (error) {
      // Silently handle errors in prefetching
      console.debug("Error prefetching resources:", error);
    }
  };

  // If priority is true, load immediately
  // Otherwise, use requestIdleCallback if available, or setTimeout as fallback
  if (priority) {
    loadResources();
  } else if (typeof window \!== "undefined") {
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(loadResources);
    } else {
      setTimeout(loadResources, 200);
    }
  }
}

/**
 * Common imports that can be prefetched
 */
export const commonImports = {
  // Layout components
  layout: [
    () => import("@/components/layout/Header"),
    () => import("@/components/layout/Footer"),
  ],
  
  // Quote form pages
  quoteForms: [
    () => import("@/pages/insurance/general-liability-quote"),
    () => import("@/pages/insurance/workers-comp-quote"),
    () => import("@/pages/insurance/commercial-auto-quote"),
  ],
};
