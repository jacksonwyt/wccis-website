// backend/src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/errors';

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(400, 'error', error.details[0].message);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};