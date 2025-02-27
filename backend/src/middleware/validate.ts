// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../types/errors';

export const validate = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        const formattedErrors = result.error.format();
        return next(AppError.validation([formattedErrors]));
      }

      // Add the validated data to the request object
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};