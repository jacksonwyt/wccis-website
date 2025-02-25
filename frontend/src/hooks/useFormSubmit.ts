// frontend/src/hooks/useFormSubmit.ts
import { useState, useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import React from 'react';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
}

export interface FormError {
  message: string;
  code?: string;
  field?: string;
}

interface UseFormSubmitOptions<TData, TResponse = any> {
  submitFn: (data: TData) => Promise<TResponse>;
  onSuccess?: (response: TResponse) => void;
  maxRetries?: number;
  retryDelay?: number; // in ms
  clearFormAfterSuccess?: boolean;
}

export function useFormSubmit<TData, TResponse = ApiResponse>({
  submitFn,
  onSuccess,
  maxRetries = 2,
  retryDelay = 1000,
  clearFormAfterSuccess = false,
}: UseFormSubmitOptions<TData, TResponse>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<FormError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // This function is compatible with react-hook-form's handleSubmit
  // We added a type annotation to make it compatible
  const submit: { 
    (data: TData): Promise<TResponse | null>;
    (data: TData, event?: React.FormEvent<HTMLFormElement>): Promise<TResponse | null>;
  } = useCallback(async (data: TData, _?: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);
    
    let retries = 0;
    
    const executeRequest = async (): Promise<TResponse> => {
      try {
        return await submitFn(data);
      } catch (err) {
        // Check if it's a network error that could benefit from retry
        if (
          err instanceof Error && 
          (
            err.message.includes('network') || 
            err.message.includes('connection') || 
            err.message.includes('timeout')
          ) && 
          retries < maxRetries
        ) {
          retries++;
          
          // Exponential backoff
          const delay = retryDelay * Math.pow(2, retries - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
          
          // Retry the request
          return executeRequest();
        }
        
        throw err;
      }
    };
    
    try {
      const response = await executeRequest();
      
      setIsSuccess(true);
      
      if (clearFormAfterSuccess) {
        _?.preventDefault();
      }
      
      onSuccess?.(response);
      return response;
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      let errorCode = 'UNKNOWN_ERROR';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      // Try to parse API error responses
      if (err instanceof Response || (err as any)?.json) {
        try {
          const errorData = await (err as Response).json();
          errorMessage = errorData.error?.message || errorData.message || errorMessage;
          errorCode = errorData.error?.code || errorCode;
        } catch (jsonError) {
          // Failed to parse JSON, use the original error
        }
      }
      
      const formError: FormError = {
        message: errorMessage,
        code: errorCode
      };
      
      setError(formError);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [submitFn, onSuccess, maxRetries, retryDelay, clearFormAfterSuccess]);

  const clearError = useCallback(() => setError(null), []);
  const clearSuccess = useCallback(() => setIsSuccess(false), []);
  
  return { 
    submit, 
    isSubmitting, 
    error, 
    isSuccess, 
    clearError, 
    clearSuccess 
  };
}