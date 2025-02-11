// frontend/src/hooks/useFormSubmit.ts
import { useState } from 'react';
import { getErrorMessage } from '../utils/errors';
import { ApiResponse } from '../utils/api';

interface UseFormSubmitOptions<T> {
  onSuccess?: (data: ApiResponse) => void;
  onError?: (error: Error) => void;
}

export function useFormSubmit<T>(
  submitFn: (data: T) => Promise<ApiResponse>,
  options: UseFormSubmitOptions<T> = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: T) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await submitFn(data);
      
      options.onSuccess?.(response);
      return response;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      options.onError?.(err as Error);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
    error,
    setError
  };
}

// Usage example:
/*
const MyForm = () => {
  const { submit, isSubmitting, error } = useFormSubmit(apiService.submitQuoteRequest, {
    onSuccess: () => {
      toast.success('Form submitted successfully!');
      reset();
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await submit(data);
    } catch (err) {
      // Handle error if needed
    }
  });
}
*/