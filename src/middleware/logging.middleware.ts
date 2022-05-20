import express, { NextFunction } from 'express';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const recordFunc = async (massage: string, logName: string) => {
  const dt = `${new Date()}`;
  const logRecord = `=> ${dt}\t${massage} \n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '../../logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '../../logs'));
    }

    await fsPromises.appendFile(
      path.join(__dirname, '../../logs', logName),
      logRecord
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void => {
  const url = req.url;
  recordFunc(url, 'loging');
  next();
};

export default logger;
