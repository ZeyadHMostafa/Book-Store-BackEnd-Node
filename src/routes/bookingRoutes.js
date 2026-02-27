const express = require('express');
const bookingController = require('../controllers/bookingController');

const {authenticate} = require('../services/authService');

const router = express.Router();

// Deprecated booking routes: forwarded to order controller shim
router.post('/create-payment-intent', authenticate, bookingController.createPaymentIntent);
router.get('/payment-methods', authenticate, bookingController.getPaymentMethods);

module.exports = router;
