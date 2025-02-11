// frontend/src/utils/errors.ts
import type { AxiosError as AxiosErrorType } from 'axios';
import type { ApiResponse } from './api';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  const axiosError = error as AxiosErrorType;
  if (axiosError.isAxiosError) {
    const response = axiosError.response?.data as ApiResponse;
    return new AppError(
      response?.error?.message || axiosError.message,
      response?.error?.code,
      axiosError.response?.status
    );
  }

  return new AppError('An unexpected error occurred');
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};