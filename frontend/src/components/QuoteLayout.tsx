import React from "react";
import { Shield, Clock, FileText, Phone } from "lucide-react";
import { Background } from "./Background";
import { WhyChooseUs } from "./WhyChooseUs";
import { ContactInfo } from "./ContactInfo";

interface QuoteLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  error?: string;
  success?: string;
}

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
            <WhyChooseUs />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuoteLayout;
