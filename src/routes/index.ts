import { Router } from 'express';
import multer from 'multer';
import config from '../config/multer';
import { UploadController } from '../controller/UploadController';

const router = Router();
const uploadController = new UploadController();

router.post('/upload', multer(config).single('file'), uploadController.upload);
router.get('/files', uploadController.getListFiles);
router.get('/files/:name', uploadController.download);

export { router };
