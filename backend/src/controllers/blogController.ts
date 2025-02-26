// backend/src/controllers/blogController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';
import { AppError } from '../types/errors';
import { logger } from '../utils/logger';

// Get all blog posts (with optional filtering/pagination)
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  logger.debug('Fetching blog posts');
  
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

  res.status(200).json(response);
});

// Get a single blog post by slug
export const getPostBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  
  if (!slug) {
    throw new AppError(400, 'error', 'Post slug is required');
  }
  
  logger.debug('Fetching blog post', { slug });

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