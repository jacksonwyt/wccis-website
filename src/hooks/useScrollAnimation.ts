// src/hooks/useScrollAnimation.ts
import { useRef } from 'react';

// Animation variants type kept for compatibility
export type AnimationVariant = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'zoom-out'
  | 'flip-up'
  | 'flip-down'
  | 'none';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  variant?: AnimationVariant;
  distance?: number; // pixels to travel
  duration?: number; // in ms
  delay?: number; // in ms
  easing?: string; // CSS easing function
}

// All animation functionality removed
export const useScrollAnimation = (_options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Return a simple object with no animations
  return { 
    elementRef, 
    isVisible: true, 
    animationStyles: {} 
  };
};