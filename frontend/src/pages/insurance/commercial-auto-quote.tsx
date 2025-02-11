// frontend/src/pages/insurance/commercial-auto-quote.tsx
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../../components/Layout';
import { FormLayout } from '../../components/ui/FormLayout';
import { FormGroup } from '../../components/ui/FormGroup';
import { Button } from '../../components/ui/Button';
import FormInput from '../../components/FormInput';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { Plus, Minus } from 'lucide-react';
import { submitQuoteRequest } from '../../utils/api';

const caQuoteSchema = z.object({
  // Contact Information
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  garagingAddress: z.string().min(1, 'Garaging address is required'),

  // Vehicle Information
  vehicles: z.array(z.object({
    year: z.string().min(4, 'Valid year required'),
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    vin: z.string().min(17, 'Valid VIN required').max(17),
  })),

  // Driver Information
  drivers: z.array(z.object({
    fullName: z.string().min(1, 'Full name required'),
    dateOfBirth: z.string().min(1, 'Date of birth required'),
    licenseNumber: z.string().min(1, 'License number required'),
  })),

  // Insurance History
  currentCarrier: z.string().optional(),
  expirationDate: z.string().optional(),
  hasLosses: z.boolean(),
});

type CAQuoteForm = z.infer<typeof caQuoteSchema>;

const CommercialAutoQuotePage = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CAQuoteForm>({
    resolver: zodResolver(caQuoteSchema),
    defaultValues: {
      vehicles: [{ year: '', make: '', model: '', vin: '' }],
      drivers: [{ fullName: '', dateOfBirth: '', licenseNumber: '' }],
      hasLosses: false,
    }
  });

  const { fields: vehicleFields, append: appendVehicle, remove: removeVehicle } = useFieldArray({
    control,
    name: "vehicles"
  });

  const { fields: driverFields, append: appendDriver, remove: removeDriver } = useFieldArray({
    control,
    name: "drivers"
  });

  const { submit, isSubmitting, error } = useFormSubmit({
    submitFn: async (data: CAQuoteForm) => {
      return submitQuoteRequest(data);
    }
  });

  const hasLosses = watch('hasLosses');

  return (
    <Layout title="Commercial Auto Quote Request | WCCIS">
      <FormLayout
        title="Commercial Auto Quote Request"
        subtitle="Complete this form to receive a detailed quote for Commercial Auto coverage."
        error={error}
      >
        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          {/* Contact Information */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup>
                <FormInput
                  id="name"
                  label="Full Name"
                  register={register}
                  error={errors.name}
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
                  id="garagingAddress"
                  label="Garaging Address"
                  register={register}
                  error={errors.garagingAddress}
                />
              </FormGroup>
            </div>
          </section>

          {/* Vehicle Information */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Vehicle Information</h3>
            <div className="space-y-4">
              {vehicleFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormGroup>
                      <FormInput
                        id={`vehicles.${index}.year`}
                        label="Year"
                        register={register}
                        error={errors.vehicles?.[index]?.year}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormInput
                        id={`vehicles.${index}.make`}
                        label="Make"
                        register={register}
                        error={errors.vehicles?.[index]?.make}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormInput
                        id={`vehicles.${index}.model`}
                        label="Model"
                        register={register}
                        error={errors.vehicles?.[index]?.model}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormInput
                        id={`vehicles.${index}.vin`}
                        label="VIN"
                        register={register}
                        error={errors.vehicles?.[index]?.vin}
                      />
                    </FormGroup>
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeVehicle(index)}
                      className="mt-2"
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Remove Vehicle
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendVehicle({ year: '', make: '', model: '', vin: '' })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </div>
          </section>

          {/* Driver Information */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Driver Information</h3>
            <div className="space-y-4">
              {driverFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormGroup>
                      <FormInput
                        id={`drivers.${index}.fullName`}
                        label="Full Name"
                        register={register}
                        error={errors.drivers?.[index]?.fullName}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormInput
                        id={`drivers.${index}.dateOfBirth`}
                        label="Date of Birth"
                        type="date"
                        register={register}
                        error={errors.drivers?.[index]?.dateOfBirth}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormInput
                        id={`drivers.${index}.licenseNumber`}
                        label="Driver's License Number"
                        register={register}
                        error={errors.drivers?.[index]?.licenseNumber}
                      />
                    </FormGroup>
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeDriver(index)}
                      className="mt-2"
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Remove Driver
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendDriver({ fullName: '', dateOfBirth: '', licenseNumber: '' })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Driver
              </Button>
            </div>
          </section>

          {/* Insurance History */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Insurance History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup>
                <FormInput
                  id="currentCarrier"
                  label="Current Insurance Carrier"
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
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('hasLosses')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Have you had any losses in the past 5 years?</span>
              </label>
            </FormGroup>
            {hasLosses && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">
                  Our team will contact you for additional information about your loss history.
                </p>
              </div>
            )}
          </section>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Submit Quote Request
          </Button>
        </form>
      </FormLayout>
    </Layout>
  );
};

export default CommercialAutoQuotePage;