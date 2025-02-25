import React from "react";
import { Shield, Clock, FileText, Phone } from "lucide-react";

interface QuoteLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  error?: string;
  success?: string;
}

const QuoteLayout: React.FC<QuoteLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div className="min-h-screen w-full py-20 px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-black" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-blue-400/10 blur-3xl" />
      </div>

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
            {/* Why Choose Us */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Multiple Carriers</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Compare rates from leading insurers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Clock className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Quick Response</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Get your quote within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <FileText className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Expert Guidance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Professional support throughout the process</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-5 h-5" />
                <h3 className="text-xl font-semibold">Need Help?</h3>
              </div>
              <p className="text-white/90 mb-4">
                Our insurance experts are here to guide you through the quote process.
              </p>
              <div className="space-y-2">
                <p className="text-lg font-medium">(800) XXX-XXXX</p>
                <p className="text-sm text-white/80">Mon-Fri 8:00 AM - 6:00 PM PT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteLayout;




