const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  lastName: {
    type: Boolean,
    default: false
  },
  
}));

function validateUser(customer) {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    firstName: Joi.string().min(3).max(50).required(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer; 
exports.validate = validateUser;