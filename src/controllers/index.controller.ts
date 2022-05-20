import express from 'express';
import { getImgFilesFromDir } from '../modules/fileSystem.module';

export const home = (req: express.Request, res: express.Response) => {
  getImgFilesFromDir('public/assets/images/gallery/', (files) => {
    res.render('index', { files });
  });
};

export const thumbnailImage = (req: express.Request, res: express.Response) => {
  getImgFilesFromDir('public/assets/images/thumbnails/', (files) => {
    res.render('pages/thumbnail-image', { files });
  });
};

export const gallery = (req: express.Request, res: express.Response) => {
  getImgFilesFromDir('public/assets/images/gallery/', (files) => {
    res.render('pages/gallery', { files });
  });
};
