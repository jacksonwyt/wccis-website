import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'glass';
  hover?: 'lift' | 'glow' | 'border' | 'none';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hover = 'lift',
  className,
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-gradient-to-br from-white/[0.08] via-white/[0.06] to-white/[0.04] border border-white/[0.1]',
    gradient: 'bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.02]',
    glass: 'bg-gradient-to-br from-white/[0.07] via-white/[0.05] to-white/[0.03] backdrop-blur-sm border border-white/[0.1]'
  };

  const hoverEffects = {
    lift: 'hover:-translate-y-1 hover:from-white/[0.1] hover:to-white/[0.06]',
    glow: 'hover:border-blue-500/50 hover:from-blue-500/[0.08] hover:to-transparent',
    border: 'hover:border-white/30 hover:from-white/[0.09] hover:to-white/[0.05]',
    none: ''
  };

  return (
    <div
      className={cn(
        'transition-all duration-300',
        variants[variant],
        hoverEffects[hover],
        className
      )}
      {...props}
    >
      {/* Gradient overlay for enhanced depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.09] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Feature Card with icon
interface FeatureCardProps extends CardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  ...props
}) => {
  return (
    <Card
      variant="glass"
      hover="glow"
      className="group p-6 border border-white/10"
      {...props}
    >
      <div className="mb-4 inline-block bg-gradient-to-r from-blue-500/30 to-blue-700/30 p-3 group-hover:from-blue-500/40 group-hover:to-blue-700/40 transition-colors">
        <Icon className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
        {description}
      </p>
    </Card>
  );
};

// Pricing Card
interface PricingCardProps extends CardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isPopular,
  ...props
}) => {
  return (
    <Card
      variant={isPopular ? 'gradient' : 'glass'}
      hover="glow"
      className={cn(
        'p-8',
        isPopular && 'border-blue-500/50 shadow-xl shadow-blue-500/20'
      )}
      {...props}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <ul className="space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-gray-300">
            <svg
              className="w-5 h-5 text-blue-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Content Card for blog posts or articles
interface ContentCardProps extends CardProps {
  image?: string;
  category?: string;
  title: string;
  excerpt: string;
  date?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  image,
  category,
  title,
  excerpt,
  date,
  ...props
}) => {
  return (
    <Card
      variant="glass"
      hover="lift"
      className="group overflow-hidden"
      {...props}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            priority={true}
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      <div className="p-6">
        {category && (
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 mb-4">
            {category}
          </span>
        )}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4">{excerpt}</p>
        {date && (
          <p className="text-sm text-gray-500">{date}</p>
        )}
      </div>
    </Card>
  );
};