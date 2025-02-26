"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContactRequest = exports.contactSchema = void 0;
const baseController_1 = require("./baseController");
const zod_1 = require("zod");
const logger_1 = require("../utils/logger");
const redis_1 = require("../utils/redis");
const errors_1 = require("../types/errors");
// Contact form validation schema
exports.contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: zod_1.z.string().email("Invalid email address").max(100, "Email is too long"),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
    phone: zod_1.z.string().optional(),
    company: zod_1.z.string().optional(),
});
// Rate limit key prefix
const RATE_LIMIT_PREFIX = 'ratelimit:contact:';
// Rate limit settings
const RATE_LIMIT_MAX = 5; // Maximum 5 submissions
const RATE_LIMIT_WINDOW = 3600; // per hour (in seconds)
// Handle contact form submissions
exports.submitContactRequest = (0, baseController_1.asyncHandler)(async (req, res) => {
    // Extract data from request - using frontend field names
    const { name, email, message, phone, company } = req.body;
    // Validate input data with Zod schema
    const validationResult = exports.contactSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new errors_1.AppError(400, 'error', 'Invalid form data', 'VALIDATION_ERROR', validationResult.error.errors);
    }
    // Apply rate limiting based on email and IP
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const emailKey = `${RATE_LIMIT_PREFIX}email:${email}`;
    const ipKey = `${RATE_LIMIT_PREFIX}ip:${ip}`;
    // Check rate limits
    const [emailCount, ipCount] = await Promise.all([
        redis_1.redisClient.incr(emailKey),
        redis_1.redisClient.incr(ipKey),
    ]);
    // Set expiry if this is the first request in the window
    if (emailCount === 1) {
        await redis_1.redisClient.expire(emailKey, RATE_LIMIT_WINDOW);
    }
    if (ipCount === 1) {
        await redis_1.redisClient.expire(ipKey, RATE_LIMIT_WINDOW);
    }
    // Check if rate limit exceeded
    if (emailCount > RATE_LIMIT_MAX || ipCount > RATE_LIMIT_MAX) {
        logger_1.logger.warn('Rate limit exceeded for contact form', { email, ip, emailCount, ipCount });
        throw new errors_1.AppError(429, 'error', 'Too many requests. Please try again later.', 'RATE_LIMIT_EXCEEDED');
    }
    // Log the contact request (with sensitive data truncated)
    logger_1.logger.info('Contact form submission received', {
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
    }
    catch (error) {
        logger_1.logger.error('Error processing contact form submission', {
            error: error instanceof Error ? error.message : 'Unknown error',
            name,
            email,
        });
        throw error; // Let the error handler middleware catch this
    }
});
