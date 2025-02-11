// frontend/src/hooks/useFormSubmit.ts
import { useState, useCallback } from 'react';
import { getErrorMessage } from '../utils/errors';
import { ApiResponse } from '../utils/api';

interface UseFormSubmitOptions<T> {
  onSuccess?: (data: ApiResponse) => void;
  onError?: (error: Error) => void;
  submitFn: (data: T) => Promise<ApiResponse>;
  resetForm?: () => void;
}

export function useFormSubmit<T>(options: UseFormSubmitOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = useCallback(async (data: T) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(undefined);
      
      const response = await options.submitFn(data);
      
      setIsSubmitted(true);
      options.onSuccess?.(response);
      options.resetForm?.();
      return response;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      options.onError?.(err as Error);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, options]);

  const reset = useCallback(() => {
    setError(undefined);
    setIsSubmitted(false);
    options.resetForm?.();
  }, [options]);

  return {
    submit,
    reset,
    isSubmitting,
    isSubmitted,
    error,
    setError
  };
}