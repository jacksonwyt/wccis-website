// src/controllers/fileController.ts
import { Request, Response } from 'express';
import { fileService } from '../services/fileService';
import { asyncHandler } from './baseController';
import { AppError } from '../types/errors';

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw AppError.badRequest('No file provided');
  }

  const folder = req.query.folder as string || 'general';
  let fileKey: string;

  // Handle image optimization if it's an image
  if (req.file.mimetype.startsWith('image/')) {
    const optimizedBuffer = await fileService.optimizeImage(req.file);
    const optimizedFile = {
      ...req.file,
      buffer: optimizedBuffer
    };
    fileKey = await fileService.uploadFile(optimizedFile, folder);
  } else {
    fileKey = await fileService.uploadFile(req.file, folder);
  }

  const url = await fileService.getSignedUrl(fileKey);

  res.status(200).json({
    status: 'success',
    data: {
      fileKey,
      url
    }
  });
});

export const getFileUrl = asyncHandler(async (req: Request, res: Response) => {
  const { fileKey } = req.params;
  const url = await fileService.getSignedUrl(fileKey);

  res.status(200).json({
    status: 'success',
    data: { url }
  });
});

export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
  const { fileKey } = req.params;
  await fileService.deleteFile(fileKey);

  res.status(200).json({
    status: 'success',
    message: 'File deleted successfully'
  });
});