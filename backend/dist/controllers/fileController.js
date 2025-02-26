"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getFileUrl = exports.uploadFile = void 0;
const fileService_1 = require("../services/fileService");
const baseController_1 = require("./baseController");
const errors_1 = require("../types/errors");
exports.uploadFile = (0, baseController_1.asyncHandler)(async (req, res) => {
    if (!req.file) {
        throw errors_1.AppError.badRequest('No file provided');
    }
    const folder = req.query.folder || 'general';
    let fileKey;
    // Handle image optimization if it's an image
    if (req.file.mimetype.startsWith('image/')) {
        const optimizedBuffer = await fileService_1.fileService.optimizeImage(req.file);
        const optimizedFile = Object.assign(Object.assign({}, req.file), { buffer: optimizedBuffer });
        fileKey = await fileService_1.fileService.uploadFile(optimizedFile, folder);
    }
    else {
        fileKey = await fileService_1.fileService.uploadFile(req.file, folder);
    }
    const url = await fileService_1.fileService.getSignedUrl(fileKey);
    res.status(200).json({
        status: 'success',
        data: {
            fileKey,
            url
        }
    });
});
exports.getFileUrl = (0, baseController_1.asyncHandler)(async (req, res) => {
    const { fileKey } = req.params;
    const url = await fileService_1.fileService.getSignedUrl(fileKey);
    res.status(200).json({
        status: 'success',
        data: { url }
    });
});
exports.deleteFile = (0, baseController_1.asyncHandler)(async (req, res) => {
    const { fileKey } = req.params;
    await fileService_1.fileService.deleteFile(fileKey);
    res.status(200).json({
        status: 'success',
        message: 'File deleted successfully'
    });
});
