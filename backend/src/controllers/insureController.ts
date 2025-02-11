// backend/src/controllers/insureController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';
import { AppError } from '../types/errors';
import { validateRequest } from '../middleware/validate';
import { InsuranceRequest } from '../types/api';

export const submitInsureRequest = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone }: InsuranceRequest = req.body;

  // Additional validation or business logic here
  // For example, check if email is already in use, format phone number, etc.

  // Simulate processing (replace with actual business logic)
  await new Promise(resolve => setTimeout(resolve, 1000));

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Quote request received successfully',
      requestId: Date.now().toString()
    }
  });
});
