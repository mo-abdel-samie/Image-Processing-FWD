import * as fs from 'fs';

/* TODO: get all image files from directory */
export const getImgFilesFromDir = async (
  dirPath: string,
  cb: (files: string[]) => void
) => {
  await fs.readdir(dirPath, (err, files) => {
    if (err) throw err;
    cb(files);
  });
};

process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
});
