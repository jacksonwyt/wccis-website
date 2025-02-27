// backend/src/routes/index.ts
import { Router } from 'express';
import healthRoutes from './health';
import fileRoutes from './files';
import blogRoutes from './blog';

const router = Router();

// Health check route
router.use('/health', healthRoutes);

// File upload routes
router.use('/files', fileRoutes);

// Blog routes
router.use('/blog', blogRoutes);

export default router;