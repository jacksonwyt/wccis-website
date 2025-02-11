// frontend/src/utils/routes.ts
export const ROUTES = {
    HOME: '/',
    INSURE: '/insure',
    CERTIFICATE: '/certificate',
    CONTACT: '/contact',
    INSURANCE: {
      GENERAL_LIABILITY: '/insurance/general-liability',
      WORKERS_COMP: '/insurance/workers-compensation',
      COMMERCIAL_AUTO: '/insurance/commercial-auto',
    },
  } as const;
  
  export const NAVIGATION_ITEMS = [
    { label: 'Home', path: ROUTES.HOME },
    { 
      label: 'Insurance',
      path: ROUTES.INSURANCE.GENERAL_LIABILITY,
      subItems: [
        { label: 'General Liability', path: ROUTES.INSURANCE.GENERAL_LIABILITY },
        { label: 'Workers Compensation', path: ROUTES.INSURANCE.WORKERS_COMP },
        { label: 'Commercial Auto', path: ROUTES.INSURANCE.COMMERCIAL_AUTO },
      ]
    },
    { label: 'Get Quote', path: ROUTES.INSURE },
    { label: 'Request Certificate', path: ROUTES.CERTIFICATE },
    { label: 'Contact', path: ROUTES.CONTACT },
  ];