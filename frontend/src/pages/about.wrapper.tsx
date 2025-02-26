import type { NextPage } from 'next';
import React from 'react';
import { AboutPage } from '@/utils/lazy-pages';

// Optimized wrapper for the About page
// This creates a smaller entry point that only loads the full page when needed
const AboutWrapper: NextPage = () => {
  return <AboutPage />;
};

export default AboutWrapper; 