const process = require('node:process');
const mongoose = require('mongoose');
const {logger} = require('./logger');

const DB_URL = process.env.MONGODB_CONNECTION_STRING;

async function start() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose
    .connect(DB_URL)
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((err) => {
      logger.error(err);
    });
}

mongoose.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Friendly 'id' instead of '_id'
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Extra safety for User model
    return ret;
  }
});

mongoose.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Friendly 'id' instead of '_id'
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Extra safety for User model
    return ret;
  }
});

module.exports = {start};
