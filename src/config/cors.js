const process = require('node:process');
const {ApiError} = require('../utils/apiError');

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || undefined;

const corsConfig = {
  origin(origin, callback) {
    if (allowedOrigins && (allowedOrigins.includes(origin) || !origin)) {
      callback(null, true);
    } else {
      callback(new ApiError(401, 'Not Allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

module.exports = corsConfig;
