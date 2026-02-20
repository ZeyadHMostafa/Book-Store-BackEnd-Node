const Joi = require('joi');

const bookSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200).required().label('Book Name'),

  author: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required()
    .messages({'string.pattern.base': 'Invalid Author ID format.'})
    .label('Author'),

  category: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required()
    .messages({'string.pattern.base': 'Invalid Category ID format.'})
    .label('Category'),

  price: Joi.number().min(0).precision(2).required().label('Price'),

  description: Joi.string()
    .trim()
    .max(2000)
    .allow('', null)
    .label('Description'),

  bookCover: Joi.string().uri().required().label('Book Cover URL').messages({
    'string.uri':
      'not a valid URI. if this should be allowed contact server owner'
  }),

  stock: Joi.number().integer().min(0).default(0).label('Stock Quantity')

  // Note: averageRating and numReviews are omitted
  // because they are managed by the system, not the user input.
});

module.exports = bookSchema;
