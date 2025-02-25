import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';

// Schema definition
const generalLiabilityQuoteSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().optional(),
});

type GeneralLiabilityQuote = z.infer<typeof generalLiabilityQuoteSchema>;

const GeneralLiabilityQuotePage: NextPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GeneralLiabilityQuote>({
    resolver: zodResolver(generalLiabilityQuoteSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: GeneralLiabilityQuote) => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/insure/general-liability', {
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
    <Layout title="General Liability Insurance Quote | WCCIS">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Get Your General Liability Quote</h1>
        
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
              <label className="block text-gray-700 mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                {...register('companyName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="contactName">
                Contact Name
              </label>
              <input
                id="contactName"
                type="text"
                {...register('contactName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.contactName && (
                <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
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
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Additional Information (Optional)
              </label>
              <textarea
                id="message"
                {...register('message')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
              />
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

export default GeneralLiabilityQuotePage;
