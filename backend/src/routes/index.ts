// backend/src/routes/index.ts

import { Router } from 'express';
import healthRoutes from './health';

const router = Router();

// Health check route
router.use('/health', healthRoutes);

export default router;