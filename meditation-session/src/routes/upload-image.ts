import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import express, { Request, Response } from 'express';

const storage = new Storage({
  projectId: 'meditations-53418',
  keyFilename: 'service-account-credentials.json',
});

const bucket = storage.bucket('gs://meditations-53418.appspot.com');

const newmulter = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file');
    }
    let newFileName = `${Date.now()}_${file.originalname}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

const route = express.Router();

route.post(
  '/api/meditations/upload/image',
  newmulter.single('file'),
  (req: Request, res: Response) => {
    console.log('Image Upload !!');
    let file = req.file;
    if (file) {
      uploadImage(file)
        .then((success) => {
          res.status(200).send({
            success,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
);

export { route as uploadImage };
