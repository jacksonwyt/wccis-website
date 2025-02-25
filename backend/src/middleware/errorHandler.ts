// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/errors';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Extract request info for logging
  const requestInfo = {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userId: 'unauthenticated',
  };

  if (err instanceof AppError) {
    // Log application errors with appropriate level
    if (err.statusCode >= 500) {
      logger.error(`App Error: ${err.message}`, { ...requestInfo, stack: err.stack, statusCode: err.statusCode });
    } else {
      logger.warn(`App Error: ${err.message}`, { ...requestInfo, statusCode: err.statusCode });
    }

    return res.status(err.statusCode).json({
      status: err.status,
      error: {
        message: err.message,
        code: err.code || 'ERR_UNKNOWN',
      },
    });
  }

  // Categorize and handle different types of errors
  if (err.name === 'ValidationError') {
    logger.warn('Validation Error', { ...requestInfo, error: err.message });
    return res.status(400).json({
      status: 'error',
      error: {
        message: err.message,
        code: 'ERR_VALIDATION',
      },
    });
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    logger.warn('Auth Error', { ...requestInfo, error: err.message });
    return res.status(401).json({
      status: 'error',
      error: {
        message: 'Authentication failed',
        code: 'ERR_AUTHENTICATION',
      },
    });
  }

  // Handle unknown errors
  logger.error('Unhandled Error', { ...requestInfo, stack: err.stack, message: err.message });
  
  res.status(500).json({
    status: 'error',
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message || 'Unknown error occurred',
      code: 'ERR_INTERNAL',
    },
  });
};