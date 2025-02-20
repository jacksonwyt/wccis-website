// frontend/src/components/Layout.tsx
import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-futuristic-bg text-futuristic-light">
      <Head>
        <title>{title ? `${title} | WCCIS` : "WCCIS"}</title>
        <meta name="description" content="Contractors Insurance Website" />
      </Head>
      {/* Background layer */}
      <div className="fixed inset-0 bg-futuristic-bg -z-10" />
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

