// We're importing express types for declaration merging
import 'express';
import * as multer from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      user?: {
        id: string;
        [key: string]: Record<string, unknown>;
      };
    }
    interface Multer {
      File: multer.File;
    }
  }
} 