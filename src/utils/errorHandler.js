const process = require('node:process');
const logger = require('../config/logger');
const {ApiError} = require('../utils/apiError');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let {statusCode, message} = err;

  // do not leak server errors
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  logger.error(
    {
      err,
      url: req.originalUrl,
      method: req.method,
      body: req.body
    },
    message
  );

  const response = {
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && {stack: err.stack})
  };

  res.status(statusCode).send(response);
};

module.exports = errorHandler;
