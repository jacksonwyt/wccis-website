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
        'transition-all duration-300 rounded-[var(--border-radius-lg)]',
        variants[variant],
        hoverEffects[hover],
        className
      )}
      {...props}
    >
      {/* Gradient overlay for enhanced depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.09] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[var(--border-radius-lg)]" />
      
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
      className="p-6 flex flex-col items-start gap-4 hover:shadow-md"
      {...props}
    >
      <div className="rounded-[var(--border-radius-sm)] bg-brand-primary/10 p-3 text-brand-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
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
      className={cn(
        "p-6 flex flex-col",
        isPopular ? "border-2 border-brand-primary/30" : ""
      )}
      {...props}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white px-4 py-1 rounded-[var(--border-radius-sm)] text-sm font-semibold shadow-sm">
          Most Popular
        </div>
      )}
      
      <div className="mb-6 mt-3">
        <h3 className="text-xl font-bold text-center">{title}</h3>
      </div>
      
      <div className="flex justify-center items-baseline my-8">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg
              className="h-5 w-5 text-brand-primary mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        className={cn(
          "mt-auto py-3 w-full rounded-[var(--border-radius-md)] font-medium transition-colors duration-200",
          isPopular
            ? "bg-brand-primary text-white hover:bg-brand-dark"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        )}
      >
        Get Started
      </button>
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
    <Card className="overflow-hidden group" {...props}>
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        {category && (
          <div className="mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-[var(--border-radius-sm)]">
              {category}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{excerpt}</p>
        {date && (
          <div className="text-sm text-gray-400 dark:text-gray-500">{date}</div>
        )}
      </div>
    </Card>
  );
};