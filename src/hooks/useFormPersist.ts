//frontend/src/hooks/useFormPersist.ts

import { useEffect, useCallback } from 'react';
import { UseFormReturn, Path } from 'react-hook-form';

export const useFormPersist = <T extends Record<string, any>>(
  form: UseFormReturn<T>,
  key: string,
  options: {
    exclude?: Array<keyof T>;
    validateOnLoad?: boolean;
  } = {}
) => {
  const { watch, setValue, trigger } = form;

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((field) => {
          if (!options.exclude?.includes(field as keyof T)) {
            setValue(field as Path<T>, parsedData[field], { 
              shouldValidate: options.validateOnLoad 
            });
          }
        });
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
      localStorage.removeItem(key);
    }
  }, [key, setValue, trigger, options.exclude, options.validateOnLoad]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (Object.keys(values).length > 0) {
        const dataToSave = { ...values };
        if (options.exclude) {
          options.exclude.forEach((field) => {
            delete dataToSave[field as string];
          });
        }
        localStorage.setItem(key, JSON.stringify(dataToSave));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, key, options.exclude]);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return { clearSavedData };
};