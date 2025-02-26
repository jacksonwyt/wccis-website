// backend/src/routes/index.ts

import { Router } from 'express';
import healthRoutes from './health';
import blogRoutes from './blog';

const router = Router();

// Health check route
router.use('/health', healthRoutes);

// Blog routes
router.use('/blog', blogRoutes);

export default router;