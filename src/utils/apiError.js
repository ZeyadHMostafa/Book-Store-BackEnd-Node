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

const validate = (schema, paramsSchema = null) => {
  return (req, res, next) => {
    if (paramsSchema) {
      const {value: paramValue, error: paramError} = paramsSchema.validate(
        req.params,
        {
          abortEarly: false,
          stripUnknown: true
        }
      );

      if (paramError) {
        const errorMessage = paramError.details
          .map((d) => d.message)
          .join(', ');
        throw new ApiError(400, `URL Parameter Error: ${errorMessage}`);
      }
      req.params = paramValue;
    }

    if (schema) {
      const {value, error} = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
        errors: {
          wrap: {
            label: '' // removes double quotes around field names
          }
        }
      });

      if (!value) {
        throw new ApiError(400, 'no suitable json was passed');
      }

      if (error) {
        const errorMessage = error.details
          .map((details) => details.message)
          .join(', ');
        throw new ApiError(400, errorMessage);
      }

      req.body = value;
    }
    return next();
  };
};

module.exports = {ApiError, validate};
