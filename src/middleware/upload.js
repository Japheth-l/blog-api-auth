const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Tell Multer to stream files directly to Cloudinary instead of saving to disk
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog-api/posts',       // folder name in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

// Only allow image MIME types through — reject everything else before upload
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);  // accept the file
  } else {
    cb(new Error('Only JPEG, PNG, and WEBP images are allowed'), false); // reject
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

module.exports = upload;