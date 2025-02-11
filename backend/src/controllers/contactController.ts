// backend/src/controllers/contactController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';
import { ContactRequest } from '../types/api';

export const submitContactForm = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, message }: ContactRequest = req.body;

  // Additional validation or business logic here
  // For example, spam checking, message formatting, etc.

  // Simulate processing (replace with actual business logic)
  await new Promise(resolve => setTimeout(resolve, 1000));

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Contact form submitted successfully',
      requestId: Date.now().toString()
    }
  });
});
