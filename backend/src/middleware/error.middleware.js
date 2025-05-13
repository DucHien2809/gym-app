// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log detailed error information for debugging
  console.error('ERROR DETAILS:');
  console.error(`Status: ${statusCode}`);
  console.error(`Message: ${err.message}`);
  console.error(`Request Path: ${req.path}`);
  console.error(`Request Method: ${req.method}`);
  console.error(`Request Headers:`, req.headers);
  if (req.body) {
    console.error(`Request Body:`, JSON.stringify(req.body, null, 2));
  }
  console.error(`Stack Trace: ${err.stack}`);
  
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  AppError
}; 