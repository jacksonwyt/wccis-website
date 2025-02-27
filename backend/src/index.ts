// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Import routes
import healthRoutes from './routes/health';

const app = express();
const PORT = process.env.PORT || 5001;

// Basic CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:10000',
  credentials: true,
};

// Basic middleware setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes - keeping only essential health check route
app.use('/api/health', healthRoutes);

// Error handling middleware
app.use(errorHandler as express.ErrorRequestHandler);

// Handle unhandled routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: `Cannot find ${req.originalUrl} on this server`,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
