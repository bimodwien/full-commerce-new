'use strict';

import multer, { FileFilterCallback } from 'multer';
import { type Request } from 'express';

const maxSize = 10 * 1024 * 1024;

const multerConfig: multer.Options = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.split('/')[0] !== 'image') {
      return cb(new Error('Only image files are allowed!'));
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
