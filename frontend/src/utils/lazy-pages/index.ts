import dynamic from 'next/dynamic';

// Dynamically import pages with loading fallbacks when needed

export const AboutPage = dynamic(() => 
  import('@/pages/about').then(mod => mod.default)
);

export const ContactPage = dynamic(() => 
  import('@/pages/contact').then(mod => mod.default)
);

// Load blog pages dynamically
export const BlogPage = dynamic(() => 
  import('@/pages/blog/index').then(mod => mod.default)
); 