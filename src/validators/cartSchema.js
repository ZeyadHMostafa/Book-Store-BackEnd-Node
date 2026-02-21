const Joi = require('joi');

const cartSchema = Joi.object({
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
          .messages({'string.pattern.base': 'Invalid User ID format.'})
          .label('Book ID'),

        quantity: Joi.number().integer().min(1).required().label('Quantity')
      })
    )
    .required()
    .label('Cart Items')
});

module.exports = cartSchema;
