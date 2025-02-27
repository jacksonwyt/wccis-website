// src/types/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public status: string,
    message: string,
    public code?: string,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'AppError';
    // Fix for TypeScript error - ensure captureStackTrace exists
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message: string, code?: string) {
    return new AppError(400, 'error', message, code);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new AppError(401, 'error', message, 'UNAUTHORIZED');
  }

  static forbidden(message: string = 'Forbidden') {
    return new AppError(403, 'error', message, 'FORBIDDEN');
  }

  static notFound(message: string = 'Resource not found') {
    return new AppError(404, 'error', message, 'NOT_FOUND');
  }

  static validation(errors: any[]) {
    return new AppError(422, 'error', 'Validation error', 'VALIDATION_ERROR', errors);
  }

  static internal(message: string = 'Internal server error') {
    return new AppError(500, 'error', message, 'INTERNAL_ERROR');
  }
}