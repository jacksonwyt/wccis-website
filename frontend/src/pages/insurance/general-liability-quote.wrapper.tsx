import type { NextPage } from 'next';
import React from 'react';
import { GeneralLiabilityQuotePage } from '@/utils/lazy-pages';
import { DefaultLoadingFallback } from '@/utils/lazy-load';

// Optimized wrapper for the General Liability Quote page
// This creates a smaller entry point that only loads the full page when needed
const GeneralLiabilityQuoteWrapper: NextPage = () => {
  return <GeneralLiabilityQuotePage />;
};

export default GeneralLiabilityQuoteWrapper; 