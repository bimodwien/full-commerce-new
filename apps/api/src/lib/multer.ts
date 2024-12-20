'use strict';

import multer, { FileFilterCallback } from 'multer';
import { type Request } from 'express';

const maxSize = 10485760; // 1MB

const multerConfig: multer.Options = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.split('/')[0] !== 'image') {
      return cb(new Error('Only image files are allowed!'));
    }
    const fileSize = parseInt(req.headers['content-length'] || '');
    if (fileSize > maxSize) {
      return cb(new Error('File size is too large!'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: maxSize,
  },
};

export const blobUploader = () => {
  return multer({
    ...multerConfig,
  });
};
