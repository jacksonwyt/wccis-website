// frontend/src/hooks/useFormPersist.ts
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const useFormPersist = <T extends Record<string, any>>(
  form: UseFormReturn<T>,
  key: string
) => {
  const { watch, setValue } = form;

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((field) => {
          setValue(field as any, parsedData[field]);
        });
      } catch (error) {
        console.error('Error loading saved form data:', error);
        localStorage.removeItem(key);
      }
    }
  }, [key, setValue]);

  // Save form data on change
  useEffect(() => {
    const subscription = watch((values) => {
      if (Object.keys(values).length > 0) {
        localStorage.setItem(key, JSON.stringify(values));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, key]);

  // Clear saved data on successful submission
  const clearSavedData = () => {
    localStorage.removeItem(key);
  };

  return { clearSavedData };
};

// Usage example:
/*
const MyForm = () => {
  const form = useForm<FormData>();
  const { clearSavedData } = useFormPersist(form, 'my-form-key');

  const onSubmit = async (data: FormData) => {
    await submit(data);
    clearSavedData(); // Clear saved data after successful submission
  };
}
*/