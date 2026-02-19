class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const validate = (schema) => (req, res, next) => {
  const {value, error} = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  });

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }

  Object.assign(req.body, value);
  return next();
};

module.exports = {ApiError, validate};
