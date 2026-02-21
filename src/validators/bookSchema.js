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

  bookCover: Joi.string().required().label('Book Cover URL/Path').messages({
    'string.base':
      'Must be a valid string path or URI.'
  }),

  stock: Joi.number().integer().min(0).label('Stock Quantity')

  // Note: averageRating and numReviews are omitted
  // because they are managed by the system, not the user input.
});

const bookUpdateSchema = bookSchema.fork(
  ['name', 'author', 'category', 'price', 'description', 'bookCover', 'stock'],
  (schema) => schema.optional(),
  (schema) => schema.default()
);

module.exports = {bookSchema, bookUpdateSchema};
