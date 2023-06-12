const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  date_created: {
    type: Date,
    default: Date.now,
  },
});

exports.ProductModel = mongoose.model('products', productSchema);

exports.validateProduct = (reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    description: Joi.string().min(2).max(15000).required(),
    image: Joi.string().min(2).max(15000).required(),
    price: Joi.number().min(0).max(1000000000).required(),
  });

  return joiSchema.validate(reqBody);
};
