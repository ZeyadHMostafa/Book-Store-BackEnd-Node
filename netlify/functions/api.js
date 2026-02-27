const cors = require('cors');
const express = require('express');
const pinoHttp = require('pino-http');
const serverless = require('serverless-http');

const corsConfig = require('../../src/config/cors');
const db = require('../../src/config/db');
const {logger, serializers} = require('../../src/config/logger');
const router = require('../../src/routes');
const errorHandler = require('../../src/utils/errorHandler');

const app = express();

app.use(express.json());
app.use(cors(corsConfig));
app.use(pinoHttp({logger, serializers}));

app.use(async (req, res, next) => {
  await db.start();
  next();
});

app.use('/api', router);

app.use((req, res) => res.sendStatus(404));

app.use(errorHandler);

module.exports.handler = serverless(app);
