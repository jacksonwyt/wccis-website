"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileService = void 0;
// src/services/fileService.ts
const sharp_1 = __importDefault(require("sharp"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const logger_1 = require("../utils/logger");
const ioredis_1 = __importDefault(require("ioredis"));
const zlib_1 = __importDefault(require("zlib"));
const util_1 = require("util");
const gzip = (0, util_1.promisify)(zlib_1.default.gzip);
const CACHE_TTL = 3600; // 1 hour in seconds
class FileService {
    constructor() {
        this.MAX_RETRIES = 3;
        this.s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION || 'us-west-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });
        this.bucket = process.env.AWS_S3_BUCKET || 'wccis-files';
        this.redis = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
    }
    async compressFile(buffer) {
        return gzip(buffer);
    }
    async uploadFile(file, folder) {
        try {
            const fileName = `${folder}/${Date.now()}-${file.originalname}`;
            // Compress file if it's compressible
            const compressibleTypes = ['text/plain', 'application/json', 'text/html', 'text/css', 'application/javascript'];
            const fileBuffer = compressibleTypes.includes(file.mimetype)
                ? await this.compressFile(file.buffer)
                : file.buffer;
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: fileName,
                Body: fileBuffer,
                ContentType: file.mimetype,
                ContentEncoding: compressibleTypes.includes(file.mimetype) ? 'gzip' : undefined,
                CacheControl: 'public, max-age=31536000',
            });
            await this.s3Client.send(command);
            logger_1.logger.info('File uploaded successfully', { fileName });
            return fileName;
        }
        catch (error) {
            logger_1.logger.error('Error uploading file', { error });
            throw new Error('Failed to upload file');
        }
    }
    async getSignedUrl(fileName, expiresIn = 3600) {
        try {
            const cacheKey = `signed-url:${fileName}`;
            // Check cache first
            const cachedUrl = await this.redis.get(cacheKey);
            if (cachedUrl) {
                return cachedUrl;
            }
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucket,
                Key: fileName
            });
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
            // Cache the URL
            await this.redis.set(cacheKey, url, 'EX', Math.min(expiresIn, CACHE_TTL));
            return url;
        }
        catch (error) {
            logger_1.logger.error('Error generating signed URL', { error });
            throw new Error('Failed to generate file URL');
        }
    }
    async optimizeImage(file) {
        try {
            return await (0, sharp_1.default)(file.buffer)
                .resize(1200, 1200, {
                fit: 'inside',
                withoutEnlargement: true
            })
                .jpeg({ quality: 80 })
                .webp({ quality: 80 }) // Add WebP support
                .toBuffer();
        }
        catch (error) {
            logger_1.logger.error('Error optimizing image', { error });
            throw new Error('Failed to optimize image');
        }
    }
    async deleteFile(fileName) {
        try {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucket,
                Key: fileName,
            });
            await this.s3Client.send(command);
            logger_1.logger.info('File deleted successfully', { fileName });
        }
        catch (error) {
            logger_1.logger.error('Error deleting file', { error });
            throw new Error('Failed to delete file');
        }
    }
}
exports.fileService = new FileService();
