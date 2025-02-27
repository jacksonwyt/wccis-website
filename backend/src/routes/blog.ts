// src/routes/blog.ts
import { Router } from 'express';
import { getAllPosts, getPostBySlug } from '../controllers/blogController';

const router = Router();

// Get all blog posts
router.get('/', getAllPosts);

// Get a single blog post by slug
router.get('/:slug', getPostBySlug);

export default router;