const Joi = require('joi');
const mongoose = require('mongoose');
const {SkillSchema} = require('./skill');

const User = mongoose.model('User', new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  lastName: {
    type: String,
    default: false
  },
  skills:{
    type:[SkillSchema],
    required:true
  }
  
}));


function validateUser(customer) {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    skills: Joi.required()
  };

  return Joi.validate(customer, schema);
}

exports.User = User; 
exports.Validate = validateUser;