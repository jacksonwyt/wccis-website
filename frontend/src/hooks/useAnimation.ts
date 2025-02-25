import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const useHeaderScroll = () => {
  return false;
};

import { ScrollAnimationOptions, AnimationResult } from './types';

// Simplified hook that no longer provides animations
export const useScrollAnimation = (options: ScrollAnimationOptions = {}): AnimationResult => {
  const { ref, inView } = useInView({
    threshold: options.threshold || 0.1,
    triggerOnce: options.triggerOnce !== undefined ? options.triggerOnce : true,
    rootMargin: options.rootMargin || '0px',
  });
  
  return { 
    ref, 
    inView, 
    style: {
      opacity: 1,
      transform: 'none',
      transition: 'none'
    } // Provide required properties with neutral values
  };
};

// Simplified parallax hook with no effects
export const useParallax = () => {
  const ref = useRef<HTMLDivElement>(null);

  return {
    parallaxRef: ref,
    parallaxStyle: {}
  };
};

// Animation variants for hero sections - now all empty with no animation
export const heroAnimation = {
  initial: {},
  animate: {},
  transition: {}
};

export const heroTitle = {
  initial: {},
  animate: {},
  transition: {}
};

export const heroSubtitle = {
  initial: {},
  animate: {},
  transition: {}
};
