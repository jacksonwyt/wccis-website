import type { NextPage } from 'next';
import React, { useState, useCallback, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { useFormStore } from '@/state/formStore';
import { FormLayout } from '@/components/ui/FormLayout';

// Dynamically import the DynamicForm component
const DynamicForm = dynamic(
  () => import('@/components/DynamicForm').then(mod => ({ default: mod.DynamicForm })),
  { 
    loading: () => <FormSkeleton />,
    ssr: false // Disable server-side rendering for this component
  }
);

// Simple loading skeleton for the form
const FormSkeleton = () => (
  <div className="space-y-6">
    {[...Array(7)].map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
      </div>
    ))}
    <div className="h-10 bg-blue-100 dark:bg-blue-900/30 rounded w-full"></div>
  </div>
);

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
      // Add performance timing for analytics
      const startTime = performance.now();
      
      const response = await fetch('/api/insure/general-liability', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache' // Ensure fresh response
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      // Record submission time for analytics
      const endTime = performance.now();
      console.debug(`Form submission took ${endTime - startTime}ms`);
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request');
      }
      
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
      
      setSuccess('Your quote request has been submitted successfully!');
    } catch (error: any) {
      setError(error.message || 'An error occurred.');
      throw error; // Re-throw to let the DynamicForm error handling take over
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
            <Suspense fallback={<FormSkeleton />}>
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
