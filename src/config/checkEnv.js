const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

const checkEnv = () => {
  const missing = requiredEnvVars.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error(`[ERROR] Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  console.log('All environment variables loaded successfully');
};

module.exports = checkEnv;