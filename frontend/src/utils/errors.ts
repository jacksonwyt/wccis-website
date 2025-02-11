// frontend/src/utils/errors.ts
import { AxiosError } from 'axios';

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

  if (error instanceof AxiosError) {
    return new AppError(
      error.response?.data?.message || error.message,
      error.response?.data?.code,
      error.response?.status
    );
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError('An unexpected error occurred');
};

export const getErrorMessage = (error: unknown): string => {
  const appError = handleApiError(error);
  return appError.message;
};