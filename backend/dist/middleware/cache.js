"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const redis_1 = require("../utils/redis");
const logger_1 = require("../utils/logger");
/**
 * Middleware to cache API responses
 * @param options Cache options
 */
const cacheMiddleware = (options = {}) => {
    const { ttl = 3600, // Default TTL: 1 hour
    keyPrefix = 'api:cache:', keyGenerator, } = options;
    return async (req, res, next) => {
        // Skip caching for non-GET requests
        if (req.method !== 'GET') {
            return next();
        }
        // Generate cache key
        const cacheKey = keyPrefix + (keyGenerator
            ? keyGenerator(req)
            : `${req.originalUrl}`);
        try {
            // Try to get from cache
            const cachedData = await (0, redis_1.getCache)(cacheKey);
            if (cachedData) {
                logger_1.logger.debug('Cache hit', { cacheKey });
                const data = JSON.parse(cachedData);
                return res.status(200).json(data);
            }
            // Cache miss, capture the response
            logger_1.logger.debug('Cache miss', { cacheKey });
            // Store original json method
            const originalJson = res.json;
            // Override json method to cache the response
            res.json = function (body) {
                // Restore original json method
                res.json = originalJson;
                // Cache the response
                (0, redis_1.setCache)(cacheKey, JSON.stringify(body), ttl)
                    .catch(err => logger_1.logger.error('Error caching response', { error: err.message, cacheKey }));
                // Call original json method
                return originalJson.call(this, body);
            };
            next();
        }
        catch (error) {
            logger_1.logger.error('Cache middleware error', { error });
            next();
        }
    };
};
exports.cacheMiddleware = cacheMiddleware;
