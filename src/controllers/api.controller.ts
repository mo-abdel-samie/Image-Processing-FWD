import express from 'express';
import validator from 'validator';
import sharp from 'sharp';
import { getImgFilesFromDir } from '../modules/fileSystem.module';
import path from 'path';

/**
 * @param req
 * @param res
 */
export const updateImage = (req: express.Request, res: express.Response) => {
  const sendFileOptions = {
    root: path.join(__dirname, '../../public/assets/images/thumbnails/'),
    // dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };
  const imageName = String(req.query.imageName);
  const imageNameWithOutEx = imageName.split('.')[0];
  const width = String(req.query.width);
  const hight = String(req.query.hight);
  const expectedEditedImgName = `${imageNameWithOutEx}_etided_${width}_${hight}.png`;
  let cheeckExisting = false;
  let notValid = false;

  if (
    !validator.isInt(width) ||
    !validator.isInt(hight) ||
    imageName == 'undefined'
  ) {
    notValid = true;
    res.status(303).send('image param not valied');
  }

  // ToDo: Cheeck if the image exist befor. if exist return file
  !notValid &&
    getImgFilesFromDir('public/assets/images/thumbnails/', (files) => {
      files.forEach((file) => {
        if (file == expectedEditedImgName) {
          cheeckExisting = true;
          res.status(200).sendFile(expectedEditedImgName, sendFileOptions);
        }
      });

      if (!cheeckExisting)
        resizeImage({ imageName, width, hight }, (error, savedName) => {
          if (error) {
            getImgFilesFromDir('public/assets/images/gallery/', (files) => {
              res.render('index', { files, error });
            });
          } else {
            res.sendFile(savedName, sendFileOptions);
          }
        });
    });
};

interface IimageInfo {
  imageName: string;
  width: string;
  hight: string;
}

/**
 * @param imageData (imageName: string, width: number, hight: number )
 * @param cb
 */

export const resizeImage = async (
  imageData: IimageInfo,
  cb: (flag: string, savedName: string) => void
) => {
  const imageSplitName = imageData.imageName.split('.');
  const imgFinalName = `${imageSplitName[0]}_etided_${imageData.width}_${imageData.hight}.png`;
  try {
    await sharp(`public/assets/images/gallery/${imageData.imageName}`)
      .resize(Number(imageData.hight), Number(imageData.hight))
      .png()
      .toFile(`public/assets/images/thumbnails/${imgFinalName}`);
    cb('', imgFinalName);
  } catch (error) {
    cb('An error occurred processing the image', '');
  }
};
