// frontend/src/hooks/useFormSubmit.ts
import { useState } from 'react';

interface UseFormSubmitOptions<T> {
  submitFn: (data: T) => Promise<any>;
  onSuccess?: () => void;
}

export function useFormSubmit<T>({ submitFn, onSuccess }: UseFormSubmitOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const submit = async (data: T) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      await submitFn(data);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error };
}