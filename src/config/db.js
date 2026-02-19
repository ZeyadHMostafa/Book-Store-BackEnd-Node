const process = require('node:process');
const mongoose = require('mongoose');
const logger = require('./logger');

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bookstore';

async function start() {
  await mongoose.connect(DB_URL)
    .then(() => { logger.info('Connected to MongoDB') })
    .catch((err) => {
      logger.error(err);
    });
}

module.exports = {start};
