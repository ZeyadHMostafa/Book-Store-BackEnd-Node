const Joi = require('joi');

const paymentStatusSchema = Joi.string().valid('pending', 'success', 'failed');
const paymentMethodSchema = Joi.string().valid('COD', 'Stripe', 'PayPal');
const statusSchema = Joi.string().valid(
  'processing',
  'out for delivery',
  'delivered',
  'cancelled'
);

const orderItemSchema = Joi.object({
  book: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required(),
  quantity: Joi.number().integer().min(1).required()
});

const phoneSchema = Joi.string().trim().required();

const addressSchema = Joi.string().trim().required();

const orderSchema = Joi.object({
  user: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required()
    .messages({'string.pattern.base': 'Invalid User ID format.'})
    .label('User'),

  items: Joi.array()
    .items(orderItemSchema)
    .min(1)
    .required()
    .label('Order Items'),

  // TODO: this should likely be calculated not stored!! check with the rest of the team
  // totalAmount: Joi.number()

  phone: phoneSchema.required().label('Phone'),

  shippingAddress: addressSchema.required().label('Shipping Address'),

  status: statusSchema.label('Status'),

  paymentStatus: paymentStatusSchema.label('Payment Status'),

  paymentMethod: paymentMethodSchema.label('Payment Method')
});

const placeOrderSchema = Joi.object({
  phone: phoneSchema.required(),
  shippingAddress: addressSchema.required(),
  paymentMethod: paymentMethodSchema.required()
});

const updateOrderStatusSchema = Joi.object({
  status: statusSchema,
  paymentStatus: paymentStatusSchema
}).min(1);

module.exports = {orderSchema, placeOrderSchema, updateOrderStatusSchema};
