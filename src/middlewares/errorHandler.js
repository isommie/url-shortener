/**
 * Global error handler middleware.
 * @param {object} err - The error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack trace for debugging
  
    const statusCode = err.statusCode || 500; // Default to 500 for server errors
    const message = err.message || 'Internal Server Error';
  
    // Send a JSON error response
    res.status(statusCode).json({
      success: false,
      error: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Include stack trace only in development
    });
  };
  
  module.exports = errorHandler;
  