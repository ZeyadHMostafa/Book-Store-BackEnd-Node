const process = require('node:process');
const {logger} = require('../config/logger');
const {ApiError} = require('./apiError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ApiError(400, message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errorResponse?.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || Object.values(err.keyValue)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ApiError(400, message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ApiError(400, message);
};

const errorHandler = (err, req, res, _next) => {
  let error = {...err};
  error.message = err.message || 'Internal Server Error';
  error.name = err.name;
  error.statusCode = err.statusCode || 500;
  error.isOperational = err.isOperational;

  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

  logger.error(
    {
      err: error,
      url: req.originalUrl,
      method: req.method,
      body: req.body
    },
    error.message
  );

  const response = {
    success: false,
    status: error.statusCode,
    message: error.message,
    ...(process.env.NODE_ENV !== 'production' && {error: err, stack: err.stack})
  };

  if (process.env.NODE_ENV === 'production' && !error.isOperational) {
    response.status = 500;
    response.message = 'Internal Server Error';
  }

  res.status(response.status).json(response);
};

module.exports = errorHandler;
