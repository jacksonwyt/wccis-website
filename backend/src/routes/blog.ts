// backend/src/routes/blog.ts
import { Router } from 'express';
import { getAllPosts, getPostBySlug, subscribeToUpdates } from '../controllers/blogController';

const router = Router();

router.get('/posts', getAllPosts);
router.get('/posts/:slug', getPostBySlug);
router.post('/subscribe', subscribeToUpdates);

export default router;