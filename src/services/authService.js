const process = require('node:process');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (id, role) => {
  return await jwt.sign({id, role}, JWT_SECRET, {expiresIn: '1h'});
};

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({error: 'No user token provided'});
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({error: 'failed to acquire token'});
  }

  req.user = decoded;
  next();
};

const authorize = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next();
  }

  return res.status(401).json({error: 'Incorrect user token'});
};

module.exports = {authenticate, authorize, generateToken};
