const process = require('node:process');
const pino = require('pino');

// Check if we are in Netlify or Production

const isDev = process.env.NODE_ENV !== 'production';

// Define the serializers in a way pino-http understands
const serializers = {
  req(req) {
    const cleanHeaders = {...req.headers};

    // Remove all the Netlify and proxy junk
    Object.keys(cleanHeaders).forEach((key) => {
      if (key.startsWith('x-nf-') || key.startsWith('x-forwarded-')) {
        delete cleanHeaders[key];
      }
    });

    return {
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      headers: cleanHeaders
    };
  },
  res(res) {
    return {
      statusCode: res.statusCode
    };
  }
};

const logger = pino({
  level: isDev ? 'debug' : 'info',
  base: {pid: false},
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'body.password'],
    remove: true
  },
  serializers // Apply them to the base logger
});

module.exports = {logger, serializers};
