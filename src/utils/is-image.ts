import { getFileExt } from './get-file-ext';

const VALID_IMAGES_EXTENSIONS = ['jpg', 'jpeg', 'png'];

export const isImage = (filename: string) => {
  const ext = getFileExt(filename);

  if (ext && VALID_IMAGES_EXTENSIONS.includes(ext.toLowerCase())) {
    return true;
  }

  return false;
};
