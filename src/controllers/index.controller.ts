import express from 'express';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { getImgFilesFromDir } from '../modules/fileSystem.module';

export const home = (req: express.Request, res: express.Response) => {
  getImgFilesFromDir('public/assets/images/gallery/', (files) => {
    res.render('index', { files });
  });
};

export const thumbnailImage = (req: express.Request, res: express.Response) => {
  mkThumbnailsDirIfNotExist();
  getImgFilesFromDir('public/assets/images/thumbnails/', (files) => {
    res.render('pages/thumbnail-image', { files });
  });
};

export const gallery = (req: express.Request, res: express.Response) => {
  getImgFilesFromDir('public/assets/images/gallery/', (files) => {
    res.render('pages/gallery', { files });
  });
};

const mkThumbnailsDirIfNotExist = async () => {
  try {
    if (
      !fs.existsSync(
        path.join(__dirname, '../../public/assets/images/thumbnails')
      )
    ) {
      await fsPromises.mkdir(
        path.join(__dirname, '../../public/assets/images/thumbnails')
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
