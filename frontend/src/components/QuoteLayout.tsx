import React from "react";
import { FormLayout } from "@/components/ui/FormLayout";
import { Shield, Clock, FileText, Phone } from "lucide-react";
import './QuoteLayout.css';

interface QuoteLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  error?: string;
  success?: string;
}

const QuoteLayout: React.FC<QuoteLayoutProps> = ({ children, title, subtitle, error, success }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 quote-layout"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-futuristic-surface bg-opacity-95 rounded-lg shadow-lg p-8">
          <FormLayout title={title} subtitle={subtitle} error={error} success={success}>
            {children}
          </FormLayout>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-futuristic-surface bg-opacity-90 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-futuristic-light mb-3">Why Choose Us?</h3>
            <ul className="space-y-2 text-sm text-futuristic-light">
              <li className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-futuristic-accent" />
                <span>Multiple Carriers</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-futuristic-accent" />
                <span>Quick Response</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-futuristic-accent" />
                <span>Expert Guidance</span>
              </li>
            </ul>
          </div>
          <div className="bg-futuristic-accent rounded-lg shadow p-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-futuristic-bg" />
              <h3 className="font-semibold text-futuristic-bg">Need Help?</h3>
            </div>
            <p className="text-sm text-futuristic-bg mt-2">
              Our agents are here to assist you with your quote.
            </p>
            <p className="text-futuristic-bg font-medium mt-2">(800) XXX-XXXX</p>
            <p className="text-sm text-futuristic-bg">Mon-Fri 8:00 AM - 6:00 PM PT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteLayout;





