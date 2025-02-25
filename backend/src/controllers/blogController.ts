// backend/src/controllers/blogController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';
import { AppError } from '../types/errors';

// Get all blog posts (with optional filtering/pagination)
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  // Placeholder data
  const blogPosts = [
    { id: 1, title: 'Understanding Workers Compensation Insurance', slug: 'understanding-workers-comp' },
    { id: 2, title: 'Five Tips to Lower Your Commercial Auto Premiums', slug: 'lower-commercial-auto-premiums' },
    { id: 3, title: 'General Liability Insurance: What Contractors Need to Know', slug: 'contractors-liability-insurance' },
  ];

  res.status(200).json({
    status: 'success',
    results: blogPosts.length,
    data: {
      posts: blogPosts
    }
  });
});

// Get a single blog post by slug
export const getPostBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { _slug } = req.params;

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

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  });
});

// Subscribe to blog updates
export const subscribeToUpdates = asyncHandler(async (req: Request, res: Response) => {
  const { _email } = req.body;

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Successfully subscribed to blog updates'
    }
  });
});