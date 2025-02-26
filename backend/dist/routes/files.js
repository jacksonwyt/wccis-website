"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/files.ts
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fileController_1 = require("../controllers/fileController");
const router = (0, express_1.Router)();
// Configure multer for memory storage
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow images, PDFs, and common document types
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    }
});
router.post('/upload', upload.single('file'), fileController_1.uploadFile);
router.get('/:fileKey/url', fileController_1.getFileUrl);
router.delete('/:fileKey', fileController_1.deleteFile);
exports.default = router;
