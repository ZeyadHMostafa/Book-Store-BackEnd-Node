const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../docs/swagger-output.json');

const route = express.Router();

route.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js'
    ]
  })
);
route.use('/author', require('./authorRoutes'));
route.use('/book', require('./bookRoutes'));
route.use('/cart', require('./cartRoutes'));
route.use('/category', require('./categoryRoutes'));
route.use('/order', require('./orderRoutes'));
route.use('/booking', require('./bookingRoutes'));
route.use('/review', require('./reviewRoutes'));
route.use('/user', require('./userRoutes'));
route.use('/auth', require('./authRoutes'));

module.exports = route;
