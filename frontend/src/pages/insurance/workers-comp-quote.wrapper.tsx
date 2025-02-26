import type { NextPage } from 'next';
import React from 'react';
import { WorkersCompQuotePage } from '@/utils/lazy-pages';

// Optimized wrapper for the Workers Compensation Quote page
// This creates a smaller entry point that only loads the full page when needed
const WorkersCompQuoteWrapper: NextPage = () => {
  return <WorkersCompQuotePage />;
};

export default WorkersCompQuoteWrapper; 