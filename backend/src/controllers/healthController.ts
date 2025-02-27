// backend/src/controllers/healthController.ts
import { Request, Response } from 'express';

export const getHealthStatus = (req: Request, res: Response) => {
  const status = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.status(200).json(status);
};
