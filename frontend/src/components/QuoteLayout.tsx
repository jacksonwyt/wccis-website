import React, { Suspense } from "react";
import { Shield, Clock, FileText, Phone } from "lucide-react";
import { Background } from "./Background";
import { WhyChooseUs, ContactInfo } from "./dynamic-components";
import { DefaultLoadingSpinner } from "./ui/LoadingComponents";

interface QuoteLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  error?: string;
  success?: string;
}

// Simple loading skelton for side components
const SideSkeleton = ({ isLoading, pastDelay }: { isLoading?: boolean; pastDelay?: boolean }): React.ReactElement | null => {
  if (!isLoading || !pastDelay) {
    return null;
  }
  
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
    </div>
  );
};

const QuoteLayout = React.memo(({ 
  children, 
  title, 
  subtitle 
}: QuoteLayoutProps) => {
  return (
    <div className="min-h-screen w-full py-20 px-4">
      <Background />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8">
              {children}
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            <Suspense fallback={<SideSkeleton isLoading={true} pastDelay={true} />}>
              <div className="space-y-6">
                <WhyChooseUs />
                <ContactInfo />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
});

QuoteLayout.displayName = 'QuoteLayout';

export default QuoteLayout;
