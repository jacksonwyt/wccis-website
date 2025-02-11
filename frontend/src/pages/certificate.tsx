import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../components/Layout';
import { FormLayout } from '../components/ui/FormLayout';
import { FormGroup } from '../components/ui/FormGroup';
import { Button } from '../components/ui/Button';
import FormInput from '../components/FormInput';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { certificateRequestSchema } from '../utils/validation';
import { AlertTriangle, FileText, Clock } from 'lucide-react';
import { submitCertificateRequest } from '../utils/api';

// Infer the full certificate request type from the Zod schema
type CertificateRequest = z.infer<typeof certificateRequestSchema>;

const CertificateRequestPage = () => {
  const [successMessage, setSuccessMessage] = useState('');

  // Provide the inferred type to useForm so that all fields (and errors) are known.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<CertificateRequest>({
    resolver: zodResolver(certificateRequestSchema),
    defaultValues: {
      requestType: 'standard',
      isRush: false,
      // Provide sensible defaults (or empty strings) for the remaining fields
      policyHolder: '',
      carrier: '',
      policyNumber: '',
      certificateHolder: '',
      specialInstructions: '',
      email: '',
      phone: ''
    }
  });

  // Note: Now the submit function accepts a CertificateRequest object
  const { submit, isSubmitting, error } = useFormSubmit({
    submitFn: submitCertificateRequest,
    onSuccess: () => {
      setSuccessMessage('Certificate request received successfully');
      reset();
    }
  });

  const requestType = watch('requestType');
  const isRush = watch('isRush');

  return (
    <Layout title="Request Insurance Certificate | WCCIS">
      <FormLayout
        title="Request Certificate of Insurance"
        subtitle="Need proof of coverage? We'll help you get certificates for any of your active policies."
        // Convert null to undefined so that error is of type string | undefined
        error={error ?? undefined}
        success={successMessage}
      >
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-blue-800 font-medium">Processing Times:</p>
              <ul className="text-sm text-blue-700 mt-1">
                <li>• Standard: Within 24 business hours</li>
                <li>• Rush: Within 2 business hours (additional fee may apply)</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <FormGroup>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Type
            </label>
            <select
              {...register('requestType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="standard">Standard Certificate</option>
              <option value="additional-insured">Additional Insured</option>
              <option value="waiver">Waiver of Subrogation</option>
              <option value="primary">Primary &amp; Non-Contributory</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('isRush')}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Rush Request (2-hour turnaround)
              </span>
            </label>
          </FormGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup error={errors.policyHolder?.message}>
              <FormInput
                id="policyHolder"
                label="Named Insured (as shown on policy)"
                register={register}
                rules={{ required: 'Named insured is required' }}
                error={errors.policyHolder}
              />
            </FormGroup>

            <FormGroup error={errors.carrier?.message}>
              <label className="block text-sm font-medium text-gray-700">
                Insurance Carrier
              </label>
              <select
                {...register('carrier')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Carrier</option>
                <option value="hartford">The Hartford</option>
                <option value="travelers">Travelers</option>
                <option value="liberty">Liberty Mutual</option>
                <option value="cna">CNA</option>
                <option value="other">Other (specify in notes)</option>
              </select>
            </FormGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup error={errors.policyNumber?.message}>
              <FormInput
                id="policyNumber"
                label="Policy Number"
                register={register}
                rules={{ required: 'Policy number is required' }}
                error={errors.policyNumber}
              />
            </FormGroup>

            <FormGroup error={errors.certificateHolder?.message}>
              <FormInput
                id="certificateHolder"
                label="Certificate Holder"
                register={register}
                rules={{ required: 'Certificate holder is required' }}
                error={errors.certificateHolder}
              />
            </FormGroup>
          </div>

          {requestType === 'additional-insured' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Additional Insured requests may require policy endorsement and
                  additional premium. Your agent will contact you if needed.
                </p>
              </div>
            </div>
          )}

          <FormGroup>
            <label className="block text-sm font-medium text-gray-700">
              Special Instructions or Requirements
            </label>
            <textarea
              {...register('specialInstructions')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Enter any special requirements, project details, or additional information"
            />
          </FormGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup error={errors.email?.message}>
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                register={register}
                rules={{ required: 'Email is required' }}
                error={errors.email}
                placeholder="Where should we send the certificate?"
              />
            </FormGroup>

            <FormGroup error={errors.phone?.message}>
              <FormInput
                id="phone"
                label="Phone Number"
                type="tel"
                register={register}
                rules={{ required: 'Phone number is required' }}
                error={errors.phone}
              />
            </FormGroup>
          </div>

          <div className="bg-gray-50 border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Need help?</p>
                <p>
                  Contact your agent directly or call our office at (800) XXX-XXXX
                  for immediate assistance.
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            {isRush ? 'Submit Rush Request' : 'Submit Request'}
          </Button>
        </form>
      </FormLayout>
    </Layout>
  );
};

export default CertificateRequestPage;
