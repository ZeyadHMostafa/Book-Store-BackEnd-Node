const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .label('Email'),

  firstName: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .label('First Name'),

  lastName: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .label('Last Name'),

  dob: Joi.date()
    .less('now')
    .required()
    .messages({
      'date.less': 'Date of birth cannot be in the future.'
    })
    .label('Date of birth'),

  password: Joi.string()
    .min(8)
    .required()
    // TODO: add regex
    .label('Password'),

  role: Joi.string()
    .valid('user', 'admin')
    .default('user')
    .label('Role')
});

module.exports = userSchema;
