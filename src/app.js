const process = require('node:process');

const cors = require('cors');
const express = require('express');
const pinoHttp = require('pino-http');

const corsConfig = require('./config/cors');
const logger = require('./config/logger');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

async function start() {
  app.use(express.json());
  app.use(cors(corsConfig));
  app.use(pinoHttp({logger}));
  app.use('/', router);

  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
}

module.exports = {app, start};
