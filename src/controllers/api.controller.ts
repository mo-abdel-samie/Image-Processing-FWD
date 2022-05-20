import express from 'express';
import sharp from 'sharp';
import { getImgFilesFromDir } from '../modules/fileSystem.module';

/**
 * @param req
 * @param res
 */
export const updateImage = (req: express.Request, res: express.Response) => {
  const imageName = String(req.query.imageName);
  const width = Number(req.query.width);
  const hight = Number(req.query.hight);

  resizeImage({ imageName, width, hight }, (error) => {
    if (error) {
      getImgFilesFromDir('public/assets/images/gallery/', (files) => {
        res.render('index', { files, error });
      });
    } else {
      res.redirect('/thumbnail-img');
    }
  });
};

interface IimageInfo {
  imageName: string;
  width: number;
  hight: number;
}

/**
 * @param imageData (imageName: string, width: number, hight: number )
 * @param cb
 */
export const resizeImage = async (
  imageData: IimageInfo,
  cb: (flag: string | unknown) => void
) => {
  const imageSplitName = imageData.imageName.split('.');
  try {
    await sharp(`public/assets/images/gallery/${imageData.imageName}`)
      .resize(Number(imageData.hight), Number(imageData.hight))
      .png()
      .toFile(
        `public/assets/images/thumbnails/${imageSplitName[0]}_etided_${imageData.width}_${imageData.hight}.png`
      );
    cb(null);
  } catch (error) {
    cb('An error occurred processing the image');
  }
};
