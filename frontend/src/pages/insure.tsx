import React, { useState } from 'react';
import {
  useForm,
  FormProvider,
  UseFormRegister,
  FieldErrors,
  UseFormWatch
} from 'react-hook-form';
import Layout from '../components/Layout';
import { FormLayout } from '../components/ui/FormLayout';
import { FormGroup } from '../components/ui/FormGroup';
import { Button } from '../components/ui/Button';
import FormInput from '../components/FormInput';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { useFormPersist } from '../hooks/useFormPersist';
import { Check } from 'lucide-react';
import { submitQuoteRequest } from '../utils/api';

/* -------------------------------------------------------------------------
   Define the full type for the form's data.
   Adjust the properties as needed to match what your API expects.
--------------------------------------------------------------------------- */
interface InsuranceQuoteRequest {
  businessName: string;
  dba?: string;
  fein: string;
  yearsInBusiness: number;
  description?: string;
  generalLiability?: boolean;
  workersComp?: boolean;
  commercialAuto?: boolean;
  annualRevenue: number;
  projectValue: number;
  projectTypes: string[];
  states: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactTime: string;
  preferredContact?: boolean;
}

/* -------------------------------------------------------------------------
   getStepName: Returns the label for each step.
   Parameter 'step' is explicitly typed as number.
--------------------------------------------------------------------------- */
function getStepName(step: number): string {
  switch (step) {
    case 1:
      return 'Business Info';
    case 2:
      return 'Coverage';
    case 3:
      return 'Operations';
    case 4:
      return 'Contact';
    default:
      return '';
  }
}

/* -------------------------------------------------------------------------
   FormSteps Component Props
--------------------------------------------------------------------------- */
interface FormStepsProps {
  currentStep: number;
  totalSteps: number;
}

const FormSteps: React.FC<FormStepsProps> = ({ currentStep, totalSteps }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center">
      {[...Array(totalSteps)].map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1 <= currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className="ml-2 text-sm hidden md:inline">
              {getStepName(index + 1)}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`flex-1 h-1 mx-4 ${
                index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------------
   BusinessInfoStep Component Props
--------------------------------------------------------------------------- */
interface BusinessInfoStepProps {
  register: UseFormRegister<InsuranceQuoteRequest>;
  errors: FieldErrors<InsuranceQuoteRequest>;
}

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ register, errors }) => (
  <div className="space-y-6">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <p className="text-blue-800 text-sm">
        We'll compare quotes from our partner carriers including: Hartford,
        Travelers, Liberty Mutual, and more.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormGroup error={errors.businessName?.message}>
        <FormInput
          id="businessName"
          label="Legal Business Name"
          register={register}
          rules={{ required: 'Business name is required' }}
          error={errors.businessName}
        />
      </FormGroup>

      <FormGroup error={errors.dba?.message}>
        <FormInput
          id="dba"
          label="DBA (if applicable)"
          register={register}
          error={errors.dba}
        />
      </FormGroup>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormGroup error={errors.fein?.message}>
        <FormInput
          id="fein"
          label="Federal Tax ID (FEIN)"
          register={register}
          rules={{ required: 'FEIN is required for accurate quotes' }}
          error={errors.fein}
          placeholder="XX-XXXXXXX"
        />
      </FormGroup>

      <FormGroup error={errors.yearsInBusiness?.message}>
        <FormInput
          id="yearsInBusiness"
          label="Years in Business"
          type="number"
          register={register}
          rules={{ required: 'Years in business is required' }}
          error={errors.yearsInBusiness}
        />
      </FormGroup>
    </div>

    <FormGroup error={errors.description?.message}>
      <label className="block text-sm font-medium text-gray-700">
        Business Description
      </label>
      <textarea
        {...register('description')}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        rows={3}
        placeholder="Describe your contracting operations in detail"
      />
    </FormGroup>
  </div>
);

/* -------------------------------------------------------------------------
   CoverageSelectionStep Component Props
--------------------------------------------------------------------------- */
interface CoverageSelectionStepProps {
  register: UseFormRegister<InsuranceQuoteRequest>;
  errors: FieldErrors<InsuranceQuoteRequest>;
}

const CoverageSelectionStep: React.FC<CoverageSelectionStepProps> = ({ register, errors }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          id: 'generalLiability',
          label: 'General Liability',
          description: 'Compare quotes from multiple carriers',
          includes: [
            'Bodily injury coverage',
            'Property damage',
            'Completed operations'
          ]
        },
        {
          id: 'workersComp',
          label: 'Workers Compensation',
          description: 'Compare rates based on class codes',
          includes: [
            'Employee injury coverage',
            'Medical benefits',
            'Lost wage coverage'
          ]
        },
        {
          id: 'commercialAuto',
          label: 'Commercial Auto',
          description: 'Compare fleet coverage options',
          includes: ['Liability coverage', 'Physical damage', 'Hired/non-owned']
        }
      ].map((coverage) => (
        <div key={coverage.id} className="relative">
          <label className="block p-6 border rounded-lg hover:border-blue-500 cursor-pointer">
            {/* Note: We cast coverage.id as a key of InsuranceQuoteRequest */}
            <input
              type="checkbox"
              {...register(coverage.id as keyof InsuranceQuoteRequest)}
              className="absolute h-4 w-4 top-4 right-4"
            />
            <h3 className="text-lg font-medium mb-2">{coverage.label}</h3>
            <p className="text-gray-600 text-sm mb-4">{coverage.description}</p>
            <ul className="text-sm text-gray-500">
              {coverage.includes.map((item) => (
                <li key={item} className="flex items-center">
                  <Check className="w-4 h-4 text-blue-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </label>
        </div>
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------------
   OperationsStep Component Props
--------------------------------------------------------------------------- */
interface OperationsStepProps {
  register: UseFormRegister<InsuranceQuoteRequest>;
  errors: FieldErrors<InsuranceQuoteRequest>;
  watch: UseFormWatch<InsuranceQuoteRequest>;
}

const OperationsStep: React.FC<OperationsStepProps> = ({ register, errors, watch }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormGroup error={errors.annualRevenue?.message}>
        <FormInput
          id="annualRevenue"
          label="Annual Revenue"
          type="number"
          register={register}
          rules={{ required: 'Annual revenue is required' }}
          error={errors.annualRevenue}
          placeholder="$"
        />
      </FormGroup>

      <FormGroup error={errors.projectValue?.message}>
        <FormInput
          id="projectValue"
          label="Largest Project Value"
          type="number"
          register={register}
          rules={{ required: 'Largest project value is required' }}
          error={errors.projectValue}
          placeholder="$"
        />
      </FormGroup>
    </div>

    <FormGroup>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Types of Projects (select all that apply)
      </label>
      <div className="grid grid-cols-2 gap-4">
        {[
          'Residential',
          'Commercial',
          'Industrial',
          'New Construction',
          'Remodeling',
          'Repair',
          'Subcontractor',
          'General Contractor'
        ].map((type) => (
          <label key={type} className="flex items-center">
            <input
              type="checkbox"
              {...register('projectTypes')}
              value={type}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>
    </FormGroup>

    <FormGroup>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        States of Operation
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['CA', 'NV', 'OR', 'WA', 'AZ', 'TX', 'FL', 'NY'].map((state) => (
          <label key={state} className="flex items-center">
            <input
              type="checkbox"
              {...register('states')}
              value={state}
              className="mr-2"
            />
            {state}
          </label>
        ))}
      </div>
    </FormGroup>
  </div>
);

/* -------------------------------------------------------------------------
   ContactStep Component Props
--------------------------------------------------------------------------- */
interface ContactStepProps {
  register: UseFormRegister<InsuranceQuoteRequest>;
  errors: FieldErrors<InsuranceQuoteRequest>;
}

const ContactStep: React.FC<ContactStepProps> = ({ register, errors }) => (
  <div className="space-y-6">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <p className="text-blue-800 text-sm">
        Your agent will review quotes from multiple carriers and contact you to
        discuss the best options.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormGroup error={errors.firstName?.message}>
        <FormInput
          id="firstName"
          label="First Name"
          register={register}
          rules={{ required: 'First name is required' }}
          error={errors.firstName}
        />
      </FormGroup>

      <FormGroup error={errors.lastName?.message}>
        <FormInput
          id="lastName"
          label="Last Name"
          register={register}
          rules={{ required: 'Last name is required' }}
          error={errors.lastName}
        />
      </FormGroup>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormGroup error={errors.email?.message}>
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          register={register}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Please enter a valid email'
            }
          }}
          error={errors.email}
        />
      </FormGroup>

      <FormGroup error={errors.phone?.message}>
        <FormInput
          id="phone"
          label="Phone Number"
          type="tel"
          register={register}
          rules={{
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9-+()\s]{10,}$/,
              message: 'Please enter a valid phone number'
            }
          }}
          error={errors.phone}
        />
      </FormGroup>
    </div>

    <FormGroup>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Best Time to Contact You
      </label>
      <select
        {...register('contactTime')}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="morning">Morning (9AM - 12PM)</option>
        <option value="afternoon">Afternoon (12PM - 4PM)</option>
        <option value="evening">Evening (4PM - 6PM)</option>
      </select>
    </FormGroup>

    <FormGroup>
      <label className="flex items-start">
        <input
          type="checkbox"
          {...register('preferredContact')}
          className="mt-1 mr-2"
        />
        <span className="text-sm text-gray-600">
          I prefer to be contacted via email for initial quote details
        </span>
      </label>
    </FormGroup>
  </div>
);

/* -------------------------------------------------------------------------
   InsureMePage Component
--------------------------------------------------------------------------- */
const InsureMePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const methods = useForm<InsuranceQuoteRequest>({
    mode: 'onChange',
    defaultValues: {
      businessName: '',
      dba: '',
      fein: '',
      yearsInBusiness: 0,
      description: '',
      generalLiability: false,
      workersComp: false,
      commercialAuto: false,
      annualRevenue: 0,
      projectValue: 0,
      projectTypes: [],
      states: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      contactTime: 'morning',
      preferredContact: false
    }
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset
  } = methods;

  useFormPersist(methods, 'quote-comparison-form');

  const { submit, isSubmitting, error } = useFormSubmit({
    submitFn: submitQuoteRequest,
    onSuccess: () => {
      setSuccessMessage('Quote request received successfully');
      reset();
    }
  });

  const onSubmit = handleSubmit(async (data: InsuranceQuoteRequest) => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await submit(data);
    }
  });

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <Layout title="Compare Insurance Quotes | WCCIS">
      <FormLayout
        title="Compare Contractor Insurance Quotes"
        subtitle="Let us shop multiple carriers to find you the best coverage at competitive rates."
        error={error ?? undefined}
        success={successMessage}
      >
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormSteps currentStep={currentStep} totalSteps={4} />

            {currentStep === 1 && <BusinessInfoStep register={register} errors={errors} />}
            {currentStep === 2 && <CoverageSelectionStep register={register} errors={errors} />}
            {currentStep === 3 && (
              <OperationsStep register={register} errors={errors} watch={watch} />
            )}
            {currentStep === 4 && <ContactStep register={register} errors={errors} />}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="px-6"
                >
                  Back
                </Button>
              )}
              <Button type="submit" isLoading={isSubmitting} className="px-8 ml-auto">
                {currentStep === 4 ? 'Submit for Quote Comparison' : 'Next Step'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </FormLayout>
    </Layout>
  );
};

export default InsureMePage;
