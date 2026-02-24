const Joi = require('joi');

const cartItemSchema = Joi.object({
  book: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required(),
  quantity: Joi.number().integer().min(1).required()
});

const cartSchema = Joi.object({
  user: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required()
    .messages({'string.pattern.base': 'Invalid User ID format.'})
    .label('User'),

  items: Joi.array().items(cartItemSchema).required().label('Cart Items')
});

const removeFromCartSchema = Joi.object({
  bookId: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required()
});

module.exports = {
  cartSchema,
  cartItemSchema,
  removeFromCartSchema
};
