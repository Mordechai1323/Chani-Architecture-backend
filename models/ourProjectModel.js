const mongoose = require('mongoose');
const Joi = require('joi');

const ourProjectSchema = new mongoose.Schema({
  name: String,
  info: String,
  main_image: String,
  images: {
    type: [String],
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

exports.OurProjectModel = mongoose.model('ourProjects', ourProjectSchema)

exports.validateOurProject = (reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    info: Joi.string().min(2).max(150).required(),
  });
  return joiSchema.validate(reqBody);
};
