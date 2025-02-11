// frontend/src/pages/insurance/general-liability-quote.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../../components/Layout';
import { FormLayout } from '../../components/ui/FormLayout';
import { FormGroup } from '../../components/ui/FormGroup';
import { Button } from '../../components/ui/Button';
import FormInput from '../../components/FormInput';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { submitQuoteRequest } from '../../utils/api';

const glQuoteSchema = z.object({
  // Contact Information
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  altPhone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email('Valid email required'),

  // Insurance Information
  contractorLicense: z.string().min(1, 'License number is required'),
  licenseType: z.string().min(1, 'License type is required'),
  currentCarrier: z.string().optional(),
  expirationDate: z.string().optional(),
  operationsDescription: z.string().min(1, 'Description is required'),
  
  // Business Details
  entityType: z.enum(['Individual', 'Corporation', 'Partnership', 'LLC']),
  grossAnnualReceipts: z.number().min(0, 'Must be 0 or greater'),
  subcontractorCosts: z.number().min(0, 'Must be 0 or greater'),
  subcontractorPercentage: z.number().min(0, 'Must be 0 or greater').max(100, 'Cannot exceed 100%'),
  annualPayroll: z.number().min(0, 'Must be 0 or greater'),
  
  // Employee Information
  totalOwners: z.number().min(0, 'Must be 0 or greater'),
  fullTimeEmployees: z.number().min(0, 'Must be 0 or greater'),
  partTimeEmployees: z.number().min(0, 'Must be 0 or greater'),

  // Operations Breakdown
  commercialPercent: z.number().min(0).max(100),
  commercialNew: z.number().min(0).max(100),
  commercialRemodeling: z.number().min(0).max(100),
  commercialServiceRepair: z.number().min(0).max(100),
  
  residentialPercent: z.number().min(0).max(100),
  residentialNew: z.number().min(0).max(100),
  residentialRemodeling: z.number().min(0).max(100),
  residentialServiceRepair: z.number().min(0).max(100),
  
  // Multi-Unit Work
  multiUnitWork: z.boolean(),
  multiUnitDetails: z.string().optional(),
  
  // Claims History
  claimsHistory: z.string().optional(),
});

type GLQuoteForm = z.infer<typeof glQuoteSchema>;

const GeneralLiabilityQuotePage = () => {
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
    }
  });

  const { submit, isSubmitting, error } = useFormSubmit({
    submitFn: async (data: GLQuoteForm) => {
      return submitQuoteRequest(data);
    }
  });

  return (
    <Layout title="General Liability Quote Request | WCCIS">
      <FormLayout
        title="General Liability Quote Request"
        subtitle="Complete this form to receive a detailed quote for General Liability coverage."
        error={error}
      >
        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          {/* Contact Information */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup>
                <FormInput
                  id="companyName"
                  label="Company Name"
                  register={register}
                  error={errors.companyName}
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  id="contactName"
                  label="Contact Name"
                  register={register}
                  error={errors.contactName}
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  register={register}
                  error={errors.phone}
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  id="email"
                  label="Email Address"
                  type="email"
                  register={register}
                  error={errors.email}
                />
              </FormGroup>
            </div>
          </section>

          {/* Insurance Information */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Insurance Information</h3>
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
                <FormInput
                  id="licenseType"
                  label="License Type"
                  register={register}
                  error={errors.licenseType}
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  id="currentCarrier"
                  label="Current General Liability Carrier"
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
              <label className="block text-sm font-medium text-gray-700">
                Description of Operations
              </label>
              <textarea
                {...register('operationsDescription')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </FormGroup>
          </section>

          {/* Business Details */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup>
                <label className="block text-sm font-medium text-gray-700">
                  Entity Type
                </label>
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

          {/* Employee Information */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Employee Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormGroup>
                <FormInput
                  id="totalOwners"
                  label="Total Number of Owners"
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
          </section>

          {/* Operations Breakdown */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Operations Breakdown</h3>
            <div className="space-y-6">
              <div>
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

              <div>
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
            </div>
          </section>

          {/* Multi-Unit Work */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Multi-Unit Projects</h3>
            <FormGroup>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('multiUnitWork')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Do you perform work on Condos, Apartments, or other Multi-Unit Dwellings?</span>
              </label>
            </FormGroup>
            {watch('multiUnitWork') && (
              <FormGroup className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Please provide details
                </label>
                <textarea
                  {...register('multiUnitDetails')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the type of work (new, remodel/additions, etc)"
                />
              </FormGroup>
            )}
          </section>

          {/* Claims History */}
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

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Submit Quote Request
          </Button>
        </form>
      </FormLayout>
    </Layout>
  );
};

export default GeneralLiabilityQuotePage;