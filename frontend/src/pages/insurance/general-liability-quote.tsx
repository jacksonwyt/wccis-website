import type { NextPage } from 'next';
import React, { useState, useCallback, Suspense } from 'react';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { useFormStore } from '@/state/formStore';
import { FormLayout } from '@/components/dynamic-components';
import { FormSkeletonLoader } from '@/components/ui/LoadingComponents';
import { DynamicForm } from '@/components/dynamic-components';

// Schema definition
const generalLiabilityQuoteSchema = z.object({
  contractorLicense: z.string().min(1, "Contractor's license is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required").regex(/^[0-9-+()\s]{10,}$/, "Please enter a valid phone number"),
  projectedGrossReceipts: z.string().min(1, "Projected gross receipts are required"),
  payroll: z.string().min(1, "Payroll amount is required"),
  subOutCosts: z.string().min(1, "Sub out costs are required"),
  workDescription: z.string().min(1, "Brief description of work is required").max(500, "Description must be less than 500 characters")
});

type GeneralLiabilityQuote = z.infer<typeof generalLiabilityQuoteSchema>;

// Notification component for success/error messages
const Notification = React.memo(({ type, message }: { type: 'success' | 'error', message: string }) => {
  if (!message) return null;
  
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  
  return (
    <div className={`mb-4 p-4 ${bgColor} ${textColor} rounded-md`}>
      {message}
    </div>
  );
});

const GeneralLiabilityQuotePage: NextPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { markFormAsSubmitted } = useFormStore();
  
  // Memoize the submit handler to prevent unnecessary re-renders
  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    setError('');
    try {
      // Format the message body
      const formattedData = Object.entries(data)
        .map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return `${key}: ${JSON.stringify(value, null, 2)}`;
          }
          return `${key}: ${value}`;
        })
        .join('\n');
      
      const body = `
General Liability Quote Request

${formattedData}
      `;
      
      // Create the mailto URL
      const mailtoURL = `mailto:customerservice@wccis.com?subject=General Liability Quote Request&body=${encodeURIComponent(body)}`;
      
      // Open the user's default email client
      window.open(mailtoURL, '_blank');
      
      // Mark form as submitted in the form store to prevent resubmission
      markFormAsSubmitted('general-liability-quote');
      
      // Track successful submission
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-ignore - gtag might not be typed
        window.gtag?.('event', 'quote_submission', {
          'event_category': 'forms',
          'event_label': 'general_liability',
          'value': 1
        });
      }
      
      setSuccess('Your email client has been opened. Please send the email to complete your request.');
    } catch (error: any) {
      setError(error.message || 'An error occurred.');
    }
  }, [markFormAsSubmitted]);

  // Define the form fields
  const formFields = [
    {
      name: 'contractorLicense',
      label: "Contractor's License",
      placeholder: "Enter your contractor's license number",
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '(XXX) XXX-XXXX',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'your@email.com',
    },
    {
      name: 'projectedGrossReceipts',
      label: 'Projected Gross Receipts',
      placeholder: '$',
    },
    {
      name: 'payroll',
      label: 'Payroll',
      placeholder: '$',
    },
    {
      name: 'subOutCosts',
      label: 'Sub Out Costs',
      placeholder: '$',
    },
    {
      name: 'workDescription',
      label: 'Brief Description of Work Performed',
      type: 'textarea',
      placeholder: 'Please describe the type of work your company performs',
    },
  ];

  return (
    <Layout title="General Liability Insurance Quote | WCCIS" pageType="insurance">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
        {/* Background overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-400/20" />
          <div className="absolute inset-0 bg-gray-900/90" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Your General Liability Quote</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Protect your business with comprehensive coverage
            </p>
          </div>

          <FormLayout
            title="General Liability Insurance Quote Request"
            subtitle="Please fill out the form below and we'll get back to you with a quote as soon as possible."
            error={error}
            success={success}
            maxWidth="xl"
            className="mx-auto"
          >
            <Suspense fallback={<FormSkeletonLoader isLoading={true} pastDelay={true} />}>
              <DynamicForm
                id="general-liability-quote"
                fields={formFields}
                schema={generalLiabilityQuoteSchema}
                onSubmit={handleSubmit}
                submitLabel="Request Quote"
                persistData={true}
              />
            </Suspense>
          </FormLayout>
        </div>
      </section>
    </Layout>
  );
};

export default GeneralLiabilityQuotePage; 