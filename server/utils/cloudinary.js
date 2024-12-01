import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'kaduna-community'
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};