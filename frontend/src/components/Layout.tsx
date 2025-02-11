// frontend/components/Layout.tsx
import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title ? title : 'WCCIS'}</title>
        <meta name="description" content="Contractors Insurance Website" />
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
