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
import { contactFormSchema, type ContactForm } from '../utils/validation';
import { submitContactForm } from '../utils/api';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const ContactInfo = () => (
  <div className="space-y-6">
    <div className="flex items-start space-x-4">
      <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900">Phone</h3>
        <p className="text-gray-600">(800) 123-4567</p>
        <p className="text-sm text-gray-500">Mon-Fri 8am-6pm PT</p>
      </div>
    </div>

    <div className="flex items-start space-x-4">
      <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900">Email</h3>
        <p className="text-gray-600">info@wccis.com</p>
        <p className="text-sm text-gray-500">24/7 support</p>
      </div>
    </div>

    <div className="flex items-start space-x-4">
      <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900">Office</h3>
        <p className="text-gray-600">
          123 Insurance Ave<br />
          Suite 100<br />
          City, ST 12345
        </p>
      </div>
    </div>

    <div className="flex items-start space-x-4">
      <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900">Hours</h3>
        <p className="text-gray-600">Monday - Friday</p>
        <p className="text-gray-600">8:00 AM - 6:00 PM PT</p>
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const { submit, isSubmitting, error } = useFormSubmit({
    submitFn: submitContactForm,
    onSuccess: () => {
      setSuccessMessage('Message sent successfully');
      reset();
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    setSuccessMessage('');
    await submit(data);
  });

  return (
    <Layout title="Contact Us | WCCIS">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-blue-100">
              We're here to help with all your insurance needs. Reach out to us today.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <ContactInfo />
            </div>

            <div className="bg-blue-50 rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Our Promise</h3>
              <p className="text-blue-700">
                We aim to respond to all inquiries within 1 business hour during normal business hours.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FormLayout
              title="Send Us a Message"
              subtitle="Have questions? We're here to help. Fill out the form below and we'll get back to you promptly."
              error={error}
              success={successMessage}
              className="h-full"
            >
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormGroup error={errors.name?.message}>
                    <FormInput
                      id="name"
                      label="Your Name"
                      register={register}
                      placeholder="John Doe"
                      error={errors.name}
                    />
                  </FormGroup>

                  <FormGroup error={errors.email?.message}>
                    <FormInput
                      id="email"
                      label="Email Address"
                      type="email"
                      register={register}
                      placeholder="john@company.com"
                      error={errors.email}
                    />
                  </FormGroup>
                </div>

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
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">Map Integration Placeholder</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;