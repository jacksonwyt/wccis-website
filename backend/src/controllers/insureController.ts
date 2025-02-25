// backend/src/controllers/insureController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';
import { AppError } from '../types/errors';

// Validate common fields across all insurance types
const validateCommonFields = (data: any) => {
  const requiredFields = ['name', 'email', 'phone'];
  const missingFields = requiredFields.filter(field => !data?.businessInfo?.[field]);
  
  if (missingFields.length > 0) {
    throw AppError.badRequest(
      `Missing required fields: ${missingFields.join(', ')}`,
      'InsureRequest'
    );
  }
};

// Handle Workers Compensation quote requests
export const submitWorkersCompQuote = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  
  validateCommonFields(data);
  
  // Validate workers comp specific fields
  if (!data.locations?.length || !data.classifications?.length) {
    throw AppError.badRequest(
      'At least one location and classification is required',
      'WorkersCompQuote'
    );
  }

  // Process the quote request (replace with actual business logic)
  await new Promise(resolve => setTimeout(resolve, 1000));

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Workers Compensation quote request received successfully',
      requestId: Date.now().toString(),
      type: 'workers-comp'
    }
  });
});

// Handle Commercial Auto quote requests
export const submitCommercialAutoQuote = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  
  validateCommonFields(data);
  
  // Validate commercial auto specific fields
  if (!data.vehicles?.length || !data.drivers?.length) {
    throw AppError.badRequest(
      'At least one vehicle and driver is required',
      'CommercialAutoQuote'
    );
  }

  // Process the quote request (replace with actual business logic)
  await new Promise(resolve => setTimeout(resolve, 1000));

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Commercial Auto quote request received successfully',
      requestId: Date.now().toString(),
      type: 'commercial-auto'
    }
  });
});

// Handle General Liability quote requests
export const submitGeneralLiabilityQuote = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  
  // Validate using the zod schema we defined in the frontend
  // For now, we'll do basic validation
  const requiredFields = [
    'businessName',
    'contactName',
    'email',
    'phone',
    'physicalAddress',
    'entityType',
    'industryType'
  ];

  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw AppError.badRequest(
      `Missing required fields: ${missingFields.join(', ')}`,
      'GeneralLiabilityQuote'
    );
  }

  // Process the quote request (replace with actual business logic)
  await new Promise(resolve => setTimeout(resolve, 1000));

  res.status(200).json({
    status: 'success',
    data: {
      message: 'General Liability quote request received successfully',
      requestId: Date.now().toString(),
      type: 'general-liability'
    }
  });
});
