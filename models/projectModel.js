const mongoose = require('mongoose');
const Joi = require('joi');

const projectSchema = new mongoose.Schema({
  user_id: String,
  project_number: String,
  project_name: String,
  client_id: String,
  client_email: String,
  date_created: {
    type: Date,
    default: Date.now,
  },
  completion_date: Date,
  is_open: { type: Boolean, default: false },
  status: {
    name: { type: String, default: '' },
    style: { type: String, default: 'rgb(121, 126, 147)' },
  },
  tasks: {
    type: [
      {
        name: String,
        status: {
          name: { type: String, default: '' },
          style: { type: String, default: 'rgb(121, 126, 147)' },
        },
      },
    ],
    default: [
      {
        name: 'Electric company',
        status: { name: '', style: 'rgb(121, 126, 147)' },
      },
      {
        name: 'Bezeq',
        status: { name: '', style: 'rgb(121, 126, 147)' },
      },
      {
        name: 'Hot',
        status: { name: '', style: 'rgb(121, 126, 147)' },
      },
    ],
  },
});

exports.ProjectModel = mongoose.model('projects', projectSchema);

exports.validateProject = (reqBody) => {
  const joiSchema = Joi.object({
    project_number: Joi.string().min(2).max(150).required(),
    project_name: Joi.string().min(2).max(150).required(),
    client_email: Joi.string().min(2).max(150).email().allow(null, ''),
    completion_date: Joi.date().allow(null, ''),
  });

  return joiSchema.validate(reqBody);
};

exports.validateEditStatus = (reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(0).max(150).required(),
    style: Joi.string().min(0).max(150).required(),
  });

  return joiSchema.validate(reqBody);
};

exports.validateTask = (reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(10000000).required(),
  });

  return joiSchema.validate(reqBody);
};
