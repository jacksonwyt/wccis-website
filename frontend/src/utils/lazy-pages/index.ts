import { createLazyComponent } from '@/utils/lazy-load';

// Lazy loaded insurance quote pages
export const GeneralLiabilityQuotePage = createLazyComponent(
  () => import('../../pages/insurance/general-liability-quote.impl'),
);

export const CommercialAutoQuotePage = createLazyComponent(
  () => import('../../pages/insurance/commercial-auto-quote.impl'),
);

export const WorkersCompQuotePage = createLazyComponent(
  () => import('../../pages/insurance/workers-comp-quote.impl'),
);

// Lazy loaded information pages
export const AboutPage = createLazyComponent(
  () => import('../../pages/about.impl'),
);

export const ContactPage = createLazyComponent(
  () => import('../../pages/contact.impl'),
);

// Lazy loaded blog pages
export const BlogPage = createLazyComponent(
  () => import('../../pages/blog'),
);

export const BlogPostPage = createLazyComponent(
  () => import('../../pages/blog/[slug]'),
); 