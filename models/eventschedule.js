const mongoose = require('mongoose');
const EventSchedule = mongoose.model('eventschedule', new mongoose.Schema({
        title: String,
        description: String,
        start: String,
        end: String,
        user: String
  }));

  exports.EventSchedule = EventSchedule;
