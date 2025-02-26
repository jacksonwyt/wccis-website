import type { NextPage } from 'next';
import React from 'react';
import { CommercialAutoQuotePage } from '@/utils/lazy-pages';

// Wrapper component that loads the full implementation lazily
const CommercialAutoQuote: NextPage = () => {
  return <CommercialAutoQuotePage />;
};

export default CommercialAutoQuote; 