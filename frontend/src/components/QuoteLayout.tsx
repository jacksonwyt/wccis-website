import React from 'react';
import { FormLayout } from './ui/FormLayout';
import { Shield, Clock, FileText, Phone } from 'lucide-react';

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
  subtitle,
  error,
  success,
}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/images/hero/palm-trees.jpg')" }}
    >
      <div className="w-full max-w-4xl">
        {/* Main Form Container */}
        <div className="bg-white bg-opacity-95 rounded-lg shadow p-8">
          <FormLayout
            title={title}
            subtitle={subtitle}
            error={error}
            success={success}
          >
            {children}
          </FormLayout>
        </div>

        {/* Bottom Information Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Why Choose Us? Section */}
          <div className="bg-white bg-opacity-90 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Why Choose Us?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Multiple Carriers</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Quick Response</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Expert Guidance</span>
              </li>
            </ul>
          </div>

          {/* Need Help? Section */}
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Need Help?</h3>
            </div>
            <p className="text-sm text-blue-800 mt-2">
              Our agents are here to assist you with your quote.
            </p>
            <p className="text-blue-900 font-medium mt-2">(800) XXX-XXXX</p>
            <p className="text-sm text-blue-700">
              Mon-Fri 8:00 AM - 6:00 PM PT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteLayout;




