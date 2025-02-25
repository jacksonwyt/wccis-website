export type AnimationVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'none';

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  variant?: AnimationVariant;
  distance?: number;
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface AnimationResult {
  ref: (node?: Element | null) => void;
  style: {
    opacity: number;
    transform: string;
    transition: string;
  };
  inView: boolean;
}
