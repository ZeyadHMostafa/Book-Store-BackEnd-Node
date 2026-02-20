const process = require('node:process');
const pino = require('pino');

// Check if we are in Netlify or Production
const isDev = process.env.NODE_ENV !== 'production';

const logger = pino({
  level: isDev ? 'debug' : 'info',
  base: {pid: false}, // Removes the PID for cleaner terminal output
  timestamp: pino.stdTimeFunctions.isoTime // Use human-readable ISO strings
});

module.exports = logger;
