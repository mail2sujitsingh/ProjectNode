const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skillName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10
    },
    value: {
      type: Number,
      required:true,
      default: 0
    },
  })


exports.SkillSchema = skillSchema;