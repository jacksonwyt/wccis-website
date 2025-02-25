// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import { errorHandler } from './middleware/errorHandler';
import { configureSecurityMiddleware } from './middleware/security';

// Load environment variables
dotenv.config();

// Import routes
import healthRoutes from './routes/health';
import insureRoutes from './routes/insure';
import blogRoutes from './routes/blog';
import contactRoutes from './routes/contact';


const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
  exposedHeaders: ['X-XSRF-TOKEN'],
  maxAge: 86400,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Add compression middleware
app.use(compression({
  level: 6, // Default compression level
  threshold: 0, // Compress all responses
  filter: (req, res) => {
    // Don't compress responses with this header
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression filter function
    return compression.filter(req, res);
  }
}));

// Configure security middleware
configureSecurityMiddleware(app);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/insure', insureRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware should be after routes
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
