const Joi = require('joi');

exports.validateContact = (reqBody) => { 
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    phone: Joi.string().min(9).max(150).required(),
    email: Joi.string().min(2).max(1500).email().required(),
    message: Joi.string().min(2).max(15000).allow(null, ''),
  });

  return joiSchema.validate(reqBody);
};
