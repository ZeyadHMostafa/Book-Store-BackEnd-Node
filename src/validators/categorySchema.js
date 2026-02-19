const Joi = require('joi');

// TODO: This is just an example, change it before releasing to production
const entitySchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(/^[a-z0-9]{3,30}$/)
    .required(),
  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required(),
  birthYear: Joi.number()
    .integer()
    .min(1900)
    .max(2013)
});

module.exports = entitySchema;
