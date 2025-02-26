import { createLazyComponent } from '@/utils/lazy-load';

// Lazy loaded layout components
export const Header = createLazyComponent(
  () => import('./Header').then(module => ({ default: module.default })),
);

export const Footer = createLazyComponent(
  () => import('./Footer').then(module => ({ default: module.default })),
);

// Lazy loaded UI components
export const GlassCard = createLazyComponent(
  () => import('./ui/GlassCard').then(module => ({ default: module.default })),
);

export const Card = createLazyComponent(
  () => import('./ui/Card').then(module => ({ default: module.default })),
);

export const FormLayout = createLazyComponent(
  () => import('./ui/FormLayout').then(module => ({ default: module.FormLayout })),
);

// Lazy loaded form components
export const DynamicForm = createLazyComponent(
  () => import('./DynamicForm').then(module => ({ default: module.DynamicForm })),
);

// Lazy loaded section components
export const WhyChooseUs = createLazyComponent(
  () => import('./WhyChooseUs').then(module => ({ default: module.default })),
);

export const ContactInfo = createLazyComponent(
  () => import('./ContactInfo').then(module => ({ default: module.default })),
);

export const AnimatedSection = createLazyComponent(
  () => import('./AnimatedSection').then(module => ({ default: module.default })),
); 