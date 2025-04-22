// Health check API endpoint
import type { NextApiRequest, NextApiResponse } from 'next';

type HealthResponse = {
  status: string;
  timestamp: string;
  environment: string;
  version: string;
  config: {
    siteUrl: string;
    nodeEnv: string;
  };
  uptime: number;
  memory: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  // Get memory usage
  const memoryUsage = process.memoryUsage();
  
  // Format memory values to MB
  const formatMemory = (bytes: number) => `${Math.round(bytes / 1024 / 1024 * 100) / 100} MB`;
  
  // Return health information
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '0.1.0',
    config: {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'not set',
      nodeEnv: process.env.NODE_ENV || 'not set',
    },
    uptime: process.uptime(),
    memory: {
      rss: formatMemory(memoryUsage.rss),
      heapTotal: formatMemory(memoryUsage.heapTotal),
      heapUsed: formatMemory(memoryUsage.heapUsed),
      external: formatMemory(memoryUsage.external),
    },
  });
} 