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
        quantity: Joi.number().integer().min(1).required().label('Quantity')

        // TODO: this should likely be calculated not stored!! check with the rest of the team
        // priceAtPurchase: Joi.number()
      })
    )
    .min(1)
    .required()
    .label('Order Items'),

  // TODO: this should likely be calculated not stored!! check with the rest of the team
  // totalAmount: Joi.number()

  shippingAddress: Joi.object({
    street: Joi.string().trim().required().label('Street'),
    city: Joi.string().trim().required().label('City'),
    zipCode: Joi.string().trim().required().label('Zip Code')
  })
    .required()
    .label('Shipping Address'),

  status: Joi.string()
    .valid('processing', 'out for delivery', 'delivered', 'cancelled')
    .label('Status'),

  paymentStatus: Joi.string()
    .valid('pending', 'success', 'failed')
    .label('Payment Status'),

  paymentMethod: Joi.string()
    .valid('COD', 'Stripe', 'PayPal')
    .label('Payment Method')
});

const placeOrderSchema = orderSchema
  .fork(['user', 'items', 'status', 'paymentStatus'], (schema) => {
    schema.forbidden();
  })
  .keys({
    shippingAddress: orderSchema.extract('shippingAddress').required(),
    paymentMethod: orderSchema.extract('paymentMethod').required()
  });

const updateOrderStatusSchema = orderSchema
  .fork(
    ['user', 'items', 'totalAmount', 'shippingAddress', 'paymentMethod'],
    (schema) => schema.forbidden()
  )
  .keys({
    status: orderSchema.extract('status').optional(),
    paymentStatus: orderSchema.extract('paymentStatus').optional()
  });

module.exports = {orderSchema, placeOrderSchema, updateOrderStatusSchema};
