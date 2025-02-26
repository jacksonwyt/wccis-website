import type { NextPage } from 'next';
import React, { useState, useCallback, Suspense } from 'react';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { useFormStore } from '@/state/formStore';
import { FormLayout } from '@/components/dynamic-components';
import FormSkeleton from '@/components/FormSkeleton';
import { DynamicForm } from '@/components/dynamic-components';
import { FormSkeletonLoader } from '@/components/ui/LoadingComponents';

// Schema definition
const commercialAutoQuoteSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required").regex(/^[0-9-+()\s]{10,}$/, "Please enter a valid phone number"),
  numVehicles: z.string().min(1, "Number of vehicles is required"),
  vehicleTypes: z.string().min(1, "Vehicle types are required"),
  driversInfo: z.string().min(1, "Driver information is required"),
  currentCoverage: z.string().optional(),
  additionalNotes: z.string().optional()
});

type CommercialAutoQuote = z.infer<typeof commercialAutoQuoteSchema>;

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

const CommercialAutoQuotePage: NextPage = () => {
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
Commercial Auto Insurance Quote Request

${formattedData}
      `;
      
      // Create the mailto URL
      const mailtoURL = `mailto:customerservice@wccis.com?subject=Commercial Auto Insurance Quote Request&body=${encodeURIComponent(body)}`;
      
      // Open the user's default email client
      window.open(mailtoURL, '_blank');
      
      // Mark form as submitted in the form store to prevent resubmission
      markFormAsSubmitted('commercial-auto-quote');
      
      // Track successful submission
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-ignore - gtag might not be typed
        window.gtag?.('event', 'quote_submission', {
          'event_category': 'forms',
          'event_label': 'commercial_auto',
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
      name: 'businessName',
      label: "Business Name",
      placeholder: "Enter your business name",
    },
    {
      name: 'contactName',
      label: "Contact Name",
      placeholder: "Enter your full name",
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
      name: 'numVehicles',
      label: 'Number of Vehicles',
      placeholder: 'How many vehicles need coverage?',
    },
    {
      name: 'vehicleTypes',
      label: 'Types of Vehicles',
      placeholder: 'Describe the types of vehicles (trucks, vans, cars, etc.)',
    },
    {
      name: 'driversInfo',
      label: 'Driver Information',
      type: 'textarea',
      placeholder: 'Number of drivers and basic information about them',
    },
    {
      name: 'currentCoverage',
      label: 'Current Coverage (Optional)',
      placeholder: 'Describe your current coverage if applicable',
      required: false,
    },
    {
      name: 'additionalNotes',
      label: 'Additional Notes (Optional)',
      type: 'textarea',
      placeholder: 'Any additional information that may help us provide an accurate quote',
      required: false,
    },
  ];

  return (
    <Layout title="Commercial Auto Insurance Quote | WCCIS" pageType="insurance">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
        {/* Background overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-400/20" />
          <div className="absolute inset-0 bg-gray-900/90" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Commercial Auto Insurance Quote</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Get comprehensive coverage for your business vehicles
            </p>
          </div>

          <FormLayout
            title="Commercial Auto Insurance Quote Request"
            subtitle="Please fill out the form below and we'll get back to you with a quote as soon as possible."
            error={error}
            success={success}
            maxWidth="xl"
            className="mx-auto"
          >
            <Suspense fallback={<FormSkeletonLoader isLoading={true} pastDelay={true} />}>
              <DynamicForm
                id="commercial-auto-quote"
                fields={formFields}
                schema={commercialAutoQuoteSchema}
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

export default CommercialAutoQuotePage; 