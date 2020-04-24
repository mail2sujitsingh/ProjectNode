const Joi = require('joi');
const mongoose = require('mongoose');
const {SkillSchema} = require('./skill');

const skills = [
  {"skillName":"HTML","value":0},
  {"skillName":"Vue","value":0},
  {"skillName":"React","value":0},
  {"skillName":"JS","value":0},
  {"skillName":"JQuery","value":0}
]
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
    default:skills
  }
  
}));


function validateUser(customer) {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
  };

  return Joi.validate(customer, schema);
}

exports.User = User; 
exports.Validate = validateUser;