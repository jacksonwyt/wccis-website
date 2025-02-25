import type { NextApiRequest, NextApiResponse } from 'next';
import { contactFormSchema } from '@/utils/validation';
import { z } from 'zod';

type ResponseData = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }

  try {
    // Validate the request body
    const validatedData = contactFormSchema.parse(req.body);

    // Here you would typically send an email or store the contact form data
    // For now, we'll just log the data and return a success response
    console.log('Contact form submission:', validatedData);
    
    return res.status(200).json({
      message: 'Message received successfully',
      success: true
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid form data: ' + error.errors[0].message,
        success: false
      });
    }
    
    return res.status(500).json({
      message: 'An error occurred while processing your request',
      success: false
    });
  }
}
