import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

const { parsed: config } = dotenv.config();

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
  secure: true
});

export const getImages = async (req, res) => {
  try {
    const response = await cloudinary.api.resources({max_results: 30, next_cursor: req.query.next_cursor, context: true});
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({mesage: error.message});
  }
}

export const deleteImage = async (req, res) => {
  const id = req.query.id;

  try {
    const response = await cloudinary.api.delete_resources([id]);
    res.json({message: 'Image deleted'});
  } catch (error) {
    res.json({message: `${error.message}, id: ${id}`});
  }

};

export const starImage = async (req, res) => {
  const id = req.query.id;
  const starred = req.query.starred;

  try {
    const response = await cloudinary.api.update(id, {context: {starred: starred}})
    res.json({message: 'Image starred'});
  } catch (error) {
    res.json({message: error.message});
  }
}