"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// src/utils/logger.ts
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
// Define the log directory
const logDir = path_1.default.join(__dirname, '../../logs');
// Create the logger
const logger = (0, winston_1.createLogger)({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.errors({ stack: true }), winston_1.format.json()),
    defaultMeta: { service: 'wccis-backend' },
    transports: [
        // Write all logs with importance level of 'error' or less to error.log
        new winston_1.transports.File({
            filename: path_1.default.join(logDir, `error-${new Date().toISOString().slice(0, 10)}.log`),
            level: 'error'
        }),
        // Write all logs with importance level of 'info' or less to combined.log
        new winston_1.transports.File({
            filename: path_1.default.join(logDir, `combined-${new Date().toISOString().slice(0, 10)}.log`)
        })
    ]
});
exports.logger = logger;
// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
    }));
}
