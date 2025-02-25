// backend/src/controllers/blogController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';
import { AppError } from '../types/errors';
import { getCache, setCache } from '../utils/redis';
import { logger } from '../utils/logger';

// Cache keys
const BLOG_POSTS_CACHE_KEY = 'blog:posts:all';
const BLOG_POST_CACHE_PREFIX = 'blog:post:';

// Cache TTLs (in seconds)
const POSTS_CACHE_TTL = 3600; // 1 hour
const POST_CACHE_TTL = 86400; // 24 hours

// Get all blog posts (with optional filtering/pagination)
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  // Try to get from cache first
  const cachedPosts = await getCache(BLOG_POSTS_CACHE_KEY);
  
  if (cachedPosts) {
    logger.debug('Cache hit for blog posts');
    return res.status(200).json(JSON.parse(cachedPosts));
  }
  
  // Cache miss, fetch from database
  logger.debug('Cache miss for blog posts');
  
  // Placeholder data
  const blogPosts = [
    { id: 1, title: 'Understanding Workers Compensation Insurance', slug: 'understanding-workers-comp' },
    { id: 2, title: 'Five Tips to Lower Your Commercial Auto Premiums', slug: 'lower-commercial-auto-premiums' },
    { id: 3, title: 'General Liability Insurance: What Contractors Need to Know', slug: 'contractors-liability-insurance' },
  ];

  const response = {
    status: 'success',
    results: blogPosts.length,
    data: {
      posts: blogPosts
    }
  };
  
  // Cache the response
  await setCache(BLOG_POSTS_CACHE_KEY, JSON.stringify(response), POSTS_CACHE_TTL);

  res.status(200).json(response);
});

// Get a single blog post by slug
export const getPostBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  
  if (!slug) {
    throw new AppError(400, 'error', 'Post slug is required');
  }
  
  // Try to get from cache first
  const cacheKey = `${BLOG_POST_CACHE_PREFIX}${slug}`;
  const cachedPost = await getCache(cacheKey);
  
  if (cachedPost) {
    logger.debug('Cache hit for blog post', { slug });
    return res.status(200).json(JSON.parse(cachedPost));
  }
  
  // Cache miss, fetch from database
  logger.debug('Cache miss for blog post', { slug });

  // Placeholder data
  const post = {
    id: 1, 
    title: 'Understanding Workers Compensation Insurance', 
    slug: 'understanding-workers-comp',
    content: 'This is a placeholder for the full blog post content.',
    author: 'Insurance Expert',
    date: '2023-05-15',
    tags: ['workers comp', 'insurance', 'compliance']
  };

  const response = {
    status: 'success',
    data: {
      post
    }
  };
  
  // Cache the response
  await setCache(cacheKey, JSON.stringify(response), POST_CACHE_TTL);

  res.status(200).json(response);
});

// Subscribe to blog updates
export const subscribeToUpdates = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email) {
    throw new AppError(400, 'error', 'Email is required');
  }

  // Process subscription (placeholder)
  logger.info('New blog subscription', { email });

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Successfully subscribed to blog updates'
    }
  });
});