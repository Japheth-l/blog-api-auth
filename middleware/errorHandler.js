const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Catch MongoDB Duplicate Key Errors
  if (err.code === 11000) {
    status = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `That ${field} is already taken.`;
  }

  res.status(status).json({
    error: message,
  });
};

module.exports = errorHandler;