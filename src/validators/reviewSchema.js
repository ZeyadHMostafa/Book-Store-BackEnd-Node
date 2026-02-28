const Joi = require('joi');

const reviewSchema = Joi.object({
  book: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .required()
    .messages({'string.pattern.base': 'Invalid Book ID format.'})
    .label('Book'),

  user: Joi.string()
    .pattern(/^[0-9a-f]{24}$/i)
    .messages({'string.pattern.base': 'Invalid User ID format.'})
    .label('User'),

  rating: Joi.number().integer().min(0).max(5).required().label('Rating'),

  comment: Joi.string().trim().max(1000).allow('', null).label('Comment')
});

const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(0).max(5).label('Rating'),
  comment: Joi.string().trim().max(1000).allow('', null).label('Comment')
});

module.exports = {reviewSchema, updateReviewSchema};
