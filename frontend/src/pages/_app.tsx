// frontend/src/pages/_app.tsx
import type { AppProps } from "next/app";
import { Suspense, useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import { initSmoothScrolling } from "@/utils/smoothScroll";
import "@/styles/globals.css";
import "@/styles/animations.css";

// Loading fallback components
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse">Loading...</div>
  </div>
);

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize smooth scrolling
  useEffect(() => {
    // Set HTML element class for smooth scrolling
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('smooth-scroll');
    }
    
    // Initialize smooth scrolling with default options
    initSmoothScrolling({
      offset: -80, // Offset for header height
      duration: 800
    });
    
    // Add scroll progress indicator
    const addScrollProgressIndicator = () => {
      const indicator = document.createElement('div');
      indicator.className = 'fixed top-0 left-0 h-1 z-[100] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 progress-bar';
      indicator.style.width = '0%';
      document.body.appendChild(indicator);
      
      const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = `${(scrollTop / docHeight) * 100}%`;
        indicator.style.setProperty('--progress', scrollPercent);
      };
      
      window.addEventListener('scroll', updateProgress);
      updateProgress(); // Initial calculation
      
      return () => window.removeEventListener('scroll', updateProgress);
    };
    
    return addScrollProgressIndicator();
  }, []);

  return (
    <>
      <DefaultSeo 
        titleTemplate="%s | WCCIS Insurance"
        defaultTitle="WCCIS - Independent Insurance Agency for Contractors"
        description="Specialized insurance solutions for contractors across California. Expert guidance for workers' compensation, general liability, and commercial auto."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          site_name: 'WCCIS Insurance',
        }}
      />
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
      <Analytics />
    </>
  );
}

export default MyApp;
