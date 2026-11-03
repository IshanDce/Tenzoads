import ImageKit from 'imagekit';

let imagekitInstance = null;

export const isImageKitConfigured = () => {
  return Boolean(
    process.env.IMAGEKIT_PUBLIC_KEY &&
    process.env.IMAGEKIT_PRIVATE_KEY &&
    process.env.IMAGEKIT_URL_ENDPOINT
  );
};

export const getImageKitClient = () => {
  if (!isImageKitConfigured()) {
    return null;
  }

  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }

  return imagekitInstance;
};

/**
 * Uploads a file buffer or base64 string to ImageKit
 * @param {Object} options
 * @param {Buffer|string} options.file - File buffer or base64 string
 * @param {string} options.fileName - Destination filename
 * @param {string} [options.folder] - Target folder in ImageKit (e.g. '/tenzoads')
 * @returns {Promise<Object>} ImageKit upload response { fileId, url, name, size, ... }
 */
export const uploadToImageKit = async ({ file, fileName, folder = '/tenzoads' }) => {
  const ik = getImageKitClient();
  if (!ik) {
    throw new Error('ImageKit is not configured. Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in .env');
  }

  const response = await ik.upload({
    file, // Can be buffer, base64, or remote url
    fileName,
    folder,
    useUniqueFileName: true,
  });

  return response;
};

/**
 * Deletes a file from ImageKit by fileId
 * @param {string} fileId
 */
export const deleteFromImageKit = async (fileId) => {
  const ik = getImageKitClient();
  if (!ik || !fileId) return;

  try {
    await ik.deleteFile(fileId);
  } catch (err) {
    console.error(`[ImageKit] Failed to delete file ${fileId}:`, err.message);
  }
};

