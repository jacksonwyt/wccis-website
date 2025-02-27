// backend/src/routes/index.ts
import { Router } from 'express';
import healthRoutes from './health';
import fileRoutes from './files';
import blogRoutes from './blog';
import { generateToken } from '../middleware/security';

const router = Router();

// Health check route
router.use('/health', healthRoutes);

// File upload routes
router.use('/files', fileRoutes);

// Blog routes
router.use('/blog', blogRoutes);

// CSRF token endpoint
router.get('/csrf', (req, res) => {
  return res.json({
    status: 'success',
    data: {
      token: generateToken(req, res)
    }
  });
});

export default router;