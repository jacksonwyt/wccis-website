"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.clearCachePattern = exports.deleteCache = exports.setCache = exports.getCache = void 0;
// backend/src/utils/redis.ts
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = require("./logger");
// Initialize Redis client
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = new ioredis_1.default(redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
        // Exponential backoff with max 3 seconds
        const delay = Math.min(times * 100, 3000);
        return delay;
    },
    enableReadyCheck: true,
});
exports.redisClient = redisClient;
// Handle Redis connection events
redisClient.on('connect', () => {
    logger_1.logger.info('Redis client connected');
});
redisClient.on('error', (err) => {
    logger_1.logger.error('Redis client error', { error: err.message });
});
redisClient.on('reconnecting', () => {
    logger_1.logger.warn('Redis client reconnecting');
});
// Cache utility functions
const getCache = async (key) => {
    try {
        return await redisClient.get(key);
    }
    catch (error) {
        logger_1.logger.error('Redis get error', { error, key });
        return null;
    }
};
exports.getCache = getCache;
const setCache = async (key, value, expirySeconds = 3600) => {
    try {
        await redisClient.set(key, value, 'EX', expirySeconds);
    }
    catch (error) {
        logger_1.logger.error('Redis set error', { error, key });
    }
};
exports.setCache = setCache;
const deleteCache = async (key) => {
    try {
        await redisClient.del(key);
    }
    catch (error) {
        logger_1.logger.error('Redis delete error', { error, key });
    }
};
exports.deleteCache = deleteCache;
const clearCachePattern = async (pattern) => {
    try {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(...keys);
            logger_1.logger.info(`Cleared ${keys.length} cache keys matching pattern: ${pattern}`);
        }
    }
    catch (error) {
        logger_1.logger.error('Redis clear pattern error', { error, pattern });
    }
};
exports.clearCachePattern = clearCachePattern;
