import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { FormLayout } from '@/components/ui/FormLayout';
import { ArrowRight } from 'lucide-react';

// Define the schema
const workersCompQuoteSchema = z.object({
  feinNumber: z.string().min(1, "FEIN number is required"),
  payrollByClassCode: z.string().min(1, "Payroll by class code is required"),
  contractorsLicenseNumber: z.string().min(1, "Contractors license number is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").min(1, "Email is required")
});

type WorkersCompQuote = z.infer<typeof workersCompQuoteSchema>;

const WorkersCompQuotePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reload the page data when the component mounts
    router.replace(router.asPath);
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkersCompQuote>({
    resolver: zodResolver(workersCompQuoteSchema),
    defaultValues: {
      feinNumber: '',
      payrollByClassCode: '',
      contractorsLicenseNumber: '',
      phone: '',
      email: ''
    },
  });

  const onSubmit = async (data: WorkersCompQuote) => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/insure/workers-comp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit quote request');
      setSuccess('Your quote request has been submitted successfully!');
      reset();
    } catch (error: any) {
      setError(error.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Workers Compensation Insurance Quote | WCCIS" pageType="insurance">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
        {/* Background overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-400/20" />
          <div className="absolute inset-0 bg-gray-900/90" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Your Workers Compensation Quote</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Expert coverage for your business and employees
            </p>
          </div>

          <FormLayout
            title="Workers Compensation Insurance Quote Request"
            subtitle="Please fill out the form below and we'll get back to you with a quote as soon as possible."
            error={error}
            success={success}
            maxWidth="xl"
            className="mx-auto"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-200 font-medium mb-2" htmlFor="feinNumber">
                    FEIN Number
                  </label>
                  <input
                    id="feinNumber"
                    type="text"
                    {...register('feinNumber')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Federal Employer Identification Number"
                  />
                  {errors.feinNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.feinNumber.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-200 font-medium mb-2" htmlFor="payrollByClassCode">
                    Payroll by Class Code
                  </label>
                  <input
                    id="payrollByClassCode"
                    type="text"
                    {...register('payrollByClassCode')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter payroll amount and class code"
                  />
                  {errors.payrollByClassCode && (
                    <p className="text-red-400 text-sm mt-1">{errors.payrollByClassCode.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-200 font-medium mb-2" htmlFor="contractorsLicenseNumber">
                    Contractors License Number
                  </label>
                  <input
                    id="contractorsLicenseNumber"
                    type="text"
                    {...register('contractorsLicenseNumber')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your contractors license number"
                  />
                  {errors.contractorsLicenseNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.contractorsLicenseNumber.message}</p>
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
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
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
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
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

export default WorkersCompQuotePage;
