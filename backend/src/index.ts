// backend/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { configureSecurity, requireHttps } from './middleware/security';

// Load environment variables
dotenv.config();

// Import routes
import routes from './routes';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Apply security middleware (cors, helmet, rate limiting)
app.use(requireHttps);
app.use(...configureSecurity());

// Parse request bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Mount all routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler as express.ErrorRequestHandler);

// Handle unhandled routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: `Cannot find ${req.originalUrl} on this server`,
      code: 'NOT_FOUND'
    },
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
