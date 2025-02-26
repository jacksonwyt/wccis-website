import { createDynamicComponent } from '../dynamic-imports';
import { DefaultLoadingSpinner } from '@/components/ui/LoadingComponents';
import React from 'react';
import type { DynamicOptionsLoadingProps } from 'next/dynamic';

// Create a wrapper that ensures we never return null (always returns a ReactElement)
const LoadingWrapper = (props: DynamicOptionsLoadingProps): React.ReactElement => {
  // If DefaultLoadingSpinner returns null, we'll render an empty div
  const spinner = DefaultLoadingSpinner(props);
  return spinner || <div aria-hidden="true"></div>;
};

// Dynamically import the About page
export const AboutPage = createDynamicComponent(
  () => import('@/pages/about'),
  {
    ssr: true,
    loading: LoadingWrapper
  }
);

// Dynamically import the Contact page
export const ContactPage = createDynamicComponent(
  () => import('@/pages/contact'),
  {
    ssr: true,
    loading: LoadingWrapper
  }
); 