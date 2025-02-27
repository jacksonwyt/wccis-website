"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../types/errors");
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, _next) => {
    // Log the error
    logger_1.logger.error(`Error processing request: ${err.message}`, {
        method: req.method,
        path: req.path,
        error: err
    });
    // Format response based on error type
    if (err instanceof errors_1.AppError) {
        // Handle known application errors
        return res.status(err.statusCode).json({
            status: err.status,
            error: {
                message: err.message,
                code: err.code,
                errors: err.errors
            }
        });
    }
    // Handle multer errors
    if (err.name === 'MulterError') {
        return res.status(400).json({
            status: 'error',
            error: {
                message: err.message,
                code: 'FILE_UPLOAD_ERROR'
            }
        });
    }
    // Handle uncaught errors
    res.status(500).json({
        status: 'error',
        error: {
            message: process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : err.message || 'Unknown error occurred',
            code: 'INTERNAL_ERROR'
        },
    });
};
exports.errorHandler = errorHandler;
