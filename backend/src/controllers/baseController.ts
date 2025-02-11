// backend/src/controllers/baseController.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/errors';

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};