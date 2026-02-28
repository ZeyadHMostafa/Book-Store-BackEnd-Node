const express = require('express');
const bookingController = require('../controllers/bookingController');

const {authenticate} = require('../services/authService');

const router = express.Router();

// #swagger.tags = ['Booking']

router.post('/create-payment-intent', authenticate, (req, res, next) => {
  // #swagger.tags = ['Booking']
  // #swagger.summary = 'Create Stripe payment intent (Deprecated)'
  // #swagger.description = 'Warning: This route is being phased out in favor of the Order controller.'
  // #swagger.security = [{ "bearerAuth": [] }]
  bookingController.createPaymentIntent(req, res, next);
});

router.get('/payment-methods', authenticate, (req, res, next) => {
  // #swagger.tags = ['Booking']
  // #swagger.summary = 'Get saved payment methods (Deprecated)'
  // #swagger.security = [{ "bearerAuth": [] }]
  bookingController.getPaymentMethods(req, res, next);
});

module.exports = router;
