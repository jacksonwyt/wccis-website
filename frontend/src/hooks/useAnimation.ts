import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const useHeaderScroll = () => {
  return false;
};

import { ScrollAnimationOptions, AnimationResult } from './types';

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
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : `translateY(${options.distance || 20}px)`,
      transition: `all ${options.duration || 0.5}s ${options.easing || 'ease'} ${options.delay || 0}s`,
    }
  };
};

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

export const heroButtons = {
  initial: {},
  animate: {},
  transition: {}
};

export const sectionTitle = {
  initial: {},
  animate: {},
  transition: {}
};

export const stepsAnimation = {
  initial: {},
  animate: {},
  transition: {}
};

export const formAnimation = {
  initial: {},
  animate: {},
  transition: {}
};
