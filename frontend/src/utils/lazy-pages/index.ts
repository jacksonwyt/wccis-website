// frontend/src/utils/lazy-pages/index.ts
import dynamic from 'next/dynamic';

// Modified to use next/dynamic instead of custom createLazyComponent
// This ensures compatibility with Next.js standalone mode

// Lazy loaded insurance quote pages
export const GeneralLiabilityQuotePage = dynamic(
  () => import('../../pages/insurance/general-liability-quote.impl'),
  { ssr: true }
);

export const CommercialAutoQuotePage = dynamic(
  () => import('../../pages/insurance/commercial-auto-quote.impl'),
  { ssr: true }
);

export const WorkersCompQuotePage = dynamic(
  () => import('../../pages/insurance/workers-comp-quote.impl'),
  { ssr: true }
);

// Lazy loaded information pages
export const AboutPage = dynamic(
  () => import('../../pages/about.impl'),
  { ssr: true }
);

export const ContactPage = dynamic(
  () => import('../../pages/contact.impl'),
  { ssr: true }
);

// Lazy loaded blog pages
export const BlogPage = dynamic(
  () => import('../../pages/blog'),
  { ssr: true }
);

export const BlogPostPage = dynamic(
  () => import('../../pages/blog/[slug]'),
  { ssr: true }
);