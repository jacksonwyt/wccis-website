// src/services/fileService.ts
import sharp from 'sharp';
import PDFDocument from 'pdfkit';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { logger } from '../utils/logger';
import zlib from 'zlib';
import { promisify } from 'util';
import retry from 'async-retry';
import { Express } from 'express';

const gzip = promisify(zlib.gzip);

class FileService {
  private s3Client: S3Client;
  private bucket: string;
  private readonly MAX_RETRIES = 3;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-west-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      }
    });
    this.bucket = process.env.AWS_S3_BUCKET || 'wccis-files';
  }

  private async compressFile(buffer: Buffer): Promise<Buffer> {
    return gzip(buffer);
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    try {
      const fileName = `${folder}/${Date.now()}-${file.originalname}`;
      
      // Compress file if it's compressible
      const compressibleTypes = ['text/plain', 'application/json', 'text/html', 'text/css', 'application/javascript'];
      const fileBuffer = compressibleTypes.includes(file.mimetype)
        ? await this.compressFile(file.buffer)
        : file.buffer;

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.mimetype,
        ContentEncoding: compressibleTypes.includes(file.mimetype) ? 'gzip' : undefined,
        CacheControl: 'public, max-age=31536000',
      });

      await this.s3Client.send(command);
      logger.info('File uploaded successfully', { fileName });
      
      return fileName;
    } catch (error) {
      logger.error('Error uploading file', { error });
      throw new Error('Failed to upload file');
    }
  }

  async getSignedUrl(fileName: string, expiresIn = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileName
      });

      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      return url;
    } catch (error) {
      logger.error('Error generating signed URL', { error });
      throw new Error('Failed to generate file URL');
    }
  }

  public async optimizeImage(file: Express.Multer.File): Promise<Buffer> {
    try {
      return await sharp(file.buffer)
        .resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 })
        .webp({ quality: 80 }) // Add WebP support
        .toBuffer();
    } catch (error: any) {
      logger.error('Error optimizing image', { error });
      throw new Error('Failed to optimize image');
    }
  }


  async deleteFile(fileName: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      });
      await this.s3Client.send(command);
      logger.info('File deleted successfully', { fileName });
    } catch (error) {
      logger.error('Error deleting file', { error });
      throw new Error('Failed to delete file');
    }
  }
}

export const fileService = new FileService();