// frontend/src/pages/insurance/general-liability-quote.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../../components/Layout';
import { Button } from '../../components/ui/Button';
import FormInput from '../../components/FormInput';
import { FormGroup } from '../../components/ui/FormGroup';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { submitQuoteRequest } from '../../utils/api';
import QuoteLayout from '@components/QuoteLayout';

const glQuoteSchema = z.object({
  // Step 1: Contact Information
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  
  // Step 2: Insurance & Business Details
  contractorLicense: z.string().min(1, 'License number is required'),
  licenseType: z.string().min(1, 'License type is required'),
  currentCarrier: z.string().optional(),
  expirationDate: z.string().optional(),
  operationsDescription: z.string().min(1, 'Description is required'),
  entityType: z.enum(['Individual', 'Corporation', 'Partnership', 'LLC']),
  grossAnnualReceipts: z.number().min(0, 'Must be 0 or greater'),
  
  // Step 3: Operations & Employee Information
  totalOwners: z.number().min(0, 'Must be 0 or greater'),
  fullTimeEmployees: z.number().min(0, 'Must be 0 or greater'),
  partTimeEmployees: z.number().min(0, 'Must be 0 or greater'),
  commercialPercent: z.number().min(0).max(100),
  commercialNew: z.number().min(0).max(100),
  commercialRemodeling: z.number().min(0).max(100),
  commercialServiceRepair: z.number().min(0).max(100),
  residentialPercent: z.number().min(0).max(100),
  residentialNew: z.number().min(0).max(100),
  residentialRemodeling: z.number().min(0).max(100),
  residentialServiceRepair: z.number().min(0).max(100),
  multiUnitWork: z.boolean(),
  multiUnitDetails: z.string().optional(),
  
  // Step 4: Claims History
  claimsHistory: z.string().optional(),
});

type GLQuoteForm = z.infer<typeof glQuoteSchema>;

const GeneralLiabilityQuotePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4; // Steps 0, 1, 2, 3

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GLQuoteForm>({
    resolver: zodResolver(glQuoteSchema),
    defaultValues: {
      entityType: 'Individual',
      multiUnitWork: false,
    },
  });

  const { submit, isSubmitting, error } = useFormSubmit({
    submitFn: async (data: GLQuoteForm) => submitQuoteRequest(data),
  });

  const onNext = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const onBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const onSubmit = (data: GLQuoteForm) => submit(data);

  return (
    <Layout title="General Liability Quote Request | WCCIS">
      <QuoteLayout
        title="General Liability Quote Request"
        subtitle="Complete this form to receive a detailed quote for General Liability coverage."
        error={error}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            {[...Array(totalSteps)].map((_, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  idx <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Step 1: Contact Information */}
          {currentStep === 0 && (
            <section>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormInput id="companyName" label="Company Name" register={register} error={errors.companyName} />
                </FormGroup>
                <FormGroup>
                  <FormInput id="contactName" label="Contact Name" register={register} error={errors.contactName} />
                </FormGroup>
                <FormGroup>
                  <FormInput id="phone" label="Phone Number" type="tel" register={register} error={errors.phone} />
                </FormGroup>
                <FormGroup>
                  <FormInput id="email" label="Email Address" type="email" register={register} error={errors.email} />
                </FormGroup>
              </div>
            </section>
          )}

          {/* Step 2: Insurance & Business Details */}
          {currentStep === 1 && (
            <section>
              <h3 className="text-xl font-semibold mb-4">Insurance & Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormInput
                    id="contractorLicense"
                    label="Contractor's License Number"
                    register={register}
                    error={errors.contractorLicense}
                  />
                </FormGroup>
                <FormGroup>
                  <FormInput id="licenseType" label="License Type" register={register} error={errors.licenseType} />
                </FormGroup>
                <FormGroup>
                  <FormInput
                    id="currentCarrier"
                    label="Current Carrier"
                    register={register}
                    error={errors.currentCarrier}
                  />
                </FormGroup>
                <FormGroup>
                  <FormInput
                    id="expirationDate"
                    label="Policy Expiration Date"
                    type="date"
                    register={register}
                    error={errors.expirationDate}
                  />
                </FormGroup>
              </div>
              <FormGroup className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description of Operations</label>
                <textarea
                  {...register('operationsDescription')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </FormGroup>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700">Entity Type</label>
                  <select
                    {...register('entityType')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                    <option value="LLC">LLC</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <FormInput
                    id="grossAnnualReceipts"
                    label="Gross Annual Receipts"
                    type="number"
                    register={register}
                    error={errors.grossAnnualReceipts}
                  />
                </FormGroup>
              </div>
            </section>
          )}

          {/* Step 3: Operations & Employee Information */}
          {currentStep === 2 && (
            <section>
              <h3 className="text-xl font-semibold mb-4">Operations & Employee Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormGroup>
                  <FormInput
                    id="totalOwners"
                    label="Total Owners"
                    type="number"
                    register={register}
                    error={errors.totalOwners}
                  />
                </FormGroup>
                <FormGroup>
                  <FormInput
                    id="fullTimeEmployees"
                    label="Full Time Employees"
                    type="number"
                    register={register}
                    error={errors.fullTimeEmployees}
                  />
                </FormGroup>
                <FormGroup>
                  <FormInput
                    id="partTimeEmployees"
                    label="Part Time Employees"
                    type="number"
                    register={register}
                    error={errors.partTimeEmployees}
                  />
                </FormGroup>
              </div>
              <div className="mt-6">
                <h4 className="font-medium mb-2">Commercial Operations</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormGroup>
                    <FormInput
                      id="commercialPercent"
                      label="Total %"
                      type="number"
                      register={register}
                      error={errors.commercialPercent}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      id="commercialNew"
                      label="New %"
                      type="number"
                      register={register}
                      error={errors.commercialNew}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      id="commercialRemodeling"
                      label="Remodeling %"
                      type="number"
                      register={register}
                      error={errors.commercialRemodeling}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      id="commercialServiceRepair"
                      label="Service/Repair %"
                      type="number"
                      register={register}
                      error={errors.commercialServiceRepair}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium mb-2">Residential Operations</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormGroup>
                    <FormInput
                      id="residentialPercent"
                      label="Total %"
                      type="number"
                      register={register}
                      error={errors.residentialPercent}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      id="residentialNew"
                      label="New %"
                      type="number"
                      register={register}
                      error={errors.residentialNew}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      id="residentialRemodeling"
                      label="Remodeling %"
                      type="number"
                      register={register}
                      error={errors.residentialRemodeling}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      id="residentialServiceRepair"
                      label="Service/Repair %"
                      type="number"
                      register={register}
                      error={errors.residentialServiceRepair}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="mt-6">
                <FormGroup>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('multiUnitWork')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Work on Multi-Unit Dwellings?</span>
                  </label>
                </FormGroup>
                {watch('multiUnitWork') && (
                  <FormGroup className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Details
                    </label>
                    <textarea
                      {...register('multiUnitDetails')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={2}
                      placeholder="Describe the work (new, remodel, etc)"
                    />
                  </FormGroup>
                )}
              </div>
            </section>
          )}

          {/* Step 4: Claims History */}
          {currentStep === 3 && (
            <section>
              <h3 className="text-xl font-semibold mb-4">Claims History</h3>
              <FormGroup>
                <label className="block text-sm font-medium text-gray-700">
                  Describe any claims, losses or lawsuits in the past 5 years
                </label>
                <textarea
                  {...register('claimsHistory')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </FormGroup>
            </section>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 0 ? (
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
            ) : (
              <div />
            )}
            {currentStep < totalSteps - 1 ? (
              <Button type="button" onClick={onNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" isLoading={isSubmitting}>
                Submit Quote Request
              </Button>
            )}
          </div>
        </form>
      </QuoteLayout>
    </Layout>
  );
};

export default GeneralLiabilityQuotePage;


