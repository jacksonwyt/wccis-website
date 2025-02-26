import type { NextPage } from 'next';
import React from 'react';
import { CommercialAutoQuotePage } from '../lazy-pages';

// Optimized wrapper for the Commercial Auto Quote page
// This creates a smaller entry point that only loads the full page when needed
const CommercialAutoQuoteWrapper: NextPage = () => {
  return <CommercialAutoQuotePage />;
};

export default CommercialAutoQuoteWrapper; 