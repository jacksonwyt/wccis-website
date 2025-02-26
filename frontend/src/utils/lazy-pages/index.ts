import { createLazyComponent } from '@/utils/lazy-load';

// Lazy loaded insurance quote pages
export const GeneralLiabilityQuotePage = createLazyComponent(
  () => import('../../pages/insurance/general-liability-quote.impl').then(module => ({ default: module.default })),
);

export const CommercialAutoQuotePage = createLazyComponent(
  () => import('../../pages/insurance/commercial-auto-quote.impl').then(module => ({ default: module.default })),
);

export const WorkersCompQuotePage = createLazyComponent(
  () => import('../../pages/insurance/workers-comp-quote.impl').then(module => ({ default: module.default })),
);

// Lazy loaded information pages
export const AboutPage = createLazyComponent(
  () => import('../../pages/about.impl').then(module => ({ default: module.default })),
);

export const ContactPage = createLazyComponent(
  () => import('../../pages/contact.impl').then(module => ({ default: module.default })),
);

// Lazy loaded blog pages
export const BlogPage = createLazyComponent(
  () => import('../../pages/blog').then(module => ({ default: module.default })),
);

export const BlogPostPage = createLazyComponent(
  () => import('../../pages/blog/[slug]').then(module => ({ default: module.default })),
); 