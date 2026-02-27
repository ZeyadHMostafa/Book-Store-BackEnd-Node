const express = require('express');

const route = express.Router();

route.use('/author', require('./authorRoutes'));
route.use('/book', require('./bookRoutes'));
route.use('/cart', require('./cartRoutes'));
route.use('/category', require('./categoryRoutes'));
route.use('/order', require('./orderRoutes'));
route.use('/booking', require('./bookingRoutes'));
route.use('/review', require('./reviewRoutes'));
route.use('/user', require('./userRoutes'));

module.exports = route;
