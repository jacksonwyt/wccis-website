// backend/src/routes/blog.ts
import { Router } from 'express';
import { getAllPosts, getPost, subscribeNewsletter } from '../controllers/blogController';

const router = Router();

router.get('/posts', getAllPosts);
router.get('/posts/:slug', getPost);
router.post('/subscribe', subscribeNewsletter);

export default router;