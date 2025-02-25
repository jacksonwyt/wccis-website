import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';

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
    <Layout title="Workers Compensation Insurance Quote | WCCIS">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Get Your Workers Compensation Quote</h1>
        
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="feinNumber">
                FEIN Number
              </label>
              <input
                id="feinNumber"
                type="text"
                {...register('feinNumber')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.feinNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.feinNumber.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="payrollByClassCode">
                Payroll by Class Code
              </label>
              <input
                id="payrollByClassCode"
                type="text"
                {...register('payrollByClassCode')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter payroll amount and class code"
              />
              {errors.payrollByClassCode && (
                <p className="text-red-500 text-sm mt-1">{errors.payrollByClassCode.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="contractorsLicenseNumber">
                Contractors License Number
              </label>
              <input
                id="contractorsLicenseNumber"
                type="text"
                {...register('contractorsLicenseNumber')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.contractorsLicenseNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.contractorsLicenseNumber.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Quote'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default WorkersCompQuotePage;
