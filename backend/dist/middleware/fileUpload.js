"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// src/middleware/fileUpload.ts
const multer_1 = __importDefault(require("multer"));
const errors_1 = require("../types/errors");
const MB = 1024 * 1024;
// Configure file size limits
const limits = {
    fileSize: 10 * MB, // 10MB max file size
};
// Create storage engine
const storage = multer_1.default.memoryStorage();
// Supported file types
const fileFilter = (req, file, cb) => {
    // Allow all images
    if (file.mimetype.startsWith('image/')) {
        return cb(null, true);
    }
    // Allow PDFs
    if (file.mimetype === 'application/pdf') {
        return cb(null, true);
    }
    // Allow common document types
    const allowedMimeTypes = [
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'text/csv', // .csv
        'text/plain', // .txt
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    }
    // Reject file
    cb(new errors_1.AppError(400, 'error', 'Invalid file type. Please upload an image, PDF, or common document type.'));
};
// Export configured multer instances
exports.upload = (0, multer_1.default)({
    storage,
    limits,
    fileFilter
});
