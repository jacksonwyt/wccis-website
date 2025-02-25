// backend/src/middleware/cache.ts
import { Request, Response, NextFunction } from 'express';
import { getCache, setCache } from '../utils/redis';
import { logger } from '../utils/logger';

interface CacheOptions {
  ttl?: number;
  keyPrefix?: string;
  keyGenerator?: (req: Request) => string;
}

/**
 * Middleware to cache API responses
 * @param options Cache options
 */
export const cacheMiddleware = (options: CacheOptions = {}) => {
  const {
    ttl = 3600, // Default TTL: 1 hour
    keyPrefix = 'api:cache:',
    keyGenerator,
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Generate cache key
    const cacheKey = keyPrefix + (
      keyGenerator 
        ? keyGenerator(req) 
        : `${req.originalUrl}`
    );

    try {
      // Try to get from cache
      const cachedData = await getCache(cacheKey);
      
      if (cachedData) {
        logger.debug('Cache hit', { cacheKey });
        const data = JSON.parse(cachedData);
        return res.status(200).json(data);
      }
      
      // Cache miss, capture the response
      logger.debug('Cache miss', { cacheKey });
      
      // Store original json method
      const originalJson = res.json;
      
      // Override json method to cache the response
      res.json = function(body) {
        // Restore original json method
        res.json = originalJson;
        
        // Cache the response
        setCache(cacheKey, JSON.stringify(body), ttl)
          .catch(err => logger.error('Error caching response', { error: err.message, cacheKey }));
        
        // Call original json method
        return originalJson.call(this, body);
      };
      
      next();
    } catch (error) {
      logger.error('Cache middleware error', { error });
      next();
    }
  };
};
