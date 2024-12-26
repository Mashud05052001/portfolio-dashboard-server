// This 2 functions only work when we use multer-storage-cloudinary to upload image
import { cloudinaryUpload } from '../config/cloudinary.config';
import { TImageFile, TImageFiles } from '../interface/image.interface';

export const deleteMultipleImagesFromCloudinary = (files: TImageFiles) => {
  const publicIds: string[] = [];

  for (const file of Object.values(files)) {
    for (const image of file) {
      publicIds.push(image.filename);
    }
  }

  return new Promise((resolve, reject) => {
    cloudinaryUpload.api.delete_resources(
      publicIds,
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

export const deleteSingleImageFromCloudinary = (file: TImageFile) => {
  return new Promise((resolve, reject) => {
    cloudinaryUpload.api.delete_resources(
      [file.filename],
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};
