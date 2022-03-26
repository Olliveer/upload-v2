import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storageTypes = {
  local: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          return callback(err, '');
        }

        const originalName = file.originalname.split(' ').join('-');

        callback(null, originalName);
      });
    },
  }),
};

const config: multer.Options = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes.local,
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024,
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf',
      'text/csv',
      'text/txt',
      'application/pdf',
      'application/xml',
      'text/xml',
      'text/plain',
      'application/vnd.ms-excel',
      'application/zip',
      'application/x-zip-compressed',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
};

export default config;
