// frontend/src/pages/contact.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../components/Layout';
import { FormLayout } from '../components/ui/FormLayout';
import { FormGroup } from '../components/ui/FormGroup';
import { Button } from '../components/ui/Button';
import FormInput from '../components/FormInput';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { apiService } from '../utils/api';
import { contactFormSchema, type ContactForm } from '../utils/validation';

const ContactPage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema)
  });

  const { submit, isSubmitting, error } = useFormSubmit(apiService.submitContactForm, {
    onSuccess: () => {
      setSuccessMessage('Your message has been sent successfully! We will get back to you soon.');
      reset();
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    setSuccessMessage('');
    await submit(data);
  });

  return (
    <Layout title="Contact Us | WCCIS">
      <FormLayout
        title="Contact Us"
        subtitle="Have questions? We're here to help. Send us a message and we'll respond as soon as possible."
        error={error}
        success={successMessage}
      >
        <form onSubmit={onSubmit} className="space-y-6">
          <FormGroup error={errors.name?.message}>
            <FormInput
              id="name"
              label="Your Name"
              register={register}
              placeholder="John Doe"
            />
          </FormGroup>

          <FormGroup error={errors.email?.message}>
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              register={register}
              placeholder="john@company.com"
            />
          </FormGroup>

          <FormGroup error={errors.message?.message}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition duration-200 ease-in-out
                ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="How can we help you?"
              {...register('message')}
            />
          </FormGroup>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Send Message
          </Button>
        </form>
      </FormLayout>
    </Layout>
  );
};

export default ContactPage;