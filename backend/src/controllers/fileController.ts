// src/controllers/fileController.ts
import { Request, Response, NextFunction } from 'express';
import { fileService } from '../services/fileService';

/**
 * Upload a file to S3
 */
export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Get folder from query params or default to 'uploads'
    const folder = req.query.folder ? String(req.query.folder) : 'uploads';
    
    // Process file based on mimetype
    let fileBuffer = req.file.buffer;
    if (req.file.mimetype.startsWith('image/')) {
      // Optimize image if it's an image
      fileBuffer = await fileService.optimizeImage(req.file);
    }

    // Override the buffer with optimized buffer if it's an image
    const modifiedFile = {
      ...req.file,
      buffer: fileBuffer
    };

    // Upload file to S3
    const fileKey = await fileService.uploadFile(modifiedFile, folder);
    
    // Get signed URL for immediate use
    const url = await fileService.getSignedUrl(fileKey);
    
    res.status(201).json({ 
      fileKey, 
      url,
      fileName: req.file.originalname,
      contentType: req.file.mimetype,
      size: fileBuffer.length
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a signed URL for a file
 */
export const getFileUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileKey = req.params.fileKey;
    // Get expiration in seconds from query param or default to 1 hour
    const expiry = req.query.expiry ? parseInt(String(req.query.expiry)) : 3600;
    
    const url = await fileService.getSignedUrl(fileKey, expiry);
    
    res.status(200).json({ url });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a file from S3
 */
export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileKey = req.params.fileKey;
    
    await fileService.deleteFile(fileKey);
    
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    next(error);
  }
};