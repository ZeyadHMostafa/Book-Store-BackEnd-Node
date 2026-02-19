const process = require('node:process');
const pino = require('pino');

// Use pino-pretty in development environment
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {target: 'pino-pretty', options: {colorize: true}}
      : undefined
});

module.exports = logger;
