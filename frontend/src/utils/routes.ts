// frontend/src/utils/routes.ts
// src/utils/routes.ts
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  INSURE: '/insure',
  BLOG: '/blog',
  INSURANCE: {
    GENERAL_LIABILITY: '/insurance/general-liability',
    WORKERS_COMP: '/insurance/workers-compensation',
    COMMERCIAL_AUTO: '/insurance/commercial-auto',
    QUOTES: {
      GENERAL_LIABILITY: '/insurance/general-liability-quote',
      WORKERS_COMP: '/insurance/workers-comp-quote',
      COMMERCIAL_AUTO: '/insurance/commercial-auto-quote',
    }
  },
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'About', path: ROUTES.ABOUT },
  { label: 'Contact', path: ROUTES.CONTACT },
  { label: 'Blog', path: ROUTES.BLOG },
];