import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { FormLayout } from '@/components/ui/FormLayout';
import { ArrowRight, Info } from 'lucide-react';
import dynamic from 'next/dynamic';
import FormSkeleton from '@/components/FormSkeleton';

// Schema definition - remove file validation requirements
const commercialAutoQuoteSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  name: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().optional(),
});

type CommercialAutoQuote = z.infer<typeof commercialAutoQuoteSchema>;

// Dynamically import the DynamicForm component
const DynamicForm = dynamic(
  () => import('@/components/DynamicForm').then(mod => ({ default: mod.DynamicForm })),
  { 
    loading: () => <FormSkeleton />,
    ssr: false // Disable server-side rendering for this component
  }
);

const CommercialAutoQuotePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommercialAutoQuote>({
    resolver: zodResolver(commercialAutoQuoteSchema),
    defaultValues: {
      businessName: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: CommercialAutoQuote) => {
    setIsSubmitting(true);
    setError('');
    try {
      // Format the message body
      const formattedData = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
      
      const body = `
Commercial Auto Quote Request

${formattedData}

---
IMPORTANT: Please attach the following documents to this email:
1. Drivers license documents for all licensed drivers
2. Vehicle registration documents
      `;
      
      // Create the mailto URL
      const mailtoURL = `mailto:customerservice@wccis.com?subject=Commercial Auto Quote Request&body=${encodeURIComponent(body)}`;
      
      // Open the user's default email client
      window.open(mailtoURL, '_blank');
      
      setSuccess('Your email client has been opened. Please send the email to complete your request. Remember to attach the required documents.');
      reset();
    } catch (error: any) {
      setError(error.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Your Commercial Auto Quote</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Quick, hassle-free insurance quotes for your business vehicles
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
            {/* File requirement notice */}
            <div className="mb-6 p-4 bg-blue-900/30 border border-blue-700/30 rounded-md">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-300 font-medium mb-1">Required Documents</h3>
                  <p className="text-blue-200 text-sm">
                    After submitting this form, your email client will open. Please attach the following documents to your email:
                  </p>
                  <ul className="list-disc list-inside text-blue-200 text-sm mt-2 ml-2">
                    <li>Copies of drivers licenses for all licensed drivers</li>
                    <li>Copies of vehicle registrations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-200 font-medium mb-2" htmlFor="businessName">
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    {...register('businessName')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your business name"
                  />
                  {errors.businessName?.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-200 font-medium mb-2" htmlFor="name">
                    Contact Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                  {errors.name?.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-200 font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                  {errors.email?.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-200 font-medium mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 555-5555"
                  />
                  {errors.phone?.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-200 font-medium mb-2" htmlFor="message">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Any additional details that might help us provide a more accurate quote"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                rightIcon={isSubmitting ? undefined : <ArrowRight className="w-5 h-5" />}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Request Quote'}
              </Button>
            </form>
          </FormLayout>
        </div>
      </section>
    </Layout>
  );
};

export default CommercialAutoQuotePage;