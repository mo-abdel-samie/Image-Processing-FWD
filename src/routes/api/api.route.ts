import express from 'express';
import { updateImage } from '../../controllers/api.controller';

const api = express.Router();

api.get('/update-image', updateImage);

export default api;
