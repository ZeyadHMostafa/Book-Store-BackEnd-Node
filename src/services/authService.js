
const jwt = require('jsonwebtoken');
const process = require('process');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (id) => {
  return await jwt.sign({ id: id }, JWT_SECRET, { expiresIn: '1h' });
};

const authenticate = async (req, res, next) => {
  const token = req.headers['bearer'];

  if (!token) {
    return res.status(401).json({ error: "No user token provided" });
  }

  const decoded = jwt.verify(token, JWT_SECRET,);

  if (!decoded) {
    return res.status(401).json({ error: "failed to acquire token" });
  }

  req.user = decoded;
  next();
};

const authorize = async (req, res, next) => {

  if (req.user.id === req.params.id) {
    return next();
  }
  console.log(req.user.id, req.params.id);

  return res.status(401).json({ error: "Incorrect user token" });
};

module.exports = { authenticate, authorize, generateToken };