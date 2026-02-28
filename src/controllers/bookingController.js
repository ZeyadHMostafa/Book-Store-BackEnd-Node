// eslint-disable-next-line node/prefer-global/process
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cartModel = require('../models/cart');
const {ApiError} = require('../utils/apiError');
const orderController = require('./orderController');

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const {shippingAddress} = req.body || {};

    const cart = await cartModel.findOne({user: req.user.id}).populate('items.book');
    if (!cart || cart.items.length === 0) {
      return next(new ApiError(400, 'Your cart is empty.'));
    }

    let totalAmount = 0;
    for (const item of cart.items) {
      if (!item.book) {
        return next(new ApiError(404, 'One or more books in your cart not found.'));
      }
      totalAmount += item.book.price * item.quantity;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'usd',
      payment_method: 'pm_card_visa',
      confirm: true,
      description: 'Book Store Purchase',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
      metadata: {
        userId: req.user.id.toString(),
        cartId: cart._id.toString(),
        shippingAddress: JSON.stringify(shippingAddress)
      }
    });

    if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'requires_action') {
      const order = await orderController.placeOrder(
        req.user.id,
        shippingAddress || {
          street: '123 Test St',
          city: 'Test City',
          country: 'Test Country',
          postalCode: '12345'
        },
        'Stripe'
      );

      return res.status(201).json({success: true, paymentIntent, order});
    }

    return next(new ApiError(400, 'Payment intent not successful'));
  } catch (error) {
    next(error);
  }
};

exports.getPaymentMethods = async (req, res, next) => {
  try {
    if (!req.user || !req.user.stripeCustomerId) {
      return next(new ApiError(400, 'No Stripe customer configured for user'));
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: req.user.stripeCustomerId
    });

    res.json(paymentMethods.data);
  } catch (error) {
    next(error);
  }
};
