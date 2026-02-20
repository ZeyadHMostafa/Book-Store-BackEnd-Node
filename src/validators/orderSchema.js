const Joi = require('joi');

const orderSchema = Joi.object({
  user: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required()
    .messages({'string.pattern.base': 'Invalid User ID format.'})
    .label('User'),

  items: Joi.array()
    .items(
      Joi.object({
        book: Joi.string()
          .pattern(/^[0-9a-f]{24}$/i)
          .required()
          .label('Book ID'),
        quantity: Joi.number()
          .integer()
          .min(1)
          .required()
          .label('Quantity')

        // TODO: this should likely be calculated not stored!! check with the rest of the team
        // priceAtPurchase: Joi.number()
        //   .min(0)
        //   .precision(2)
        //   .required()
        //   .label('Price at Purchase')
      })
    )
    .min(1)
    .required()
    .label('Order Items'),

  // TODO: this should likely be calculated not stored!! check with the rest of the team
  // totalAmount: Joi.number()
  //   .min(0)
  //   .precision(2)
  //   .required()
  //   .label('Total Amount'),

  shippingAddress: Joi.object({
    street: Joi.string().trim().required().label('Street'),
    city: Joi.string().trim().required().label('City'),
    zipCode: Joi.string().trim().required().label('Zip Code')
  }).required().label('Shipping Address'),

  status: Joi.string()
    .valid('processing', 'out for delivery', 'delivered', 'cancelled')
    .default('processing')
    .label('Status'),

  paymentStatus: Joi.string()
    .valid('pending', 'success', 'failed')
    .default('pending')
    .label('Payment Status'),

  paymentMethod: Joi.string()
    .valid('COD', 'Stripe', 'PayPal')
    .default('COD')
    .label('Payment Method')
});

module.exports = orderSchema;
