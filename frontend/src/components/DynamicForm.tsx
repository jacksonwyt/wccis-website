// src/components/DynamicForm.tsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormStore } from '@/state/formStore';
import FormInput from './FormInput';
import { Button } from './ui/Button';

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  validation?: z.ZodType<unknown>;
  options?: { label: string; value: string }[];
}

interface DynamicFormProps {
  id: string;
  fields: Field[];
  schema: z.ZodType<Record<string, unknown>>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  submitLabel?: string;
  persistData?: boolean;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  id,
  fields,
  schema,
  onSubmit,
  submitLabel = 'Submit',
  persistData = true,
}) => {
  const { setFormData, getFormData } = useFormStore();
  const savedData = persistData ? getFormData(id) : null;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: savedData || {},
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (persistData) {
      setFormData(id, data);
    }
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormInput
            key={field.name}
            id={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name]}
            register={methods.register}
          />
        ))}
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </form>
    </FormProvider>
  );
};