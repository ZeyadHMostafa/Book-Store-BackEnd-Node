const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required().label('Category Name'),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow('', null)
    .label('Description')
});

module.exports = categorySchema;
