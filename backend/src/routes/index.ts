// backend/src/routes/index.ts
import { Router } from 'express';
import healthRoutes from './health';
import insureRoutes from './insure';
import certificateRoutes from './certificate';
import contactRoutes from './contact';

const router = Router();

// Health check route
router.use('/health', healthRoutes);

// Insurance routes
router.use('/insure', insureRoutes);

// Certificate routes
router.use('/certificate', certificateRoutes);

// Contact routes
router.use('/contact', contactRoutes);

export default router;