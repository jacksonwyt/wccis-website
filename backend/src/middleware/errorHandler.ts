// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/errors';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: {
        message: err.message,
      },
    });
  }

  // Handle unknown errors
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    error: {
      message: 'Internal server error',
    },
  });
};