const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().label('Email'),

  password: Joi.string()
    .min(8)
    .required()
    // TODO: add regex
    .label('Password')
});

module.exports = loginSchema;
