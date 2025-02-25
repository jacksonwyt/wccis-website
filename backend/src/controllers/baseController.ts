// backend/src/controllers/baseController.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/errors';

// Custom handler to avoid try/catch repetition in route handlers
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };