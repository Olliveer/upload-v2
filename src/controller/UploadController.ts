import { Request, Response } from 'express';
import fs from 'fs';

interface MulterFile {
  key?: string;
  location?: string;
}

class UploadController {
  async upload(req: Request & { file: MulterFile }, res: Response) {
    try {
      if (req.file == undefined) {
        return res.status(400).send({ message: 'Please upload a file!' });
      }
      res.status(200).send({
        message: 'Uploaded the file successfully: ' + req.file.originalname,
        file: req.file,
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  }
  getListFiles(req: Request, res: Response) {
    const directoryPath = __dirname + '/temp/uploads/';
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: 'Unable to scan files!',
        });
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: directoryPath + file,
        });
      });
      res.status(200).send(fileInfos);
    });
  }
  download(req: Request, res: Response) {
    const fileName = req.params.name;
    const directoryPath = __dirname + '/uploads/';
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }
    });
  }
}

export { UploadController };
