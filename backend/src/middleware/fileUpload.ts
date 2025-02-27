// src/middleware/fileUpload.ts
import multer from 'multer';
import { Request } from 'express';
import { AppError } from '../types/errors';

const MB = 1024 * 1024;

// Configure file size limits
const limits = {
  fileSize: 10 * MB, // 10MB max file size
};

// Create storage engine
const storage = multer.memoryStorage();

// Define the Express.Multer.File interface instead of using multer.File
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: Buffer;
}

// Supported file types
const fileFilter = (req: Request, file: MulterFile, cb: multer.FileFilterCallback) => {
  // Allow all images
  if (file.mimetype.startsWith('image/')) {
    return cb(null, true);
  }

  // Allow PDFs
  if (file.mimetype === 'application/pdf') {
    return cb(null, true);
  }

  // Allow common document types
  const allowedMimeTypes = [
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'text/csv', // .csv
    'text/plain', // .txt
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  // Reject file
  cb(new AppError(400, 'error', 'Invalid file type. Please upload an image, PDF, or common document type.'));
};

// Export configured multer instances
export const upload = multer({ 
  storage, 
  limits, 
  fileFilter 
});