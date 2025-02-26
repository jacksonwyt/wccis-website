// frontend/src/components/dynamic-components.ts
import dynamic from 'next/dynamic';
import { 
  DefaultLoadingSpinner, 
  HeaderSkeleton, 
  FooterSkeleton,
  FormSkeletonLoader
} from './ui/LoadingComponents';

// UI Components with proper loading skeletons
export const Header = dynamic(() => import('./Header'), {
  loading: HeaderSkeleton,
  ssr: true
});

export const Footer = dynamic(() => import('./Footer'), {
  loading: FooterSkeleton,
  ssr: true
});

// UI components with named exports - using properly typed loading spinner
export const GlassCard = dynamic(
  () => import('./ui/GlassCard').then(mod => ({ default: mod.GlassCard })),
  { loading: DefaultLoadingSpinner }
);

export const Card = dynamic(
  () => import('./ui/Card').then(mod => ({ default: mod.Card })),
  { loading: DefaultLoadingSpinner }
);

export const FormLayout = dynamic(
  () => import('./ui/FormLayout').then(mod => ({ default: mod.FormLayout })),
  { loading: DefaultLoadingSpinner }
);

// Form components
export const DynamicForm = dynamic(
  () => import('./DynamicForm').then(mod => ({ default: mod.DynamicForm })),
  { loading: FormSkeletonLoader, ssr: false }
);

// Section components
export const WhyChooseUs = dynamic(() => import('./WhyChooseUs'), {
  loading: DefaultLoadingSpinner
});

export const ContactInfo = dynamic(() => import('./ContactInfo'), {
  loading: DefaultLoadingSpinner
});

export const AnimatedSection = dynamic(
  () => import('./AnimatedSection').then(mod => ({ default: mod.AnimatedSection })),
  { loading: DefaultLoadingSpinner }
); 