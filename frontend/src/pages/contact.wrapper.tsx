import type { NextPage } from 'next';
import React from 'react';
import { ContactPage } from './lazy-pages';

// Optimized wrapper for the Contact page
// This creates a smaller entry point that only loads the full page when needed
const ContactWrapper: NextPage = () => {
  return <ContactPage />;
};

export default ContactWrapper; 