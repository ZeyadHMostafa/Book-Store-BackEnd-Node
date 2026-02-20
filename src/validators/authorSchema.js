const Joi = require('joi');

const authorSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .label('Name'),

  bio: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .label('Bio')
});

module.exports = authorSchema;
