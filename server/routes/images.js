import express from 'express';
import { getImages, deleteImage, starImage } from '../controllers/images.js';

const router = express.Router();

router
  .get('/', getImages)
  .delete('/', deleteImage)
  .patch('/star', starImage);

export default router;