// src/components/Layout.tsx
// src/components/Layout.tsx
import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  pageType?: 'home' | 'insurance' | 'info';
}

const Layout: React.FC<LayoutProps> = ({ 
  title = "WCCIS", 
  description = "Independent Insurance Agency for Contractors",
  children,
  pageType = 'home'
}) => {
  const getAnimationClass = () => {
    return ''; // Removed animations as requested
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-white via-brand-light/5 to-brand-light/20 dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-800/90">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ contain: 'strict' }}>
        {/* Primary Gradient Wave */}
        <div className={`absolute w-[100%] h-[100%] ${getAnimationClass()} opacity-5`}
             style={{
               background: `linear-gradient(45deg, 
                 ${[
                   'rgb(61, 154, 233, 0.2)', // #3d9ae9
                   'rgb(82, 167, 238, 0.2)',  // #52a7ee
                   'rgb(53, 94, 132, 0.2)',   // #355e84
                 ].join(', ')})`
             }} />
        
        {/* Secondary Ambient Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[500px] 
                      bg-gradient-to-br from-[#3d9ae9]/3 via-[#52a7ee]/3 to-[#355e84]/3 
                      blur-2xl transform -translate-y-1/2"
             style={{ contain: 'paint' }} />
        
        <div className="absolute bottom-0 right-0 w-full h-[500px] 
                      bg-gradient-to-tl from-[#3d9ae9]/3 via-[#52a7ee]/3 to-[#355e84]/3 
                      blur-2xl transform translate-y-1/2"
             style={{ contain: 'paint' }} />

        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-25"
             style={{
               backgroundImage: 'url("data:image/svg+xml,...)"',
               backgroundRepeat: 'repeat',
             }} />
      </div>

      {/* Glass Header */}
      <div className="sticky top-0 z-50">
        <div className="backdrop-blur-md bg-gradient-to-b from-white/80 to-white/70 dark:from-gray-900/80 dark:to-gray-900/70 border-b border-brand-light/10 shadow-sm">
          <Header />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Glass Footer */}
      <div className="relative z-10 mt-auto">
        <div className="backdrop-blur-md bg-gradient-to-t from-white/80 to-white/70 dark:from-gray-900/80 dark:to-gray-900/70 border-t border-brand-light/10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
