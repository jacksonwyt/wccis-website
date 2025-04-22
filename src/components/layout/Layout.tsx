import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'WCCIS Insurance Agency' }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="WCCIS Insurance Agency" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout; 