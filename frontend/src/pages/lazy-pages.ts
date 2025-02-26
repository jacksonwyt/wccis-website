import { createLazyComponent } from '@/utils/lazy-load';

// Lazy loaded insurance quote pages
export const GeneralLiabilityQuotePage = createLazyComponent(
  () => import('./insurance/general-liability-quote.impl').then(module => ({ default: module.default })),
);

export const CommercialAutoQuotePage = createLazyComponent(
  () => import('./insurance/commercial-auto-quote.impl').then(module => ({ default: module.default })),
);

export const WorkersCompQuotePage = createLazyComponent(
  () => import('./insurance/workers-comp-quote.impl').then(module => ({ default: module.default })),
);

// Lazy loaded information pages
export const AboutPage = createLazyComponent(
  () => import('./about.impl').then(module => ({ default: module.default })),
);

export const ContactPage = createLazyComponent(
  () => import('./contact.impl').then(module => ({ default: module.default })),
);

// Lazy loaded blog pages
export const BlogPage = createLazyComponent(
  () => import('./blog').then(module => ({ default: module.default })),
);

export const BlogPostPage = createLazyComponent(
  () => import('./blog/[slug]').then(module => ({ default: module.default })),
); 