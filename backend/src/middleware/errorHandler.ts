// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`Error: ${err.message}`, { 
    method: req.method, 
    path: req.path 
  });
  
  res.status(500).json({
    status: 'error',
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message || 'Unknown error occurred',
    },
  });
};