"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../types/errors");
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, _next) => {
    // Extract request info for logging
    const requestInfo = {
        method: req.method,
        path: req.path,
        ip: req.ip,
        userId: 'unauthenticated',
    };
    if (err instanceof errors_1.AppError) {
        // Log application errors with appropriate level
        if (err.statusCode >= 500) {
            logger_1.logger.error(`App Error: ${err.message}`, Object.assign(Object.assign({}, requestInfo), { stack: err.stack, statusCode: err.statusCode }));
        }
        else {
            logger_1.logger.warn(`App Error: ${err.message}`, Object.assign(Object.assign({}, requestInfo), { statusCode: err.statusCode }));
        }
        return res.status(err.statusCode).json({
            status: err.status,
            error: {
                message: err.message,
                code: err.code || 'ERR_UNKNOWN',
            },
        });
    }
    // Categorize and handle different types of errors
    if (err.name === 'ValidationError') {
        logger_1.logger.warn('Validation Error', Object.assign(Object.assign({}, requestInfo), { error: err.message }));
        return res.status(400).json({
            status: 'error',
            error: {
                message: err.message,
                code: 'ERR_VALIDATION',
            },
        });
    }
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        logger_1.logger.warn('Auth Error', Object.assign(Object.assign({}, requestInfo), { error: err.message }));
        return res.status(401).json({
            status: 'error',
            error: {
                message: 'Authentication failed',
                code: 'ERR_AUTHENTICATION',
            },
        });
    }
    // Handle unknown errors
    logger_1.logger.error('Unhandled Error', Object.assign(Object.assign({}, requestInfo), { stack: err.stack, message: err.message }));
    res.status(500).json({
        status: 'error',
        error: {
            message: process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : err.message || 'Unknown error occurred',
            code: 'ERR_INTERNAL',
        },
    });
};
exports.errorHandler = errorHandler;
