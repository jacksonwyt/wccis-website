// src/components/DynamicForm.tsx
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormStore } from '@/state/formStore';
import { Button } from './ui/Button';

// Lazy load FormInput to reduce initial bundle size
const FormInput = lazy(() => import('./FormInput'));

// Simple loading fallback
const InputFallback = () => (
  <div className="animate-pulse h-14 bg-gray-100 rounded-md"></div>
);

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

// Memoized form field to prevent unnecessary re-renders
const MemoizedFormField = React.memo(
  ({ field, error, register }: { field: Field; error: any; register: any }) => (
    <Suspense fallback={<InputFallback />}>
      <FormInput
        id={field.name}
        label={field.label}
        type={field.type}
        placeholder={field.placeholder}
        error={error}
        register={register}
      />
    </Suspense>
  )
);

export const DynamicForm: React.FC<DynamicFormProps> = React.memo(({
  id,
  fields,
  schema,
  onSubmit,
  submitLabel = 'Submit',
  persistData = true,
}) => {
  const { setFormData, getFormData } = useFormStore();
  const [isFormReady, setIsFormReady] = useState(false);
  
  // Get saved form data
  const savedData = persistData ? getFormData(id) : null;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: savedData || {},
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register
  } = methods;

  // Mark form as ready after initial render to improve perceived performance
  useEffect(() => {
    const timer = setTimeout(() => setIsFormReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (persistData) {
      setFormData(id, data);
    }
    await onSubmit(data);
  };

  const onFormSubmit = React.useCallback(
    handleSubmit(handleFormSubmit), 
    [handleSubmit, handleFormSubmit]
  );

  if (!isFormReady) {
    return (
      <div className="space-y-6">
        {fields.map((field) => (
          <InputFallback key={field.name} />
        ))}
        <div className="animate-pulse h-10 w-full bg-blue-100 rounded-md"></div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onFormSubmit} className="space-y-6" noValidate>
        {fields.map((field) => (
          <MemoizedFormField
            key={field.name}
            field={field}
            error={errors[field.name]}
            register={register}
          />
        ))}
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </form>
    </FormProvider>
  );
});