const mongoose = require('mongoose');
const Attendees = mongoose.model('attendees', new mongoose.Schema({
        attendeeId: String,
        text: String,
        value: Number,
        color: String

  }));

  exports.Attendees = Attendees;
