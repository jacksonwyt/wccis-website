// src/middleware/fileUpload.ts
import formidable from 'formidable';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const uploadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowEmptyFiles: false,
    multiples: false
  });

  try {
    const [fields, files] = await form.parse(req);
    req.body = fields;
    if (files.file?.[0]) {
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
        stream: fs.createReadStream(formFile.filepath)
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};