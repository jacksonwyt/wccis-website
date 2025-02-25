// backend/src/utils/redis.ts
import Redis from 'ioredis';
import { logger } from './logger';

// Initialize Redis client
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    // Exponential backoff with max 3 seconds
    const delay = Math.min(times * 100, 3000);
    return delay;
  },
  enableReadyCheck: true,
});

// Handle Redis connection events
redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('error', (err) => {
  logger.error('Redis client error', { error: err.message });
});

redisClient.on('reconnecting', () => {
  logger.warn('Redis client reconnecting');
});

// Cache utility functions
export const getCache = async (key: string): Promise<string | null> => {
  try {
    return await redisClient.get(key);
  } catch (error) {
    logger.error('Redis get error', { error, key });
    return null;
  }
};

export const setCache = async (
  key: string, 
  value: string, 
  expirySeconds = 3600
): Promise<void> => {
  try {
    await redisClient.set(key, value, 'EX', expirySeconds);
  } catch (error) {
    logger.error('Redis set error', { error, key });
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error('Redis delete error', { error, key });
  }
};

export const clearCachePattern = async (pattern: string): Promise<void> => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
      logger.info(`Cleared ${keys.length} cache keys matching pattern: ${pattern}`);
    }
  } catch (error) {
    logger.error('Redis clear pattern error', { error, pattern });
  }
};

export { redisClient };
