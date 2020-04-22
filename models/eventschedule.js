const mongoose = require('mongoose');
const EventSchedule = mongoose.model('eventschedule', new mongoose.Schema({
        eventScheduleId: String,
        title: String,
        description: String,
        start: String,
        end: String,
        user: String,
        attendees: [Number]
  }));

  exports.EventSchedule = EventSchedule;
