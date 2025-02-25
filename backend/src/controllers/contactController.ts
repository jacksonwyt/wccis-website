// backend/src/controllers/contactController.ts
import { Request, Response } from 'express';
import { asyncHandler } from './baseController';
import { z } from 'zod';
import { logger } from '../utils/logger';
import { redisClient } from '../utils/redis';
import { AppError } from '../types/errors';

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(100, "Email is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

// Rate limit key prefix
const RATE_LIMIT_PREFIX = 'ratelimit:contact:';

// Rate limit settings
const RATE_LIMIT_MAX = 5; // Maximum 5 submissions
const RATE_LIMIT_WINDOW = 3600; // per hour (in seconds)

// Handle contact form submissions
export const submitContactRequest = asyncHandler(async (req: Request, res: Response) => {
  // Extract data from request - using frontend field names
  const { name, email, message, phone, company } = req.body;

  // Validate input data with Zod schema
  const validationResult = contactSchema.safeParse(req.body);
  if (!validationResult.success) {
    throw new AppError(400, 'error', 'Invalid form data', 'VALIDATION_ERROR', validationResult.error.errors);
  }

  // Apply rate limiting based on email and IP
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const emailKey = `${RATE_LIMIT_PREFIX}email:${email}`;
  const ipKey = `${RATE_LIMIT_PREFIX}ip:${ip}`;

  // Check rate limits
  const [emailCount, ipCount] = await Promise.all([
    redisClient.incr(emailKey),
    redisClient.incr(ipKey),
  ]);

  // Set expiry if this is the first request in the window
  if (emailCount === 1) {
    await redisClient.expire(emailKey, RATE_LIMIT_WINDOW);
  }
  if (ipCount === 1) {
    await redisClient.expire(ipKey, RATE_LIMIT_WINDOW);
  }

  // Check if rate limit exceeded
  if (emailCount > RATE_LIMIT_MAX || ipCount > RATE_LIMIT_MAX) {
    logger.warn('Rate limit exceeded for contact form', { email, ip, emailCount, ipCount });
    throw new AppError(429, 'error', 'Too many requests. Please try again later.', 'RATE_LIMIT_EXCEEDED');
  }

  // Log the contact request (with sensitive data truncated)
  logger.info('Contact form submission received', { 
    name, 
    email,
    phone: phone ? '✓' : '✗', // Just log if phone exists, not the actual number
    company: company || 'Not provided',
    messageLength: message.length,
  });

  try {
    // Additional validation or business logic here
    // For example, spam checking, message formatting, etc.

    // In production, this would send an email or save to database
    // Currently using a placeholder for demonstration
    await new Promise(resolve => setTimeout(resolve, 500)); // Reduced artificial delay

    // Return success response
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Your message has been received. We will contact you shortly.',
        reference: Math.random().toString(36).substring(2, 10).toUpperCase(), // Generate a reference code
      }
    });
  } catch (error) {
    logger.error('Error processing contact form submission', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      name,
      email,
    });
    throw error; // Let the error handler middleware catch this
  }
});
