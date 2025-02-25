// backend/src/controllers/contactController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';
import { ContactRequest } from '../types/api';

// Handle contact form submissions
export const submitContactRequest = asyncHandler(async (req: Request, res: Response) => {
  // Extract data from request
  const { _name, _email, _message } = req.body;

  // Additional validation or business logic here
  // For example, spam checking, message formatting, etc.

  // This is a placeholder - would normally add the contact request to a database
  // and/or send an email notification
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return success response
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Your message has been received. We will contact you shortly.',
    }
  });
});
