import React, { memo } from 'react';
import { cn } from '@/utils/utils';

type AnimationVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
  distance?: number;
  duration?: number;
  threshold?: number;
  easing?: string;
  triggerOnce?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

// Simplified AnimatedSection that just renders children without animations
export const AnimatedSection: React.FC<AnimatedSectionProps> = memo(({ 
  children, 
  className = ''
}) => {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}); 

AnimatedSection.displayName = 'AnimatedSection';