const process = require('node:process');
const jwt = require('jsonwebtoken');
const {ApiError} = require('../utils/apiError');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (id, role) => {
  // TODO: add refresh tokens for better securty and long-term auth
  return await jwt.sign({id, role}, JWT_SECRET, {expiresIn: '6h'});
};

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'No valid token provided. Please log in.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {id: decoded.id, role: decoded.role};
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Your session has expired. Please log in again.');
    }
    throw new ApiError(401, 'Invalid token authentication failed.');
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required.');
    }

    if (roles.length && !roles.includes(req.user.role)) {
      throw new ApiError(403, 'Access denied. Insufficient permissions.');
    }

    next();
  };
};
module.exports = {authenticate, authorize, generateToken};
