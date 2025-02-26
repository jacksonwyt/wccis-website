"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
// src/middleware/fileUpload.ts
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const uploadMiddleware = async (req, res, next) => {
    var _a;
    const form = (0, formidable_1.default)({
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowEmptyFiles: false,
        multiples: false
    });
    try {
        const [fields, files] = await form.parse(req);
        req.body = fields;
        if ((_a = files.file) === null || _a === void 0 ? void 0 : _a[0]) {
            const formFile = files.file[0];
            req.file = {
                fieldname: 'file',
                originalname: formFile.originalFilename || '',
                encoding: '7bit',
                mimetype: formFile.mimetype || '',
                size: formFile.size,
                destination: '',
                filename: formFile.newFilename || '',
                path: formFile.filepath,
                buffer: Buffer.from(''),
                stream: fs_1.default.createReadStream(formFile.filepath)
            };
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.uploadMiddleware = uploadMiddleware;
