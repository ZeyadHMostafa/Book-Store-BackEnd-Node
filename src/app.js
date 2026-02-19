const process = require('node:process');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes');

async function start() {
  app.use('/', router);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

module.exports = {app, start};
