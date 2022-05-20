import express from 'express';
import {
  gallery,
  home,
  thumbnailImage,
} from '../../controllers/index.controller';

const web = express.Router();

web.get('/', home);
web.get('/thumbnail-img', thumbnailImage);
web.get('/gallery', gallery);

export default web;
