// frontend/src/pages/insurance/workers-comp-quote.tsx
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../../components/Layout';
import { Button } from '../../components/ui/Button';
import FormInput from '../../components/FormInput';
import { FormGroup } from '../../components/ui/FormGroup';
import { Plus, Minus } from 'lucide-react';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { submitQuoteRequest } from '../../utils/api';
import QuoteLayout from '../../components/QuoteLayout';

const wcQuoteSchema = z.object({
  // Step 1: Contact Information
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  
  // Step 2: Business & Operations
  contractorLicense: z.string().min(1, 'License number is required'),
  fein: z.string().min(1, 'FEIN is required'),
  ownerSSN: z.string().optional(),
  entityType: z.enum(['Individual', 'Corporation', 'Partnership', 'LLC']),
  hoursStart: z.string().min(1, 'Start time required'),
  hoursEnd: z.string().min(1, 'End time required'),
  operations: z.string().min(1, 'Operations description required'),
  
  // Step 3: Employee Information (Field Array)
  employees: z.array(
    z.object({
      classCode: z.string().min(1, 'Class code required'),
      workType: z.string().min(1, 'Work type required'),
      fullTime: z.number().min(0),
      partTime: z.number().min(0),
      hourlyPay: z.number().min(0),
      annualPay: z.number().min(0),
    })
  ),
  
  // Step 4: Claims History
  claimsHistory: z.string().optional(),
});

type WCQuoteForm = z.infer<typeof wcQuoteSchema>;

const WorkersCompQuotePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4; // Steps 0,1,2,3

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WCQuoteForm>({
    resolver: zodResolver(wcQuoteSchema),
    defaultValues: {
      entityType: 'Individual',
      employees: [{ classCode: '', workType: '', fullTime: 0, partTime: 0, hourlyPay: 0, annualPay: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees',
  });

  const { submit, isSubmitting, error } = useFormSubmit({
    submitFn: async (data: WCQuoteForm) => submitQuoteRequest(data),
  });

  const onNext = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const onBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const onSubmit = (data: WCQuoteForm) => submit(data);

  return (
    <Layout title="Workers Compensation Quote Request | WCCIS">
      <QuoteLayout
        title="Workers Compensation Quote Request"
        subtitle="Complete this form to receive a detailed quote for Workers Compensation coverage."
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

          {/* Step 2: Business & Operations */}
          {currentStep === 1 && (
            <section>
              <h3 className="text-xl font-semibold mb-4">Business & Operations</h3>
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
                  <FormInput id="fein" label="FEIN" register={register} error={errors.fein} />
                </FormGroup>
                <FormGroup>
                  <FormInput id="ownerSSN" label="Owner's SSN" register={register} error={errors.ownerSSN} />
                </FormGroup>
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
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormInput
                    id="hoursStart"
                    label="Hours of Operation - Start"
                    type="time"
                    register={register}
                    error={errors.hoursStart}
                  />
                </FormGroup>
                <FormGroup>
                  <FormInput
                    id="hoursEnd"
                    label="Hours of Operation - End"
                    type="time"
                    register={register}
                    error={errors.hoursEnd}
                  />
                </FormGroup>
              </div>
              <FormGroup className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description of Operations</label>
                <textarea
                  {...register('operations')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </FormGroup>
            </section>
          )}

          {/* Step 3: Employee Information */}
          {currentStep === 2 && (
            <section>
              <h3 className="text-xl font-semibold mb-4">Employee Information</h3>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormGroup>
                        <FormInput
                          id={`employees.${index}.classCode`}
                          label="Class Code"
                          register={register}
                          error={errors.employees?.[index]?.classCode}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormInput
                          id={`employees.${index}.workType`}
                          label="Type of Work"
                          register={register}
                          error={errors.employees?.[index]?.workType}
                        />
                      </FormGroup>
                      <div className="grid grid-cols-2 gap-2">
                        <FormGroup>
                          <FormInput
                            id={`employees.${index}.fullTime`}
                            label="Full Time"
                            type="number"
                            register={register}
                            error={errors.employees?.[index]?.fullTime}
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormInput
                            id={`employees.${index}.partTime`}
                            label="Part Time"
                            type="number"
                            register={register}
                            error={errors.employees?.[index]?.partTime}
                          />
                        </FormGroup>
                      </div>
                      <FormGroup>
                        <FormInput
                          id={`employees.${index}.hourlyPay`}
                          label="Hourly Pay"
                          type="number"
                          register={register}
                          error={errors.employees?.[index]?.hourlyPay}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormInput
                          id={`employees.${index}.annualPay`}
                          label="Annual Pay"
                          type="number"
                          register={register}
                          error={errors.employees?.[index]?.annualPay}
                        />
                      </FormGroup>
                    </div>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => remove(index)}
                        className="mt-2"
                      >
                        <Minus className="w-4 h-4 mr-2" />
                        Remove Employee
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    append({
                      classCode: '',
                      workType: '',
                      fullTime: 0,
                      partTime: 0,
                      hourlyPay: 0,
                      annualPay: 0,
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
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
              <Button type="button" variant="secondary" onClick={onBack}>
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

export default WorkersCompQuotePage;


