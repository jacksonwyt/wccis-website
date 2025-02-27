"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// src/types/errors.ts
class AppError extends Error {
    constructor(statusCode, status, message, code, errors) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.code = code;
        this.errors = errors;
        this.name = 'AppError';
        // Fix for TypeScript error - ensure captureStackTrace exists
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    static badRequest(message, code) {
        return new AppError(400, 'error', message, code);
    }
    static unauthorized(message = 'Unauthorized') {
        return new AppError(401, 'error', message, 'UNAUTHORIZED');
    }
    static forbidden(message = 'Forbidden') {
        return new AppError(403, 'error', message, 'FORBIDDEN');
    }
    static notFound(message = 'Resource not found') {
        return new AppError(404, 'error', message, 'NOT_FOUND');
    }
    static validation(errors) {
        return new AppError(422, 'error', 'Validation error', 'VALIDATION_ERROR', errors);
    }
    static internal(message = 'Internal server error') {
        return new AppError(500, 'error', message, 'INTERNAL_ERROR');
    }
}
exports.AppError = AppError;
