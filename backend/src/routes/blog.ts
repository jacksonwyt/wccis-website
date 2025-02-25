// backend/src/routes/blog.ts
import { Router } from 'express';
import { getAllPosts, getPostBySlug, subscribeToUpdates } from '../controllers/blogController';
import { cacheMiddleware } from '../middleware/cache';

const router = Router();

// Apply cache middleware to GET routes
router.get('/posts', cacheMiddleware({ ttl: 3600, keyPrefix: 'api:blog:posts:' }), getAllPosts);
router.get('/posts/:slug', cacheMiddleware({ ttl: 86400, keyPrefix: 'api:blog:post:' }), getPostBySlug);
router.post('/subscribe', subscribeToUpdates);

export default router;