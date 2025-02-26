import type { NextPage } from 'next';
import React from 'react';
import { WorkersCompQuotePage } from '@/utils/lazy-pages';

// Wrapper component that loads the full implementation lazily
const WorkersCompQuote: NextPage = () => {
  return <WorkersCompQuotePage />;
};

export default WorkersCompQuote; 