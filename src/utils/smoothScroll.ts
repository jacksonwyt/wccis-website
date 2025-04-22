/**
 * Smooth scroll utility for enhancing the navigation experience
 */

// Default options for smooth scrolling
interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  easing?: (t: number) => number;
  callback?: () => void;
}

// Easing functions
export const easings = {
  // Linear
  linear: (t: number) => t,
  
  // Quadratic
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // Cubic
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Exponential
  easeInExpo: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
  }
};

/**
 * Smoothly scrolls to the specified target
 * @param target - The target element or selector to scroll to
 * @param options - Scrolling options
 */
export const scrollTo = (
  target: HTMLElement | string | number,
  options: SmoothScrollOptions = {}
) => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Default options
  const {
    duration = prefersReducedMotion ? 0 : 800,
    offset = 0,
    easing = easings.easeInOutCubic,
    callback
  } = options;

  // Determine target position
  let targetPosition: number;
  
  if (typeof target === 'number') {
    // If target is a number, use it directly
    targetPosition = target;
  } else {
    // Get element if string selector was provided
    const targetElement = typeof target === 'string'
      ? document.querySelector(target)
      : target;

    if (!targetElement) {
      console.error('Invalid scroll target');
      return;
    }

    // Get element's position
    const rect = targetElement.getBoundingClientRect();
    targetPosition = rect.top + window.scrollY;
  }

  // Apply offset
  targetPosition += offset;

  // Calculate animation
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  // Skip animation for no distance or reduced motion
  if (distance === 0 || prefersReducedMotion) {
    window.scrollTo({ top: targetPosition });
    if (callback) callback();
    return;
  }

  // Animation function
  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    
    // Calculate progress (0 to 1)
    const progress = Math.min(elapsedTime / duration, 1);
    
    // Apply easing function
    const easedProgress = easing(progress);
    
    // Set new scroll position
    window.scrollTo({
      top: startPosition + distance * easedProgress,
    });

    // Continue animation or finish
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else if (callback) {
      callback();
    }
  };

  // Start animation
  requestAnimationFrame(animateScroll);
};

/**
 * Sets up smooth scrolling for all anchor links on the page
 * @param options - Default scroll options to apply
 * @returns A cleanup function to remove event listeners
 */
export const initSmoothScrolling = (defaultOptions: SmoothScrollOptions = {}) => {
  // Don't run on server
  if (typeof window === 'undefined') return () => {};

  // Store event listeners for cleanup
  const clickHandlers = new Map<Element, EventListener>();
  let domReadyHandler: EventListener | null = null;
  
  // Function to add event listeners
  const setupEventListeners = () => {
    // Find all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      const clickHandler = (event: Event) => {
        // Get target from href
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        event.preventDefault();
        
        // Scroll to target - Cast the Element to HTMLElement
        scrollTo(targetElement as HTMLElement, defaultOptions);
        
        // Update URL hash without scrolling - Fixed check for pushState
        if (typeof window.history !== 'undefined' && typeof window.history.pushState === 'function') {
          window.history.pushState(null, '', href);
        } else {
          // Fallback
          window.location.hash = href;
        }
      };
      
      // Store the handler for cleanup
      clickHandlers.set(link, clickHandler);
      link.addEventListener('click', clickHandler);
    });
  };
  
  // Function to clean up event listeners
  const cleanupEventListeners = () => {
    clickHandlers.forEach((handler, link) => {
      link.removeEventListener('click', handler);
    });
    clickHandlers.clear();
  };

  // Set up the DOMContentLoaded handler
  domReadyHandler = () => {
    setupEventListeners();
  };
  
  // Add event listener for DOMContentLoaded if document is not already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', domReadyHandler);
  } else {
    // Document already loaded, set up immediately
    setupEventListeners();
  }
  
  // Return cleanup function
  return () => {
    if (domReadyHandler) {
      document.removeEventListener('DOMContentLoaded', domReadyHandler);
    }
    cleanupEventListeners();
  };
}; 