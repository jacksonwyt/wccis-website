// backend/src/controllers/blogController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';

// Get all blog posts
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Implement database query to fetch posts
  // For now, returning mock data
  const posts = [
    {
      id: '1',
      title: 'Understanding General Liability Insurance',
      content: 'Content here...',
      // ... other fields
    }
  ];

  res.status(200).json({
    status: 'success',
    data: posts
  });
});

// Get single blog post
export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  
  // TODO: Implement database query to fetch single post
  // For now, returning mock data
  const post = {
    id: '1',
    title: 'Understanding General Liability Insurance',
    content: 'Content here...',
    // ... other fields
  };

  res.status(200).json({
    status: 'success',
    data: post
  });
});

// Subscribe to newsletter
export const subscribeNewsletter = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  // TODO: Implement newsletter subscription logic
  // For now, just returning success response
  res.status(200).json({
    status: 'success',
    message: 'Successfully subscribed to newsletter'
  });
});