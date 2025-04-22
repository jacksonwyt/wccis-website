// src/components/ui/GlassCard.tsx
import React from 'react';
import { cn } from '@/utils/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'active' | 'gradient';
  intensity?: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  isAnimated?: boolean; // Kept for backward compatibility but no longer used
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(({
  variant = 'default',
  intensity = 'medium',
  children,
  className,
  isAnimated = false, // Parameter kept but not used
  ...props
}, ref) => {
  const baseStyles = "relative overflow-hidden backdrop-blur-sm transition-all duration-300";
  
  const intensityStyles = {
    light: 'bg-gradient-to-br from-white/40 via-white/30 to-white/20 dark:from-gray-900/40 dark:via-gray-900/30 dark:to-gray-900/20 border-white/10 dark:border-gray-700/10',
    medium: 'bg-gradient-to-br from-white/60 via-white/40 to-white/30 dark:from-gray-900/60 dark:via-gray-900/40 dark:to-gray-900/30 border-white/20 dark:border-gray-700/20',
    heavy: 'bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40 border-white/30 dark:border-gray-700/30'
  };

  const variantStyles = {
    default: 'hover:from-white/50 hover:via-white/40 hover:to-white/30 dark:hover:from-gray-900/50 dark:hover:via-gray-900/40 dark:hover:to-gray-900/30',
    hover: 'hover:-translate-y-1 hover:from-white/70 hover:to-white/40 dark:hover:from-gray-900/70 dark:hover:to-gray-900/40',
    active: 'bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-blue-500/5',
    gradient: 'bg-gradient-to-br from-white/30 via-white/20 to-white/10 dark:from-gray-900/30 dark:via-gray-900/20 dark:to-gray-900/10'
  };

  // Always use regular div, no animations
  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        intensityStyles[intensity],
        variantStyles[variant],
        'border',
        'rounded-[var(--border-radius-lg)]',
        className
      )}
      {...props}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Static background effect (removed animation) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />
      </div>
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

// Helper components for common use cases
export const FeatureGlassCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <GlassCard className="p-6 border h-full">
      <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-[var(--border-radius-sm)] bg-brand-primary/10 text-brand-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </GlassCard>
  );
};

export const ContentGlassCard: React.FC<{
  title: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ title, content, footer }) => {
  return (
    <GlassCard className="border h-full flex flex-col">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="p-6 flex-1">
        {content}
      </div>
      {footer && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-[var(--border-radius-lg)]">
          {footer}
        </div>
      )}
    </GlassCard>
  );
};