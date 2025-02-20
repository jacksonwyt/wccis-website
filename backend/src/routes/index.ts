// backend/src/routes/index.ts

import { Router } from 'express';
import healthRoutes from './health';
import insureRoutes from './insure';
import contactRoutes from './contact';
import blogRoutes from './blog';

const router = Router();

// Health check route
router.use('/health', healthRoutes);

// Insurance routes
router.use('/insure', insureRoutes);

// Blog routes
router.use('/blog', blogRoutes);

// Contact routes
router.use('/contact', contactRoutes);

export default router;